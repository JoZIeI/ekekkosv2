import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManUsuarioListComponent } from './man-usuario-list.component';

describe('ManUsuarioListComponent', () => {
  let component: ManUsuarioListComponent;
  let fixture: ComponentFixture<ManUsuarioListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManUsuarioListComponent]
    });
    fixture = TestBed.createComponent(ManUsuarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
