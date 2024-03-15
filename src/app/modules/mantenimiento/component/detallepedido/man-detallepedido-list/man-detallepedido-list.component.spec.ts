import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManDetallepedidoListComponent } from './man-detallepedido-list.component';

describe('ManDetallepedidoListComponent', () => {
  let component: ManDetallepedidoListComponent;
  let fixture: ComponentFixture<ManDetallepedidoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManDetallepedidoListComponent]
    });
    fixture = TestBed.createComponent(ManDetallepedidoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
