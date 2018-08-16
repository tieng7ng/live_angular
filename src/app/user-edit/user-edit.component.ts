import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userEmailCtrl: FormControl;
  userPasswordCtrl: FormControl;

  userForm: FormGroup;

  validationMessage = {
    'password': {
      'required': 'Password requis',
      'minlength': 'Nombre minimum 3'
    },
    'email': {
      'email': 'Email non conforme'
    }
  };

  formError = {
    'password': '';
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.userEmailCtrl = this.fb.control('',
      [Validators.required, Validators.email]
    );
    this.userPasswordCtrl = this.fb.control('',
      [Validators.required, Validators.minLength(8)]
    );

    this.userForm = this.fb.group({
      email: this.userEmailCtrl,
      password: this.userPasswordCtrl
    })

    this.userForm.valueChanges.subscribe(
      data => this.onValueChanged(data)
    );
  }

  /**
   * 
   */
  reset() {
    this.userEmailCtrl.setValue('');
    this.userPasswordCtrl.setValue('');
  }

  /**
   * Enregister user
   */
  register() {
    console.log('>>> user edit - register');
    //    console.log(this.userForm.value);
  }

  onValueChanged(data?: any) {
    console.log('>>>> onValueChanged');

    const form = this.userForm.controls;


    for (const field in this.userForm.controls) {
      //=====
      // Champ traite
      this.formError[field] = '';

      const control = this.userForm.controls[field];
      console.log('>> field : ' + field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessage[field];

        console.log('>> message ' + field + ' : ', messages);
        console.log(this.validationMessage);

        for (const key in control.errors) {
          //=====
          // Type erreur
          console.log('key : ' + key);
          console.log(messages);

          let tabMessage = JSON.stringify(messages);
          console.log(tabMessage);


          this.formError[field] = messages[key];
          // Type erreur
          //=====
        } // for (const key in control.errors)
      } // if (control && control.dirty && !control.valid)
      // Champ traite
      //=====

    } // for (const field in this.formUser.controls)
  } // onValueChanged(data?: any)



}
