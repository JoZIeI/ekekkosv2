import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMetodopagoMultipleComponent } from './man-metodopago-multiple.component';

describe('ManMetodopagoMultipleComponent', () => {
  let component: ManMetodopagoMultipleComponent;
  let fixture: ComponentFixture<ManMetodopagoMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManMetodopagoMultipleComponent]
    });
    fixture = TestBed.createComponent(ManMetodopagoMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
