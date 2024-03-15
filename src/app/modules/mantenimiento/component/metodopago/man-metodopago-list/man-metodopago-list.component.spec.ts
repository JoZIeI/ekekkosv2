import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMetodopagoListComponent } from './man-metodopago-list.component';

describe('ManMetodopagoListComponent', () => {
  let component: ManMetodopagoListComponent;
  let fixture: ComponentFixture<ManMetodopagoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManMetodopagoListComponent]
    });
    fixture = TestBed.createComponent(ManMetodopagoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
