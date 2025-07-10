from django.contrib import admin
from napisfy.models import Cancoes, Album, Artista, Genero, PlaylistPubli

# Register your models here.

@admin.register(Genero)
class GeneroAdmin(admin.ModelAdmin):
    list_display = ['nome']
    search_fields = ['nome']


@admin.register(Artista)
class ArtistaAdmin(admin.ModelAdmin):
    list_display = ['nome', 'total_musicas_artista', 'total_albuns_artista']
    search_fields = ['nome']
    list_filter = ['nome']


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'artista', 'genero', 'ano_lancamento', 'duracao_total']
    search_fields = ['titulo', 'artista__nome']
    list_filter = ['genero', 'ano_lancamento', 'artista']
    autocomplete_fields = ['artista', 'genero']


@admin.register(Cancoes)
class CancoesAdmin(admin.ModelAdmin):
    list_display = ['nome', 'artista', 'album', 'get_genero', 'duracao']
    search_fields = ['nome', 'artista__nome', 'album__titulo']
    list_filter = ['artista', 'album', 'album__genero']
    autocomplete_fields = ['artista', 'album']
    
    def get_genero(self, obj):
        """Retorna o gênero do álbum"""
        return obj.genero.nome if obj.genero else '-'
    get_genero.short_description = 'Gênero'
    get_genero.admin_order_field = 'album__genero'


@admin.register(PlaylistPubli)
class PlaylistPubliAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'dono_usuario', 'duracao_total', 'data_criacao']
    search_fields = ['titulo', 'dono_usuario__nome']
    list_filter = ['data_criacao', 'dono_usuario']
    filter_horizontal = ['musicas']