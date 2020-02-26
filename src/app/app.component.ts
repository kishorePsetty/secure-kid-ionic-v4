import { SkApiService } from './service/sk-api.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Reports',
      url: '/reports',
      icon: 'list-box'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'How it works?',
      url: '/how-it-works',
      icon: 'information-circle'
    },
    {
      title: 'Support',
      url: '/support',
      icon: 'help-circle'
    },
    {
      title: 'Send Feedback',
      url: '/feedback',
      icon: 'paper-plane'
    },
    {
      title: 'Privacy Policy',
      url: '/privacy-policy',
      icon: 'lock'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'power'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private skApi: SkApiService,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  navigate(routeInfo) {
    if (routeInfo.title === 'Logout') {
      this.storage.remove('apiKey').then(data => {
        this.router.navigate(['/']);
      });
    }
    this.router.navigate(['/home']);
  }
}
