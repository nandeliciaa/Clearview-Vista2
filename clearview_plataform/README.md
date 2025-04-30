# Plataforma Clearview Capital

Este repositório contém o código-fonte da plataforma web da Clearview Capital, um site estático com funcionalidades interativas implementadas em JavaScript.

## Estrutura do Projeto

- `frontend/`: Contém todos os arquivos do site (HTML, CSS, JavaScript, imagens).
- `backend/`: (Opcional) Contém código backend, se houver (neste caso, parece haver, mas o deploy no Render está configurado apenas para o frontend estático).
- `render.yaml`: Arquivo de configuração para deploy no Render como um serviço web estático.
- `.gitignore`: Especifica arquivos e diretórios a serem ignorados pelo Git.
- `README.md`: Este arquivo.

## Deploy no Render via GitHub

1.  **Crie um repositório no GitHub:** Faça o upload do conteúdo desta pasta (incluindo o arquivo `render.yaml` na raiz) para um novo repositório no GitHub.
2.  **Conecte o Render ao GitHub:** Crie uma conta no Render (plano gratuito disponível) e conecte sua conta do GitHub.
3.  **Crie um novo Serviço Web Estático:** No dashboard do Render, clique em "New +" e selecione "Static Site".
4.  **Selecione o Repositório:** Escolha o repositório GitHub que você criou.
5.  **Configurações:**
    - **Name:** Dê um nome ao seu serviço (ex: `clearview-capital-site`).
    - **Root Directory:** Deixe em branco (o Render usará a raiz do repositório).
    - **Build Command:** O Render deve detectar automaticamente que é um site estático e não precisará de comando de build. Se solicitado, pode usar `echo No build needed`.
    - **Publish Directory:** O Render usará o `staticPublishPath` definido no `render.yaml` (`./frontend`).
6.  **Deploy:** Clique em "Create Static Site". O Render fará o deploy automaticamente.
7.  **Domínio Personalizado:** Após o deploy inicial, vá para a seção "Settings" do seu serviço no Render e adicione seu domínio personalizado `clearviewcapital.com.br`. Siga as instruções do Render para configurar os registros DNS no seu provedor de domínio.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Chart.js (para gráficos)
