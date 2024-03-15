import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPersonatipodocumentoMultipleComponent } from './man-personatipodocumento-multiple.component';

describe('ManPersonatipodocumentoMultipleComponent', () => {
  let component: ManPersonatipodocumentoMultipleComponent;
  let fixture: ComponentFixture<ManPersonatipodocumentoMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPersonatipodocumentoMultipleComponent]
    });
    fixture = TestBed.createComponent(ManPersonatipodocumentoMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
