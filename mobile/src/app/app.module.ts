import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { PaymentPage } from '../pages/payment/payment';
import { OrderPage } from '../pages/order/order';
import { BrowserModule } from '@angular/platform-browser';

import { MyApp } from './app.component';
import { Login } from '../pages/login/login';

import { TabsPage } from '../pages/tabs/tabs';

import { OrderByPipe, MoneyPipe, DatePipe, DateVN, FilterDay } from '../providers/pipe';
import { Shared } from '../providers/shared';

import { HttpModule, XSRFStrategy, CookieXSRFStrategy }  from '@angular/http';
import { HttpClient } from '../providers/httpClient';
import { BackDropComponent } from "../components/back-drop/back-drop";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    Login,
    HomePage,
    PaymentPage,
    OrderPage,
    OrderByPipe, MoneyPipe, DatePipe, DateVN, FilterDay,
    BackDropComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,    // Valid options appear to be [true, false]
      autoFocusAssist: false,  // Valid options appear to be ['instant', 'delay', false]
      backButtonText: '',
      tabsPlacement:'bottom'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    TabsPage,
    HomePage,
    PaymentPage,
    OrderPage,
    BackDropComponent
  ],
  providers: [{
    provide: ErrorHandler, useClass: IonicErrorHandler
  }, {
    provide: XSRFStrategy,
    useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken')
  }, Shared, HttpClient]
})
export class AppModule {
}
