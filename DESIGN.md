# DESIGN.md

## Direção
Preto e branco, aparência de terminal e editor de código. Fundo animado discreto, conteúdo sempre legível.

## Cores
| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#020202` | Fundo da página |
| `--card` | `#0d0d0d` | Cartões |
| `--bg-2` | `#171717` | Superfícies secundárias |
| `--line` | `#262626` | Bordas |
| `--muted` | `#8a8a8a` | Textos secundários |
| `--fg` | `#f2f2f2` | Texto principal e botão primário |

Degradê cinza dos destaques: `#bdbdbd → #6b6b6b`.

## Tipografia
- **Inter**: nome do topo e títulos dos projetos
- **Plus Jakarta Sans**: títulos de seção
- **JetBrains Mono**: rótulos, terminal, tags `[ 01 ] STACK`, datas
- **League Spartan** e **Abril Fatface**: usos pontuais herdados

## Componentes
- Botão primário: fundo `#f2f2f2`, texto preto, raio 8px
- Cartão: fundo `#0d0d0d`, borda `#242424`, raio 10px; no hover sobe 3–4px e a borda clareia
- Etiqueta de seção: `[ 0N ] NOME` em mono, borda fina
- Ícones de tecnologia: Simple Icons, preenchidos em `#e6e6e6`

## Movimento
- Fundo Aurora Flow (WebGL, ~30 fps, resolução reduzida)
- Faixa da stack sempre em movimento; acelera com a rolagem
- Tudo desliga ou fica estático com `prefers-reduced-motion`
