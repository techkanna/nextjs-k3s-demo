## 🔹 Infrastructure Overview

**Home Server Specs:**

* **CPU:** AMD Ryzen 5 5500
* **GPU:** NVIDIA RTX 3060 (12GB VRAM)
* **RAM:** 32GB DDR4
* **Storage:** 1TB NVMe M.2 SSD
* **Motherboard:** MSI B550M Pro-VDH

This single server runs **Proxmox VE** as the hypervisor.
All applications and services are hosted inside **LXC containers** and **Docker containers** for modularity.

---

## 🔹 High-Level Architecture

```
                ┌───────────────────────────────┐
                │         Internet Users        │
                └──────────────┬────────────────┘
                               │
                      (DNS & Routing via Subdomains)
                               │
                      ┌────────▼─────────┐
                      │ Reverse Proxy /  │
                      │ Cloudflare Tunnel│
                      └────────┬─────────┘
                               │
                ┌──────────────┴─────────────────┐
                │        Home Server             │
                │   (Proxmox Hypervisor)         │
                └──────────────┬─────────────────┘
                               │
         ┌─────────────────────┼────────────────────────┐
         │                     │                        │
    [ollama LXC]          [n8n LXC]               [comfyUI LXC]
   (GPU-backed AI)   (Automation & DB)        (Image Gen Pipeline)
         │                     │                        │
   ┌─────┴──────┐        ┌─────┴─────┐           ┌──────┴───────┐
 [Ollama Models]│   [n8n, PostgreSQL]│     [Stable Diffusion,   │
 [OpenWebUI]    │   [Dashy, Excalidraw]│    custom checkpoints] │
                │                     │                        │

         ┌────────────────────────────────────────────┐
         │             [gh-runner LXC]                │
         │    (GitHub Actions CI/CD, SaaS, Umami)     │
         └────────────────────────────────────────────┘

         ┌────────────────────────────────────────────┐
         │             [local-image LXC]              │
         │     (Custom Image API service - Python)    │
         └────────────────────────────────────────────┘
```

---

## 🔹 Subdomain → Service Mapping

| **Subdomain** | **Service**                      | **Hosted In**            |
| ------------- | -------------------------------- | ------------------------ |
| `ai`          | OpenWebUI (front-end for Ollama) | ollama LXC (Docker)      |
| `analytics`   | Umami (web analytics)            | gh-runner LXC (Docker)   |
| `draw`        | Excalidraw                       | n8n LXC (Docker)         |
| `gen-img`     | Frontend for Image Generator     | gh-runner LXC (Docker)   |
| `img-api`     | Python API for TTI/ITI           | local-image LXC (Docker) |
| `landr`       | SaaS AI Service                  | gh-runner LXC (Docker)   |
| `n8n`         | Workflow automation              | n8n LXC (Docker)         |
| `ollama`      | Ollama models + APIs             | ollama LXC (GPU)         |
| `portfolio`   | Old portfolio website            | Docker                   |
| `pt`          | Portainer (Docker management)    | Docker                   |
| `vps`         | Proxmox VE dashboard             | Native Proxmox           |
| `www`         | Current portfolio website        | Docker                   |
| `contact`     | Gmail redirect                   | External                 |

---

## 🔹 Container Breakdown

### 1. **ollama LXC (GPU-enabled)**

* Runs multiple **LLMs** (LLaMA 3.1, Phi-3, Qwen, CodeLlama, Mistral, DeepSeek, etc.).
* **Docker containers:**

  * `ollama` (port 11434) → Model serving API
  * `openwebui` (port 3000) → Web UI for AI chat

### 2. **n8n LXC**

* Workflow automation hub:

  * **Tasks:** portfolio chatbot, meeting scheduler, finance data collector, email summaries, help desk ticketing.
* **Docker containers:**

  * `n8n` (5678)
  * `PostgreSQL` (DB)
  * `Excalidraw` (5000)
  * `Dashy` (8080) → dashboard

### 3. **comfyUI LXC (GPU-enabled)**

* Runs **Stable Diffusion pipelines** with custom checkpoints, LoRAs, VAEs.
* Provides **web UI on port 8080** for image generation workflows.

### 4. **gh-runner LXC**

* Self-hosted **GitHub Actions runner** for CI/CD.
* **Docker containers:**

  * `gen-img frontend` (3006)
  * `SaaS AI service` (3007)
  * `umami` (3005)
  * `PostgreSQL`

### 5. **local-image LXC**

* Hosts **custom Python API service** for Text-to-Image (TTI) and Image-to-Image (ITI).
* **Docker container:**

  * `image generator API` (8000)

---

## 🔹 Data & Workflow Flows

1. **User Access → Subdomain → Reverse Proxy → Service Container**
   Example: `ai.example.com` → Cloudflare Tunnel → Proxmox (ollama LXC) → OpenWebUI.

2. **AI Workflows (RAG, Automation):**

   * n8n fetches context (finance data, chat logs).
   * Sends queries to **Ollama LLMs**.
   * Returns results via chatbot or scheduled summary emails.

3. **Image Generation Pipelines:**

   * User accesses `gen-img` frontend → API calls `img-api` (Python service).
   * `img-api` dispatches to **ComfyUI** or **Stable Diffusion** models for rendering.
   * Images returned to frontend.

4. **CI/CD Deployment:**

   * Code pushes → GitHub Actions → **gh-runner** builds & deploys container images.
   * Deployed services get exposed via subdomains.

---

## 🔹 Key Highlights

* **GPU Virtualization:** RTX 3060 allocated to LXC containers for Ollama & ComfyUI.
* **Automation:** n8n orchestrates workflows across AI, chatbots, and databases.
* **Observability:** Umami analytics tracks portfolio and SaaS traffic.
* **Developer CI/CD:** GitHub self-hosted runner automates build & deploy pipelines.
* **Scalable & Modular:** Each service isolated in its own LXC + Docker setup.

---

This architecture balances **performance (GPU workloads)**, **automation (n8n + CI/CD)**, and **reliability (Proxmox isolation)**, making it a showcase-worthy **self-hosted cloud system**.
