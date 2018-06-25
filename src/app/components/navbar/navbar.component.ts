import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgBoxService } from '../msg-box/msg-box.service';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mail:"";
  pass:"";
  userTemp: any;

  constructor(private _ps: ServiceService,
              private router: Router,
              private _msg: MsgBoxService,
              private location: Location) { 

    if(localStorage.getItem('user')){
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

  pageRefresh() {
    location.reload();
 }


  public login(){
    let obj = {
      email: this.mail,
      password: this.pass,
    };
    let url = Util.URL_SECURITY+'/login';
    
    this._ps.saveObject(url, obj).subscribe(
      res => {        
        if(res.success == true){
            this._ps.refresToken(res);
            this.router.navigate(['/home']);
            this.pageRefresh();               
        }
      }, error => {
        console.log(error);
        this._msg.show('Login',"Usuario o contraseña incorrectos ", Util.ACTION_INFO).subscribe(
                
        )
      }
    
    
    ) 
  }

  public logon(){
    this.userTemp =  {
      _id: "",
      name: "",
      lastName: "", 
      email: "",  
      password: "",
      password2: "",
      token: "", 
      role: "",
      recordActive: ""
    };
    localStorage.removeItem('user');
  }


}
