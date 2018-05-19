import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
/*
  Generated class for the Shared provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var $:any;

@Injectable()
export class Shared {
  public table:any;
  public data:any = {};
  public method:any = {};
  public jwt: string;
  dateHash = {
    1: "đầu tiên",
    2: "thứ hai",
    3: "thứ ba",
    4: "thứ tư",
    5: "thứ năm",
    6: "thứ sáu",
    7: "thứ bảy",
    8: "thứ tám",
    9: "thứ chín",
    10: "thứ mười",
    11: "đầu 11",
    12: "thứ 13",
    13: "thứ 13",
    14: "thứ 14",
    15: "thứ 15",
    16: "thứ 16",
    17: "thứ 17",
    18: "thứ 18",
    19: "thứ 19",
    20: "thứ 20"
  }
  constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.method.dayName = function(i) {
      return this.dataHash[i]
    }
  }
  showAlert(title, sub) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: sub,
      buttons: ['Đồng ý']
    });
    alert.present();
  }
  presentLoading(mess, duration) {
    let loader = this.loadingCtrl.create({
      content: mess,
      duration: duration,
      dismissOnPageChange: true
    });
    loader.present();
  }
  presentToast(mess) {
    let toast = this.toastCtrl.create({
    message: mess,
    duration: 2000,
    closeButtonText: "x",
    position: 'bottom',
    cssClass: 'toastCss'
    });
    toast.present();
  }
  hideTabBar(){
    $('.tabbar').css('transform', 'translateY(56px)');
  }
  showTabBar(){
    $('.tabbar').css('transform', 'translateY(0)');
  }
  formatDate(date):string{
    var currentDate = new Date().getDate();
    var a = new Date(date).getDate();
    var ellapse = currentDate - a;
    if (ellapse == 0){
      return "Hôm nay";
    }
    return ellapse + "ngày";
  }
  date(schedule, i){
    if (i!=null){
      var a = new Date(schedule.toString());
      var b = new Date(a.setDate(a.getDate() + i));
      return b.getDate() + "/" + (b.getMonth()+1) + "/" + b.getFullYear();
    }
  }
  getdate(schedule, i){
    if (i!=null){
      var a = new Date(schedule.toString());
      var b = new Date(a.setDate(a.getDate() + i));
      return b.getDate() +"/" + (b.getMonth()+1);
    }
  }
  getImg(type, list){
    var src="";
    switch (type){
      case 0:
        src = list.thumbnail;
        break;
      case 1:
        src = list.small;
        break;
      case 2:
        src = list.medium;
        break;
      case 3:
        src = list.large;
        break;
    }
    if (src == null) return list.src || "assets/icon/default.png";
    else return src;
  }
}
