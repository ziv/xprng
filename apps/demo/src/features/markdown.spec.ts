import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Markdown } from './markdown';

describe('Markdown', () => {
  let component: Markdown;
  let fixture: ComponentFixture<Markdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Markdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Markdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
