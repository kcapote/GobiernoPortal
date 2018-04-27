import { Component, OnInit } from '@angular/core';
import { Manual } from '../../interfaces/manual.interface';
import { Util } from '../../util/util';
import { ServiceService } from '../../services/service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-manual',
  templateUrl: './new-manual.component.html',
  styles: []
})
export class NewManualComponent implements OnInit {

  constructor(private location: Location,
              private _s: ServiceService) { }

  ngOnInit() {
  }


  back() {
    this.location.back();

  }

  save(obj:Manual) {
 
      this._s.saveObject(Util.URL_MANUAL, obj).subscribe(
          res => {
            console.log(res)
          },
          error => {
            console.log(error);
            
          }

      )

  }

}
