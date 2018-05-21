import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Shared } from '../../providers/shared';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';

import { Register } from '../register/register';
import Config from "../../providers/config.json";

import { HttpClient } from "../../providers/httpClient";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [HttpClient]
})
export class Login {
  version: string;
  http: HttpClient;
  username:string = '';
  password:string = '';

  constructor(public navCtrl: NavController, public shared: Shared, public _http: HttpClient) {
    this.version = Config.version;
    this.http = _http;
  }

  login(){
    this.http.post('/login', {
      username: this.username,
      password: this.password
    }).then((res) => {
      if (!res.success) {
        throw new Error(res.message);
      }

      this.navCtrl.setRoot(TabsPage);
    })
    .catch(e => {
      let msg = (e && e.message);
      alert(msg || "Đã có lỗi xảy ra!");
    })
  }
}
