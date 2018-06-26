import { Component, OnInit } from '@angular/core';
import { Norma } from '../../interfaces/norma.interface';
import { Router } from '@angular/router';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { ServiceService } from '../../services/service.service';
import { Location } from '@angular/common';
import { Util } from '../../util/util';

@Component({
  selector: 'app-new-norma',
  templateUrl: './new-norma.component.html',
  styles: []
})
export class NewNormaComponent implements OnInit {

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

  save(obj:Norma) {
     console.log(obj);
     obj['version'] =1
      this._s.saveObject(Util.URL_NORMA, obj).subscribe(
          res => {
            this._s.refresToken(res);
            this._msg.show(Util.SAVE_TITLE,Util.MSJ_SAVE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
              res => {
                this.router.navigate(['/normas']);    
              }              
            );
            
          },
          error => {
            console.log(error);
            
          }

      )

  }
}
