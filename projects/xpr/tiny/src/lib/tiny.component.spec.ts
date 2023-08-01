import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyComponent } from './tiny.component';

describe('TinyComponent', () => {
  let component: TinyComponent;
  let fixture: ComponentFixture<TinyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TinyComponent]
    });
    fixture = TestBed.createComponent(TinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
