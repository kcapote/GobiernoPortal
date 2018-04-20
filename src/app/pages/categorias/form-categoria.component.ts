import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Categories } from '../../interfaces/categories.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styles: []
})
export class FormCategoriaComponent implements OnInit {

  // @Output('category') category: EventEmitter<Categories> = new EventEmitter();
  // @Output('valid') valid: EventEmitter<boolean> = new EventEmitter();
  @Input() title = "Titulo";

  private cat: Categories; 
  forma: FormGroup;

  constructor() { }

  
  ngOnInit() {
    this.forma = new FormGroup({
        'name': new FormControl('',Validators.required),
        'description': new FormControl('')
      }
    );

  }

  isValid():boolean{
    return this.forma.valid;

  }

  getCategory():Categories{
    return this.forma.value;

  }

}
