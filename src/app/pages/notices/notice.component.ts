import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { ServiceService } from '../../services/service.service';
import { Notice } from '../../interfaces/notice.interface';

@Component({
  selector: 'app-notice.component',
  templateUrl: './notice.component.html',
  styleUrls: []
})
export class NoticeComponent implements OnInit {

  title: string = "Noticias";  
  collection: Notice[] = [];
  notTotal: number = 0;   
  term: string;
  totalRecords: number;  

  constructor(public _s: ServiceService,
    private _msg: MsgBoxService ) { 

      _s.getObjects(Util.URL_NOTICE).subscribe(
        res => {
          
          this.collection = res.notices;
          this.notTotal = res.totalRecords;
           console.log(this.collection);
           
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

  search() {
      if(this.term.length>0){
        this._s.getObjects(Util.URL_NOTICE,0 ,this.term ).subscribe(
            res => {
                this.collection = res.notices;
                this.totalRecords = res.totalRecords;
            }   
        )       
      }else{
        this._s.getObjects(Util.URL_NOTICE).subscribe(
            res => {
                this.collection = res.notices;
                this.totalRecords = res.totalRecords;
            }
        );
      } 
   }
   
   delete(idx: number) {
    this._msg.show(Util.DELETE_TITLE,Util.MSJ_DELETE_QUESTION,Util.ACTION_DELETE).subscribe(
        res => {
        if(res.response == Util.OK_RESPONSE) {
          this._s.deleteObject(Util.URL_NOTICE,this.collection[idx]._id).subscribe(
            res => {
              this.collection.splice(idx,1); 
            }
          )             
        }
      }
    )
}

}
