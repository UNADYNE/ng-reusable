import { Injectable } from '@angular/core';
import {Tweet} from '../classes/tweet';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  apiUrl = environment.apiUrl;
  socket: any;

  constructor(private http: HttpClient) {
    this.socket = io.connect(this.apiUrl);
    this.socket.on('connected', () => {
      console.log('connected to socket.io api');
    });
  }

  onTweetReceived(): Observable<any> {
    return new Observable<any>(o => {
      this.socket.on('tweetIn', (payload) => {
        o.next(payload);
      });
    });
  }

  onTweetSent(payload): void {
    this.socket.emit('tweetOut', payload);
  }


}
