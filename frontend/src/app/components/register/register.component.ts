import { Component } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  addForm;

    constructor(private formBuilder: FormBuilder) {
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
                username: this.addForm.controls['username'].value,
                email: this.addForm.controls['email'].value,
                password: this.addForm.controls['password'].value,
            };
          console.log(adduser);// adduser var contains all our form values. store it where you want
            this.addForm.reset();// this will reset our form values to null
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

