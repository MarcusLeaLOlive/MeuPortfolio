# CLAUDE.md

Guia para quem (pessoa ou IA) for editar este repositório.

## O projeto
Portfólio pessoal de Marcus Leal, publicado em https://marcusleal.site (Vercel).
Site estático: HTML, CSS e JavaScript puro. **Não há build, framework nem `npm install`.**

## Arquivos
| Arquivo | Para que serve |
|---|---|
| `index.html` | Página inicial: marcação de todas as seções |
| `style.css` | Todos os estilos (tokens de cor no início, seções em blocos comentados) |
| `errors.js` | Carrega primeiro; se WebGL ou algum efeito falhar, a página continua legível |
| `common.js` | Menu rápido (Ctrl/⌘ + K), tela cheia e régua de rolagem |
| `home.js` | Terminal, faixa da stack, fundo Aurora (WebGL), texto digitado, projetos e copiar e-mail |
| `404.html` | Página de erro (a Vercel usa sozinha) |
| `robots.txt`, `sitemap.xml`, `site.webmanifest` | SEO e instalação no celular |
| `vercel.json` | Cabeçalhos de segurança e cache |
| `images/` | Marca "L" e imagem de compartilhamento (`og-image.png`, 1200×630) |
| `docs/` | Textos de apoio (não vão para o site) |

## Regras
- Tema **preto e branco**. Cor só nos ícones e cartões quando pedido. Veja `DESIGN.md`.
- Textos em **português do Brasil**.
- Todo efeito precisa respeitar `prefers-reduced-motion` e funcionar no celular (Android e iPhone).
- Nada de `backdrop-filter` sobre o fundo animado: deixa a rolagem travada.
- Campos de formulário com fonte de pelo menos 16px no celular (evita zoom no iPhone).
- Depois de mudar `index.html`, atualize `lastmod` em `sitemap.xml`.

## Como adicionar um projeto
1. Em `index.html`, procure `class="pj-grid"` e copie um `<article class="pj">`.
2. Troque número, tecnologias, data, título, descrição, ícones e link.
3. Os 4 primeiros ficam à mostra. Para ir para "Outros projetos", use `class="pj pj-extra" hidden`.

## Rodar localmente
```bash
npx serve .
```
