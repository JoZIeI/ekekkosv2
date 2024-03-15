import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPersonaRegisterComponent } from './man-persona-register.component';

describe('ManPersonaRegisterComponent', () => {
  let component: ManPersonaRegisterComponent;
  let fixture: ComponentFixture<ManPersonaRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPersonaRegisterComponent]
    });
    fixture = TestBed.createComponent(ManPersonaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
