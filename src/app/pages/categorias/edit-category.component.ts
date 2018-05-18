import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { Categories } from '../../interfaces/categories.interface';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { resolve } from 'url';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styles: []
})
export class EditCategoryComponent implements OnInit {
  
  idCategory: string;
 
  constructor(private location: Location,
              private _s: ServiceService, 
              private _msg: MsgBoxService,
              private router: Router,
              private activatedRoute: ActivatedRoute ) { 
      
    activatedRoute.params.subscribe(
       async p => {
          if(p['id']){
          await (this.idCategory = p['id']);
          }
        }

    );

    
    

  }

ngOnInit() {
 
}

back() {
    this.location.back();
                  
}

save(category:Categories) {
    
    this._msg.show(Util.UPDATE_TITLE,Util.MSJ_UPDATE_QUESTION,Util.ACTION_UPDATE).subscribe(
        res => {
          if(res.response = Util.OK_RESPONSE){
            this._s.updateObject(Util.URL_CATEGORIAS, category).subscribe(
              res => {
                this._msg.show('',Util.MSJ_UPDATE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
                  () => {
                    this.router.navigate(['/categorias']);
                  }
                )
              }
            );
          }
        }
    );    
  }

  
}
