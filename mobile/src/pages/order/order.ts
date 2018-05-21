import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Shared} from '../../providers/shared';
import {MoneyPipe, OrderByPipe} from '../../providers/pipe';
import { HttpClient } from '../../providers/httpClient';
import { HomePage } from '../home/home';

interface Menu {
  id: number,
  name: string,
  price: number,
  quantity: number,
  total: number
}
enum TableStatus {
  Available = 1,
  Using
}
interface Order {

}
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers: [OrderByPipe, HttpClient]
})
export class OrderPage {
  MenuList:Menu[] = [];
  SortedMenuList:Menu[] = [];
  http: HttpClient;

  constructor(public navCtrl: NavController,
    public shared: Shared,
    public navParams: NavParams,
    public _http: HttpClient) {
    this.http = this._http;
    console.log(this.shared.data.table);

    if(!this.shared.data.order) {
      this.shared.data.order = 0;
    }
  }

  sortMenu() {
    this.SortedMenuList = this.MenuList.map((a) => {
      a.quantity = 0;
      return a;
    }).sort((a,b) => {
      return a.total < b.total ? 1 : 0;
    });
  }

  increase(item){
    item.quantity++;
    item.total++;
  }
  decrease(item){
    if(item.total <= 0 ){
      return;
    }
    item.quantity--;
    item.total--;
  }
  order(){
    let currentTable = this.shared.data.table;
    let currentOrder = this.shared.data.order;

    let orderList = [];
    for (let item of this.MenuList){
      if (item.total != 0 || item.quantity !=0) {
        var orderItem = {
          menu_id: item.id,
          quantity: item.total
        }
        orderList.push(orderItem);
      }
    }
    console.log('orderList: ',orderList);

    if (!currentOrder) {
      //create new order
      this.http.post('/order',{
        table_id: this.shared.data.table,
        order_menu: orderList,
      }).then(res => {
        this.shared.data.order = res.data.id;
      })
      .catch(e => {
        console.log(e);
      })
    } else {
      //Put order
      this.http.put('/order/' + currentOrder, {
        order_menu: orderList,
      }).then(res=>{
        console.log('order_put', res);
      })
    }
    this.sortMenu();
    console.log(this.shared.data.table);
    // this.navCtrl.pop(this);
  }

  createNewOrder() {

  }

  addMenuToOrder() {

  }

  cancel(){

    if (this.shared.data.order) {
      this.http.put('/order/' + this.shared.data.order, {
        order_menu: [],
        status: "Cancelled"
      }).then(res=> {
        this.shared.data.order = false;
        this.shared.data.table = false;
        this.shared.showAlert('Thông báo','Hủy đặt món, hãy chọn bàn lại!!')
      }).catch(e => {});
    } else {
      this.shared.data.order = false;
      this.shared.data.table = false;
      this.shared.showAlert('Thông báo','Hủy đặt món, hãy chọn bàn lại!!')
    }
  }

  ionViewWillEnter() {
    if (!this.shared.data.table) {
      this.MenuList = [];
      this.SortedMenuList = this.MenuList;
      return
    }

    this.http.get('/menu', {}).then(res => {
      // console.log(res);
      this.MenuList = res.data.map(item => {
        return <Menu> {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 0,
          total: 0
        }
      });
      this.SortedMenuList = this.MenuList;
      this.shared.data.menu = this.MenuList;
      if (this.shared.data.order) {
        // console.log('haveOrder');
        this.http.get('/order/' + this.shared.data.order, {}).then(res => {
          // let ostatus = res.data.status;
          // if(ostatus == "Cancelled")
          let order_menus = res.data.order_menus;
          for (let om of order_menus) {
            for (let Menu of this.MenuList) {
              if (om.menu_id == Menu.id) {
                Menu.total = om.quantity;
              }
            }
          }
          this.SortedMenuList = this.MenuList;
          this.sortMenu();
        });
      }
      this.sortMenu();
    })
    .catch(e => {

    })
    this.SortedMenuList = this.MenuList;
    this.sortMenu();

  }
  ionViewWillLeave(){
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

}
