import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'X-RapidAPI-Key': '31d7d43273mshc944dfc3bbc53ffp16897fjsn149f8bbcf30d',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      },
      setParams:{
        key: '3db584c5bb2e47429e881ef9407cbf63'
      }
    });
    return next.handle(req);
  }
}
