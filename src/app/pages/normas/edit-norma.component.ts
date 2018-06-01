import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Util } from '../../util/util';
import { Location } from '@angular/common';
import { Norma } from '../../interfaces/norma.interface';

@Component({
  selector: 'app-edit-norma',
  templateUrl: './edit-norma.component.html',
  styles: []
})
export class EditNormaComponent implements OnInit {

  idNorma: string;
  constructor(private location: Location,
              private _s: ServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _msg: MsgBoxService ) { 

    this.activatedRoute.params.subscribe(
      p => {
        if(p['id']){
          this.idNorma = p['id'];
        }
      }                
    )


}

back() {
  this.location.back();
  
  }
  
  save(obj: Norma) {
    this._msg.show(Util.UPDATE_TITLE, Util.MSJ_UPDATE_QUESTION,Util.ACTION_UPDATE).subscribe(
      res => {
        if(res.response == Util.OK_RESPONSE){
          this._s.updateObject(Util.URL_NORMA, obj).subscribe(
            res => {
             this._msg.show('',Util.MSJ_UPDATE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
               res => this.router.navigate(['/normas'])
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

ngOnInit() {
}

}
