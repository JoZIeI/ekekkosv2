import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManColaboradorRegisterComponent } from './man-colaborador-register.component';

describe('ManColaboradorRegisterComponent', () => {
  let component: ManColaboradorRegisterComponent;
  let fixture: ComponentFixture<ManColaboradorRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManColaboradorRegisterComponent]
    });
    fixture = TestBed.createComponent(ManColaboradorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
