import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';


import { TranslateService } from '@ngx-translate/core';

import { SessionLocService } from '../services/session-loc.service';
import { TranslateLocService } from '../services/translate-loc.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
  // affichage de l'user connecté
  displayIdentity: string;

  userEmailCtrl: FormControl;
  userFirstnameCtrl: FormControl;
  userLastnameCtrl: FormControl;
  userPasswordCtrl: FormControl;
  userStreetCtrl: FormControl;

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
  validationMessage: any;

  //=====
  // Edition user

  /***
   *  Affichage de l'user
   * */
  dUser?: User;

  /***
   *  Utilisateur existant?
   */
  dUserExist: number = 0;

  // dCmptAddress

  /**
   * compteur address
   */
  dCmptAddress;
  // Edition user
  //=====

  constructor(private fb: FormBuilder,
    private translateLocService: TranslateLocService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private sessionLoc: SessionLocService,
    private translateService: TranslateService) {
  }

  ngOnInit() {
    console.log('>> ngOnInit');


    //=====
    // Connecté?
    if (!this.sessionLoc.getToken()) {
      this.router.navigate(['/signin']);
    }
    this.displayIdentity = this.sessionLoc.getFirstname() + ' - ' + this.sessionLoc.getLastname();
    // Connecté?
    //=====

    //=====
    // Init user
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');

      this.dUserExist = 1;
      this.buildFormControl();

      if (id) {
        this.userService.searchUser([['_id', id]])
          .subscribe(data => {
            //=====
            // Traitement du resultat de la recherche
            if (data.length == 1) {
              this.dUser = data[0];

              console.log('>> dUserExist', this.dUserExist);

              console.log('>>> userForm', this.userForm);
              //=====
              // Initialisation du formulaire
              this.userForm.patchValue({ // pathValue : pas toutes valeur - setValue : toutes les valeur 
                email: this.dUser.email,
              });
              //==========
              // Sous groupe
              this.userForm.get('name').patchValue({
                last: this.dUser.name.last,
                first: this.dUser.name.first
              });
              // Sous groupe
              //==========

              // Initialisation du formulaire
              //=====

              console.log(this.userForm);

            } else {
              //=====
              // User no exist
              // User no exist
              //=====
            }
            // Traitemenem  it du resultat de la recherche
            //=====

            console.log(data);
            console.log(this.dUser);


          }
          );

      } else {
        //=====
        // add User
        console.log('>>> add USER');
        this.dCmptAddress = new Array(1);
        console.log('>> cmpt address', this.dCmptAddress);
        this.dUserExist = 0;
        this.buildFormControl();

        // add User
        //=====
      }

    });
    // Init user
    //=====

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

    this.userLastnameCtrl = this.fb.control('',
      [Validators.required]
    );

    this.userFirstnameCtrl = this.fb.control('',
      [Validators.required]
    );


    if (this.dUserExist == 1) {
      console.log('>>> build controlm form user exist');
    } else {
      console.log('>>> build controlm form new user ');
      this.userStreetCtrl = this.fb.control('',
        [Validators.required]
      );

      this.userPasswordCtrl = this.fb.control('',
        [Validators.required, Validators.minLength(8)]
      );

    }

    this.userForm = this.fb.group({
      email: this.userEmailCtrl,
      password: this.userPasswordCtrl,
      name: new FormGroup({
        first: this.userFirstnameCtrl,
        last: this.userLastnameCtrl
      }),
      // TODO gestion des erreurs de la liste DIFFERENT
      street: this.userStreetCtrl
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
   * 
   */
  reset() {
    this.userEmailCtrl.setValue('');
    this.userPasswordCtrl.setValue('');
  }

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
    this.translateLocService.getTranslate('last', 'required', 'required lastname');
    this.translateLocService.getTranslate('first', 'required', 'required firstname');
    this.translateLocService.getTranslate('street', 'required', 'required street');
    this.translateLocService.getTranslate('password', 'minlength', 'password min 8 chars');
    this.translateLocService.getTranslate('email', 'email', 'non-compliance email');

    this.validationMessage = this.translateLocService.getValidationMessage();
    // Message erreur
    //=====
  }
  // Fonction qui initialise "validationMessages" avec la bonne langue en paramètre
  //=====

  addAddress() {
    console.log('>>> addAddress');
    console.log(this.dCmptAddress.push('2'));
  }

  deleteAddress() {
    console.log('>>> deleteAddress');
    console.log(this.dCmptAddress.pop());
  }

  /**
   * Enregister user
   */
  register() {
    if (this.dUserExist == 0) {
      //=====
      // Post User
      console.log('>>> user POST - registerX');
      console.log(this.userForm.value);

      let resultPost = this.userService.postUser(this.userForm.value).then((val) => {
        console.log('>>> then');
        console.log(val);
        console.log('Return post', JSON.stringify(val));
        console.log(JSON.stringify(resultPost));
  
      }).catch( (error) => {
        console.log('>> catch');
        console.log(error);
      })

    

      // Post User
      //=====
    } else {
      //=====
      // Maj user
      console.log('>>> user edit - register');
      let tabUserForm = Object.keys(this.userForm.value)
      console.log('>> password', this.userForm.value.password);

      if (this.userForm.value.password) {
      } else {
        delete this.userForm.value.password;
      }

      let resultPut = this.userService.putUser(this.dUser._id, this.userForm.value).then((val) => {
        console.log('>>> then');
        console.log(val);
      });
      console.log('Return put', resultPut);

      // Maj user
      //=====
    }

  }

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


}
