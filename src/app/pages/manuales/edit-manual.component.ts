import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';
import { ServiceService } from '../../services/service.service';
import { Location } from '@angular/common';
import { Manual } from '../../interfaces/manual.interface';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit-manual',
  templateUrl: './edit-manual.component.html',
  styles: []
})
export class EditManualComponent implements OnInit {

  idManual: string;

  constructor(private location: Location,
              private _s: ServiceService,
              private activatedRoute: ActivatedRoute ) { 

              this.activatedRoute.params.subscribe(
                p => {
                  if(p['id']){
                    this.idManual = p['id'];
                  }
                }                
              )


  }

ngOnInit() {
}


back() {
this.location.back();

}

save(obj: Manual) {

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
