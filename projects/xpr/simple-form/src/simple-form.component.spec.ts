import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XprSimpleForm } from './simple-form.component';

describe('SimpleFormComponent', () => {
  let component: XprSimpleForm;
  let fixture: ComponentFixture<XprSimpleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XprSimpleForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XprSimpleForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
