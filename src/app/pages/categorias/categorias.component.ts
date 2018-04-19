import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';
import { Categories } from '../../interfaces/categories.interface';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {
    
  cats: Categories[] = [];
  catTotal: number = 0;   
  pag: number = 0;

  constructor(public _s: ServiceService) { 
      _s.getObjects(Util.URL_CATEGORIAS).subscribe(
        res => {
          console.log(res);
          this.cats = res.categories;
          this.catTotal = res.totalRecords;
          this.pag = res.pagination;         
        }
      );
        
  }

  ngOnInit() {
  }




}
