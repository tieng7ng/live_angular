import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /**
   * Recherche d'un User dans une liste à partir nom et valeur d'un champ
   * @param tabUser : liste User (model)
   * @param field : nom du champ
   * @param value : valeur du champ
   */
  findUserInTab(tabUser: User[], field: string, value: any) {
    let bFind:  boolean = false;
    let uFind:  User    = null;
    let cmpt:   number  = 0;
    let max:number = tabUser.length;
    while (bFind == false && cmpt < max) {
      if (tabUser[cmpt][field] == value) {
        uFind = tabUser[cmpt];
        bFind = true;
        return uFind;
      }
      cmpt++;
    }
    return false;
  }
}
