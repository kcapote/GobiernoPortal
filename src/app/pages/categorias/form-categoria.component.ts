import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Categories } from '../../interfaces/categories.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styles: []
})
export class FormCategoriaComponent implements OnInit {

  // @Output('category') category: EventEmitter<Categories> = new EventEmitter();
  // @Output('valid') valid: EventEmitter<boolean> = new EventEmitter();
  @Input() title = "Titulo";
  @Input() idCategory;

  cat: Categories; 
  forma: FormGroup;
  userTemp: any;

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


  }

  
  ngOnInit() {
    this.forma = new FormGroup({
        'name': new FormControl('',Validators.required),
        'description': new FormControl('')
      }
    );

    if(this.idCategory){
      this._s.getObject(Util.URL_CATEGORIAS,this.idCategory).subscribe(
        res => {
          this.cat = res.category;
          console.log(res);
          this.forma.setValue(
            {
               name: this.cat.name,
               description: this.cat.description                 
            }
          )
            
        }
      );
    }

  }

  isValid():boolean{
    return this.forma.valid;

  }

  getCategory():Categories{
    this.cat = this.forma.value;
    this.cat._id = this.idCategory;
    return this.cat;

  }

}
