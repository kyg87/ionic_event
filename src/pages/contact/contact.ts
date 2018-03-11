import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * 발표일이 지난 이벤트들(해당 목록에서 삭제하면 더이상 볼 방법이 없음)
 * alert창으로 경고 표시
 * 환경설정에서 경고를 표시 여부 추가하면 좋을듯
 */
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {

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
    
    return this.http.get('https://evening-hollows-92076.herokuapp.com/closeEvents', this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetMovie(data),
      error => {
        alert("등록에러 : " + JSON.stringify(error))
      }
    )
  }
 
  onCompleteGetMovie(data){
    this.people = data;
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

    console.log(JSON.stringify(data));

    return this.http.post('https://evening-hollows-92076.herokuapp.com/removeEvent', data, this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteRemoveEvent(data),
      error => {
        alert("등록에러 : " + JSON.stringify(error))
      })
  }

  onCompleteRemoveEvent(data) {
    console.log(JSON.stringify(data));
  }

  
}
