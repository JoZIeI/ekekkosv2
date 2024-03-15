import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManProductoListComponent } from './man-producto-list.component';

describe('ManProductoListComponent', () => {
  let component: ManProductoListComponent;
  let fixture: ComponentFixture<ManProductoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManProductoListComponent]
    });
    fixture = TestBed.createComponent(ManProductoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
