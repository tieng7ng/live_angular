import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './mock/mock-user';
import { User } from './models/user.model';

import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { UserService } from './services/user.service';


//=====
// Utilisé par SESSION
//import { Inject, Injectable } from '@angular/core';
//import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
// Utilisé par SESSION
//=====

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';

  users: User[] = null;


  constructor(private user: UserService) {

  }

  ngOnInit() {
    let listTmp = this.user.getAll('','','');
    //let listTmp = this.user.getAll();
    listTmp.subscribe((response) => {
      console.log('list resolve', response['result']['users']);
      this.users = response['result']['users'];
      //      resolve (response);
    },
      (error) => {
        //   this.errorMessage = error.message; this.loading = false; 
      },
      () => {//this.loading = false;
      })



    this.users = POKEMONS;
    console.log(this.users);
  }

}

