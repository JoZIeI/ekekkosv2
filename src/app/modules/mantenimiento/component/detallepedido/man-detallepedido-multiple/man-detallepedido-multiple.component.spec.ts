import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManDetallepedidoMultipleComponent } from './man-detallepedido-multiple.component';

describe('ManDetallepedidoMultipleComponent', () => {
  let component: ManDetallepedidoMultipleComponent;
  let fixture: ComponentFixture<ManDetallepedidoMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManDetallepedidoMultipleComponent]
    });
    fixture = TestBed.createComponent(ManDetallepedidoMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
