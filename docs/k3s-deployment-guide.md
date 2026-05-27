# Self-Hosted Runner & K3s Deployment Setup Guide

This guide walks you through setting up the self-hosted GitHub Actions runner on your K3s master node and configuring the cluster for deployments.

---

## Prerequisites

- K3s cluster running (1 master + 2 workers)
- SSH access to the master node
- GitHub repository: `techkanna/nextjs-k3s-demo`

---

## Step 1: Create a GitHub Personal Access Token (PAT)

The K3s cluster needs a PAT to pull images from GHCR.

1. Go to **[GitHub → Settings → Developer Settings → Fine-grained tokens](https://github.com/settings/tokens?type=beta)**
2. Click **"Generate new token"**
3. Configure:
   - **Token name**: `k3s-ghcr-pull`
   - **Expiration**: 90 days (or longer)
   - **Repository access**: Select `techkanna/nextjs-k3s-demo`
   - **Permissions** → **Packages** → `Read`
4. Click **"Generate token"** and **save the token** — you'll need it in Step 3

---

## Step 2: Create the Portfolio Namespace

SSH into your **K3s master node** and run:

```bash
sudo kubectl apply -f k8s/namespace.yml
# Or simply:
sudo kubectl create namespace portfolio
```

---

## Step 3: Create the GHCR Image Pull Secret

On the **master node**, create the secret so K3s can pull images from GHCR:

```bash
sudo kubectl create secret docker-registry ghcr-secret \
  --namespace=portfolio \
  --docker-server=ghcr.io \
  --docker-username=techkanna \
  --docker-password=<YOUR_GITHUB_PAT_FROM_STEP_1> \
  --docker-email=<YOUR_EMAIL>
```

Verify it was created:
```bash
sudo kubectl get secret ghcr-secret -n portfolio
```

---

## Step 4: Install the Self-Hosted Runner

### 4.1 Create a runner directory

```bash
mkdir -p ~/actions-runner && cd ~/actions-runner
```

### 4.2 Download the runner

Check [the latest version](https://github.com/actions/runner/releases) and download:

```bash
# Download (update the version as needed)
curl -o actions-runner-linux-x64.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.321.0/actions-runner-linux-x64-2.321.0.tar.gz

# Extract
tar xzf ./actions-runner-linux-x64.tar.gz
```

### 4.3 Get the runner registration token

1. Go to your repo: **https://github.com/techkanna/nextjs-k3s-demo**
2. Click **Settings** → **Actions** → **Runners**
3. Click **"New self-hosted runner"**
4. Copy the **token** from the configuration command shown

### 4.4 Configure the runner

```bash
./config.sh --url https://github.com/techkanna/nextjs-k3s-demo --token <RUNNER_TOKEN>
```

When prompted:
- **Runner group**: press Enter for default
- **Runner name**: `k3s-master` (or any name you prefer)
- **Labels**: press Enter for default (adds `self-hosted`, `Linux`, `X64`)
- **Work folder**: press Enter for default (`_work`)

### 4.5 Install and start as a system service

```bash
sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
```

The runner will now start automatically on boot.

---

## Step 5: Configure kubectl Access for the Runner

The self-hosted runner needs `kubectl` access. K3s stores its kubeconfig at `/etc/rancher/k3s/k3s.yaml`.

### Option A: Make kubeconfig readable (simpler)

```bash
# Find the runner service user (usually the user who installed it)
# Make kubeconfig accessible
sudo chmod 644 /etc/rancher/k3s/k3s.yaml
```

### Option B: Copy kubeconfig for the runner user (more secure)

```bash
# Get the runner's user (check svc.sh install output, usually your login user)
RUNNER_USER=$(whoami)

# Create .kube directory
mkdir -p /home/$RUNNER_USER/.kube

# Copy and own the kubeconfig
sudo cp /etc/rancher/k3s/k3s.yaml /home/$RUNNER_USER/.kube/config
sudo chown $RUNNER_USER:$RUNNER_USER /home/$RUNNER_USER/.kube/config
chmod 600 /home/$RUNNER_USER/.kube/config
```

### Verify kubectl works

```bash
kubectl get nodes
# Should show your 1 master + 2 worker nodes
```

---

## Step 6: First Deployment (Manual Test)

Before relying on CI/CD, do a manual deployment to verify everything works:

```bash
# Clone the repo on the master node (if not already there)
git clone https://github.com/techkanna/nextjs-k3s-demo.git
cd nextjs-k3s-demo

# Apply all manifests
sudo kubectl apply -f k8s/namespace.yml
sudo kubectl apply -f k8s/service.yml
sudo kubectl apply -f k8s/nodeport-service.yml
sudo kubectl apply -f k8s/deployment.yml

# Check status
sudo kubectl get pods -n portfolio
sudo kubectl get svc -n portfolio
```

---

## Step 7: Trigger the CI/CD Pipeline

Push a change to `main` to trigger the full pipeline:

```bash
git add .
git commit -m "feat: add CI/CD pipeline for K3s deployment"
git push origin main
```

Then check:
1. **GitHub Actions**: Go to your repo → **Actions** tab to see the workflow run
2. **Build job**: Should complete on GitHub-hosted runner
3. **Deploy job**: Should run on your self-hosted runner

---

## Step 8: Verify Zero-Downtime Deployment

After the first successful deployment:

```bash
# Check pods are running across worker nodes
sudo kubectl get pods -n portfolio -o wide

# Access the app
curl http://<ANY_NODE_IP>:30080

# Watch a rolling update in real-time (in a separate terminal)
sudo kubectl get pods -n portfolio -w
```

---

## Troubleshooting

### Runner not picking up jobs
```bash
# Check runner status
sudo ~/actions-runner/svc.sh status

# Check runner logs
sudo journalctl -u actions.runner.techkanna-nextjs-k3s-demo.k3s-master.service -f
```

### Pods stuck in ImagePullBackOff
```bash
# Check if the GHCR secret is correct
sudo kubectl describe pod <pod-name> -n portfolio

# Verify the secret
sudo kubectl get secret ghcr-secret -n portfolio -o yaml

# Re-create if needed
sudo kubectl delete secret ghcr-secret -n portfolio
# Then re-run the create command from Step 3
```

### Deployment not rolling out
```bash
# Check deployment status
sudo kubectl rollout status deployment/portfolio -n portfolio

# Check events
sudo kubectl describe deployment portfolio -n portfolio

# Manual rollback if needed
sudo kubectl rollout undo deployment/portfolio -n portfolio
```

### GHCR package visibility
After the first push, make sure the GHCR package exists:
1. Go to https://github.com/techkanna?tab=packages
2. Find `nextjs-k3s-demo`
3. If using private repo, the package inherits visibility from the repo
