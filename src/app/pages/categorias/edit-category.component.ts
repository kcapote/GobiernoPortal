import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { Categories } from '../../interfaces/categories.interface';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styles: []
})
export class EditCategoryComponent implements OnInit {

  constructor(private location: Location,
              private _s: ServiceService, 
              private _msg: MsgBoxService,
              private router: Router) { }

ngOnInit() {
}

back() {
    this.location.back();
                  
}

save(category:Categories) {
    
    this._msg.show(Util.UPDATE_TITLE,Util.MSJ_UPDATE_QUESTION,Util.ACTION_UPDATE).subscribe(
        res => {
          if(res.response = Util.OK_RESPONSE){
            this._s.saveObject(Util.URL_CATEGORIAS, category).subscribe(
              res => {
                this._msg.show('',Util.MSJ_UPDATE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
                  res => this.router.navigate(['/categorias'])
                )
              },
              error => {
                console.log(error);        
              }    
            );
          }
        }

    )

    this._s.saveObject(Util.URL_CATEGORIAS, category).subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error);        
      }    
    );
    
    }
}
