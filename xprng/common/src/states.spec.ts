import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, provideZonelessChangeDetection, viewChild} from '@angular/core';
import {EmptyState, ErrorState, LoadingState, OkState} from './states';


@Component({
  selector: 'test-component',
  imports: [LoadingState, OkState, ErrorState, EmptyState],
  template: `
    <xpr-loading-state>loading</xpr-loading-state>
    <xpr-ok-state>ok</xpr-ok-state>
    <xpr-error-state>error</xpr-error-state>
    <xpr-empty-state>empty</xpr-empty-state>
  `,
})
class TestComponent {
  loading = viewChild(LoadingState);
  empty = viewChild(EmptyState);
  ok = viewChild(OkState);
  error = viewChild(ErrorState);
}

describe('States', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        provideZonelessChangeDetection(),
      ],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create loading state', () => {
    expect(fixture.componentRef.instance.loading()).toBeTruthy();
  });

  it('should create empty state', () => {
    expect(fixture.componentRef.instance.empty()).toBeTruthy();
  });

  it('should create ok state', () => {
    expect(fixture.componentRef.instance.ok()).toBeTruthy();
  });

  it('should create error state', () => {
    expect(fixture.componentRef.instance.error()).toBeTruthy();
  });
});

