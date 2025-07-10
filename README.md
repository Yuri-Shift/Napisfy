# Napisfy 🎵

Uma aplicação web de streaming de música desenvolvida em Django.

## Descrição

Napisfy é uma plataforma de streaming de música que permite aos usuários:
- Explorar músicas, álbuns e artistas
- Criar e gerenciar playlists
- Reproduzir músicas
- Gerenciar contas de usuário

## Funcionalidades

- **Gestão de Música**: Organização por artistas, álbuns e gêneros
- **Playlists**: Criação e compartilhamento de playlists personalizadas
- **Reprodutor**: Interface para reprodução de músicas
- **Autenticação**: Sistema de contas de usuário personalizado
- **Admin**: Interface administrativa para gestão de conteúdo

## Tecnologias Utilizadas

- Django 4.x
- Python 3.x
- SQLite (banco de dados)
- HTML/CSS/JavaScript
- Bootstrap (frontend)

## Estrutura do Projeto

```
napisfy/
├── manage.py
├── db.sqlite3
├── media/                 # Arquivos de mídia (capas, áudios)
├── static/               # Arquivos estáticos (CSS, JS, imagens)
├── templates/            # Templates HTML
├── napisfy/              # Aplicação principal
│   ├── models.py         # Modelos de dados
│   ├── views.py          # Views
│   ├── urls.py           # URLs
│   └── settings.py       # Configurações
└── player_musica/        # Aplicação do player
```

## Modelos de Dados

- **Artista**: Informações dos artistas
- **Album**: Álbuns musicais
- **Cancoes**: Músicas individuais
- **Genero**: Gêneros musicais
- **Conta**: Contas de usuário personalizadas
- **PlaylistPubli**: Playlists públicas

## Instalação e Uso

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/napisfy.git
cd napisfy
```

2. Crie um ambiente virtual:
```bash
python -m venv virtual
```

3. Ative o ambiente virtual:
```bash
# Windows
virtual\Scripts\activate

# Linux/Mac
source virtual/bin/activate
```

4. Instale as dependências:
```bash
pip install -r requirements.txt
```

5. Execute as migrações:
```bash
python manage.py migrate
```

6. Crie um superusuário:
```bash
python manage.py createsuperuser
```

7. Execute o servidor:
```bash
python manage.py runserver
```

8. Acesse a aplicação em `http://localhost:8000`

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
