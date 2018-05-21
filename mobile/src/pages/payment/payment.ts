import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import {Shared} from '../../providers/shared';
import { HttpClient } from '../../providers/httpClient';
import {OrderPage} from '../order/order';
import {MoneyPipe} from '../../providers/pipe';
import {TabsPage} from '../tabs/tabs';
/*
  Generated class for the Payment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
interface Dish {
  id: number,
  name: string,
  price: number,
  quantity: number,
  subTotal: SVGAnimatedNumberList
}
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
  providers: [HttpClient]
})

export class PaymentPage {
  total = 0;
  customerPay;
  customerReceive = 0;
  dishes:Dish[] = [];

  http: HttpClient;
  shared: Shared;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _http: HttpClient, public _shared: Shared, public tabs: TabsPage) {
    this.calcTotal();

    this.http = _http;
    this.shared = _shared;
  }

  calcTotal(){
    this.total = 0;
    for(let item of this.dishes){
      this.total += item.price * item.quantity;
    }
  }

  customerPayChange(newVal){
    if (isNaN(newVal) || newVal < this.total){
      this.customerReceive = 0;
      return;

    }
    this.customerReceive = newVal - this.total;
  }

  pay(){
    if (this.dishes.length <= 0){
      return;
    }
    this.http.put('/order/'+ this.shared.data.order, {
      status: "Completed"
    }).then(res=>{
      this.shared.data.order = false;
      this.shared.data.table = false;
      this.dishes = [];
      this.total = 0;
      this.shared.showAlert('Thông báo','Thanh toán thành công');
    })
    // this.navCtrl.push(OrderPage);
  }

  ionViewWillEnter() {
    this.total = 0;
    if(this.shared.data.table && this.shared.data.order) {
      this.http.get('/order/' + this.shared.data.order, {}).then( res => {
        this.dishes = res.data.order_menus.map(item => {
          let title:string = '';
          for (let product of this.shared.data.menu) {
            if (product.id == item.menu_id) {
                title = product.name;
                break;
            }
          }
          this.total += item.subtotal;
          return <Dish> {
            id: item.id,
            name: title,
            price: item.subtotal / item.quantity,
            quantity: item.quantity,
            subTotal: item.subtotal
          }
        })

      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

}
