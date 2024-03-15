import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManUsuarioRegisterComponent } from './man-usuario-register.component';

describe('ManUsuarioRegisterComponent', () => {
  let component: ManUsuarioRegisterComponent;
  let fixture: ComponentFixture<ManUsuarioRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManUsuarioRegisterComponent]
    });
    fixture = TestBed.createComponent(ManUsuarioRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
