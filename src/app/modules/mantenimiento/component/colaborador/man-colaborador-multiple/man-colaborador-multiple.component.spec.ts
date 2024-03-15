import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManColaboradorMultipleComponent } from './man-colaborador-multiple.component';

describe('ManColaboradorMultipleComponent', () => {
  let component: ManColaboradorMultipleComponent;
  let fixture: ComponentFixture<ManColaboradorMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManColaboradorMultipleComponent]
    });
    fixture = TestBed.createComponent(ManColaboradorMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
