import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// creation and utility methods
import { Observable, Subject, pipe } from 'rxjs';
// operators all come from `rxjs/operators`
import { catchError, map, takeUntil, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

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

    let url = environment.USER_API_ROOT + param;
    console.log('URL  ' + url);
    return this.http.get<User[]>(url);
  }

  /**
   * 
   */
  public getUsers(): Observable<User[]> {
    console.log('user - service : getUsers');
    return this.http.get<User[]>(environment.USER_API_ROOT);
  }

  public postUser(param: User) {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let url = environment.USER_API_ROOT;

    console.log('user - service : postUsers'
      , url, JSON.stringify(JSON.stringify(param)));

    return new Promise((resolve, reject) => {
      this.http.post<User>(url, JSON.stringify(JSON.stringify(param)),
        { headers })
        .subscribe(
          returnUser => {
            console.log("POST call successful value returned in body",
              returnUser);
            resolve(returnUser);
          },
          response => {
            console.log("POST call in error", response, url, param);
            reject(response);
          },
          () => {
            console.log("The POST observable is now completed.");
          }
        );
    });
  } // public postUser(param: string) 

  public putUser(idUser: number, param: User) {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    let returnUser: User;

    console.log('user - service : putUsers'
      , environment.USER_API_ROOT + '/' + idUser, JSON.stringify(param));

    return new Promise((resolve, reject) => {
      this.http.put<User>(environment.USER_API_ROOT + '/' + idUser, JSON.stringify(param),
        { headers })
        .subscribe(
          returnUser => {
            console.log("PUT call successful value returned in body",
              returnUser);
            resolve(returnUser);
          },
          response => {
            console.log("PUT call in error", response);
            reject(response);
          },
          () => {
            console.log("The PUT observable is now completed.");
          }
        );
    });
  }

}
