import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends TranslatableComponent implements OnInit {
  registrationForm: FormGroup;
  roleList: string[];

  constructor(private translateService: TranslateService, private authService: AuthService, private fb: FormBuilder) {
    super(translateService);
    this.roleList = this.authService.getRoles();
    this.createForm();
   }

   createForm() {
    this.registrationForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      address: [''],
      phone: [''],
      role: [''],
      validated: ['true'] // explorer is validated by default
    });
  }

  ngOnInit() {
  }

  onRegister() {
    this.authService.registerUser(this.registrationForm.value)
      .then(res => {
        console.log('Registration success: ' + res);
      }, err => {
        console.log(err);
      });
  }

}
