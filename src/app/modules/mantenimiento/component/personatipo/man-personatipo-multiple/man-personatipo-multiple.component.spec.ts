import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPersonatipoMultipleComponent } from './man-personatipo-multiple.component';

describe('ManPersonatipoMultipleComponent', () => {
  let component: ManPersonatipoMultipleComponent;
  let fixture: ComponentFixture<ManPersonatipoMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPersonatipoMultipleComponent]
    });
    fixture = TestBed.createComponent(ManPersonatipoMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
