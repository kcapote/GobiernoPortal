import { Component, OnInit } from '@angular/core';
import { Manual } from '../../interfaces/manual.interface';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import 'rxjs/Rx' ;
import { DomSanitizer } from '@angular/platform-browser';
import { Stats } from '../../interfaces/stats.interface';

@Component({
  selector: 'app-manuales',
  templateUrl: './manuales.component.html',
  styles: []
})
export class ManualesComponent implements OnInit {

  title: string = "Manuales"; 
  collection: Manual[];
  collectionStats: Stats[];
  term: string;
  totalRecords: number; 
  reg: string;
  model: string = Util.URL_MANUAL;
  modelCategory: string =  Util.URL_CATEGORIAS;
  userTemp: any;
  idCategory: string;


  constructor(private _s: ServiceService,
              private _msg: MsgBoxService,
              private sanitizer: DomSanitizer
            ) {

              if(localStorage.getItem('user') && localStorage.getItem('user').length > 4){
                let user = localStorage.getItem('user');
                this.userTemp = JSON.parse(user);
              } else{
                this.userTemp =  {
                  token: "", 
                  role: "",
                };
              }   

    _s.getObjects(Util.URL_STATS).subscribe(
      res => {
        let page = 'MANUALES'
        this.collectionStats = res.stats;
        this.collectionStats.forEach(element => {
          if(element.page === page){
            _s.updateObject(Util.URL_STATS,element).subscribe(res => {})
          }
        });
      }
    )

    this.collection = []; 
    _s.getObjects(Util.URL_MANUAL).subscribe(
        res =>{

          this.collection = res.manuals;
          this.totalRecords = res.totalRecords;
          
          
        }

    ); 

  }

  delete(idx: number) {
    this._msg.show(Util.DELETE_TITLE,Util.MSJ_DELETE_QUESTION,Util.ACTION_DELETE).subscribe(
         res => {
          if(res.response == Util.OK_RESPONSE) {
            this._s.deleteObject(Util.URL_MANUAL,this.collection[idx]._id).subscribe(
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

    let url =`${ Util.URL_MANUAL }/file/${ id }`;
    
    this._s.getObjectAny(url).subscribe(
      res => {
        let str: string =  res.manual[0].file.doc+'';
          str = str.split(',')[1];
          let binary = atob(str.replace(/\s/g, ''));
       
          // get binary length
          let len = binary.length;

          // create ArrayBuffer with binary length
          let buffer = new ArrayBuffer(len);
          // create 8-bit Array
          let view = new Uint8Array(buffer);
          // save unicode of binary data into 8-bit Array
          for (let i = 0; i < len; i++) {
              view[i] = binary.charCodeAt(i);
          }          
          let currentBlob = new File([view],res.manual[0].file.name, {type:  res.manual[0].file.mimeType });
          
          let url = URL.createObjectURL(currentBlob);

          console.log(res.manual[0].file.name);                   
          
          // window.location.href =   url;
          // console.log(window.location.pathname);
              
          
          let a = document.createElement("a");
          document.body.appendChild(a);
          //a.style = "display: none";
          a.href = url;
          a.download =  res.manual[0].file.name;
          a.click();
          window.URL.revokeObjectURL(url) 
          document.removeChild(a);  
          
      }, err => {
        this._msg.show(Util.ERROR, "Error al intentar recuperar el documento",Util.ACTION_INFO).subscribe() ;
      }
    );
 
  } 
  

  search() {

    if(!this.term && (!this.idCategory || this.idCategory['name'] == "Todos" )  ){
      this._s.getObjects(Util.URL_MANUAL).subscribe(
        res => {
           this.collection = res.manuals;
           this.totalRecords = res.totalRecords;
        }
      );      

    }else if(this.term || this.idCategory ){
      console.log('cat ', this.idCategory);
      
      let termTemp; // "" (!this.term)? this.term:'undefined';
      if(this.term){
        termTemp = this.term;
      }else{
        termTemp = 'undefined';
      }
            
      let url ="";
      if(this.idCategory && this.idCategory['name'] !== 'Todos' ){
        url = `${Util.URL_MANUAL}/search/${termTemp}/?categoriaId=${this.idCategory['_id']}&pagination=0`;
      }else{
        url = `${Util.URL_MANUAL}/search/${termTemp}/?pagination=0`;
      }  
      
      this._s.getObjectAny(url).subscribe(
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
