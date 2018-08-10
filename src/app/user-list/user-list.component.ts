import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

// import { POKEMONS } from '../mock/mock-user';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  tabUser: User[];

  loading = false;
  errorMessage = '';

  constructor(
    private userS: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService

  ) { }

  ngOnInit() {
//    this.tabUser = POKEMONS;
    console.log('user-list - ngOnInit');

    //=====
    
    this.userS.getUsers()
      .subscribe(data => this.tabUser = data);

    console.log('---------');
    console.log(this.tabUser);

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
