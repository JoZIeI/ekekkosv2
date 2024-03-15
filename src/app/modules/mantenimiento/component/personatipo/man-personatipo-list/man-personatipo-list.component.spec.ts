import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPersonatipoListComponent } from './man-personatipo-list.component';

describe('ManPersonatipoListComponent', () => {
  let component: ManPersonatipoListComponent;
  let fixture: ComponentFixture<ManPersonatipoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPersonatipoListComponent]
    });
    fixture = TestBed.createComponent(ManPersonatipoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
