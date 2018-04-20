import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { Categories } from '../../interfaces/categories.interface';
import { Util } from '../../util/util';

@Component({
  selector: 'app-new-categoria',
  templateUrl: './new-categoria.component.html',
  styles: []
})
export class NewCategoriaComponent implements OnInit {
  title: string = ""

  constructor(private location: Location,
              private _s: ServiceService) { }

  ngOnInit() {
  }

  back() {
    this.location.back();

  }

  save(category:Categories) {
      this._s.saveObject(Util.URL_CATEGORIAS, category).subscribe(
          res => {
            console.log(res)
          },
          error => {
            console.log(error);
            
          }

      )

  }


}
