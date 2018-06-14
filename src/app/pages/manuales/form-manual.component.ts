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

  registerFiles(event){
    this.arc = event.target.files['0']; 
   
  }

  isValid():boolean {
    return this.forma.valid;

  }

  getObject():Manual {
    let reader = new FileReader();
    this.manual = this.forma.value; 
    this.manual._id = this.idManual;
    //console.log(this.arc.type);
    
    // reader.readAsText(this.arc);
    // let t =""
    // reader.onload = function () {
    //    this.fileString = reader.result;
    // }.bind(this)

    // console.log(this.fileString);    
    // this.manual.file = new Buffer(this.fileString,'utf-8') 
    reader.onload = function() {
      let binaryString = reader.result;
      console.log('binary',binaryString );
      
      this.fileString = btoa(binaryString);
      //document.getElementById("base64textarea").value = btoa(binaryString);
    }.bind(this);
    
    console.log(this.fileString);
    

    return this.manual;
  }



  //  readSingleFile(evt) {
  //   //Retrieve the first (and only!) File from the FileList object
  //   var myFile = evt.target.files[0];
  //   var reader = new FileReader();
  //   reader.readAsText(myFile);
  //   reader.onload=function(){alert(reader.result)}
  //   }

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
