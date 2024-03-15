import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPersonaMultipleComponent } from './man-persona-multiple.component';

describe('ManPersonaMultipleComponent', () => {
  let component: ManPersonaMultipleComponent;
  let fixture: ComponentFixture<ManPersonaMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPersonaMultipleComponent]
    });
    fixture = TestBed.createComponent(ManPersonaMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
