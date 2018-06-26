import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';
import { ValidTypesUser } from '../../enums/valid-types-user';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: []
})
export class FormUserComponent implements OnInit {


  @Input() title = "Titulo";
  @Input() idUser;

  user: User; 
  forma: FormGroup;
  userTemp: any; 

  enumType = Object.keys(ValidTypesUser).map(
    r => {
      return ValidTypesUser[r]
    }
  ) ;

  constructor(private _s: ServiceService) { 

    if(localStorage.getItem('user') && localStorage.getItem('user').length > 4){
      let user = localStorage.getItem('user');
      this.userTemp = JSON.parse(user);
    } else{
      this.userTemp =  {
        token: "", 
        role: "",
      };
    }  
    
    this.forma = new FormGroup({
      'name': new FormControl('',Validators.required),
      'lastName': new FormControl('',Validators.required),
      'email': new FormControl('', [Validators.email]),
      'role': new FormControl('',Validators.required),
      'password': new FormControl('', Validators.required),
      'password2':new FormControl()
    })

    this.forma.controls['password2'].setValidators([
      this.passConfirmValid.bind(this.forma)
    ])

  }

  ngOnInit() {

    console.log("FORM: "+this.idUser);
    
    if(this.idUser){
      this._s.getObject(Util.URL_USER,this.idUser).subscribe(
        res => {
          this.user = res.users[0];
          console.log(this.user);
          
          this.forma.setValue(
            {
               name: this.user.name,
               lastName: this.user.lastName,
               email: this.user.email,
               role: this.user.role,
               password:'',
               password2:''                    
            }
          )
        }
      );
    }


  }


  passConfirmValid(  control:FormControl ):{[s:string]:boolean} {
    let form:any = this;
    let pass1: string = form.controls['password'].value;
    let pass2: string = control.value;
    if(pass2!=pass1){
         return {
            passConfirmValid: false
        }
     }
    return null;
}

  isValid():boolean{
    return this.forma.valid;

  }

  getObjects():User{
    this.user = this.forma.value;
    this.user._id = this.idUser;    
    return this.user;

  }

}
