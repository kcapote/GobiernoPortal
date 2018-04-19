import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-new-categoria',
  templateUrl: './new-categoria.component.html',
  styles: []
})
export class NewCategoriaComponent implements OnInit {

  constructor(private location: Location,
              private _s: ServiceService) { }

  ngOnInit() {
  }

  back() {
    this.location.back();

  }

  save() {
    
  }


}
