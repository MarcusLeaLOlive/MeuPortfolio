# Marcus Leal · Portfólio

Portfólio pessoal de **Marcus Leal**, estudante full-stack de Análise e Desenvolvimento de Sistemas na UNINASSAU, em Teresina (PI).

**No ar:** [marcusleal.site](https://marcusleal.site)

---

## O que tem no site

- **Topo em estilo terminal:** prompt `root@marcusleal:~#`, nome em destaque, tecnologias sendo digitadas e um terminal com os commits reais dos meus projetos.
- **Stack:** faixa em movimento que acelera com a rolagem e grade de cartões com os logos das tecnologias, separadas em Desenvolvimento, Banco de Dados e IA, e Ferramentas e Metodologias.
- **Projetos:** cartões numerados com descrição, tecnologias e link para o GitHub. Os 4 principais ficam à mostra, e os outros abrem em "Ver outros projetos".
- **Sobre e formação:** apresentação e cartão com o curso, a faculdade e o foco de estudo.
- **Jornada:** linha do tempo dos projetos publicados.
- **Contato:** e-mail com botão de copiar e link para o GitHub.

## Detalhes de interface

- Fundo animado em **WebGL** (efeito "aurora" em preto e branco) que reage ao cursor.
- Régua de rolagem no canto da tela, que vira uma barra fina no celular.
- Menu rápido com **Ctrl + K** / **⌘ + K** para pular entre as seções.
- Layout responsivo, ajustado para **Android e iPhone** (áreas seguras, campos sem zoom no iOS, botões maiores para toque).
- Respeita a preferência de **movimento reduzido** do sistema.
- Otimizado para rolagem lisa: animações limitadas, pausadas fora da tela e sem desfoque pesado sobre o fundo animado.

## Tecnologias

- **HTML5, CSS3 e JavaScript puro**, sem frameworks nem etapa de build
- **WebGL** (shader próprio) e **Canvas 2D** para os efeitos visuais
- Logos do [Simple Icons](https://simpleicons.org)
- Fontes do Google Fonts: Inter, Plus Jakarta Sans e JetBrains Mono
- Hospedagem na **Vercel**

## Estrutura

```
index.html          página inicial
style.css           estilos
errors.js           proteção caso algum efeito falhe
common.js           menu rápido, tela cheia e régua de rolagem
home.js             efeitos e interações da página inicial
404.html            página de erro
images/             marca "L" e imagem de compartilhamento
favicon*.png/.ico   ícones do site
apple-touch-icon.png
site.webmanifest    instalação no celular
robots.txt          regras para buscadores
sitemap.xml         mapa do site
vercel.json         segurança e cache na Vercel
docs/               textos de apoio
CLAUDE.md           guia para editar o projeto
DESIGN.md           cores, fontes e componentes
PRODUCT.md          objetivo e seções do site
```

## Como rodar

Não precisa instalar nada. Abra o `index.html` no navegador ou use um servidor local:

```bash
npx serve .
```

Para publicar na Vercel:

```bash
npx vercel --prod
```

## Contato

- E-mail: moliveiralealbatis@gmail.com
- GitHub: [@MarcusLeaLOlive](https://github.com/MarcusLeaLOlive)
