import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMenuListComponent } from './man-menu-list.component';

describe('ManMenuListComponent', () => {
  let component: ManMenuListComponent;
  let fixture: ComponentFixture<ManMenuListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManMenuListComponent]
    });
    fixture = TestBed.createComponent(ManMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
