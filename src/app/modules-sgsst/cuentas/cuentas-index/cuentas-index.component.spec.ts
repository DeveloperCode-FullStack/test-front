import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasIndexComponent } from './cuentas-index.component';

describe('CuentasIndexComponent', () => {
  let component: CuentasIndexComponent;
  let fixture: ComponentFixture<CuentasIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentasIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
