import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { ServiceService } from '../../services/service.service';
import { User } from '../../interfaces/user.interface';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {


  title: string = "Usuarios";  
  collection: User[] = [];
  term: string;
  totalRecords: number;  
  model = Util.URL_USER;

  constructor(public _s: ServiceService,
    private _msg: MsgBoxService ) {

      _s.getObjects(Util.URL_USER).subscribe(
        res => {
          
          this.collection = res.users;
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
       this._s.getObjects(Util.URL_USER,0 ,this.term ).subscribe(
           res => {
              this.collection = res.users;
              this.totalRecords = res.totalRecords;
           }   
       )       
   }else{
       this._s.getObjects(Util.URL_USER).subscribe(
           res => {
              this.collection = res.users;
              this.totalRecords = res.totalRecords;
           }
       );
   } 
   } 


   delete(idx: number) {
    this._msg.show(Util.DELETE_TITLE,Util.MSJ_DELETE_QUESTION,Util.ACTION_DELETE).subscribe(
         res => {
          if(res.response == Util.OK_RESPONSE) {
            this._s.deleteObject(Util.URL_USER,this.collection[idx]._id).subscribe(
              res => {
                this.collection.splice(idx,1); 
              }
            )             
          }
        }
      )
}


}
