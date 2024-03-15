import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManCategoriaMultipleComponent } from './man-categoria-multiple.component';

describe('ManCategoriaMultipleComponent', () => {
  let component: ManCategoriaMultipleComponent;
  let fixture: ComponentFixture<ManCategoriaMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManCategoriaMultipleComponent]
    });
    fixture = TestBed.createComponent(ManCategoriaMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
