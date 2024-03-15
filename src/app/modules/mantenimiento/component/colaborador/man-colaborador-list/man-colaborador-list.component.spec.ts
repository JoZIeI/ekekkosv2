import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManColaboradorListComponent } from './man-colaborador-list.component';

describe('ManColaboradorListComponent', () => {
  let component: ManColaboradorListComponent;
  let fixture: ComponentFixture<ManColaboradorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManColaboradorListComponent]
    });
    fixture = TestBed.createComponent(ManColaboradorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
