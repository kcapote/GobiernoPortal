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
  url = Util.URL_CATEGORIAS;
  manual: Manual;
  arc: File;
  fileString: string;
  binaryString: string= ""; 
  statusLoading = 0;
  userTemp: any; 

  constructor(private _ps: ServiceService) {

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

      }
    );
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

  isValid():boolean {
    return this.forma.valid;

  }

  getObject():Manual {
    this.manual = this.forma.value; 
    //this.manual._id = this.idManual;
    if(this.idManual){
      this.manual._id = this.idManual;
      
    }
    this.manual.file = {
      name: this.arc.name,
      mimeType: this.arc.type,
      doc: this.binaryString      
    };
    this.manual['user'] =  JSON.parse(localStorage.getItem('user'))._id ;
    console.log(this.manual['user']);
    
    console.log(this.manual.file);
    
    return this.manual;
  }



  getBase64(file):FileReader {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    return reader;
   }

  ngAfterViewInit() {
    //console.log('el idmanual enafterview es',this.idManual );
    
    if(this.idManual){
        this._ps.getObject(Util.URL_MANUAL,this.idManual).subscribe(
           res => {
            let r: Manual = res.manual[0];
            let file = Util.createFile(r.file.doc,r.file.name, r.file.mimeType);
            //console.log('el manual es', r);
            //console.log(file);
            this.forma.setValue({
              name: r.name,
              description: r.description, 
              category: r.category['_id'],
              linkFile: ''
                      
            });
            this.manual = r;
           
            if(r.file){
                this.arc = Util.createFile(r.file.doc,
                                           r.file.name,
                                           r.file.mimeType) ;
                this.binaryString = r.file.doc;  
            }
           }
        )  
      }
  

  }



}
