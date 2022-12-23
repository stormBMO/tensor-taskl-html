import { TTrack, TTag, TSearchAlbum, TSearchArtist, TSearchTrack, TSearchTrackInfo, TSearchArtistInfo } from './../types/types';
import { API_KEY, API_URL } from "../constants"
import { TArtist } from "../types/types";
import { setCleanStringName } from '../utils';

class API {

  private async doGet<TResponseData = any>(query: string, keys?: string[]) {
    try {
      const response = await fetch(`${API_URL}?${query.replaceAll(' ', '+')}&page=1&limit=12&api_key=${API_KEY}&format=json`)
      let data = await response.json();
      if (data.error) {
        throw data.error;
      }
      keys?.forEach(key => {
        if (data[key]) {
          data = data[key]
        }
      })
      return data as TResponseData;
    } catch (unknownError) {
      throw unknownError;
    }
  }

  public fetchHotArtists = () => this.doGet<TArtist[]>('method=chart.gettopartists', ['artists', 'artist'])
  public fetchPopularTracks = () => this.doGet<TTrack[]>('method=chart.gettoptracks', ['tracks', 'track'])
  public fetchTagsByArtistName = (name: string) => this.doGet<TTag[]>(`method=artist.gettoptags&artist=${setCleanStringName(name)}`, ['toptags', 'tag'])
  public fetchTagsByTrack = (artist: string, name: string, mbidtrack: string = '') => this.doGet<TTag[]>(`method=track.gettoptags&artist=${setCleanStringName(artist)}&track=${setCleanStringName(name)}&mbid=${mbidtrack}`, ['toptags', 'tag'])

  public fetchTrackInfoByInfo = (artist: string, track: string) => this.doGet<TSearchTrackInfo>(`method=track.getInfo&artist=${setCleanStringName(artist)}&track=${setCleanStringName(track)}`, ['track'])
  public fetchArtistInfoByInfo = (artist: string) => this.doGet<TSearchArtistInfo>(`method=artist.getinfo&artist=${setCleanStringName(artist)}`, ['artist'])
  public fetchSearchArtists = (searchString: string) => this.doGet<TSearchArtist[]>(`method=artist.search&limit=8&artist=${setCleanStringName(searchString)}`, ['results', 'artistmatches', 'artist'])
  public fetchSearchTracks = (searchString: string) => this.doGet<TSearchTrack[]>(`method=track.search&limit=12&track=${setCleanStringName(searchString)}`, ['results', 'trackmatches', 'track'])
  public fetchSearchAlbums = (searchString: string) => this.doGet<TSearchAlbum[]>(`method=album.search&limit=8&album=${setCleanStringName(searchString)}`, ['results', 'albummatches', 'album'])

}

export const api = new API()