import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManRolMultipleComponent } from './man-rol-multiple.component';

describe('ManRolMultipleComponent', () => {
  let component: ManRolMultipleComponent;
  let fixture: ComponentFixture<ManRolMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManRolMultipleComponent]
    });
    fixture = TestBed.createComponent(ManRolMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
