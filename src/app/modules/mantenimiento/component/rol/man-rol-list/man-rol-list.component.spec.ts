import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManRolListComponent } from './man-rol-list.component';

describe('ManRolListComponent', () => {
  let component: ManRolListComponent;
  let fixture: ComponentFixture<ManRolListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManRolListComponent]
    });
    fixture = TestBed.createComponent(ManRolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
