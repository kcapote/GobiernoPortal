import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-msg-box',
  templateUrl: './msg-box.component.html',
  styles: []
})
export class MsgBoxComponent implements OnInit {

  oculto: string ='';

  constructor() { 
    console.log('modal listo');
    
  }

  ngOnInit() {
  }

  

}
