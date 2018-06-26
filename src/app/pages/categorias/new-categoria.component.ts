import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { Categories } from '../../interfaces/categories.interface';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-categoria',
  templateUrl: './new-categoria.component.html',
  styles: []
}) 
export class NewCategoriaComponent implements OnInit {
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

  save(category:Categories) {
      this._s.saveObject(Util.URL_CATEGORIAS, category).subscribe(
          res => {
            this._s.refresToken(res);
            this._msg.show('',Util.MSJ_SAVE_SUCCESS,Util.ACTION_SUCCESS).subscribe(
              res => this.router.navigate(['/categorias'])
            );         
          },
          error => {
            console.log(error);
            
          }

      )

  }


}
