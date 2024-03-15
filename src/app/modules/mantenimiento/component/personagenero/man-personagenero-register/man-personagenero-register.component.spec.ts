import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPersonageneroRegisterComponent } from './man-personagenero-register.component';

describe('ManPersonageneroRegisterComponent', () => {
  let component: ManPersonageneroRegisterComponent;
  let fixture: ComponentFixture<ManPersonageneroRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPersonageneroRegisterComponent]
    });
    fixture = TestBed.createComponent(ManPersonageneroRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
