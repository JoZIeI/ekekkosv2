import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManUbicaciongeoListComponent } from './man-ubicaciongeo-list.component';

describe('ManUbicaciongeoListComponent', () => {
  let component: ManUbicaciongeoListComponent;
  let fixture: ComponentFixture<ManUbicaciongeoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManUbicaciongeoListComponent]
    });
    fixture = TestBed.createComponent(ManUbicaciongeoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
