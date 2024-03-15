import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMesaMultipleComponent } from './man-mesa-multiple.component';

describe('ManMesaMultipleComponent', () => {
  let component: ManMesaMultipleComponent;
  let fixture: ComponentFixture<ManMesaMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManMesaMultipleComponent]
    });
    fixture = TestBed.createComponent(ManMesaMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
