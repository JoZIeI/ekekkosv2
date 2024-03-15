import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManUbicaciongeoMultipleComponent } from './man-ubicaciongeo-multiple.component';

describe('ManUbicaciongeoMultipleComponent', () => {
  let component: ManUbicaciongeoMultipleComponent;
  let fixture: ComponentFixture<ManUbicaciongeoMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManUbicaciongeoMultipleComponent]
    });
    fixture = TestBed.createComponent(ManUbicaciongeoMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
