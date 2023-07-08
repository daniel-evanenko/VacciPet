import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class signInComponent {

  loginForm;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};
    constructor(private formBuilder: FormBuilder,private http:HttpClient, public alertService: AlertService,private router:Router) {


      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required], })
    }

    ngOnInit() {


    }


    login() {
        if (this.loginForm.valid) {
            var user = {
                email: this.loginForm.controls['email'].value,
                password: this.loginForm.controls['password'].value,
            };
            this.http.post("http://localhost:3000/api/login",user,{
              withCredentials:true
            }).subscribe(()=> {
              this.alertService.success('login complete!', this.options)
              this.loginForm.reset();
              this.router.navigate(['/']);
            }
            ,(err) => {
              this.alertService.error(err.error.message, this.options)
            })
        }
    }

}
