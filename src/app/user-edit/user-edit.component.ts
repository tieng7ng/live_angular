import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';


import { TranslateService } from '@ngx-translate/core';

import { SessionLocService } from '../services/session-loc.service';
import { TranslateLocService } from '../services/translate-loc.service';
import { User } from '../models/user.model';
import { User_address } from '../models/user_address.model';

import { UserService } from '../services/user.service'

//=====
// Popup
import { MatDialog } from "@angular/material";
import { MyDialogOptionComponent } from "../my-dialog-option/my-dialog-option.component";
import { MyDialogComponent } from "../my-dialog/my-dialog.component";
// Popup
//=====

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
  userAddressIdCtrl: FormControl;
  userStreetCtrl: FormControl;
  userCountryCtrl: FormControl;
  userCityCtrl: FormControl;

  userBirthdayCtrl: FormControl;

  //=====
  // display
  userForm: FormGroup;
  addressFormArray: FormArray;

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

  // Edition user
  //=====

  constructor(private fb: FormBuilder,
    private translateLocService: TranslateLocService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private sessionLoc: SessionLocService,
    private translateService: TranslateService,
    private dialog: MatDialog
  ) {
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

      if (id) {
        //=====
        // Update user
        this.dUserExist = 1;
        this.buildFormControl();

        // Preparation appell API user
        this.userService.setToken(this.sessionLoc.getToken());
        this.userService.searchUser([[['_id'], [id]]])
          .subscribe(data => {
            //=====
            // Traitement du resultat de la recherche
            if (data.length == 1) {
              this.dUser = data[0];

              console.log('>> dUserExist', this.dUserExist);

              console.log('>>> userForm', this.userForm);
              //=====
              // Initialisation du formulaire

              // TODO déplacer dans buildFormControl
              this.userForm.patchValue({ // pathValue : pas toutes valeur - setValue : toutes les valeur 
                email: this.dUser.email + 'XXX',
                birthday: this.dUser.birthday,
              });

              //==========
              // Sous groupe
              this.userForm.get('name').patchValue({
                last: this.dUser.name.last,
                first: this.dUser.name.first
              });

              console.log('>>> userForm.address');
              console.log(this.userForm.get('address'));

              //===============
              // Build address list
              let userAdress = new User_address();

              //====================
              // Delete champ @ initialise lors creation
              this.addFormArray.removeAt(0);
              // Delete champ @ initialise lors creation
              //====================

              for (let cmpt = 0; cmpt < this.dUser.address.length; cmpt++) {

                this.userAddressIdCtrl = this.fb.control(this.dUser.address[cmpt]['_id'],
                  [Validators.required]
                );
                this.userStreetCtrl = this.fb.control(this.dUser.address[cmpt]['street'],
                  [Validators.required]
                );
                this.userCityCtrl = this.fb.control(this.dUser.address[cmpt]['city'],
                  [Validators.required]
                );
                this.userCountryCtrl = this.fb.control(this.dUser.address[cmpt]['country'],
                  [Validators.required]
                );

                let addressForm = new FormGroup({
                  _id: this.userAddressIdCtrl,
                  street: this.userStreetCtrl,
                  country: this.userCountryCtrl,
                  city: this.userCityCtrl
                });

                this.addFormArray.push(addressForm);
              }
              // Build address list
              //===============

              // Sous groupe
              //==========


              // Initialisation du formulaire
              //=====
              console.log('>>>> init userForm');
              console.log(this.dUser.address);
              console.log(this.userForm);

            } else {
              //=====
              // User no exist
              this.dialog.open(MyDialogComponent, {
                data: {
                  dialogTitle: 'Info',
                  dialogBody: 'User unknow'
                },
                width: '250px'
              })

              // User no exist
              //=====
            }
            // Traitemenem  it du resultat de la recherche
            //=====

            console.log(data);
            console.log(this.dUser);


          }
          );
        // Update user
        //=====
      } else {
        //=====
        // add User
        console.log('>>> add USER');
        this.dUserExist = 0;
        this.buildFormControl();

        // add User
        //=====
      }

    });
    // Init user
    //=====

  }

  get addFormArray(): FormArray {
    return this.userForm.get('address') as FormArray;
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
    // TODO definition des champs

    this.userEmailCtrl = this.fb.control('',
      [Validators.required, Validators.email]
    );

    this.userLastnameCtrl = this.fb.control('',
      [Validators.required]
    );

    this.userFirstnameCtrl = this.fb.control('',
      [Validators.required]
    );

    this.userBirthdayCtrl = this.fb.control('',
      [Validators.required]
    )

    if (this.dUserExist == 1) {
      console.log('>>> build controlm form user exist');
    } else {
      console.log('>>> build controlm form new user ');

      this.userPasswordCtrl = this.fb.control('',
        [Validators.required, Validators.minLength(8)]
      );

    }

    this.userStreetCtrl = this.fb.control('',
      [Validators.required]
    );
    this.userCityCtrl = this.fb.control('',
      [Validators.required]
    );
    this.userCountryCtrl = this.fb.control('',
      [Validators.required]
    );

    let addressForm = new FormGroup({
      street: this.userStreetCtrl,
      country: this.userCountryCtrl,
      city: this.userCityCtrl
    });

    this.userForm = this.fb.group({
      email: this.userEmailCtrl,
      password: this.userPasswordCtrl,
      birthday: this.userBirthdayCtrl,
      name: new FormGroup({
        first: this.userFirstnameCtrl,
        last: this.userLastnameCtrl
      }),
      // TODO gestion des erreurs de la liste DIFFERENT

      address: this.fb.array([addressForm])
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
    this.translateLocService.getTranslate('password-required', 'required password');
    this.translateLocService.getTranslate('last-required', 'required lastname');
    this.translateLocService.getTranslate('first-required', 'required firstname');
    this.translateLocService.getTranslate('street-required', 'required street');
    this.translateLocService.getTranslate('password-minlength', 'password min 8 chars');
    this.translateLocService.getTranslate('birthday-required', 'required birthday');
    this.translateLocService.getTranslate('email-email', 'non-compliance email');

    this.validationMessage = this.translateLocService.getValidationMessage();
    // Message erreur
    //=====
  }
  // Fonction qui initialise "validationMessages" avec la bonne langue en paramètre
  //=====

  addAddress() {
    this.userStreetCtrl = this.fb.control('',
      [Validators.required]
    );
    this.userCityCtrl = this.fb.control('',
      [Validators.required]
    );
    this.userCountryCtrl = this.fb.control('',
      [Validators.required]
    );

    let addressForm = new FormGroup({
      street: this.userStreetCtrl,
      country: this.userCountryCtrl,
      city: this.userCityCtrl
    });

    this.addFormArray.push(addressForm);
  }

  deleteAddress(pos: number) {
    console.log('>>> deleteAddress');
    this.addFormArray.removeAt(pos);
  }


  buildFormError(controlLoc) {
    for (let field in controlLoc) {
      //=====
      // Champ traite
      this.formError[field] = '';

      let control = controlLoc[field];

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


        for (let key in control.errors) {
          //=====
          // Type erreur
          console.log('>> message ' + field + ' ' + key + ' : ');

          this.formError[field] = this.validationMessage[field + '-' + key];
          // Type erreur
          //=====
        } // for (const key in control.errors)

        console.log(this.formError);
      } // if (control && control.dirty && !control.valid)
      // Champ traite
      //=====

    } // for (const field in this.formUser.controls)

  }

  /**
   * Enregister user
   */
  register() {
    if (this.userForm.invalid) {
      return true;
    }

    if (this.dUserExist == 0) {
      //=====
      // Post User
      console.log('>>> user POST - registerX');
      console.log(this.userForm.value);
      this.userService.setToken(this.sessionLoc.getToken());

      let resultPost = this.userService.postUser(this.userForm.value).then((val) => {
        console.log('>>> then');
        console.log(val);
        console.log('Return post', JSON.stringify(val));
        console.log(JSON.stringify(resultPost));

      }).catch((error) => {
        this.dialog.open(MyDialogComponent, {
          data: {
            dialogTitle: 'Error',
            dialogBody: error.message
          },
          width: '250px'
        })
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
      delete this.userForm.value.street;

      //==========
      // Send data
      //      this.userService.setToken(this.sessionLoc.getToken());
      console.log(this.userForm.value);
      let resultPut = this.userService.putUser(this.dUser._id, this.userForm.value).then((val) => {
        console.log('>>> then');
        console.log(val);

        this.dialog.open(MyDialogComponent, {
          data: {
            dialogTitle: 'Info',
            dialogBody: 'Update OK'
          },
          width: '250px'
        })

      }).catch((error) => {
        console.log('>> catch');
        console.log(error);

        this.dialog.open(MyDialogComponent, {
          data: {
            dialogTitle: 'Error',
            dialogBody: error.message
          },
          width: '250px'
        })

      });
      // Send data
      //==========
      console.log('Return put', resultPut);

      // Maj user
      //=====
    }

  }


}
