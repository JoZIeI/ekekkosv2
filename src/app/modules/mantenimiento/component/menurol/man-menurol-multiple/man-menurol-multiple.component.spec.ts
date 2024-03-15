import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMenurolMultipleComponent } from './man-menurol-multiple.component';

describe('ManMenurolMultipleComponent', () => {
  let component: ManMenurolMultipleComponent;
  let fixture: ComponentFixture<ManMenurolMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManMenurolMultipleComponent]
    });
    fixture = TestBed.createComponent(ManMenurolMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
