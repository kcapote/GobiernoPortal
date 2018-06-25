import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Util } from '../util/util';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ServiceService {

  constructor(public http: HttpClient) { }

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
    let urlTemp = '';
    if(url!=Util.URL_SECURITY+'/login'){
      let user = JSON.parse(localStorage.getItem('user'));
      urlTemp = `${url}?token=${ user.token }`;
    }else{
      localStorage.setItem('user','');
      urlTemp = `${url}`;
    }
    
    return this.http.post(urlTemp, obj, {headers});    

  }

  public updateObject(url: string, obj: any): Observable<any> {
    
    let user = JSON.parse(localStorage.getItem('user'));
    let urlTemp = `${ url }/${ obj['_id'] }?token=${ user.token }`;
    let headers: HttpHeaders = new  HttpHeaders();
    headers.append('Content-Type', 'aplication/json');
    
    return this.http.put(urlTemp, obj, {headers});    

  }
  
  public deleteObject(url:string, id:string ): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    let urlTemp = `${ url }/${ id }?token=${ user.token }`;
    
    return this.http.delete(urlTemp);
    
  }


  public refresToken(res){
    localStorage.setItem('user',JSON.stringify(res.user));
  }


  public getObjectsByFather(url: string, father: string , pagination: number = 0 ,id: string ): Observable<any> {
    let urlTemp;    
    urlTemp = `${ url }/${ father }/${ id }?pagination=${ pagination }`;

    return this.http.get( urlTemp );                
  }



}
