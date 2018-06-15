import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Util } from '../../util/util';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';
import { Manual } from '../../interfaces/manual.interface';
import { Norma } from '../../interfaces/norma.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {



  collectionManuals: Manual[] = [];
  collectionRules: Norma[] = [];

  constructor(public _s: ServiceService,
    private _msg: MsgBoxService ) { 



      _s.getObjectAny(Util.URL_MANUAL+"/last").subscribe(
        res => {
          
          this.collectionManuals = res.manuals;
          console.log(this.collectionManuals);
           
        },
        async (error) => {
          await this._msg.show(Util.ERROR, "Ha ocurrido un error, intente más tarde por favor",Util.ACTION_INFO)
            .toPromise();
          console.log('el error es',error);
          
        } 

      )


      _s.getObjectAny(Util.URL_NORMA+"/last").subscribe(
        res => {
          
          this.collectionRules = res.rules;
          console.log(this.collectionRules);
           
        },
        async (error) => {
          await this._msg.show(Util.ERROR, "Ha ocurrido un error, intente más tarde por favor",Util.ACTION_INFO)
            .toPromise();
          console.log('el error es',error);
          
        } 

      )


    }

  ngOnInit() {
  }

}
