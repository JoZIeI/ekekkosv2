import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPersonatipoRegisterComponent } from './man-personatipo-register.component';

describe('ManPersonatipoRegisterComponent', () => {
  let component: ManPersonatipoRegisterComponent;
  let fixture: ComponentFixture<ManPersonatipoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPersonatipoRegisterComponent]
    });
    fixture = TestBed.createComponent(ManPersonatipoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
