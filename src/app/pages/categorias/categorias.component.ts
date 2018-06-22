import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';
import { Categories } from '../../interfaces/categories.interface';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})

export class CategoriasComponent implements OnInit {
  title: string = "Categorías";  
  collection: Categories[] = [];
  term: string;
  totalRecords: number;  
  model: string = Util.URL_CATEGORIAS;

  constructor(public _s: ServiceService,
              private _msg: MsgBoxService ) { 
      _s.getObjects(Util.URL_CATEGORIAS).subscribe(
        res => {
          
          this.collection = res.categories;
          this.totalRecords = res.totalRecords;
           console.log(res);
           
        },
         (error) => {
           this._msg.show(Util.ERROR, "Ha ocurrido un error, intente más tarde por favor",Util.ACTION_INFO)
            .toPromise();
          console.log('el error es',error);
          
        } 

      )
        
  }

  ngOnInit() {
    
  }  

  search() {
    if(this.term.length>0){
       this._s.getObjects(Util.URL_CATEGORIAS,0 ,this.term ).subscribe(
           res => {
               this.collection = res.categories;
               this.totalRecords = res.totalRecords;
           }   
       )       
   }else{
       this._s.getObjects(Util.URL_CATEGORIAS).subscribe(
           res => {
              this.collection = res.categories;
              this.totalRecords = res.totalRecords;
           }
       );
   } 
   } 
  



  delete(idx: number) {
      this._msg.show(Util.DELETE_TITLE,Util.MSJ_DELETE_QUESTION,Util.ACTION_DELETE).subscribe(
           res => {
            if(res.response == Util.OK_RESPONSE) {
              this._s.deleteObject(Util.URL_CATEGORIAS,this.collection[idx]._id).subscribe(
                res => {
                  this.collection.splice(idx,1); 
                }
              )             
            }
          }
        )
  }

}
