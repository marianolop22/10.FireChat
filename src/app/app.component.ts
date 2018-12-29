import { Component } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firechat';

  // public chats: Observable<any[]>;
  // constructor(db: AngularFirestore) {
  //   this.chats = db.collection('chats').valueChanges();
  // }

  constructor(private _chat: ChatService) {
  }

  logout () {
    this._chat.logout ();
  }


}
