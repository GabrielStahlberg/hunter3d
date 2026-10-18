# Gerenciando produtos (V1)

Nesta versão, os produtos não ficam em um banco de dados — eles são mantidos
diretamente no código, no arquivo `src/content/products.ts`. Não é preciso
saber programar para seguir os passos abaixo, só editar o arquivo com cuidado
e manter o formato de cada produto.

Todo produto segue este formato (cada campo é explicado abaixo):

```ts
{
  id: "10",
  slug: "nome-do-produto",
  name: "Nome do Produto",
  category: "recursos-sensoriais",
  price: 79.9,
  images: ["/products/nome-do-produto/01.webp", "/products/nome-do-produto/02.webp"],
  available: true,
  // campos opcionais:
  dimensions: "10 x 10 x 5 cm",
  material: "PLA",
  colors: ["Azul", "Verde"],
  customizable: true,
},
```

## Adicionar um produto

1. Abra `src/content/products.ts`.
2. Copie um produto existente e cole no final da lista (antes do `];`).
3. Ajuste os campos:
   - `id`: um número (ou texto) que ainda não exista na lista.
   - `slug`: o "endereço" do produto na URL (`/produtos/slug-aqui`). Use letras
     minúsculas, sem acento e com hífen no lugar de espaço.
   - `category`: precisa ser exatamente igual ao `slug` de uma categoria
     existente em `src/content/categories.ts` (veja "Categorias" abaixo).
   - `price`: número, com ponto para casas decimais (ex.: `89.9`, não `89,90`).
4. Adicione as fotos (veja "Adicionar fotos" abaixo) antes de publicar.
5. Salve o arquivo. O produto passa a aparecer automaticamente no catálogo,
   na busca e nos filtros de categoria — nenhum outro arquivo precisa mudar.

O catálogo não usa mais texto descritivo por produto (nome, categoria, preço,
fotos e specs — material/dimensões/cores — já comunicam o produto). O título
e a descrição usados por buscadores e ao compartilhar o link são gerados
automaticamente a partir desses mesmos dados, em `src/content/common.ts`
(`seo.productDescription`).

## Editar um produto

Encontre o produto pelo `name` ou `slug` em `src/content/products.ts` e
altere o campo desejado (preço, disponibilidade, specs etc.). Não altere
o `slug` de um produto já publicado sem necessidade — isso muda a URL da
página dele.

## Remover um produto

Apague o bloco `{ ... }` inteiro do produto em `src/content/products.ts`.

## Adicionar fotos

Fotos reais devem ficar em `public/products/<slug-do-produto>/`, por exemplo:

```
public/products/kit-encaixe-formas-geometricas/
  01.webp
  02.webp
  03.webp
```

Depois, no produto, aponte `images` para esses caminhos:

```ts
images: [
  "/products/kit-encaixe-formas-geometricas/01.webp",
  "/products/kit-encaixe-formas-geometricas/02.webp",
],
```

- Máximo de 3 imagens por produto.
- Use `.webp` quando possível (arquivo menor, carrega mais rápido).

## Categorias

As categorias ficam em `src/content/categories.ts`:

```ts
{ slug: "recursos-sensoriais", name: "Recursos sensoriais" },
```

- Para **renomear** uma categoria, mude apenas o `name` (o `slug` deve
  continuar igual, ou os produtos que apontam para ele precisam ser
  atualizados também).
- Para **adicionar** uma categoria, adicione uma nova linha com `slug` e
  `name`.
- Para **remover** uma categoria, apague a linha — mas só depois de mudar (ou
  remover) todos os produtos que usam aquele `slug`, senão eles ficam sem
  categoria.
- Uma categoria só aparece nos filtros do catálogo quando existe pelo menos
  um produto usando ela — não é preciso "desativar" categorias vazias.

## Dimensões ou quantidade de peças

Use `dimensions` para o tamanho físico do produto (ex.: `"10 x 10 x 5 cm"`)
ou `pieceCount` para a quantidade de peças, quando isso importa mais que o
tamanho (kits, jogos com várias peças etc.), por exemplo:

```ts
pieceCount: "10 carimbos",
```

Use apenas um dos dois campos por produto — o que fizer mais sentido para
aquele item.

Quando o produto tem peças de tamanhos bem diferentes entre si (ex.: um kit
com base e tampa separadas), `dimensions` também aceita uma lista em vez de
um texto único:

```ts
dimensions: ["Base: 10 x 10 x 3 cm", "Tampa: 10 x 10 x 1 cm"],
```

## Marcar como indisponível

Mude `available: false`. O produto continua visível no catálogo (com um
selo de "Indisponível no momento"), mas o botão de WhatsApp na página dele é
substituído por um aviso, em vez do convite para comprar.

## Mudar o preço

Edite o campo `price`. Use ponto para separar os centavos: `price: 99.9`
equivale a R$ 99,90.

## Mais de um preço (ex.: unidade e kit completo)

Quando o produto pode ser comprado de mais de uma forma — por exemplo, uma
peça avulsa ou o kit completo — use `price` para o preço da unidade e
`priceOptions` para as outras opções:

```ts
price: 15,
priceOptions: [{ label: "Kit completo", price: 90 }],
```

Na página do produto aparecem botões para escolher entre "Unidade" e cada
opção de `priceOptions`; o preço mostrado e a mensagem do WhatsApp seguem a
opção selecionada. No card do catálogo (onde não há espaço para escolher),
aparece "A partir de" com o menor preço entre todas as opções.

Pode adicionar quantas opções quiser em `priceOptions`, cada uma com seu
próprio `label` e `price`.

## Produto sem preço fixo ("Consultar valor")

Quando o valor depende de algo variável (ex.: um nome personalizado, onde o
preço muda de acordo com o tamanho do texto), simplesmente não inclua o
campo `price` no produto. O site mostra "Consultar valor" no lugar do preço,
e o cliente segue direto pelo WhatsApp — que já é o fluxo principal.
