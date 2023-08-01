import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleLengthComponent } from './style-length.component';

describe('StyleLengthComponent', () => {
  let component: StyleLengthComponent;
  let fixture: ComponentFixture<StyleLengthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StyleLengthComponent]
    });
    fixture = TestBed.createComponent(StyleLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
