import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Slides } from './slides';

describe('Slides', () => {
  let component: Slides;
  let fixture: ComponentFixture<Slides>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slides]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Slides);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
