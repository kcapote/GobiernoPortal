import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Util } from '../util/util';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ServiceService {

  constructor(public http: HttpClient) { }


  /*public getObjects(url: string): Observable<any> {
 
        return this.http.get(url);
  } */

  public getObjects(url: string, pagination: number = 0 ,term?: string): Observable<any> {
    let urlTemp;
     
    if(term) {
      urlTemp = `${url}/search/${ term }/?pagination=${ pagination }`;
    } else {
      urlTemp = `${url}/?pagination=${ pagination }`;
    }
    
    return this.http.get( urlTemp );                
  }


  public getObject(url: string, id: string): Observable<any> {
     let urlTemp = `${ url }/${ id }`;   
    
    return  this.http.get(urlTemp);
  }

  public getObjectAny(url: string): Observable<any> {
    let urlTemp = `${ url }`;   
   
   return  this.http.get(urlTemp);
 }

  public saveObject(url: string, obj: any): Observable<any> {
    
    let headers: HttpHeaders = new  HttpHeaders();
    headers.append('Content-Type', 'aplication/json');
    
    return this.http.post(url, obj, {headers});    

  }

  public updateObject(url: string, obj: any): Observable<any> {
    let urlTemp = `${ url }/${ obj['_id'] }`;
    let headers: HttpHeaders = new  HttpHeaders();
    headers.append('Content-Type', 'aplication/json');
    
    return this.http.put(urlTemp, obj, {headers});    

  }
  
  public deleteObject(url:string, id:string ): Observable<any> {

    let urlTemp = `${ url }/${ id }`;    
    return this.http.delete(urlTemp);
    
  }

  
  public getObjectsByFather(url: string, father: string , pagination: number = 0 ,id: string ): Observable<any> {
    let urlTemp;    
    //let user = JSON.parse(localStorage.getItem('user'));
    urlTemp = `${ url }/${ father }/${ id }?pagination=${ pagination }`;

    return this.http.get( urlTemp );                
  }


}
