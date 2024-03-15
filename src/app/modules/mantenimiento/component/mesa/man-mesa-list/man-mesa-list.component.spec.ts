import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMesaListComponent } from './man-mesa-list.component';

describe('ManMesaListComponent', () => {
  let component: ManMesaListComponent;
  let fixture: ComponentFixture<ManMesaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManMesaListComponent]
    });
    fixture = TestBed.createComponent(ManMesaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
