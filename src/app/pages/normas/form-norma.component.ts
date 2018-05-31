import { Component, OnInit, Input } from '@angular/core';
import { Norma } from '../../interfaces/norma.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Util } from '../../util/util';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-form-norma',
  templateUrl: './form-norma.component.html',
  styles: []
})
export class FormNormaComponent implements OnInit {
  
  @Input() title = "Titulo";
  @Input() idNorma;
  forma: FormGroup;
  url = Util.URL_CATEGORIAS;
  norma: Norma;


  constructor(private _s: ServiceService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'category': new FormControl(''),
      'linkFile': new FormControl('')

    })
  }

  isValid():boolean {
    return this.forma.valid;

  }

  getObject():Norma {
    this.norma = this.forma.value; 
    this.norma._id = this.idNorma;
    return this.norma;

  }

  ngAfterViewInit() {
    console.log('el idmanual enafterview es',this.idNorma );
    
    if(this.idNorma){
      this._s.getObject(Util.URL_NORMA,this.idNorma).subscribe(
         res => {
          //console.log('el manual es', res);
          let r = res.rule[0];
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
