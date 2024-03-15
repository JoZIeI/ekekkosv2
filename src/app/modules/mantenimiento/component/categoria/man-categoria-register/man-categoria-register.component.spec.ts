import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManCategoriaRegisterComponent } from './man-categoria-register.component';

describe('ManCategoriaRegisterComponent', () => {
  let component: ManCategoriaRegisterComponent;
  let fixture: ComponentFixture<ManCategoriaRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManCategoriaRegisterComponent]
    });
    fixture = TestBed.createComponent(ManCategoriaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
