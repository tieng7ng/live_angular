import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { SessionLocService } from '../services/session-loc.service';

// import { POKEMONS } from '../mock/mock-user';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {
  // affichage de l'user connecté
  private displayIdentity: string;
  
  private tabUser: User[] = null;
  private user: User = null;
  private userDisplay: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionLoc: SessionLocService,

    private userService: UserService,
  ) {
  }

  ngOnInit() {
    console.log('> user component init');

    this.displayIdentity = this.sessionLoc.getFirstname() + ' - ' + this.sessionLoc.getLastname();


    //=====
    // Init user
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.userService.setToken(this.sessionLoc.getToken());

      this.userService.searchUser([[['_id'], [id]]])
        .subscribe(data => {
          //=====
          // Traitement du resultat de la recherche
          if (data.length == 1) {
            this.userDisplay = 1;
            this.user = data[0];
          } else {
            this.userDisplay = 0;
          }
          // Traitement du resultat de la recherche
          //=====

          console.log(data);
          console.log(this.user);
        }
        );
    });
    // Init user
    //=====

  }


  editUser(user: User) {
    //navigation link.
    this.router.navigate(['user/' + user._id + '/edit']);
  }
}
