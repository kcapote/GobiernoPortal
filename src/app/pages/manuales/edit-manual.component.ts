import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';
import { ServiceService } from '../../services/service.service';
import { Location } from '@angular/common';
import { Manual } from '../../interfaces/manual.interface';
import { ActivatedRoute, Router } from '@angular/router'
import { MsgBoxService } from '../../components/msg-box/msg-box.service';

@Component({
  selector: 'app-edit-manual',
  templateUrl: './edit-manual.component.html',
  styles: []
})
export class EditManualComponent implements OnInit {

  idManual: string;

  constructor(private location: Location,
              private _s: ServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _msg: MsgBoxService ) { 

              this.activatedRoute.params.subscribe(
                p => {
                  if(p['id']){
                    this.idManual = p['id'];
                  }
                }                
              )


  }

ngOnInit() {
}


back() {
this.location.back();

}

save(obj: Manual) {
  this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION,Util.ACTION_UPDATE).subscribe(
    res => {
      if(res.response == Util.OK_RESPONSE){
        this._s.saveObject(Util.URL_MANUAL, obj).subscribe(
          res => {
           this._msg.show('',Util.MSJ_UPDATE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
             res => this.router.navigate(['/manuales'])
           )
          },
          error => {
            console.log(error);      
          }  
        );
      }
    }
  );
  


  
}

}
