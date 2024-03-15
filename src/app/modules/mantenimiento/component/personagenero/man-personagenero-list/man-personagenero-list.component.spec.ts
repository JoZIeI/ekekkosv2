import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPersonageneroListComponent } from './man-personagenero-list.component';

describe('ManPersonageneroListComponent', () => {
  let component: ManPersonageneroListComponent;
  let fixture: ComponentFixture<ManPersonageneroListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPersonageneroListComponent]
    });
    fixture = TestBed.createComponent(ManPersonageneroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
