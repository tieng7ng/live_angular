import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDialogValidComponent } from './my-dialog-valid.component';

describe('MyDialogValidComponent', () => {
  let component: MyDialogValidComponent;
  let fixture: ComponentFixture<MyDialogValidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDialogValidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDialogValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
