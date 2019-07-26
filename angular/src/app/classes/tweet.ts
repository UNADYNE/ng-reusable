export class Tweet {
  date: Date;
  fromUser: string;
  toUser: string;
  body: string;

  constructor(date: Date, fromUser: string, toUser: string, body: string){
    this.date = date;
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.body = body;
  }

}
