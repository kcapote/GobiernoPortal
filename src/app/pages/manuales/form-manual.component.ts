import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { Manual } from '../../interfaces/manual.interface';

@Component({
  selector: 'app-form-manual',
  templateUrl: './form-manual.component.html',
  styles: []
})
export class FormManualComponent implements OnInit {

  @Input() title = "Titulo";
  forma: FormGroup;
  
  constructor() { }



  ngOnInit() {
    this.forma = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'version': new FormControl('', Validators.required),
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

}
