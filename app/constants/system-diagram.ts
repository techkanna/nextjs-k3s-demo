export const SYSTEM_DESIGN = `
graph TB
    %% Internet & DNS
    INTERNET[Internet Users]
    DNS[Cloudflare DNS]
    
    %% Main Server Hardware
    subgraph "Home Server Hardware"
        SERVER[Home Server]
        HW[Hardware Specs]
        
        subgraph HW
            GPU[Nvidia RTX 3060 12GB]
            CPU[AMD Ryzen 5 5500]
            RAM[32 GB RAM]
            MB[MSI B550M pro-vdh]
            SSD[1TB NVMe M.2 SSD]
        end
    end

    %% Proxmox Hypervisor
    subgraph "Proxmox VE (vps.techkanna.com)"
        PROXMOX[Proxmox Hypervisor]
        
        subgraph "LXC Containers"
            OLLAMA_CT[Ollama LXC<br/>GPU Passthrough]
            N8N_CT[n8n LXC]
            COMFYUI_CT[ComfyUI LXC<br/>GPU Passthrough]
            GH_RUNNER_CT[GitHub Runner LXC]
            LOCAL_IMG_CT[Local Image LXC<br/>GPU Passthrough]
        end
    end

    %% Ollama Services
    subgraph OLLAMA_CT
        OLLAMA_DOCKER[Docker: Ollama<br/>Port: 11434]
        OPENWEBUI_DOCKER[Docker: Open WebUI<br/>Port: 3000]
        
        subgraph "Ollama Models"
            OLLAMA_MODELS[Llama3.1: 4.9GB<br/>Phi3:14b: 7.9GB<br/>CodeLlama:13b: 7.4GB<br/>Qwen3:14b: 9.3GB<br/>GPT-OSS: 13GB<br/>+10 more models]
        end
    end

    %% n8n Services
    subgraph N8N_CT
        N8N_DOCKER[Docker: n8n<br/>Port: 5678]
        POSTGRES_N8N[Docker: PostgreSQL]
        DASHY_DOCKER[Docker: Dashy<br/>Port: 8080]
        EXCALIDRAW_DOCKER[Docker: Excalidraw<br/>Port: 5000]
        
        subgraph "n8n Workflows"
            WORKFLOWS[Portfolio Chatbot<br/>Schedule Meeting<br/>Summary Emails<br/>Help Desk Tickets<br/>Local RAG Chatbot<br/>Finance Data Collector]
        end
    end

    %% ComfyUI Services
    subgraph COMFYUI_CT
        COMFYUI_WEB[ComfyUI Web Interface<br/>Port: 8080]
        
        subgraph "AI Models & Assets"
            CHECKPOINTS[Checkpoints<br/>- SD v1.5<br/>- SD XL 1.0]
            LORAS[LoRAs<br/>- wan2.2_high_noise<br/>- wan2.2_low_noise]
            VAE[VAE: wan_2.1_vae]
            TEXT_ENC[Text Encoders: umt5_xxl_scaled]
            DIFF_MODELS[Diffusion Models<br/>- wan2.2_high_noise_14B<br/>- wan2.2_low_noise_14B]
        end
    end

    %% GitHub Runner Services
    subgraph GH_RUNNER_CT
        GH_RUNNER[GitHub Actions Daemon]
        
        subgraph "Docker Containers"
            GEN_IMG_FE[Docker: gen-img frontend<br/>Port: 3006]
            SAAS_AI[Docker: SaaS AI Service<br/>Port: 3007]
            UMAMI[Docker: Umami Analytics<br/>Port: 3005]
            POSTGRES_UMAMI[Docker: PostgreSQL]
        end
    end

    %% Local Image Services
    subgraph LOCAL_IMG_CT
        IMG_API[Docker: Image Generator API<br/>Port: 8000]
    end

    %% Web Services & Subdomains
    subgraph "Web Services & Subdomains"
        AI[ai.techkanna.com → Open WebUI]
        ANALYTICS[analytics.techkanna.com → Umami]
        DRAW[draw.techkanna.com → Excalidraw]
        GEN_IMG[gen-img.techkanna.com → Image Generator]
        IMG_API_DOMAIN[img-api.techkanna.com → API Service]
        LANDR[landr.techkanna.com → SaaS AI Service]
        N8N_WEB[n8n.techkanna.com → n8n]
        OLLAMA_WEB[ollama.techkanna.com → Ollama]
        PORTFOLIO_OLD[portfolio.techkanna.com → Old Portfolio]
        PORTAINER[pt.techkanna.com → Portainer]
        VPS[vps.techkanna.com → Proxmox]
        WWW[www.techkanna.com → Current Portfolio]
        CONTACT[contact.techkanna.com → Gmail]
    end

    %% Connections
    INTERNET --> DNS
    DNS --> SERVER
    SERVER --> PROXMOX
    
    PROXMOX --> OLLAMA_CT
    PROXMOX --> N8N_CT
    PROXMOX --> COMFYUI_CT
    PROXMOX --> GH_RUNNER_CT
    PROXMOX --> LOCAL_IMG_CT
    
    %% Service to Subdomain mappings
    OPENWEBUI_DOCKER --> AI
    UMAMI --> ANALYTICS
    EXCALIDRAW_DOCKER --> DRAW
    GEN_IMG_FE --> GEN_IMG
    IMG_API --> IMG_API_DOMAIN
    SAAS_AI --> LANDR
    N8N_DOCKER --> N8N_WEB
    OLLAMA_DOCKER --> OLLAMA_WEB
    PORTAINER --> PORTAINER
    PROXMOX --> VPS
    WWW --> WWW
    CONTACT --> CONTACT
    
    %% Internal dependencies
    OLLAMA_DOCKER --> OPENWEBUI_DOCKER
    POSTGRES_N8N --> N8N_DOCKER
    POSTGRES_UMAMI --> UMAMI
    COMFYUI_WEB --> IMG_API
    OLLAMA_DOCKER --> WORKFLOWS

    %% Styling
    classDef serverStyle fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef containerStyle fill:#f3e5f5,stroke:#4a148c,stroke-width:1px
    classDef serviceStyle fill:#e8f5e8,stroke:#1b5e20,stroke-width:1px
    classDef webStyle fill:#fff3e0,stroke:#e65100,stroke-width:1px
    classDef gpuStyle fill:#ffebee,stroke:#b71c1c,stroke-width:1px
    
    class SERVER,HW,PROXMOX serverStyle
    class OLLAMA_CT,N8N_CT,COMFYUI_CT,GH_RUNNER_CT,LOCAL_IMG_CT containerStyle
    class OLLAMA_DOCKER,OPENWEBUI_DOCKER,N8N_DOCKER,COMFYUI_WEB,IMG_API serviceStyle
    class AI,ANALYTICS,DRAW,GEN_IMG,IMG_API_DOMAIN,LANDR,N8N_WEB,OLLAMA_WEB,PORTFOLIO_OLD,PORTAINER,VPS,WWW,CONTACT webStyle
    class OLLAMA_CT,COMFYUI_CT,LOCAL_IMG_CT gpuStyle
`