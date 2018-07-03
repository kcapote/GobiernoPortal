import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Manual } from '../../interfaces/manual.interface';
import { Norma } from '../../interfaces/norma.interface';
import { Notice } from '../../interfaces/notice.interface';
import { Stats } from '../../interfaces/stats.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {



  collectionManuals: Manual[] = [];
  collectionRules: Norma[] = [];
  collectionNotices: Notice[] = [];
  collectionStats: Stats[] = [];
  noticeFirst: any = {};
  userTemp: any;

  constructor(public _s: ServiceService,
    private _msg: MsgBoxService ) { 


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
          let page = 'HOME'
          this.collectionStats = res.stats;
          this.collectionStats.forEach(element => {
            if(element.page === page){
              _s.updateObject(Util.URL_STATS,element).subscribe(res => {})
            }
          });
        }
      )

      _s.getObjectAny(Util.URL_MANUAL+"/last").subscribe(
        res => {
          this.collectionManuals = res.manuals;
        },
        async (error) => {
          await this._msg.show(Util.ERROR, "Ha ocurrido un error, intente más tarde por favor",Util.ACTION_INFO)
            .toPromise();          
        } 

      )


      _s.getObjectAny(Util.URL_NORMA+"/last").subscribe(
        res => {
          this.collectionRules = res.rules;
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
          await this._msg.show(Util.ERROR, "Ha ocurrido un error, intente más tarde por favor",Util.ACTION_INFO).toPromise();
        } 

      )


    }

  ngOnInit() {
  }

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
