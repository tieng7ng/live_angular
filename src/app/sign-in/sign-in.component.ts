import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { SessionLocService } from '../services/session-loc.service'
import { TranslateLocService } from '../services/translate-loc.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service'

//=====
// Popup
import { MatDialog } from "@angular/material";
import { MyDialogOptionComponent } from "../my-dialog-option/my-dialog-option.component";
import { MyDialogComponent } from "../my-dialog/my-dialog.component";
// Popup
//=====

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  // affichage de l'user connecté
  displayIdentity: string;


  userEmailCtrl: FormControl;
  userPasswordCtrl: FormControl;

  //=====
  // display
  userForm: FormGroup;
  formError = {
    //    'password': '',
    //    'email': ''
  }
  // display
  //=====

  // tableau message erreur
  validationMessage: string[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionLocService,
    private translateLocService: TranslateLocService,
    private userService: UserService,
    private dialog: MatDialog,
    private translateService: TranslateService,

  ) { }

  ngOnInit() {
    this.buildFormControl();
    this.displayIdentity = '';

  }


  /***
   * Build controleur du formulaire + messages erreurs
   */
  buildFormControl() {
    //=====
    // Build form

    //==========
    // Build message d'erreur
    this.validationMessage = [];
    this.initValidationMessages();
    // Build message d'erreur
    //==========

    //==========
    // Build controleur

    this.userEmailCtrl = this.fb.control('',
      [Validators.required, Validators.email]
    );
    this.userPasswordCtrl = this.fb.control('',
      [Validators.required, Validators.minLength(8)]
    );

    this.userForm = this.fb.group({
      email: this.userEmailCtrl,
      password: this.userPasswordCtrl,
    })
    // Build controleur
    //==========


    // Traitement des messages d'erreurs
    this.userForm.valueChanges.subscribe(
      data => this.onValueChanged(data)
    );
    // Build form
    //=====
  }

  /**
 * Fonction qui initialise "validationMessages" avec la langue en paramètre
 */
  initValidationMessages() {
    //    this.translateService.use(lang);
    console.log(">>> initValidationMessages");
    console.log(this.userService);
    console.log(this.translateLocService);

    console.log('>>> init validation message');

    //=====
    // Message erreur
    this.translateLocService.getTranslate('password', 'required', 'required password');
    this.translateLocService.getTranslate('password', 'minlength', 'password min 8 chars');
    this.translateLocService.getTranslate('email', 'email', 'non-compliance email');

    this.validationMessage = this.translateLocService.getValidationMessage();
    // Message erreur
    //=====
  }
  // Fonction qui initialise "validationMessages" avec la bonne langue en paramètre
  //=====


  /**
   * Initialise les messages d'erreur
   * @param data : liste des changements
   */
  onValueChanged(data?: any) {
    console.log('>>>> onValueChanged');

    let form = this.userForm.controls;
    this.initValidationMessages();

    console.log('>>> userForm', this.userForm);

    for (let field in this.userForm.controls) {
    }
    this.buildFormError(this.userForm.controls);

  } // onValueChanged(data?: any)


  buildFormError(controlLoc) {
    for (let field in controlLoc) {
      //=====
      // Champ traite
      this.formError[field] = '';

      let control = controlLoc[field];
      console.log('>> field : ' + field);

      //==========
      //
      try {
        if (control.controls) {
          this.buildFormError(control.controls);
        }
      } catch (err) {
        console.log('>> ' + field + 'pas de sous control');
      }
      //
      //==========

      if (control && control.dirty && !control.valid) {
        let messages = this.validationMessage[field];

        console.log('>> message ' + field + ' : ', messages);

        for (let key in control.errors) {
          //=====
          // Type erreur
          this.formError[field] = this.validationMessage[field + '-' + key];
          // Type erreur
          //=====
        } // for (const key in control.errors)
      } // if (control && control.dirty && !control.valid)
      // Champ traite
      //=====

    } // for (const field in this.formUser.controls)

  }

  /**
 * Enregister user
 */
  register() {
    //=====
    // Post User
    console.log('>>> user POST - registerX');
    console.log(this.userForm.value);

    this.userService.signinUser(this.userForm.value).then((val) => {
      console.log('>>> then');
      console.log(val);
      this.session.setToken(val['token']);
      this.session.setFirstname(val['firstname']);
      this.session.setLastname(val['lastname']);
      // Passage de l'identifiant dans le header
      this.displayIdentity = this.session.getFirstname() + ' - ' + this.session.getLastname();
      this.router.navigate(['/user']);

    }).catch((error) => {
      //=====
      // Message error
      if (error.status == 0) {
        this.translateLocService.getTranslate('errorMessage', '', error.message);
      } else {
        this.translateLocService.getTranslate('errorMessage', '', error.error.failed);

      }
      this.translateLocService.getTranslate('errorTitle', '', 'error');

      let tabMessage = this.translateLocService.getValidationMessage();
      this.dialog.open(MyDialogComponent, {
        data: {
          dialogTitle: tabMessage['errorTitle-'],
          dialogBody: tabMessage['errorMessage-']
        },
        width: '550px'
      })
      // Message error
      //=====

    })
    // Post User
    //=====


  }

}
