import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import {Login} from '../pages/login/login';
import {Shared} from '../providers/shared';

@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, Keyboard, SplashScreen]
})
export class MyApp {
  rootPage = Login;

  constructor(platform: Platform, shared: Shared, statusBar: StatusBar, keyboard: Keyboard, splashscreen: SplashScreen) {
    platform.ready().then(() => {
      splashscreen.hide();
      // statusBar.styleDefault();
      // statusBar.overlaysWebView(true);
      keyboard.disableScroll(false);
      keyboard.show();

    });
  }
}
