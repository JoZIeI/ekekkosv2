import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManUsuarioMultipleComponent } from './man-usuario-multiple.component';

describe('ManUsuarioMultipleComponent', () => {
  let component: ManUsuarioMultipleComponent;
  let fixture: ComponentFixture<ManUsuarioMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManUsuarioMultipleComponent]
    });
    fixture = TestBed.createComponent(ManUsuarioMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
