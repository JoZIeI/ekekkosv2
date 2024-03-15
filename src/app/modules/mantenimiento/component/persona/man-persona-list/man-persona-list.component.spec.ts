import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPersonaListComponent } from './man-persona-list.component';

describe('ManPersonaListComponent', () => {
  let component: ManPersonaListComponent;
  let fixture: ComponentFixture<ManPersonaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPersonaListComponent]
    });
    fixture = TestBed.createComponent(ManPersonaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
