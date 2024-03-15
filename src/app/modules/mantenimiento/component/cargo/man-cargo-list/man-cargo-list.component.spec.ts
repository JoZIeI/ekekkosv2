import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManCargoListComponent } from './man-cargo-list.component';

describe('ManCargoListComponent', () => {
  let component: ManCargoListComponent;
  let fixture: ComponentFixture<ManCargoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManCargoListComponent]
    });
    fixture = TestBed.createComponent(ManCargoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
