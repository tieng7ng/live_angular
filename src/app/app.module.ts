
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

import { AngularWebStorageModule } from 'angular-web-storage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyMaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthGuardService as AuthGuard} from './services/auth-guard.service';

//=====
// Material  MatFormFieldControl
//import { MatDialogModule, MatFormFieldModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { MatInputModule } from '@angular/material';

// Material
//=====

//=====
// Component
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MyDialogOptionComponent } from './my-dialog-option/my-dialog-option.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';

import { SignInComponent } from './sign-in/sign-in.component';

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
    SignInComponent,
    MyDialogOptionComponent,
    MyDialogComponent,
    //    FormBuilder,
    //    FormGroup
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularWebStorageModule,

    MatInputModule,
    /*
    //=====
    // Material
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    // Material
    //=====
    */

    MyMaterialModule,

    //    Observable,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [MyDialogComponent, MyDialogOptionComponent]

})
export class AppModule { }
