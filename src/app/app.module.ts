import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// import ngx-translate and the http loader
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { FormBuilder, FormGroup } from '@angular/forms';

//=====
// Component
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
// Component
//=====

//=====
// Directive
import { BorderCardDirectiveDirective } from './directives/border-card-directive.directive';
// Directive
//=====

// Fichier de traduction
export const createTranslateLoader = (http: HttpClient) => {
  console.log('createTranslateLoader');
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
};


@NgModule({
  declarations: [
    AppComponent,
    BorderCardDirectiveDirective,
    UserListComponent,
    UserDetailComponent,
    PageNotFoundComponent,
    HeaderComponent,
    UserEditComponent,
//    FormBuilder,
//    FormGroup
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
//    Observable,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
