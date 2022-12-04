import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Welcome, Gif } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey      : string = 'T8DjitUCcjbDhVEMqXF1ha9yMVlygrPK';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial  : string[] = [];

  //TODO: cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor (private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];


    // if ( localStorage.getItem('historial')){
      // this._historial = JSON.parse( localStorage.getItem('historial')!);
    //}
  }


  buscarGifs(query: string = ''){
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,8);

      localStorage.setItem('historial', JSON.stringify(this._historial));


    }

    const params = new HttpParams()
    .set('api_key', this.apiKey )
    .set('limit', '8' )
    .set('q', query );

    console.log(params.toString());


this.http.get<Welcome>(`${ this.servicioUrl }/search`, { params })
.subscribe( (resp) =>{
  console.log(resp.data);
  this.resultados = resp.data;
  localStorage.setItem('resultados', JSON.stringify(this.resultados));
  });

  }
}
