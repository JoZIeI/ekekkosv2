import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManMenurolListComponent } from './man-menurol-list.component';

describe('ManMenurolListComponent', () => {
  let component: ManMenurolListComponent;
  let fixture: ComponentFixture<ManMenurolListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManMenurolListComponent]
    });
    fixture = TestBed.createComponent(ManMenurolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
