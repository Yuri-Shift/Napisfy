from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.
class Genero(models.Model):
    nome = models.TextField()
    total_musicas = models.IntegerField(default=0)

    def __str__(self):
        return self.nome

    def atualizar_total_musicas(self):
        """Atualiza o total de músicas do gênero contando através dos álbuns"""
        total = 0
        for album in self.albuns.all():
            total += album.cancoes.count()
        self.total_musicas = total
        self.save()


class Artista(models.Model):
    nome = models.TextField()
    biografia = models.TextField(blank=True, null=True)
    total_musicas_artista = models.IntegerField(default=0)
    total_albuns_artista = models.IntegerField(default=0)
    foto = models.ImageField(blank=True, null=True)

    #Atributo auxilidor na criação da URL para acessar o produto
    slug = models.SlugField(max_length=210, unique=True, blank=True, null=True)

    def __str__(self):
        return self.nome
    
    

    def atualizar_totais(self):
        """Atualiza o total de músicas e álbuns do artista"""
        self.total_musicas_artista = self.cancoes.count()
        self.total_albuns_artista = self.albuns.count()
        self.save()




class Album(models.Model):
    titulo = models.TextField()
    genero = models.ForeignKey(Genero, on_delete=models.CASCADE, related_name='albuns')
    artista = models.ForeignKey(Artista, on_delete=models.CASCADE, related_name='albuns')
    ano_lancamento = models.IntegerField()
    duracao_total = models.CharField(max_length=20, blank=True, null=True)
    capa = models.ImageField()
    
    #Atributo auxilidor na criação da URL para acessar o produto
    slug = models.SlugField(max_length=210, unique=True, blank=True, null=True)

    paginate_by = 2

    def __str__(self):
        return self.titulo

    def calcular_duracao_total(self):
        """Calcula a duração total do álbum somando todas as músicas"""
        musicas = self.cancoes.all()
        total_segundos = 0
        
        for musica in musicas:
            # Converte duração "mm:ss" para segundos
            if musica.duracao:
                try:
                    partes = musica.duracao.split(':')
                    if len(partes) == 2:
                        minutos, segundos = map(int, partes)
                        total_segundos += minutos * 60 + segundos
                except ValueError:
                    pass
        
        # Converte de volta para formato "mm:ss"
        if total_segundos > 0:
            minutos = total_segundos // 60
            segundos = total_segundos % 60
            self.duracao_total = f"{minutos}:{segundos:02d}"
        else:
            self.duracao_total = "0:00"
        
        self.save()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Atualiza totais do artista e gênero
        self.artista.atualizar_totais()
        self.genero.atualizar_total_musicas()



class Cancoes(models.Model):
    nome = models.TextField()
    artista = models.ForeignKey(Artista, on_delete=models.CASCADE, related_name='cancoes')
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='cancoes')
    duracao = models.CharField(max_length=20)
    audio_file = models.FileField(blank=True, null=True)

    def __str__(self):
        return self.nome

    @property
    def capa(self):
        return self.album.capa if self.album else None
    
    @property
    def genero(self):
        return self.album.genero if self.album else None

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Atualiza duração total do álbum
        self.album.calcular_duracao_total()
        # Atualiza totais do artista e gênero
        self.artista.atualizar_totais()
        # Atualiza total de músicas do gênero através do álbum
        if self.album and self.album.genero:
            self.album.genero.atualizar_total_musicas()



class MeuGerenciadorDeConta(BaseUserManager):
    def criar_usuario(self, nome, nomeUsuario, email, senha=None):
        if not email:
            raise ValueError('Para criar uma conta informe um endereço de email')
        
        if not nomeUsuario:
            raise ValueError('Nome de usuário é obrigatório')
        
        usuario = self.model(
            email=self.normalize_email(email),
            nomeUsuario=nomeUsuario,
            nome=nome,
        )

        usuario.set_password(senha)
        usuario.save(using=self._db)
        return usuario


class Conta(AbstractBaseUser):
    """
    Classe que representa a conta do usuário.
    """
    nome = models.CharField(max_length=50)
    nomeUsuario = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=250, unique=True)
    # campos requeridos
    data_criacao = models.DateTimeField(auto_now_add=True)
    ultimo_login = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superadmin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome', 'nomeUsuario', 'email']

    objects = MeuGerenciadorDeConta()

    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True
    
    def __str__(self):
        return self.nome



class PlaylistPubli(models.Model):
    """
    Classe que representa uma playlist pública.
    """
    titulo = models.CharField(max_length=50)
    # Somar todas as músicas dessa playlist e colocar no duracao_total
    duracao_total = models.CharField(max_length=20, blank=True, null=True)
    # capa da playlist; se não tiver uma capa, coloque uma padrão
    capa = models.ImageField(blank=True, null=True)  # Capa opcional com padrão
    
    dono_usuario = models.ForeignKey(Conta, on_delete=models.CASCADE, related_name='playlists')
    musicas = models.ManyToManyField(Cancoes, related_name='playlists', blank=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo

    def calcular_duracao_total(self):
        """Calcula a duração total da playlist somando todas as músicas"""
        total_segundos = 0
        
        for musica in self.musicas.all():
            if musica.duracao:
                try:
                    partes = musica.duracao.split(':')
                    if len(partes) == 2:
                        minutos, segundos = map(int, partes)
                        total_segundos += minutos * 60 + segundos
                except ValueError:
                    pass
        
        # Converte de volta para formato "mm:ss"
        if total_segundos > 0:
            minutos = total_segundos // 60
            segundos = total_segundos % 60
            self.duracao_total = f"{minutos}:{segundos:02d}"
        else:
            self.duracao_total = "0:00"
        
        self.save()