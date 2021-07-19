import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, DownsizedSmall, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = "VgDW58UXsrl8iRlvUE9xLksWsKiv8geU";
  private servicioUrl: string = "https://api.giphy.com/v1/gifs";
  private _historial: string[] = [];

  //TODO: Cambiar any por su tipo
  public resultados: Gif[] = [];


  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

      this.resultados = JSON.parse(localStorage.getItem('resultado')!) || [];
    }

  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const paramentros_web = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params: paramentros_web })
      .subscribe((resp: any) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.resultados));
      });

  }

}
