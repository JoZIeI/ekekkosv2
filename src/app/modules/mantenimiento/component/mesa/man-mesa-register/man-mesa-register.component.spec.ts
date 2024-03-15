import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMesaRegisterComponent } from './man-mesa-register.component';

describe('ManMesaRegisterComponent', () => {
  let component: ManMesaRegisterComponent;
  let fixture: ComponentFixture<ManMesaRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManMesaRegisterComponent]
    });
    fixture = TestBed.createComponent(ManMesaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
