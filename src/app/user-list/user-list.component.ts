import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { POKEMONS } from '../mock/mock-user';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  tabUser: User[] = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService

  ) { }

  ngOnInit() {
    this.tabUser = POKEMONS;
    console.log(this.tabUser);
  }

  selectPokemon(event: any){
    console.log(event.id);

    //navigation link.
    this.router.navigate(['user/' + event.id]);
  }

  goBack(): void{
    this.router.navigate(['/users']);
  }

}
