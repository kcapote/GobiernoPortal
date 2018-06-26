import { Component, OnInit } from '@angular/core';
import { Manual } from '../../interfaces/manual.interface';
import { Util } from '../../util/util';
import { ServiceService } from '../../services/service.service';
import { Location } from '@angular/common';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-manual',
  templateUrl: './new-manual.component.html',
  styles: []
})
export class NewManualComponent implements OnInit {

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

  save(obj:Manual) {
     console.log(obj);
     obj['version'] =1
      this._s.saveObject(Util.URL_MANUAL, obj).subscribe(
          res => {
            this._s.refresToken(res);
            this._msg.show(Util.SAVE_TITLE,Util.MSJ_SAVE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
              res => {
                this.router.navigate(['/manuales']);    
              }              
            );
            
          },
          error => {
            console.log(error);
            
          }

      )

  }

}
