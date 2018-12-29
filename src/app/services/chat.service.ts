import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

//import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Mensaje } from 'src/app/interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats:Mensaje[] = []
  public usuario: any = {};

  constructor( private afs: AngularFirestore,
               public afAuth: AngularFireAuth ) {


      this.afAuth.authState.subscribe ( user => {
        console.log ( 'estado del usuario ', user );

        if ( !user ) {
          return;
        }

        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;

      } )



  }

  cargarMensajes () {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref=>ref.orderBy('fecha','desc' )
                                                                         .limit(5) );
    return this.itemsCollection.valueChanges().pipe ( map ( (mensajes:Mensaje[])=>{
      this.chats = [];
      for ( let mensaje of mensajes ) {
        this.chats.unshift ( mensaje );
      }
    } ));
  }

  public agregarMensaje ( texto:string ) {
    //TODO falta el id
    let mensaje:Mensaje = {
      nombre:this.usuario.nombre,
      mensaje:texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
    return this.itemsCollection.add (mensaje) ;
  }

  public login ( proveedor:string ) {

    if ( proveedor == 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }

  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }



}
