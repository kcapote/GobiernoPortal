import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catologo',
  templateUrl: './catologo.component.html',
  styles: []
})
export class CatologoComponent implements OnInit {

  userTemp: any;

  constructor() { 

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
  }

}
