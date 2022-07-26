# Desafio Escola DNC Backend Developer Jr.
Teste tecnico para vaga de Backend Developer Jr. na Escola DNC

## Desafio
Sistema de presenças para funcionários com possibilidade de gestão via administradores

## Fluxo esperado
- [ ] Usuário consegue 
  - [ ] cadastrar sua presença
  - [ ] Usuário consegue visualizar suas presenças registradas
- [ ] Administrador consegue 
  - [ ] visualizar todas as presenças
  - [ ] alterar uma presença
  - [ ] criar uma presença
  - [ ] deletar uma presença

## Estrutura de pastas
    src
    ├── main                  # Arquivos do sistema  
    │   ├── application       # Camada de aplicação
    │   ├── domain            # Camada de domínio
    │   ├── infra             # Camada de infraestrutura
    │   └── shared            # Código compartilhável entre domínio e aplicação  
    └── tests                 # Arquivos de teste
        └── (mesmo esquema da pasta main com os arquivos de testes)
