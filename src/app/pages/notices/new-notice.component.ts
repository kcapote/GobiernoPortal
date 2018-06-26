import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Notice } from '../../interfaces/notice.interface';
import { Util } from '../../util/util';

@Component({
  selector: 'app-new-notice.component',
  templateUrl: './new-notice.component.html',
  styleUrls: []
})
export class NewNoticeComponent implements OnInit {

  title: string = "";
  userTemp: any; 

  constructor(private location: Location,
    private _s: ServiceService,
    private _msg: MsgBoxService,
    private router: Router) {


      if(localStorage.getItem('user') && localStorage.getItem('user').length > 4){
        let user = localStorage.getItem('user');
        console.log(user);
        console.log(String(user));
        console.log(JSON.parse(user));
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


  save(notice:Notice) {
    console.log(notice);

    this._s.saveObject(Util.URL_NOTICE, notice).subscribe(
        res => {
          this._s.refresToken(res);
          this._msg.show('',Util.MSJ_SAVE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
            res => this.router.navigate(['/notices'])
          );         
        },
        error => {
          console.log(error);
          
        }
    )
}


}
