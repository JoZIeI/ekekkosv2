import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPedidoListComponent } from './man-pedido-list.component';

describe('ManPedidoListComponent', () => {
  let component: ManPedidoListComponent;
  let fixture: ComponentFixture<ManPedidoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManPedidoListComponent]
    });
    fixture = TestBed.createComponent(ManPedidoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
