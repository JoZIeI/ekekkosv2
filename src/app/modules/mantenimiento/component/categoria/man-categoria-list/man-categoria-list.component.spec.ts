import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManCategoriaListComponent } from './man-categoria-list.component';

describe('ManCategoriaListComponent', () => {
  let component: ManCategoriaListComponent;
  let fixture: ComponentFixture<ManCategoriaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManCategoriaListComponent]
    });
    fixture = TestBed.createComponent(ManCategoriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
