import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgContainerComponent } from './svg-container.component';

describe('SvgContainerComponent', () => {
  let component: SvgContainerComponent;
  let fixture: ComponentFixture<SvgContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SvgContainerComponent]
    });
    fixture = TestBed.createComponent(SvgContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
