import { Component, ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { PaymentPage } from '../payment/payment';
import { OrderPage } from '../order/order';
import { MenuPage } from '../menu/menu';
import { Tabs, NavController } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  @ViewChild('Tabs') tabRef: Tabs;

  tab1Root: any = HomePage;
  tab2Root: any = OrderPage;
  tab3Root: any = PaymentPage;
  // tab4Root: any = MenuPage;
  // tab4Root: any =
  tabBarElement: any;
  constructor(public navCtrl: NavController) {
    this.tabBarElement = document.querySelector('#tabs ion-tabbar-section');
  }

  onPageDidEnter(){
    // this.tabBarElement.style.display = 'none';


  }
  public openTab(index) {
    console.log(index);
    this.tabRef.select(index);

    // this.navCtrl.parent.select(index);
  }

  public getTabIndex(){
    return this.tabRef.getSelected();
  }
  onPageWillLeave(){
    this.tabBarElement.style.display = 'block';
  }
}
