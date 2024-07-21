import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElementDescComponent } from './form-element-desc.component';

describe('FormElementDescComponent', () => {
  let component: FormElementDescComponent;
  let fixture: ComponentFixture<FormElementDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormElementDescComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormElementDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
