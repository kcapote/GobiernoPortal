import { Component, OnInit, Input } from '@angular/core';
import { Norma } from '../../interfaces/norma.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Util } from '../../util/util';
import { ServiceService } from '../../services/service.service';
import { Categories } from '../../interfaces/categories.interface';

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
  arc: File;
  fileString: string;
  binaryString: string= ""; 
  statusLoading = 0;
  userTemp: any; 

  constructor(private _s: ServiceService) {
    
    if(localStorage.getItem('user') && localStorage.getItem('user').length > 4){
      let user = localStorage.getItem('user');
      this.userTemp = JSON.parse(user);
    } else{
      this.userTemp =  {
        token: "", 
        role: "",
      };
    }


   }

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
    //this.norma._id = this.idNorma;
    if(this.idNorma){
      this.norma._id = this.idNorma;
      
    }
    this.norma.category = this.norma.category['id'];
    this.norma.file = {
      name: this.arc.name,
      mimeType: this.arc.type,
      doc: this.binaryString      
    };
    
    return this.norma;

  }




  
  registerFiles(event){
    
    this.arc = event.target.files[0]; 
    let reader = new FileReader();
    reader.readAsDataURL(this.arc);
    reader.onload = function() {
      this.statusLoading = 1;
      this.binaryString = reader.result;
      this.fileString = btoa(this.binaryString);
      this.statusLoading = 2;
    }.bind(this); 
    
    
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
