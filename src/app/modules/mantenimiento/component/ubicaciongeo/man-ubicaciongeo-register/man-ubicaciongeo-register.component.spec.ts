import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManUbicaciongeoRegisterComponent } from './man-ubicaciongeo-register.component';

describe('ManUbicaciongeoRegisterComponent', () => {
  let component: ManUbicaciongeoRegisterComponent;
  let fixture: ComponentFixture<ManUbicaciongeoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManUbicaciongeoRegisterComponent]
    });
    fixture = TestBed.createComponent(ManUbicaciongeoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
