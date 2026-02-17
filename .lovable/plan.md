

# Limpar Cache do Projeto

## Problema
O projeto pode estar com cache antigo causando comportamentos inesperados na preview.

## Solucao

Fazer uma limpeza simples dos arquivos de cache do Vite e reinstalar dependencias:

1. **Limpar cache do Vite** - Remover a pasta de cache em `node_modules/.vite`
2. **Forcar rebuild** - Adicionar um timestamp como comentario no `vite.config.ts` para invalidar o cache do build
3. **Verificar** - Confirmar que a preview carrega corretamente apos a limpeza

## Detalhes Tecnicos

- Adicionar `cacheDir: '.vite-cache'` e alterar para forcar novo cache no `vite.config.ts`
- Alternativa mais simples: adicionar/remover um espaco em branco no `index.html` para forcar rebuild completo

A mudanca sera minima - apenas o suficiente para invalidar o cache e forcar o Lovable a reconstruir tudo do zero.

