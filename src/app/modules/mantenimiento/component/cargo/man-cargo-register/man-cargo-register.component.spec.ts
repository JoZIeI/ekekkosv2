import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManCargoRegisterComponent } from './man-cargo-register.component';

describe('ManCargoRegisterComponent', () => {
  let component: ManCargoRegisterComponent;
  let fixture: ComponentFixture<ManCargoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManCargoRegisterComponent]
    });
    fixture = TestBed.createComponent(ManCargoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
