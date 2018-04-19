import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Categories } from '../../interfaces/categories.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styles: []
})
export class FormCategoriaComponent implements OnInit, OnChanges {

  @Output('category') category: EventEmitter<Categories> = new EventEmitter();
  @Output('valid') valid: EventEmitter<boolean> = new EventEmitter();

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

  ngOnChanges(changes: SimpleChanges) {
    
    this.category = this.forma.value();
   

  }



}
