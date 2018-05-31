import { Component, OnInit } from '@angular/core';
import { Norma } from '../../interfaces/norma.interface';
import { Util } from '../../util/util';
import { ServiceService } from '../../services/service.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';

@Component({
  selector: 'app-normas',
  templateUrl: './normas.component.html',
  styles: []
})
export class NormasComponent implements OnInit {
  
    title:string = "Normas";
    collection: Norma[];
    term: string;
    totalRecords: number; 

  constructor(private _s: ServiceService,
              private _msg: MsgBoxService) {
    this.collection = []; 
    _s.getObjects(Util.URL_NORMA).subscribe(
        res =>{
          console.log(res)

          this.collection = res.rules;                  
        }

    ); 

  }

  delete(idx: number) {
    this._msg.show(Util.DELETE_TITLE,Util.MSJ_DELETE_QUESTION,Util.ACTION_DELETE).subscribe(
         res => {
          if(res.response == Util.OK_RESPONSE) {
            this._s.deleteObject(Util.URL_NORMA ,this.collection[idx]._id).subscribe(
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

  search() {
    if(this.term.length>0){
       this._s.getObjects(Util.URL_NORMA,0 ,this.term ).subscribe(
           res => {
               this.collection = res.rules;
               this.totalRecords = res.totalRecords;
           }   
       )       
   }else {
       this._s.getObjects(Util.URL_NORMA).subscribe(
           res => {
              this.collection = res.rules;
              this.totalRecords = res.totalRecords;
           }
       );
   } 
   } 

}
