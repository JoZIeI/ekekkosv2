import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPedidoMultipleComponent } from './man-pedido-multiple.component';

describe('ManPedidoMultipleComponent', () => {
  let component: ManPedidoMultipleComponent;
  let fixture: ComponentFixture<ManPedidoMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPedidoMultipleComponent]
    });
    fixture = TestBed.createComponent(ManPedidoMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
