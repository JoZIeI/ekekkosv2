import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMenurolRegisterComponent } from './man-menurol-register.component';

describe('ManMenurolRegisterComponent', () => {
  let component: ManMenurolRegisterComponent;
  let fixture: ComponentFixture<ManMenurolRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManMenurolRegisterComponent]
    });
    fixture = TestBed.createComponent(ManMenurolRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
