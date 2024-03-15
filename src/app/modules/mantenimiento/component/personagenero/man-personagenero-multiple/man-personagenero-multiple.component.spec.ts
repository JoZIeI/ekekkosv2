import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPersonageneroMultipleComponent } from './man-personagenero-multiple.component';

describe('ManPersonageneroMultipleComponent', () => {
  let component: ManPersonageneroMultipleComponent;
  let fixture: ComponentFixture<ManPersonageneroMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPersonageneroMultipleComponent]
    });
    fixture = TestBed.createComponent(ManPersonageneroMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
