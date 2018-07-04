import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { ServiceService } from '../../services/service.service';
import { Notice } from '../../interfaces/notice.interface';
import { Stats } from '../../interfaces/stats.interface';

@Component({
  selector: 'app-notice.component',
  templateUrl: './notice.component.html',
  styleUrls: []
})
export class NoticeComponent implements OnInit {

  title: string = "Noticias";  
  collection: Notice[] = [];
  collectionStats: Stats[];
  term: string;
  totalRecords: number;
  model = Util.URL_NOTICE; 
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
          let page = 'NOTICIAS'
          this.collectionStats = res.stats;
          this.collectionStats.forEach(element => {
            if(element.page === page){
              _s.updateObject(Util.URL_STATS,element).subscribe(res => {})
            }
          });
        }
      ) 

      _s.getObjects(Util.URL_NOTICE).subscribe(
        res => {  
          this.collection = res.notices;
          this.totalRecords = res.totalRecords;           
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
              this._s.refresToken(res);
              this.collection.splice(idx,1); 
            }
          )             
        }
      }
    )
}

}
