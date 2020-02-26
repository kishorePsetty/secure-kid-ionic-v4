import { SkApiService } from '../service/sk-api.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('phone', {  static: false })  phone: IonInput;
  @ViewChild('password', {  static: false })  password: IonInput;

  constructor(private router: Router, private skApi: SkApiService, private storage: Storage) { }

  userPhone = '';
  userPassword = '';
  loginFormError = false;
  loginFormErrorMessage = '';

  ngOnInit() {
    // this.storage.get('apiKey').then(data => {
    //   if (data) {
    //     this.router.navigate(['/home']);
    //   }
    // })
  }

  loginUser() {
    if (!this.userPhone) {
      this.loginFormError = true;
      this.loginFormErrorMessage = 'Please enter mobile number';
      setTimeout(() => {
        this.phone.setFocus();
       }, 100);
      return;
    } else if (!this.userPassword) {
      this.loginFormError = true;
      this.loginFormErrorMessage = 'Please enter password';
      setTimeout(() => {
        this.password.setFocus();
       }, 100);
      return;
    }
    this.loginFormError = false;
      this.loginFormErrorMessage = '';
    const loginData = {
      username: this.userPhone,
      password: this.userPassword
    };
    // this.skApi.loginUser(loginData).subscribe(
    //   res => {
    //     this.storage.set('apiKey', 'secureKID ' + res['apikey']).then(data => {
    //       this.router.navigate(['/home']);
    //     });
    //   },
    //   err => {
    //     console.log(err);
    //     this.loginFormError = true;
    //     this.loginFormErrorMessage = err['error']['message'];
    //   }
    // )
    this.router.navigate(['/home']);
  }

  loginExtraAction() {
    if (!this.userPhone) {
      this.loginFormError = true;
      this.loginFormErrorMessage = 'Please enter mobile number to continue';
      setTimeout(() => {
        this.phone.setFocus();
       }, 100);
      return;
    }
  }
  
}