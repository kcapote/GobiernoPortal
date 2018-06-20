import { Component, OnInit } from '@angular/core';
import { Manual } from '../../interfaces/manual.interface';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import 'rxjs/Rx' ;
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-manuales',
  templateUrl: './manuales.component.html',
  styles: []
})
export class ManualesComponent implements OnInit {

  title: string = "Manuales"; 
  collection: Manual[];
  term: string;
  totalRecords: number; 
  reg: string;

  constructor(private _s: ServiceService,
              private _msg: MsgBoxService,
              private sanitizer: DomSanitizer
            ) {
    this.collection = []; 
    _s.getObjects(Util.URL_MANUAL).subscribe(
        res =>{

          this.collection = res.manuals;
          console.log(this.collection);
          
        }

    ); 

  }

  delete(idx: number) {
    this._msg.show(Util.DELETE_TITLE,Util.MSJ_DELETE_QUESTION,Util.ACTION_DELETE).subscribe(
         res => {
          if(res.response == Util.OK_RESPONSE) {
            this._s.deleteObject(Util.URL_MANUAL,this.collection[idx]._id).subscribe(
              res => {
                this.collection.splice(idx,1); 
              }
            )             
          }
        }
      )
  }

  ngOnInit() {
  }

  download(idx: number) {
    let id = this.collection[idx]._id;

    let url =`${ Util.URL_MANUAL }/file/${ id }`;
    
    this._s.getObjectAny(url).subscribe(
      res => {
        let str: string =  res.manual[0].file.doc+'';
          console.log(str);
        window.location.href = str;
      }, err => {
        this._msg.show(Util.ERROR, "Error al intentar recuperar el documento",Util.ACTION_INFO).subscribe() ;
      }
    );
 
  } 
  
  search() {
    if(this.term.length>0){
       this._s.getObjects(Util.URL_MANUAL,0 ,this.term ).subscribe(
           res => {
               this.collection = res.manuals;
               this.totalRecords = res.totalRecords;
           }   
       )       
   }else{
       this._s.getObjects(Util.URL_MANUAL).subscribe(
           res => {
              this.collection = res.manuals;
              this.totalRecords = res.totalRecords;
           }
       );
   } 
   } 


   
}
