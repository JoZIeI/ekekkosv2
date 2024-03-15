import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPedidoRegisterComponent } from './man-pedido-register.component';

describe('ManPedidoRegisterComponent', () => {
  let component: ManPedidoRegisterComponent;
  let fixture: ComponentFixture<ManPedidoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPedidoRegisterComponent]
    });
    fixture = TestBed.createComponent(ManPedidoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
