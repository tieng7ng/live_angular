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
  private token: string;

  loading = false;
  errorMessage = '';

  constructor(protected http: HttpClient) {

    console.log('userService Constructor');
  }

  setToken(tokenLoc: string) {
    this.token = tokenLoc;
  }

  /**
   * Recherche d'un User dans une liste à partir nom et valeur d'un champ
   * @param tabParam : liste parametre ([ [[field_name], [value]] ])
   */
  public searchUser(tabParam: any): Observable<User[]> {
    console.log('user - service : searchUser');

    console.log(tabParam);
    console.log('>> param ' + tabParam[0][0][0] + '=', '---' + tabParam[0][1][0]);


    //=====
    // Construction de la requete
    let param: string = '';

    for (let cmpt = 0; cmpt < tabParam.length; cmpt++) {
      console.log('>>>>>', tabParam[cmpt][0][0], tabParam[cmpt][1][0], '<<<<<<<<<');
      if (cmpt == 0) {
        param += '?';
      } else {
        param += '&';
      }
      param += tabParam[cmpt][0][0] + '=' + tabParam[cmpt][1][0];
    }
    // Construction de la requete
    //=====

    let url = environment.USER_API_ROOT + param;
    console.log('URL  ' + url);

    let headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('token', this.token)

    return this.http.get<User[]>(url, { headers: headers });
  }

  /**
   * 
   */
  public getUsers(option?: any) {
    console.log('user - service : getUsers');

    //=====
    // build query params
    let param: string = '';
    let cmpt: number = 0;
    for (var key in option) {
      if (cmpt == 0) {
        param += '?';
      } else {
        param += '&';
      }
      param += key + '=' + option[key];
    }
    // build query params
    //=====

    let url = environment.USER_API_ROOT + param;
    console.log('>>> url ', url);


    let headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      //      .append('Access-Control-Allow-Origin', '*')
      .append('token', this.token)
    //      .append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //      'Authorization': 'my-auth-token'
      })
    };

    // Authorization: `Bearer ${currentUser.token}`
    console.log(headers, headers.get('Authorization'));

    return new Promise((resolve, reject) => {
      this.http.get<User>(url,
        { headers: headers })
        .subscribe(
          returnUser => {
            console.log("POST call successful value returned in body",
              returnUser);
            resolve(returnUser);
          },
          response => {
            console.log("POST call in error", response, url);
            reject(response);
          },
          () => {
            console.log("The POST observable is now completed.");
          }
        );
    });
  }


  public postUser(userParam: User) {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let param: string = '?token=' + this.token;

    let url = environment.USER_API_ROOT + param;

    console.log('user - service : postUsers'
      , url, JSON.stringify(JSON.stringify(userParam)));

    return new Promise((resolve, reject) => {
      this.http.post<User>(url, JSON.stringify(JSON.stringify(userParam)),
        { headers })
        .subscribe(
          returnUser => {
            console.log("POST call successful value returned in body",
              returnUser);
            resolve(returnUser);
          },
          response => {
            console.log("POST call in error", response, url, userParam);
            reject(response);
          },
          () => {
            console.log("The POST observable is now completed.");
          }
        );
    });
  } // public postUser(param: string) 


  public signinUser(param: User) {

    let headers = new HttpHeaders()
      .set("content-type", "application/json")
    //      .set("authorization", "my-auth-token");

    let url = environment.SIGN_API_ROOT + '/in';

    console.log('user - service : postUsers ----  '
      , url, JSON.stringify(JSON.stringify(param)));


    return new Promise((resolve, reject) => {
      this.http.post<User>(url, (JSON.stringify(param)),
        { headers })
        .subscribe(
          returnUser => {
            console.log("SIGNIN call successful value returned in body",
              returnUser);
            resolve(returnUser);
          },
          response => {
            console.log("SIGNIN call in error", response, url, param);
            reject(response);
          },
          () => {
            console.log("The SIGNIN observable is now completed.");
          }
        );
    });
  } // public postUser(param: string) 

  public putUser(idUser: number, userParam: User) {
    let headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('token', this.token)

    const httpOptions = {
      headers: new HttpHeaders({
        //        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',

        //        'Authorization': 'my-auth-token'
      })
    };


    let returnUser: User;
    let param: string = `/${idUser}`;
    let url: string = environment.USER_API_ROOT + param;

    console.log('user - service : putUsers');
    console.log(url, JSON.stringify(userParam));

    return new Promise((resolve, reject) => {
      this.http.put<User>(url, JSON.stringify(userParam),
        //        { headers })
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

  public deleteUser(idUser: number, userParam: User) {
    let param: string = `/${idUser}`;
    let url: string = environment.USER_API_ROOT + param;

    console.log('user - service : deleteUsers');

    return new Promise((resolve, reject) => {
      this.http.delete<User>(url)
        .subscribe(
          returnUser => {
            console.log("DELETE call successful value returned in body",
              returnUser);
            resolve(returnUser);
          },
          response => {
            console.log("DELETE call in error", response);
            reject(response);
          },
          () => {
            console.log("The DELETE observable is now completed.");
          }
        );
    });
  }


}
