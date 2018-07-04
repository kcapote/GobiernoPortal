import { Component, OnInit } from '@angular/core';
import { Util } from '../../util/util';
import { Stats } from '../../interfaces/stats.interface';
import { ServiceService } from '../../services/service.service';
import { MsgBoxService } from '../../components/msg-box/msg-box.service';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: []
})
export class StatsComponent implements OnInit {


  title: string = "Estadísticas";  
  collection: Stats[] = [];
  term: string;
  totalRecords: number;  
  model: string = Util.URL_STATS;
  userTemp: any;

  constructor(public _s: ServiceService,
              private _msg: MsgBoxService) {

                if(localStorage.getItem('user') && localStorage.getItem('user').length > 4){
                  let user = localStorage.getItem('user');
                  this.userTemp = JSON.parse(user);
                } else{
                  this.userTemp =  {
                    token: "", 
                    role: "",
                  };
                }    
          
                _s.getObjects(Util.URL_STATS).subscribe(
                  res => {
                    
                    this.collection = res.stats;
                    this.totalRecords = 1;
                     
                  },
                   (error) => {
                     this._msg.show(Util.ERROR, "Ha ocurrido un error, intente más tarde por favor",Util.ACTION_INFO)
                      .toPromise();
                    console.log('el error es',error);
                    
                  } 
          
                )
              
  }

  ngOnInit() {
  }

}
