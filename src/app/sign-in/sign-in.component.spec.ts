import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let comp: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignInComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SignInComponent);

      comp = fixture.componentInstance; // ContactComponent test instance
      // query for the title <h1> by CSS element selector
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));
/*
  it(`should have as text 'contact page'`, async(() => {
    expect(comp.displayIdentity).toEqual('');
  }));
/*
  it(`should set submitted to true`, async(() => {
    comp.register();
    expect(comp.register).toBeTruthy();
  }));

  it(`should call the onSubmit method`, async(() => {
    spyOn(comp, 'register');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(comp.register).toHaveBeenCalled();
  }));

 it(`form should be invalid`, async(() => {
    comp.contactForm.controls['email'].setValue('');
    comp.contactForm.controls['name'].setValue('');
    comp.contactForm.controls['text'].setValue('');
    expect(comp.contactForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    comp.contactForm.controls['email'].setValue('asd@asd.com');
    comp.contactForm.controls['name'].setValue('aada');
    comp.contactForm.controls['text'].setValue('text');
    expect(comp.contactForm.valid).toBeTruthy();
  }));
  */
});
