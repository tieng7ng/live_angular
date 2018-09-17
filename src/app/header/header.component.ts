import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { SessionLocService } from '../services/session-loc.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() displayHeadIdentity : string;

  constructor(
    private route: Router,
    private sessionLoc: SessionLocService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  logout() {
    console.log('header component - logout')
    this.sessionLoc.reset();
    this.route.navigate(['/signin']);

  }
}
