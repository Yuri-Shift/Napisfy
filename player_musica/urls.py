from django.urls import path

from player_musica import views
from napisfy import views

urlpatterns = [
    path('', views.visualizarHome, name='home'),
    path('<slug:Album_slug>', views.visualizarAlbum, name='album_page'),
    path('<slug:Artista_slug>', views.visualizarArtista, name='artista_page')
]
