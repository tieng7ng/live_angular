import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { POKEMONS } from '../mock/mock-user';
import { User } from '../models/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.users = POKEMONS;
    console.log(this.users);
  }

  selectPokemon(event: any){
    console.log(event);
  }

  goBack(): void{
    this.router.navigate(['/users']);
  }

}
