import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { POKEMONS } from '../mock/mock-user';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {

  private tabUser: User[] = null;
  private user: User = null;
  private userDisplay: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    console.log('> user component init');
    //=====
    // Init user
    this.tabUser = POKEMONS;
    console.log(this.tabUser);

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');

      let fUser = this.userService.findUserInTab(this.tabUser, 'id', id);
      if (fUser !== false) {
        this.user = fUser;
        this.userDisplay = 1;
      }
    });
    // Init user
    //=====

  }

}
