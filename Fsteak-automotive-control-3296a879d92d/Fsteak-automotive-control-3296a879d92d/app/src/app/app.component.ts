import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private alertCtrl: AlertController) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.statusBar.backgroundColorByHexString('#FFFFFF');
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    log_out() {
        let alert = this.alertCtrl.create({
            title: 'Cerrar Sesión',
            message: '¿Esta seguro de finalizar la sesión?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancelar'
                },
                {
                    text: 'Cerrar Sesión',
                    handler: data => {
                        if (!data) {
                            this.nav.setRoot(LoginPage);
                        }
                    }
                }
            ]
        });
        alert.present();

    }
}

