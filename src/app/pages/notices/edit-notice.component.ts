import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Util } from '../../util/util';
import { Notice } from '../../interfaces/notice.interface';


@Component({
  selector: 'app-edit-notice',
  templateUrl: './edit-notice.component.html',
  styleUrls: []
})
export class EditNoticeComponent implements OnInit {

  idNotice: string;
  userTemp: any;

  constructor(private location: Location,
    private _s: ServiceService, 
    private _msg: MsgBoxService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { 

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
           await (this.idNotice = p['id']);
           }
         }
 
     );


    }

  ngOnInit() {
  }


  back() {
    this.location.back();              
  }

  save(notice:Notice) {
      
      this._msg.show(Util.UPDATE_TITLE,Util.MSJ_UPDATE_QUESTION,Util.ACTION_UPDATE).subscribe(
          res => {
            if(res.response = Util.OK_RESPONSE){
              this._s.updateObject(Util.URL_NOTICE, notice).subscribe(
                res => {
                  this._s.refresToken(res);
                  this._msg.show('',Util.MSJ_UPDATE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
                    () => {
                      this.router.navigate(['/notices']);
                    }
                  )
                }
              );
            }
          }
      );    
    }

}
