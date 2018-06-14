import { Component, OnInit } from '@angular/core';
import { Manual } from '../../interfaces/manual.interface';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import 'rxjs/Rx' ;

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
  

  constructor(private _s: ServiceService,
              private _msg: MsgBoxService) {
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

  //  let file: File = new File(this.collection[idx].file.data ,'holamundo');
  //  let blob = new Blob([new Uint8Array(this.collection[idx].file.data)]);
  //  let url= window.URL.createObjectURL(blob);
   
   
  //  window.open(url);

   
   //var blob = new Blob([data], { type: 'text/csv' });


   var blob = new Blob([this.collection[idx].file.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
   var file = new File([this.collection[idx].file.data],'hola',{
     type:  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
   });
   

   var url= window.URL.createObjectURL(file);
   console.log(url);
   
   window.open(url);
   
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
