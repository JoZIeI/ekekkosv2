import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManProductoMultipleComponent } from './man-producto-multiple.component';

describe('ManProductoMultipleComponent', () => {
  let component: ManProductoMultipleComponent;
  let fixture: ComponentFixture<ManProductoMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManProductoMultipleComponent]
    });
    fixture = TestBed.createComponent(ManProductoMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
