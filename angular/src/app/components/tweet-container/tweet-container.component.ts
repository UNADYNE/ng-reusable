import {Component, OnInit} from '@angular/core';
import {TwitterService} from "../../services/twitter.service";
import {Tweet} from "../../classes/tweet";

@Component({
  selector: 'app-tweet-container',
  templateUrl: './tweet-container.component.html',
  styleUrls: ['./tweet-container.component.scss']
})
export class TweetContainerComponent implements OnInit {

  tweets: Tweet[];
  num: number;

  constructor(private twitterService: TwitterService) {
  }

  ngOnInit() {
    this.tweets = [];
    this.num = 1;
    this.twitterService.onTweetReceived().subscribe(tweet => {
      const newTweet = new Tweet(tweet.date,
                                 tweet.fromUser,
                                 tweet.toUser,
                                 tweet.body);
      this.tweets.unshift(newTweet);
    });
  }

  receiveReadEvent(event, index): void {
    this.tweets.splice(index, 1);
  }

  sendTestTweet() {
    const _tweet = {
      fromUser: 'FROM USER',
      toUser: 'TO USER',
      body: `THIS IS THE TWEET NUMBER ${this.num}`,
      date: Date.now()
    };
    this.twitterService.onTweetSent(_tweet);
    this.num++;
  }

}
