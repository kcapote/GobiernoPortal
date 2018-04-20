import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Categories } from '../../interfaces/categories.interface';
import { Util } from '../../util/util';

@Component({
  selector: 'combo-categorias',
  templateUrl: './combo-categorias.component.html',
  styles: []
})
export class ComboCategoriasComponent implements OnInit {


  collection: Categories[] = [];
  item: Categories;
  indexSel=0;

  constructor(private _s: ServiceService) {
    _s.getObjects(Util.URL_CATEGORIAS).subscribe(
      res => {
        this.collection = res.categories;
      }
    );
  }

  ngOnInit() {
  }

  getObject(): Categories {
    return this.item;
  } 


  updateItem() {
     this.item = this.collection[this.indexSel];
  }


}
