import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManCargoMultipleComponent } from './man-cargo-multiple.component';

describe('ManCargoMultipleComponent', () => {
  let component: ManCargoMultipleComponent;
  let fixture: ComponentFixture<ManCargoMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManCargoMultipleComponent]
    });
    fixture = TestBed.createComponent(ManCargoMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
