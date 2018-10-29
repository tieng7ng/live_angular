import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { SessionLocService } from '../services/session-loc.service';
import { TranslateLocService } from '../services/translate-loc.service';

// import { POKEMONS } from '../mock/mock-user';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

import { MatDialog } from "@angular/material";
import { MyDialogOptionComponent } from "../my-dialog-option/my-dialog-option.component";

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
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private sessionLoc: SessionLocService,
    private translateLocService: TranslateLocService,
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


    /**
   * 
   * @param userId 
   * @param userEmail 
   */
  openDialog(userId: string, userEmail: string): void {
    //=====
    // Message error
    this.translateLocService.getTranslate('dialogTitle', 'Validat');
    this.translateLocService.getTranslate('dialogMessage', 'Delete user');

    let tabMessage = this.translateLocService.getValidationMessage();
    let dialogRef = this.dialog.open(MyDialogOptionComponent, {
      data: {
        dialogTitle: tabMessage['dialogTitle'],
        dialogBody: tabMessage['dialogMessage']+' : '+userEmail,
        dialogParam: userId
      },
      width: '550px'
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result == true) {
        this.deleteUser(userId);11
      }
    });

    console.log('>> end myDialogOption');
    // Message error
    //=====
  }

  
  deleteUser(userId: string): void {
    console.log(userId);
    //=====
    // delete user
    console.log('>>> user edit - delete');

    this.userService.setToken(this.sessionLoc.getToken());

    let resultPut = this.userService.deleteUser(userId).then((val) => {
      console.log('>>> then');
      console.log(val);
      this.router.navigateByUrl('/user');
    }).catch((error) => {
      console.log('>> catch');
      console.log(error);
    })
    
    console.log('Return put', resultPut);

    // delete user
    //=====
  }
}
