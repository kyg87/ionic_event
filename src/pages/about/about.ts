import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * 참여한 이벤트들(종료된 이벤트도 포함)
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  _requestoptions: RequestOptions;
  
  people = Array<any>();

  constructor(
    public alertCtrl: AlertController,
    public http: Http,
    public navCtrl: NavController) {

  }

  loadPeople() {


    let page = 1;
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');


    this._requestoptions = new RequestOptions({

      headers: headers

    });
    
    return this.http.get('http://125.129.60.150:3000/api/mypage', this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetMovie(data),
      error => {
        alert("등록에러 : " + JSON.stringify(error))
      }
    )
  }
 
  onCompleteGetMovie(data){
    console.log(data)
    this.people = data.value;

    this.reload(this.people);
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  showConfirm(data) {
    let confirm = this.alertCtrl.create({
      title: '정말 삭제하실건가요?',
      message: '종료된 이벤트는 삭제하면 더 이상 볼수 없습니다.',
      buttons: [
        {
          text: '확인',
          handler: () => {
            console.log('확인 clicked');
            console.log(JSON.stringify(data));
            this.onRemoveEvent(data);
          }
        },
        {
          text: '취소',
          handler: () => {
            console.log('취소 clicked');
          }
        }
      
      ]
    });
    confirm.present();
  }


  ionViewDidEnter(){
    
    this.loadPeople();
    console.log('참여한 이벤트 페이지 입장');

  }

  onRemoveEvent(data) {

    console.log(JSON.stringify(data));

    if (data.regist == 'true') alert('이미등록된 이벤트입니다.');

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    data.uid = 'dridy';

    this._requestoptions = new RequestOptions({

      headers: headers

    });

    

    return this.http.delete('http://125.129.60.150:3000/api/mypage/'+ data._id, this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteRemoveEvent(data),
      error => {
        alert("등록에러 : " + JSON.stringify(error))
      })
  }

  onCompleteRemoveEvent(data) {
    console.log(data);
    this.loadPeople();
  }


  reload(data) {

    var today = new Date();

    for (var item of data) {
      var dateArray = item.lastDay.split('.');

      var year = (20 + dateArray[0]);
      var dateObj = new Date(Number(year), Number(dateArray[1]) - 1, dateArray[2]);

      var betweenDay, temp;
      if (Number(dateArray[1]) - 1 > today.getMonth()) {

        var lastDay = (new Date(today.getFullYear(), today.getMonth(), 0)).getDate();

        temp = dateObj.getDate() - today.getDate() + lastDay;
        betweenDay = '-' + (dateObj.getDate() - today.getDate() + lastDay);
      }
      else {
        betweenDay = '-' + (dateObj.getDate() - today.getDate());

        temp = dateObj.getDate() - today.getDate();
      }

      if (temp == 0) {

        betweenDay = '오늘';
      }
      else if(temp < 0){
        betweenDay = '지나감';
      }


      item.betweenDay = betweenDay;
  
    }
  }
    

}
