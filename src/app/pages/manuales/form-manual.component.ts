import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { Manual } from '../../interfaces/manual.interface';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';

@Component({
  selector: 'app-form-manual',
  templateUrl: './form-manual.component.html',
  styles: []
})
export class FormManualComponent implements OnInit, AfterViewInit {

  @Input() title = "Titulo";
  @Input() idManual;
  forma: FormGroup;

  constructor(private _ps: ServiceService) { }



  ngOnInit() {
    this.forma = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'category': new FormControl(''),
      'linkFile': new FormControl('')

    }
  );

  }

  isValid():boolean {
    return this.forma.valid;

  }

  getObject():Manual {
    return this.forma.value;

  }

  ngAfterViewInit() {
    console.log('el idmanual enafterview es',this.idManual );
    
    if(this.idManual){
      this._ps.getObject(Util.URL_MANUAL,this.idManual).subscribe(
         res => {
          
          let r = res.manual[0];
          console.log('el manual es', r);
          this.forma.setValue({
            name: r.name,
            description: r.description, 
            category: r.category,
            linkFile: r.linkFile

          })
         }
      )  
    }

  }


}
