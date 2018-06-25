import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsgBoxService } from '../msg-box/msg-box.service';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mail:"";
  pass:"";

  constructor(private _ps: ServiceService,
              private router: Router,
              private _msg: MsgBoxService) { }

  ngOnInit() {
  }



  public login(){
    let obj = {
      email: this.mail,
      password: this.pass,
    };
    console.log(obj);
    let url = Util.URL_SECURITY+'/login';
    console.log(url);
    
    this._ps.saveObject(url, obj).subscribe(
      res => {
        console.log(res);
        
        if(res.success == true){
            this._ps.refresToken(res);
            this.router.navigate(['/home']);   
        }
      }, error => {
        console.log(error);
        this._msg.show('Login',"Usuario o contraseña incorrectos ", Util.ACTION_INFO).subscribe(
                
        )
      }
    
    
    ) 
  }


}
