import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPersonatipodocumentoListComponent } from './man-personatipodocumento-list.component';

describe('ManPersonatipodocumentoListComponent', () => {
  let component: ManPersonatipodocumentoListComponent;
  let fixture: ComponentFixture<ManPersonatipodocumentoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPersonatipodocumentoListComponent]
    });
    fixture = TestBed.createComponent(ManPersonatipodocumentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
