let precoProduto = 100;
let percentualDesconto = 0.15;
let nome = 'Marcelo';

console.log(`Olá, ${nome}! O produto custa R$${precoProduto}\n
Desconto de ${percentualDesconto}%: R$${precoProduto * percentualDesconto}\n
Preço final: R$ ${precoProduto - (precoProduto * percentualDesconto)}\n
Preço acima de R$ 100? ${(precoProduto - (precoProduto * percentualDesconto)) > 100}\n
Desconto válido? ${percentualDesconto >= 0 && percentualDesconto <= 100}\n`)