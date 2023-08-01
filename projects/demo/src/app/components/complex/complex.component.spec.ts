import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexComponent } from './complex.component';

describe('ComplexComponent', () => {
  let component: ComplexComponent;
  let fixture: ComponentFixture<ComplexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComplexComponent]
    });
    fixture = TestBed.createComponent(ComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
