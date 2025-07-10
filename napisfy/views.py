from django.shortcuts import render
from django.http import JsonResponse
from django.core.paginator import Paginator
from .models import Cancoes, Album, Artista, Genero
import json


def visualizarHome(request):
    cancoes_recentes = Cancoes.objects.all().order_by('-id')[:6] 
    albuns_destaque = Album.objects.all().order_by('-id')[:6]
    artistas_populares = Artista.objects.all().order_by('-total_musicas_artista')[:6]
    
    context = {
        'cancoes_recentes': cancoes_recentes,
        'albuns_destaque': albuns_destaque,
        'artistas_populares': artistas_populares,
    }
    return render(request, 'home.html', context)


def visualizarAlbum(request):
    albuns = Album.objects.all().order_by('-id')
    paginator = Paginator(albuns, 12)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'albuns': page_obj.object_list,
    }
    return render(request, 'music_album.html', context)


def visualizarPlaylist(request):
    return render(request, 'music_playlist.html')


def realizarBusca(request):
    query = request.GET.get('q', '')
    cancoes = []
    albuns = []
    artistas = []
    
    if query:
        cancoes = Cancoes.objects.filter(nome__icontains=query)[:10]
        albuns = Album.objects.filter(titulo__icontains=query)[:10]
        artistas = Artista.objects.filter(nome__icontains=query)[:10]
    
    context = {
        'query': query,
        'cancoes': cancoes,
        'albuns': albuns,
        'artistas': artistas,
    }
    return render(request, 'music_busca.html', context)


# API
def api_cancoes(request):
    cancoes = Cancoes.objects.select_related('artista', 'album', 'album__genero').all()
    
    data = []
    for cancao in cancoes:
        audio_url = ''
        if cancao.audio_file:
            audio_url = request.build_absolute_uri(cancao.audio_file.url)
        elif cancao.audio_link:
            audio_url = cancao.audio_link
        
        # Construir URL da capa
        cover_url = ''
        if cancao.album and cancao.album.capa:
            cover_url = request.build_absolute_uri(cancao.album.capa.url)

        
        # Gênero através do álbum
        genero_nome = cancao.genero.nome if cancao.genero else 'Desconhecido'
        
        data.append({
            'id': cancao.id,
            'name': cancao.nome,
            'artist': cancao.artista.nome,
            'album': cancao.album.titulo,
            'genre': genero_nome,
            'duration': cancao.duracao,
            'url': audio_url,
            'cover': cover_url,
            'format': ['mp3', 'wav', 'ogg'] 
        })
    
    return JsonResponse({'tracks': data})


def api_cancao_detalhes(request, cancao_id):
    try:
        cancao = Cancoes.objects.select_related('artista', 'album', 'album__genero').get(id=cancao_id)
        
        audio_url = ''
        if cancao.audio_file:
            audio_url = request.build_absolute_uri(cancao.audio_file.url)
        elif cancao.audio_link:
            audio_url = cancao.audio_link
        

        cover_url = ''
        if cancao.album and cancao.album.capa:
            cover_url = request.build_absolute_uri(cancao.album.capa.url)

        
        genero_nome = cancao.genero.nome if cancao.genero else 'Desconhecido'
        
        data = {
            'id': cancao.id,
            'name': cancao.nome,
            'artist': cancao.artista.nome,
            'album': cancao.album.titulo,
            'genre': genero_nome,
            'duration': cancao.duracao,
            'url': audio_url,
            'cover': cover_url,
            'format': ['mp3', 'wav', 'ogg']
        }
        
        return JsonResponse(data)
        
    except Cancoes.DoesNotExist:
        return JsonResponse({'error': 'Música não encontrada'}, status=404)


def api_album_cancoes(request, album_id):
    try:
        album = Album.objects.get(id=album_id)
        cancoes = album.cancoes.select_related('artista', 'genero').all()
        
        data = []
        for cancao in cancoes:
            # Construir URL do arquivo de áudio
            audio_url = ''
            if cancao.audio_file:
                audio_url = request.build_absolute_uri(cancao.audio_file.url)
            elif cancao.audio_link:
                audio_url = cancao.audio_link
            
            # Usar capa do álbum
            cover_url = ''
            if album.capa:
                cover_url = request.build_absolute_uri(album.capa.url)
            else:
                cover_url = 'https://th.bing.com/th/id/OIP.zhyyGzXVOS5eSy08FVpupQAAAA?w=210&h=211&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' + album.titulo[:1]
            
            data.append({
                'id': cancao.id,
                'name': cancao.nome,
                'artist': cancao.artista.nome,
                'album': album.titulo,
                'genre': cancao.genero.nome,
                'duration': cancao.duracao,
                'url': audio_url,
                'cover': cover_url,
                'format': ['mp3', 'wav', 'ogg']
            })
        
        return JsonResponse({
            'album': {
                'id': album.id,
                'title': album.titulo,
                'artist': album.artista.nome,
                'year': album.ano_lancamento,
                'cover': cover_url
            },
            'tracks': data
        })
        
    except Album.DoesNotExist:
        return JsonResponse({'error': 'Álbum não encontrado'}, status=404)


def test_player(request):
    """View para testar o player"""
    return render(request, 'test_player.html')



