import { Component, OnInit } from '@angular/core';
import { Norma } from '../../interfaces/norma.interface';
import { Util } from '../../util/util';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-normas',
  templateUrl: './normas.component.html',
  styles: []
})
export class NormasComponent implements OnInit {

  constructor(private _s: ServiceService) {
    this.collection = []; 
    _s.getObjects(Util.URL_NORMA).subscribe(
        res =>{  

          this.collection = res.rules;
        
          
        }

    ); 

  }

  title:string = "Normas";
  collection: Norma[];

  ngOnInit() {
  }

}
