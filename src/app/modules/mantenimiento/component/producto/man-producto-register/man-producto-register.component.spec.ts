import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManProductoRegisterComponent } from './man-producto-register.component';

describe('ManProductoRegisterComponent', () => {
  let component: ManProductoRegisterComponent;
  let fixture: ComponentFixture<ManProductoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManProductoRegisterComponent]
    });
    fixture = TestBed.createComponent(ManProductoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
