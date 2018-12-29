import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  constructor( private _chat:ChatService ) { }

  ngOnInit() {
  }

  public ingresar( proveedor:string ) {
    this._chat.login ( proveedor );

  }

}
