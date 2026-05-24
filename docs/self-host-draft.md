Home Server
GPU - Nvidia RTX 3060 12GB
CPU - AMD Ryzen 5 5500
RAM - 32 GB
MB - MSI B550M pro-vdh
SSD - 1TB NVMe M.2 


| subdomain  | service |
| --------   | ------- |
| ai         | openwebui|        
| analytics  | umami|        
| draw       | Excalidraw|        
| gen-img    | image generator |        
| img-api    | API service (TTI and ITI)|
| landr      | SaaS (AI service)|
| n8n        | n8n (workflow automation)|
| ollama     | ollama|
| portfolio  | Old portfolio|
| pt         | portainer|
| vps        | Proxmox (VPS)|
| www        | current portfolio|
| contact    | gmail|



Proxmox

LXC containers
ollama (GPU)
n8n
comfyUI (GPU)
gh-runner 
local-image (GPU)



Ollama
NAME                         SIZE      
llama3.1:latest              4.9 GB     
phi3:14b                     7.9 GB     
phi3:latest                  2.2 GB     
codellama:13b                7.4 GB     
codellama:latest             3.8 GB     
qwen2.5-coder:latest         4.7 GB     
starcoder2:7b                4.0 GB     
deepseek-coder:6.7b          3.8 GB     
qwen3:14b                    9.3 GB     
gpt-oss:latest               13 GB   
qwen3:8b                     5.2 GB     
mxbai-embed-large:latest     669 MB  
gemma3:4b                    3.3 GB     
llama3.2:latest              2.0 GB     
mistral:latest               4.4 GB     
deepseek-r1:8b               5.2 GB 

    docker containers
      ollama      11434
      open webUI  3000


n8n
Portfolio chatbot
schedule meeting
Summary emails
Create help desk ticket
Local Chatbot with RAG
Finance data collector

    docker containers
      dashy        8080
      excalidraw   5000
      n8n          5678
      postgress    - 


comfyUI
 checkpoints
   Stable Diffusion v1.5
   Stable Diffusion XL 1.0 base
 loras
   wan2.2_high_noise
   wan2.2_low_noise
 vae
   wan_2.1_vae
 text_encoders
   umt5_xxl_scaled
 deffusion_models
   wan2.2_high_noise_14B
   wan2.2_low_noise_14B

confyUI web interface 8080


gh-runner
github action daemon service for CI/CD
    docker containers
    gen-img front-end  3006
    SaaS AI service    3007
    umami              3005
    postgress          -
  
  
local-image
  docker containers
    Image generator python API - 8000