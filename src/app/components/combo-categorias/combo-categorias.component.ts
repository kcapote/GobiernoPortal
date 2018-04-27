import { Component, OnInit, Output,EventEmitter,Renderer, ViewChild, ElementRef,forwardRef, Input } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Categories } from '../../interfaces/categories.interface';
import { Util } from '../../util/util';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

 
@Component({
  selector: 'combo-categorias',
  templateUrl: './combo-categorias.component.html',
  styles: [],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboCategoriasComponent),
      multi: true
    }]
})

/*,
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboCategoriasComponent),
      multi: true
    }
  ]*/

export class ComboCategoriasComponent implements OnInit, ControlValueAccessor  {
  
  @Input() category;
  @Output() done = new EventEmitter();
  @ViewChild('select') select: ElementRef;

  collection: Categories[] = [];
  item: Categories;
  indexSel=0;
  value: string;

  constructor(private _s: ServiceService, private _renderer: Renderer, private _elementRef: ElementRef) {
    _s.getObjects(Util.URL_CATEGORIAS).subscribe(
      res => {
        this.collection = res.categories;
      }
    );
  

  }

  ngOnInit() {


  }



  updateItem() {
    
     this.item = this.collection[this.indexSel];
     this.propagateChange(this.item._id);
  
  }


  writeValue(value: any): void {


  }

  private propagateChange = (_: any) => { };

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }
  
  registerOnTouched(): void {
    
  }

  


}
