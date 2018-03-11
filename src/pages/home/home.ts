import { Component } from '@angular/core';
import { NavController, InfiniteScroll, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * 진행중인 이벤트들(종료된 이벤트는 제외시킴)
 * 해당페이지내에서 참여한 이벤트는 표시 ★ 
 * 또는 내가 참여한 이벤트 제외해서 보기 추가
 * 마감일, 당첨날짜 기준으로 정렬기능도 있으면 좋겠다
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  _requestoptions: RequestOptions;
  
  people = Array<any>();
  myEvent : any;
  _eventPage : number = 1;

  _isFirstView = false;

  constructor(
    public toastCtrl : ToastController,
    public navCtrl: NavController,
    public http: Http) {
      
      //this.loadMyEvent();
     
     this.loadEvent();
  }


  loadEvent() {

    let page = 1;
    let headers = new Headers();
    
    headers.append('Content-Type','application/json');

    
    this._requestoptions = new RequestOptions({

      headers: headers
      
  });

    return this.http.get('http://125.129.60.150:3000/api/event?page='+page+'&size=10',this._requestoptions).map(res => res.json()).subscribe(
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
    return this.http.get('http://125.129.60.150:3000/api/event?page='+this._eventPage+'&size=10',this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetEvent(data,infiniteScroll),
      error=>{
        alert("등록에러 : " + JSON.stringify(error))
      }
    )
  }

  onCompleteGetEvent(data, infiniteScroll? : InfiniteScroll){   

    console.log(data)
    this._isFirstView = true;

    if (data.length == 0)
      // infiniteScroll.enable(false);
    
    var temp = this.people.concat(data.value);

    this.people = this.people.concat(data.value);
    this.reload(this.people);

    
    if (infiniteScroll != undefined){

      infiniteScroll.complete();
    }
      
  }

  onAddEvent(data){

    // console.log(JSON.stringify(data));

    if (data.regist == 'true') {
      alert('이미등록된 이벤트입니다.');
      return;
    }

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    data.uid = 'dridy';

    this._requestoptions = new RequestOptions({

      headers: headers

    });

    console.log(JSON.stringify(data));

    

    return this.http.post('http://125.129.60.150:3000/api/mypage',data,this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteAddEvent(data),
      error=>{
        alert("등록에러 : " + JSON.stringify(error))
      })
  }

  onCompleteAddEvent(data){

    console.log(data)
    console.log(this.people)
    var abc = this.people.find(t=>t._id == data._id);

    abc.regist = 'true';
    
    this.showToast('bottom');

  }


  loadMyEvent(isReload?: boolean) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');


    this._requestoptions = new RequestOptions({

      headers: headers

    });

    return this.http.get('https://evening-hollows-92076.herokuapp.com/mypage', this._requestoptions).map(res => res.json()).subscribe(
      data => this.onCompleteGetMovie(data,isReload),
      error => {
        alert("등록에러 : " + JSON.stringify(error))
      }
    )
  }

  


  onCompleteGetMovie(data, isReload? : boolean) {
    console.log((data));
    this.myEvent = data;

    this.loadEvent();
  }

  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: '등록했습니다!',
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

  ionViewDidEnter() {

    console.log(this._isFirstView);
    if (this._isFirstView) {
      this.loadMyEvent();
    }

  }

  reload(data){

    var today = new Date();

    for (var item of data) {
      var dateArray = item.lastDay.split('.');

      var year = (20 + dateArray[0]);
      var dateObj = new Date(Number(year), Number(dateArray[1]) - 1, dateArray[2]);

      var betweenDay;
      if(Number(dateArray[1]) - 1 > today.getMonth()){

        var lastDay = ( new Date( today.getFullYear(), today.getMonth(), 0) ).getDate();
        
        betweenDay = '-' + (dateObj.getDate() - today.getDate() + lastDay);
        console.log(item.title);
        console.log(dateObj.getDate() - today.getDate() + lastDay);
      }
      else{
        if(dateObj.getDate() - today.getDate() < 0){

          betweenDay ='지남';
        }
        else{
          betweenDay = '-' + (dateObj.getDate() - today.getDate());
        }
        
      }
  
      if(betweenDay == '-0' ){

        betweenDay = '오늘';
      } 

      item.regist = 'false';

      // for(var event of this.myEvent){

      //   if(event._id == item._id){

      //     item.regist = 'true';
      //     break;
      //   }
  
      // }

      item.betweenDay = betweenDay;
    }
  }

}

