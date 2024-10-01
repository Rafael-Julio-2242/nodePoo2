# Node POO2 Project

Este é um projeto de utilização de um modelo de IA para identificar
a deteriorização de plantas

Esse projeto utiliza nextJS e mongo para podermos realizar as devidas
ações correspondentes.

Para testes, se utiliza um container mongo para realizar as ações
determinadas na base de dados

### Comando Docker
```Bash
  sudo docker run --name imagesDB -d --rm -p 27017:27017 -v ./mongo-data:/data/db mongo
```

## Comando para iniciar projeto
### Em Desenvolvimento
```Bash
  npm run dev
```

### Em Produção
```Bash
  npm run build # Para construir a aplicação para produção
  npm run start
```
