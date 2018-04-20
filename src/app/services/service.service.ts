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

  public saveObject(url: string, obj: any): Observable<any> {
    
    let headers: HttpHeaders = new  HttpHeaders();
    headers.append('Content-Type', 'aplication/json');
    
 
    return this.http.post(url, obj, {headers});
    

  }


}
