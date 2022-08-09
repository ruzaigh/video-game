import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";
import {environment as env } from "../../environments/environment";
import {APIResponse, Game} from "../models";
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>>{
    let params = new HttpParams().set('ordering', ordering);

    if(search){
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }
    return  this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params
    });
  }

  getGameDetails(id: string): Observable<Game>{
      const gameInfoResquest = this.http.get(`${env.BASE_URL}/games/${id}`);
      const gameTrailerRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
      const gameScreenShotRequest = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);

      return forkJoin({
        gameInfoResquest,
        gameTrailerRequest,
        gameScreenShotRequest
      }).pipe(
        map((resp: any) =>{
          return{
            ...resp['gameInfoResquest'],
            screenshot: resp['gameScreenShotRequest']?.results,
            trailers: resp['gameTrailerRequest']?.results
          }
        })
      )
  }


}
