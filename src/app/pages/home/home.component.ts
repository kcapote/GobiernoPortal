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

  download(idx: number, type: string) {
    let id = "";
    let url = "";

    if(type ==="M" ){
      id = this.collectionManuals[idx]._id;
      url =`${ Util.URL_MANUAL }/file/${ id }`;
    }else{
      id = this.collectionRules[idx]._id;
      url =`${ Util.URL_MANUAL }/file/${ id }`;
    }

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

}
