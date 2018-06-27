import { Component, OnInit } from '@angular/core';
import { Norma } from '../../interfaces/norma.interface';
import { Util } from '../../util/util';
import { ServiceService } from '../../services/service.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';

@Component({
  selector: 'app-normasHist',
  templateUrl: './normasHist.component.html',
  styles: []
})
export class NormasHistComponent implements OnInit {
  
    title:string = "Documentos y Normas";
    collection: Norma[];
    term: string;
    totalRecords: number; 
    model = Util.URL_NORMA_HIST;
    userTemp: any;

  constructor(private _s: ServiceService,
              private _msg: MsgBoxService) {

                if(localStorage.getItem('user') && localStorage.getItem('user').length > 4){
                  let user = localStorage.getItem('user');
                  this.userTemp = JSON.parse(user);
                } else{
                  this.userTemp =  {
                    token: "", 
                    role: "",
                  };
                }      

    this.collection = []; 
    _s.getObjects(Util.URL_NORMA_HIST).subscribe(
        res =>{
           this.collection = res.rules;
          this.totalRecords = res.totalRecords;                  
        }

    ); 

  }

  delete(idx: number) {
    this._msg.show(Util.DELETE_TITLE,Util.MSJ_DELETE_QUESTION,Util.ACTION_DELETE).subscribe(
         res => {
          if(res.response == Util.OK_RESPONSE) {
            this._s.deleteObject(Util.URL_NORMA_HIST ,this.collection[idx]._id).subscribe(
              res => {
                this._s.refresToken(res);
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

    let url =`${ Util.URL_NORMA_HIST }/file/${ id }`;
    
    this._s.getObjectAny(url).subscribe(
      res => {
        console.log(res);
        
        let str: string =  res.rule[0].file.doc+'';
        str = str.split(',')[1];
        let binary = atob(str.replace(/\s/g, ''));
        let len = binary.length;
        let buffer = new ArrayBuffer(len);
        let view = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }          
        let currentBlob = new File([view],res.rule[0].file.name, {type:  res.rule[0].file.mimeType });
        let url = URL.createObjectURL(currentBlob);

        
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download =  res.rule[0].file.name;
        a.click();
        window.URL.revokeObjectURL(url) 
        document.removeChild(a);  
          
      }, err => {
        this._msg.show(Util.ERROR, "Error al intentar recuperar el documento",Util.ACTION_INFO).subscribe() ;
      }
    );
 
  } 

  search() {
    if(this.term.length>0){
       this._s.getObjects(Util.URL_NORMA_HIST,0 ,this.term ).subscribe(
           res => {
               this.collection = res.rules;
               this.totalRecords = res.totalRecords;
           }   
       )       
   }else {
       this._s.getObjects(Util.URL_NORMA_HIST).subscribe(
           res => {
              this.collection = res.rules;
              this.totalRecords = res.totalRecords;
           }
       );
   } 
   } 

}
