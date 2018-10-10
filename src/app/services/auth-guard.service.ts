import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SessionLocService } from '../services/session-loc.service';


@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(
    private sessionLoc: SessionLocService,
    private router: Router
  ) { }


  canActivate(
  ): boolean {
    console.log('>>> can Activate');
    // Connecté?
    if (!this.sessionLoc.getToken()) {
      console.log('>>> no connect');
      this.router.navigate(['/signin']);
    } else {
      return true;
    }

  }

}
