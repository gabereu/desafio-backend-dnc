# Desafio Escola DNC Backend Developer Jr.
Teste tecnico para vaga de Backend Developer Jr. na Escola DNC

## Desafio
Sistema de presenças para funcionários com possibilidade de gestão via administradores

## Fluxo esperado
- [x] Usuário consegue 
  - [x] cadastrar sua presença
  - [x] Usuário consegue visualizar suas presenças registradas
- [x] Administrador consegue 
  - [x] visualizar todas as presenças
  - [x] alterar uma presença
  - [x] criar uma presença
  - [x] deletar uma presença

## Estrutura de pastas
    src
    ├── main                  # Arquivos do sistema  
    │   ├── application       # Camada de aplicação
    │   ├── domain            # Camada de domínio
    │   ├── infra             # Camada de infraestrutura
    │   └── shared            # Código compartilhável entre domínio e aplicação  
    └── tests                 # Arquivos de teste
        └── (mesmo esquema da pasta main com os arquivos de testes)

## Decisões técnicas

- A linguagem era livre porém a vaga pedia habilidades em PHP, Node ou Python, portanto foi escolhido node uma vez que tenho familiaridade com o ambiente.
- Foi utilizado o Typescript pois a tipagem facilita a criação de um código mais legível, e utilização de princípios e design patterns 
- Para a construção desse sistema foram utilizadas técnicas de SOLID e DDD
- Para a parte de infra temos:
  - o servidor utilizando express
  - como ORM o TypeORM
  - banco de dados foi utilizado o Sqlite para diminuir o tempo de configuração do ambiente
- Testes unitários e de integração utilizando jest
  - O code coverage caiu um pouco devido à utilização da biblioteca inversify para a injeção de dependências (necessário fazer testes injetando as dependências)
- A documentação da API está feita no postman podendo ser importada pelo arquivo `Presence_API.postman_collection.json` na raíz do projeto