import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { Util } from '../../util/util';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: []
})
export class NewUserComponent implements OnInit {


  title: string = "";
  userTemp: any; 


  constructor(private location: Location,
              private _s: ServiceService,
              private _msg: MsgBoxService,
              private router: Router) { 
  
                if(localStorage.getItem('user') && localStorage.getItem('user').length > 4){
                  let user = localStorage.getItem('user');
                  this.userTemp = JSON.parse(user);
                } else{
                  this.userTemp =  {
                    token: "", 
                    role: "",
                  };
                }    

  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  save(user:User) {
      this._s.saveObject(Util.URL_USER, user).subscribe(
          res => {
            this._s.refresToken(res);
            this._msg.show('',Util.MSJ_SAVE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
              res => this.router.navigate(['/users'])
            );         
          },
          error => {
            console.log(error);
          }
      )
  }


}
