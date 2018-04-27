import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Util } from '../util/util';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ServiceService {

  constructor(public http: HttpClient) { }


  public getObjects(url: string): Observable<any> {
        console.log(url);
        
        return this.http.get(url);
  }

  public getObject(url: string, id: string): Observable<any> {
     let urlTemp = `${ url }/${ id }`;   
    
    return this.http.get(urlTemp);
  }

  public saveObject(url: string, obj: any): Observable<any> {
    
    let headers: HttpHeaders = new  HttpHeaders();
    headers.append('Content-Type', 'aplication/json');
    
 
    return this.http.post(url, obj, {headers});
    

  }


}
