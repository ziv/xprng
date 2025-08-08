import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vendor } from './vendor';

describe('Vendor', () => {
  let component: Vendor;
  let fixture: ComponentFixture<Vendor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vendor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vendor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
