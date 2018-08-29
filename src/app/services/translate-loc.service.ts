import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateLocService {
  public validationMessage: any;

  constructor(private translateService: TranslateService) { 
    this.validationMessage = [];
  }

  /**
   * Build tablau messages d'erreur du formulaire
   * @param key1: nom du champ
   * @param key2: type erreur
   * @param translate : message erreur
   */
  getTranslate(key1: string, key2: string, translate: string) {
    this.translateService.get(translate).subscribe(
      translation => {
        this.validationMessage[key1 + '-' + key2] = translation;
      }
    );
  }

  getValidationMessage():Observable<string[]> {
    return this.validationMessage;
  }

}
