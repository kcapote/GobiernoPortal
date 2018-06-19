import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Notice } from '../../interfaces/notice.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Util } from '../../util/util';

@Component({
  selector: 'app-form-notice',
  templateUrl: './form-notice.component.html',
  styleUrls: []
})
export class FormNoticeComponent implements OnInit {

  @Input() title = "Titulo";
  @Input() idNotice;

  not: Notice; 
  forma: FormGroup;

  constructor(private _s: ServiceService) { }

  ngOnInit() {

    this.forma = new FormGroup({
        'title': new FormControl('',Validators.required),
        'description': new FormControl('',Validators.required)
      }
    );

    if(this.idNotice){
      this._s.getObject(Util.URL_NOTICE,this.idNotice).subscribe(
        res => {
          this.not = res.notice;
          this.forma.setValue(
            {
              title: this.not.title,
              description: this.not.description
            }
          )
            
        }
      );
    }

  }


  isValid():boolean{
    return this.forma.valid;
  }

  getObject():Notice{
    this.not = this.forma.value;
    this.not._id = this.idNotice;
    return this.not;
  }

}
