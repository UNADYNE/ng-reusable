import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tweet} from "../../classes/tweet";

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent {

  @Input() tweet: Tweet;
  @Output() isRead = new EventEmitter<any>();

  constructor() {
  }


  markRead() {
    this.isRead.emit(true);
  }

}
