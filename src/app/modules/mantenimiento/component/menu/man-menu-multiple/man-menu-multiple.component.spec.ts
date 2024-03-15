import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMenuMultipleComponent } from './man-menu-multiple.component';

describe('ManMenuMultipleComponent', () => {
  let component: ManMenuMultipleComponent;
  let fixture: ComponentFixture<ManMenuMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManMenuMultipleComponent]
    });
    fixture = TestBed.createComponent(ManMenuMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
