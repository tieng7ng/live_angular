import { Injectable } from '@angular/core';

import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';


@Injectable({
  providedIn: 'root'
})
export class SessionLocService {
  private first: string = 'first';
  private last: string = 'last';
  private token: string = 'token';


  constructor(
    private local: LocalStorageService,
    private session: SessionStorageService,
  ) { }

  public getFirstname() {
    return this.local.get(this.first);
  }

  public setFirstname(value: string) {
    this.local.set(this.first, value);
  }

  public getLastname() {
    return this.local.get(this.last);
  }

  public setLastname(value: string) {
    this.local.set(this.last, value);
  }

  public getToken() {
    return this.local.get(this.token);
  }

  /**
   * Store in session
   * @param value 
   */
  public setToken(value: string) {
    this.local.set(this.token, value);
  }

  public reset() {
    this.setToken('');
    this.setFirstname('');
    this.setLastname('');
  }


}
