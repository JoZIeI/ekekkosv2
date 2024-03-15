import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManDetallepedidoRegisterComponent } from './man-detallepedido-register.component';

describe('ManDetallepedidoRegisterComponent', () => {
  let component: ManDetallepedidoRegisterComponent;
  let fixture: ComponentFixture<ManDetallepedidoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManDetallepedidoRegisterComponent]
    });
    fixture = TestBed.createComponent(ManDetallepedidoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
