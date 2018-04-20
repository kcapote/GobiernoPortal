import { Component, OnInit } from '@angular/core';
import { Manual } from '../../interfaces/manual.interface';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';

@Component({
  selector: 'app-manuales',
  templateUrl: './manuales.component.html',
  styles: []
})
export class ManualesComponent implements OnInit {

  title: string = "Manuales"; 
  collection: Manual[] = [];

  

  constructor(private _s: ServiceService) { 
    _s.getObjects(Util.URL_MANUAL).subscribe(
        res =>{
          this.collection = res.manuals;
          console.log(this.collection);
          
        }

    );

  }

  ngOnInit() {
  } 

}
