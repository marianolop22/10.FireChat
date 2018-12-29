import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  public mensaje:string="";
  public elemento:any;

  constructor( private _chat: ChatService) {
    this._chat.cargarMensajes().subscribe( ()=>{
      setTimeout ( ()=>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20);
    } );
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  public enviarMensaje () {

    if (this.mensaje.length > 0 ) {

      this._chat.agregarMensaje ( this.mensaje )
      .then ( ()=> {
        console.log ("se enviò el mensaje");
      })
      .catch ( (err)=> {
        console.log ("hubo un error " + err);
      })
      .finally ( ()=> { this.mensaje =""; })

    }


  }


}
