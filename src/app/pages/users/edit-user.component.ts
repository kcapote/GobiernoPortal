import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../interfaces/user.interface';
import { Util } from '../../util/util';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: []
})
export class EditUserComponent implements OnInit {


  idUser: string;
  userTemp: any; 

  constructor(private location: Location,
              private _s: ServiceService, 
              private _msg: MsgBoxService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

                if(localStorage.getItem('user') && localStorage.getItem('user').length > 4){
                  let user = localStorage.getItem('user');
                  this.userTemp = JSON.parse(user);
                } else{
                  this.userTemp =  {
                    token: "", 
                    role: "",
                  };
                }

              activatedRoute.params.subscribe(
                  async p => {
                     if(p['id']){
                     await (this.idUser = p['id']);
                     console.log("EDIT: "+this.idUser);
                     
                     }
                   }
               );

}

  ngOnInit() {
  }


back() {
    this.location.back();                
}

save(user:User) {
    
    this._msg.show(Util.UPDATE_TITLE,Util.MSJ_UPDATE_QUESTION,Util.ACTION_UPDATE).subscribe(
        res => {
          if(res.response = Util.OK_RESPONSE){
            this._s.updateObject(Util.URL_USER, user).subscribe(
              resp => {
                this._s.refresToken(resp);
                this._msg.show('',Util.MSJ_UPDATE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
                  () => {
                    this.router.navigate(['/users']);
                  }
                )
              }
            );
          }
        }
    );    
  }



}
