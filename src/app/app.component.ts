import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = TabsPage;

  constructor(

    private fire : AngularFireAuth,
    private db: AngularFireDatabase,
    public push: Push, public alertCtrl : AlertController,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();

    });
  }

  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '786368975378',
         sound : true,
         vibrate : true
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };
 
  const pushObject: PushObject = this.push.init(options);
 
  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New Push notification',
        message: notification.message
      });
      youralert.present();
    }
  });
 
  pushObject.on('registration').subscribe((registration: any) => {
      alert(registration.registrationId);
      
      this.fire.auth.signInAnonymously().then(user =>{

        this.updateUserData(user,registration.registrationId)
      }).catch(function (error) {

        alert(error);

      })
      
  });
 
  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }

  private updateUserData(user : any,registrationId: any): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    let path = `users/${user.uid}`; // Endpoint on firebase
  
    let data = {
      uId: user.uid,
      registrationId: registrationId,
      date : this.formatDate()
    }

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }



  formatDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
