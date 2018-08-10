import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// creation and utility methods
import { Observable, Subject, pipe } from 'rxjs';
// operators all come from `rxjs/operators`
import { catchError, map, takeUntil, tap } from 'rxjs/operators';


import { User } from '../models/user.model';
import { User_name } from '../models/user_name.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loading = false;
  errorMessage = '';

  constructor(protected http: HttpClient) {

    console.log('userService Constructor');
  }

  /**
   * Recherche d'un User dans une liste à partir nom et valeur d'un champ
   * @param tabParam : liste parametre ([ [field_name, value] ])
   */
  searchUser(tabParam: any): Observable<User[]> {
    console.log('user - service : searchUser');

    let param: string = '';
    console.log(tabParam);
    //=====
    // Construction de la requete
    for (let cmpt = 0; cmpt < tabParam.length; cmpt++) {
      if (cmpt == 0) {
        param += '?';
      } else {
        param += '&';
      }
      param += tabParam[cmpt][0] + '=' + tabParam[cmpt][1];
      console.log(param);
    }
    // Construction de la requete
    //=====

    let url = 'http://localhost:3000/users' + param;
    console.log('URL  ' + url);
    return this.http.get<User[]>(url);
  }

  /**
   * 
   */
  public getUsers(): Observable<User[]> {
    console.log('user - service : getUsers');
    return this.http.get<User[]>('http://localhost:3000/users');
  }


}
