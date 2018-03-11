import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { VotePage } from '../pages/vote/vote';
import { StarPage } from '../pages/star/star';
import { FilejoPage } from '../pages/filejo/filejo';
import { JCaeyulPage } from '../pages/j-caeyul/j-caeyul';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Push } from '@ionic-native/push';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
const config = {
  apiKey: "AIzaSyDi2jrmWAAAgUw9AcBgY7S3sdz7uBsb7m4",
  authDomain: "whykiki-event-491f2.firebaseapp.com",
  databaseURL: "https://whykiki-event-491f2.firebaseio.com",
  projectId: "whykiki-event-491f2",
  storageBucket: "whykiki-event-491f2.appspot.com",
  messagingSenderId: "786368975378"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    VotePage,
    StarPage,
    FilejoPage,
    JCaeyulPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    VotePage,
    StarPage,
    FilejoPage,
    JCaeyulPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
