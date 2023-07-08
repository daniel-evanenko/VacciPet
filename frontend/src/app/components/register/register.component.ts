import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { AlertService } from '../_alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  addForm;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};
    constructor(private formBuilder: FormBuilder,private http:HttpClient, public alertService: AlertService,private router:Router) {
      this.addForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        password2: ['', Validators.required] },
    //   { validator: matchingPasswords('password', 'password2')
    // }
    )
    }

    ngOnInit() {


    }

addUser() {
        if (this.addForm.valid) {
            var adduser = {
                name: this.addForm.controls['username'].value,
                email: this.addForm.controls['email'].value,
                password: this.addForm.controls['password'].value,
            };
            this.http.post("http://localhost:3000/api/register",adduser,{
              withCredentials:true
            }).subscribe(()=> {
              this.alertService.success('register complete!', this.options)
              this.addForm.reset();
              this.router.navigate(['/']);
            }
            ,(err) => {
              this.alertService.error(err.error.message, this.options)
            })
        }
    }
}


// export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
//   return (group: ControlGroup): {
//       [key: string]: any
//   } => {
//       let password = group.controls[passwordKey];
//       let confirmPassword = group.controls[confirmPasswordKey];

//       if (password.value !== confirmPassword.value) {
//           return {
//               mismatchedPasswords: true
//           };
//       }
//   }
// }

