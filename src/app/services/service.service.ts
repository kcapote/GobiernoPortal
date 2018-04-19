import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Util } from '../util/util';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServiceService {

  constructor(public http: HttpClient) { }


  public getObjects(url: string): Observable<any> {
        return this.http.get(url);                
  }

  public getObject(url: string, id: string): Observable<any> {

    return null;
  }

  public saveObject(url: String, obj: any): Observable<any> {

    let body = JSON.stringify(obj);
    let headers: HttpHeaders = new  HttpHeaders();
    headers.append('Content-Type', 'aplication/json');
      
    return this.http.post(Util.URL_CATEGORIAS, body, {headers});
    

  }


}
