import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the StarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-star',
  templateUrl: 'star.html',
})
export class StarPage {
  page : number = 1;

  autoManufacturers : any;
  _requestoptions: RequestOptions;
  people = Array<any>();
  title : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.loadEvent(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VotePage');
  }

  onVote(){
    console.log(this.autoManufacturers);
    if(this.autoManufacturers == undefined){
      alert('선택해주세요');
    }
    
  }

  reload(){
    this.page = 1;
    this.people.length = 0;
    this.loadEvent(0);
  }

  loadEvent(page) {

    this.page += page;
    console.log(this.page);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    this._requestoptions = new RequestOptions({

      headers: headers

    });

    return this.http.get('http://125.129.60.150:3000/api/star?page='+ this.page +'&size=1', this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetEvent(data),
      error => {
        alert("등록에러 : " + JSON.stringify(error))
      }
    )
  }

  onCompleteGetEvent(data) {
    this.people = data.value[0];
    console.log(this.people)
    // infiniteScroll.enable(false);
  }


}

