import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Manual } from '../../interfaces/manual.interface';
import { Norma } from '../../interfaces/norma.interface';
import { Notice } from '../../interfaces/notice.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {



  collectionManuals: Manual[] = [];
  collectionRules: Norma[] = [];
  collectionNotices: Notice[] = [];
  noticeFirst: any = {};

  constructor(public _s: ServiceService,
    private _msg: MsgBoxService ) { 



      _s.getObjectAny(Util.URL_MANUAL+"/last").subscribe(
        res => {
          
          this.collectionManuals = res.manuals;
          console.log(this.collectionManuals);
           
        },
        async (error) => {
          await this._msg.show(Util.ERROR, "Ha ocurrido un error, intente más tarde por favor",Util.ACTION_INFO)
            .toPromise();
          console.log('el error es',error);
          
        } 

      )


      _s.getObjectAny(Util.URL_NORMA+"/last").subscribe(
        res => {
          
          this.collectionRules = res.rules;
          console.log(this.collectionRules);
           
        },
        async (error) => {
          await this._msg.show(Util.ERROR, "Ha ocurrido un error, intente más tarde por favor",Util.ACTION_INFO)
            .toPromise();
          console.log('el error es',error);
          
        } 

      )

      _s.getObjectAny(Util.URL_NOTICE+"/last").subscribe(
        res => {
          this.noticeFirst = res.notices[0];
          this.collectionNotices = res.notices;
          this.collectionNotices.shift();
        },
        async (error) => {
          await this._msg.show(Util.ERROR, "Ha ocurrido un error, intente más tarde por favor",Util.ACTION_INFO)
            .toPromise();
          console.log('el error es',error);
          
        } 

      )


    }

  ngOnInit() {
  }

  // download(idx: number, type: string) {
  //   let id = "";
  //   let url = "";

  //   if(type ==="M" ){
  //     id = this.collectionManuals[idx]._id;
  //     url =`${ Util.URL_MANUAL }/file/${ id }`;
  //   }else{
  //     id = this.collectionRules[idx]._id;
  //     url =`${ Util.URL_MANUAL }/file/${ id }`;
  //   }

  //   this._s.getObjectAny(url).subscribe(
  //     res => {
  //       let str: string =  res.manual[0].file.doc+'';
  //         console.log(str);
  //       window.location.href = str;
  //     }, err => {
  //       this._msg.show(Util.ERROR, "Error al intentar recuperar el documento",Util.ACTION_INFO).subscribe() ;
  //     }
  //   );
 
  // } 


  download(idx: number, type: string) {

    let id = "";
    let url = "";

    if(type ==="M" ){
      id = this.collectionManuals[idx]._id;
      url =`${ Util.URL_MANUAL }/file/${ id }`;
    }else{
      id = this.collectionRules[idx]._id;
      url =`${ Util.URL_NORMA }/file/${ id }`;
    }

    // let id = this.collection[idx]._id;

    // let url =`${ Util.URL_MANUAL }/file/${ id }`;
    
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

}
