# Napisfy 🎵

> **Nota:** Este arquivo README foi elaborado com assistência de IA para facilitar a avaliação e compreensão do projeto.

**Projeto Acadêmico - Programação Web Back-end**  
**Desenvolvido por:** Yuri Batista de Almeida
**Disciplina:** *********0023
**Disciplina:** Programação Web Back-End
**Curso:** Tecnologia em Sistemas para Internet
**Instituição:** IFMT (Instituto Federal de Mato Grosso)

## Descrição

Napisfy é uma aplicação web de streaming de música desenvolvida em Django como projeto final da disciplina de Programação Web Back-end. A plataforma simula um serviço de streaming musical, demonstrando conceitos fundamentais de desenvolvimento web com Django.

### Funcionalidades Implementadas

- **Exploração de Conteúdo**: Navegação por músicas, álbuns e artistas
- **Reprodutor de Música**: Interface para reprodução de arquivos de áudio
- **Painel Administrativo**: Interface administrativa para gestão de conteúdo

## Conceitos de Programação Web Back-end Aplicados

### 1. **Arquitetura MTV (Model-Template-View)**
- **Models**: Definição de entidades de negócio (Artista, Album, Cancoes, Genero, Conta, PlaylistPubli)
- **Templates**: Interface do usuário com sistema de herança de templates
- **Views**: Lógica de negócio e controle de fluxo da aplicação

### 2. **Modelagem de Banco de Dados**
- Relacionamentos **One-to-Many**: Artista → Albums, Album → Cancoes
- Relacionamentos **Many-to-Many**: Playlist → Cancoes
- **Foreign Keys** com `related_name` para navegação reversa
- Métodos personalizados nos modelos para cálculos automáticos

### 3. **Sistema de Autenticação Customizado**
- Extensão do `AbstractBaseUser` para modelo de usuário personalizado
- `BaseUserManager` customizado para criação de usuários
- Campos específicos do domínio da aplicação

### 4. **Funcionalidades Avançadas**
- **Upload de Arquivos**: Gerenciamento de capas de álbuns e arquivos de áudio
- **Métodos de Cálculo**: Duração total de albums e playlists
- **Signals implícitos**: Atualização automática de contadores via método `save()`

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
└── player_musica/        # Aplicação do player (Incompleto)
```

## Modelos de Dados (Entidades)

### Relacionamentos e Estrutura

```python
# Modelo principal de gênero musical
class Genero(models.Model):
    nome = models.TextField()
    total_musicas = models.IntegerField(default=0)
    
# Modelo de artista com informações detalhadas
class Artista(models.Model):
    nome = models.TextField()
    biografia = models.TextField(blank=True, null=True)
    foto = models.ImageField(blank=True, null=True)
    slug = models.SlugField(unique=True)
    
# Modelo de álbum com relacionamentos
class Album(models.Model):
    titulo = models.TextField()
    genero = models.ForeignKey(Genero, related_name='albuns')
    artista = models.ForeignKey(Artista, related_name='albuns')
    ano_lancamento = models.IntegerField()
    capa = models.ImageField()
    
# Modelo de música individual
class Cancoes(models.Model):
    nome = models.TextField()
    artista = models.ForeignKey(Artista, related_name='cancoes')
    album = models.ForeignKey(Album, related_name='cancoes')
    duracao = models.CharField(max_length=20)
    audio_file = models.FileField(blank=True, null=True)

# Sistema de autenticação customizado
class Conta(AbstractBaseUser):
    nome = models.CharField(max_length=50)
    nomeUsuario = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    
# Playlists públicas com relacionamento many-to-many
class PlaylistPubli(models.Model):
    titulo = models.CharField(max_length=50)
    dono_usuario = models.ForeignKey(Conta, related_name='playlists')
    musicas = models.ManyToManyField(Cancoes, related_name='playlists')
