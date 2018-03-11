import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the JCaeyulPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-j-caeyul',
  templateUrl: 'j-caeyul.html',
})
export class JCaeyulPage {

  page : number = 1;

  autoManufacturers : any;
  _requestoptions: RequestOptions;
  people = Array<any>();
  title : string;

  instaList : Array<any> = new Array<any>();
  instarId : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    //this.loadEvent(0);

    this.GetInstaList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VotePage');
  }

  GetInstaList() {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');


    this._requestoptions = new RequestOptions({

      headers: headers

    });

    return this.http.get('http://125.129.60.150:3000/api/instalist', this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetInstaList(data),
      error => {
        alert("등록에러 : " + JSON.stringify(error))
      }
    )
  }

  onCompleteGetInstaList(data) {
    this.instaList.push({instaId:'전체'})
    this.instaList = this.instaList.concat(data);
    console.log(this.instaList)
    this.instarId = this.instaList[0].instaId
    console.log(this.instarId)
    // infiniteScroll.enable(false);
  }



  onVote(){
    console.log(this.autoManufacturers);
    if(this.autoManufacturers == undefined){
      alert('선택해주세요');
    }
    
  }

  reload(){
    if(this.instarId == undefined) return;
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
    
    if(this.instarId =='전체'){
      return this.http.get('http://125.129.60.150:3000/api/he_le_n_?page='+ this.page +'&size=1', this._requestoptions).map(res => res.json()).subscribe(
        data => this.onCompleteGetEvent(data),
        error => {
          alert("등록에러 : " + JSON.stringify(error))
        }
      )
    }
    else{
      return this.http.get('http://125.129.60.150:3000/api/he_le_n_/'+this.instarId+'?page='+ this.page +'&size=1', this._requestoptions).map(res => res.json()).subscribe(
        data => this.onCompleteGetEvent(data),
        error => {
          alert("등록에러 : " + JSON.stringify(error))
        }
      )
    }
  }

  onCompleteGetEvent(data) {
    
    console.log(data)
    this.people = data.value[0];
    console.log(this.people)
    // infiniteScroll.enable(false);
  }
  onSelectID(){
    console.log(this.instarId)
    this.loadEvent(0)
    
  }

  delete()
  {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');


    this._requestoptions = new RequestOptions({

      headers: headers

    });

    return this.http.delete('http://125.129.60.150:3000/api/he_le_n_/hatsuneyuko', this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetEvent(data),
      error => {
        alert("등록에러 : " + JSON.stringify(error))
      }
    )
  }


}

