import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManRolRegisterComponent } from './man-rol-register.component';

describe('ManRolRegisterComponent', () => {
  let component: ManRolRegisterComponent;
  let fixture: ComponentFixture<ManRolRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManRolRegisterComponent]
    });
    fixture = TestBed.createComponent(ManRolRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
