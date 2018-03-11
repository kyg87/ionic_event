import { Component } from '@angular/core';
import { NavController, InfiniteScroll, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the FilejoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-filejo',
  templateUrl: 'filejo.html',
})
export class FilejoPage {

  _requestoptions: RequestOptions;
  
  people = Array<any>();
  myEvent : any;
  _eventPage : number = 1;

  constructor(public navCtrl: NavController,
    public http: Http) {
      this.loadEvent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilejoPage');
  }

  loadEvent() {

    let page = 1;
    let headers = new Headers();
    
    headers.append('Content-Type','application/json');

    
    this._requestoptions = new RequestOptions({

      headers: headers
      
  });

    return this.http.get('http://125.129.60.150:3000/api/filejo?page='+page+'&size=10',this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetEvent(data),
      error=>{
        alert("등록에러 : " + JSON.stringify(error))
      }
    )
  }



  moreEventlList(infiniteScroll: InfiniteScroll) {  

    this._eventPage = this._eventPage + 1;
    let headers = new Headers();
    
    headers.append('Content-Type','application/json');
        
    this._requestoptions = new RequestOptions({
      
            headers: headers
            
        });
    return this.http.get('http://125.129.60.150:3000/api/filejo?page='+this._eventPage+'&size=10',this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetEvent(data,infiniteScroll),
      error=>{
        alert("등록에러 : " + JSON.stringify(error))
      }
    )
  }

  onCompleteGetEvent(data, infiniteScroll? : InfiniteScroll){   

    console.log(data)

    if (data.length == 0)
      // infiniteScroll.enable(false);
    
    var temp = this.people.concat(data.value);

    this.people = this.people.concat(data.value);

    
    if (infiniteScroll != undefined){

      infiniteScroll.complete();
    }
      
  }

}
