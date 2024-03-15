import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPersonatipodocumentoRegisterComponent } from './man-personatipodocumento-register.component';

describe('ManPersonatipodocumentoRegisterComponent', () => {
  let component: ManPersonatipodocumentoRegisterComponent;
  let fixture: ComponentFixture<ManPersonatipodocumentoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPersonatipodocumentoRegisterComponent]
    });
    fixture = TestBed.createComponent(ManPersonatipodocumentoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