```

## Funcionalidades Demonstradas

### 1. **CRUD Completo**
- **Create**: Criação de artistas, álbuns, músicas e playlists
- **Read**: Listagem e detalhamento de conteúdo
- **Update**: Edição de informações
- **Delete**: Remoção de registros

### 2. **Validações e Integridade**
- Validações de campos obrigatórios
- Integridade referencial entre modelos
- Atualização automática de contadores

### 3. **Interface Administrativa - Django**
- Painel admin customizado do Django
- Gestão de mídia (upload de arquivos)
- Controle de usuários e permissões

## Como Executar o Projeto (Para Avaliação)

### Pré-requisitos
- Python 3.8+ instalado
- pip (gerenciador de pacotes Python)

### Instalação de Dependências no Linux

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
sudo apt install python3-dev libjpeg-dev zlib1g-dev  # Para Pillow
```

**CentOS/RHEL/Fedora:**
```bash
sudo yum install python3 python3-pip python3-venv
sudo yum install python3-devel libjpeg-devel zlib-devel  # Para Pillow
```

### Passos para Execução

1. **Clone o repositório:**
```bash
git clone https://github.com/Yuri-Shift/Napisfy.git
cd napisfy
```

2. **Crie e ative um ambiente virtual:**
```bash
# Linux/Mac
python3 -m venv virtual
source virtual/bin/activate

# Windows (caso necessário)
python -m venv virtual
virtual\Scripts\activate
```

3. **Instale as dependências:**
```bash
pip install -r requirements.txt
```

4. **Execute as migrações do banco de dados:**
```bash
python manage.py migrate
```

5. **Carregue dados iniciais (opcional):**
```bash
python manage.py loaddata initial_data.json  # se disponível
```

6. **Crie um superusuário para acessar o admin:**
```bash
python manage.py createsuperuser
```

7. **Execute o servidor de desenvolvimento:**
```bash
python manage.py runserver
```

8. **Acesse a aplicação:**
   - **Aplicação principal**: http://localhost:8000
   - **Painel administrativo**: http://localhost:8000/admin

### Resolução de Problemas Comuns no Linux

**1. Erro com Pillow (biblioteca de imagens):**
```bash
# Se houver erro na instalação do Pillow
sudo apt install python3-dev libjpeg-dev zlib1g-dev libfreetype6-dev
pip install --upgrade pip
pip install Pillow
```

**2. Permissões de arquivo:**
```bash
# Garanta que o diretório media/ tenha permissões adequadas
chmod 755 media/
chmod 644 media/*
```

**3. Erro de comando python vs python3:**
```bash
# Se o comando 'python' não funcionar, use sempre 'python3'
python3 manage.py migrate
python3 manage.py runserver
```

**4. Problemas com ambiente virtual:**
```bash
# Se houver problemas com o venv, instale o pacote python3-venv
sudo apt install python3-venv
```

**5. Configurações específicas do Django para Linux:**
```bash
# Certifique-se de que as configurações de mídia estão corretas
# O Django usa Path() que é compatível com Linux
# Não são necessárias alterações adicionais no settings.py
```

**6. Verificação de funcionamento:**
```bash
# Teste se o Python está funcionando corretamente
python3 --version
pip3 --version

# Teste se o Django foi instalado corretamente
python3 -c "import django; print(django.get_version())"
```

## Estrutura de Navegação

- **Home**: Página inicial com destaques
- **Artistas**: Listagem e detalhes dos artistas
- **Álbuns**: Catálogo de álbuns musicais
- **Playlists**: Gerenciamento de playlists
- **Admin**: Interface administrativa (requer login)

## Dados de Teste

O projeto inclui alguns dados de exemplo na pasta `media/` para demonstração:
- Capas de álbuns de artistas conhecidos
- Algumas faixas de áudio para teste do player
- Imagens de perfil de artistas

## Considerações Técnicas

### Segurança - DJANGO
- Senhas hasheadas com algoritmos do Django
- Validação de dados de entrada
- Proteção contra SQL Injection (ORM do Django)

### Performance
- Lazy loading de relacionamentos
- Otimização de consultas com `select_related` e `prefetch_related`
- Paginação para grandes conjuntos de dados

### Escalabilidade
- Separação de responsabilidades (MVT)
- Código modular e reutilizável
- Configurações flexíveis para diferentes ambientes

---

**Desenvolvido por:** Yuri Batista de Almeida
**Disciplina:** Programação Web Back-end  
**Período:** 3º Semestre - 2025  
**Instituição:** IFMT - Instituto Federal de Mato Grosso - Cel. Octayde Jorge da Silva
