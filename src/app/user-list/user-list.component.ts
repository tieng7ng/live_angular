import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

// import { POKEMONS } from '../mock/mock-user';
import { SessionLocService } from '../services/session-loc.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  // liste des users
  tabUser: any;

  // affichage de l'user connecté
  displayIdentity: string;


  loading = false;
  errorMessage = '';

  constructor(
    public local: LocalStorageService,
    public session: SessionStorageService,
    private sessionLoc: SessionLocService,
    private userS: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
    

  ) { }

  ngOnInit() {
//    this.tabUser = POKEMONS;
    console.log('user-list - ngOnInit');

    //=====
    // Connecté?
    if (!this.sessionLoc.getToken()) {
      this.router.navigate(['/signin']);
    }
    this.displayIdentity = this.sessionLoc.getFirstname() + ' - ' + this.sessionLoc.getLastname();
    // Connecté?
    //=====

    let tabOption = {token: this.sessionLoc.getToken()};
    this.userS.getUsers(tabOption).then((val) => {
      console.log('>>> then');
      console.log(val);
      this.tabUser = val;


    }).catch((error) => {
      console.log('>> catch');
      console.log(error);
    })

  }

  selectPokemon(event: any) {
    console.log(event.id);

    //navigation link.
    this.router.navigate(['user/' + event._id]);
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

}
