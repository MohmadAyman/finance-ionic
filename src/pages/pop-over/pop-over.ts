import { Component, Output, EventEmitter } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ViewController } from "ionic-angular";
import { LoginComponent } from "./../login/login.component";
import { USERTOKEN } from "./../login/login.component";
import { Storage } from "@ionic/storage";
import { ToastController } from "ionic-angular";
import { AboutPage } from "./../about/about";
import { SettingsPage } from "./../settings/settings";

@Component({
  template: `
    <ion-list>
      <ion-list-header></ion-list-header>
      <button ion-item *ngIf="!loggedIn" (click)="login()">Login</button>
      <button ion-item *ngIf="loggedIn" (click)="logout()">Logout</button>
      <button ion-item (click)="goToSettings()">Change language</button>
      <button ion-item (click)="close()">Contact us</button>
      <button ion-item (click)="goToAbout()">About us</button>
    </ion-list>
  `
})
export class PopoverPage {
  @Output() onLogout = new EventEmitter<boolean>();
  loggedIn: boolean = false;
  constructor(
    public viewCtrl: ViewController,
    private navController: NavController,
    private storage: Storage,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.storage.keys().then(keys => {
      if (keys) {
        console.log(keys);
        keys.forEach(key => {
          if (key === "token") {
            this.loggedIn = true;
            console.log("found a token");
          }
        });
      }
    });
  }

  logout() {
    this.loggedIn = false;
    this.storage.remove("token").then(val => {
      console.log("logged out");
      this.close();
      this.menuToast("out");
    });
  }

  goToAbout() {
    this.navController.push(AboutPage);
  }

  goToSettings() {
    this.navController.push(SettingsPage);
    this.close();
  }

  login() {
    this.navController.push(LoginComponent);
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  menuToast(inOrOut: string) {
    let toast = this.toastCtrl.create({
      message: "You have logged " + inOrOut + " successfully",
      duration: 2000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
