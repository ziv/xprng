import { TestBed } from "@angular/core/testing";
import { Slide } from "./slide";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { SlideHarness } from "@xprng/slides/testing";

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [Slide],
    providers: [
      provideZonelessChangeDetection(),
    ],
  });
});

describe("Slide", () => {
  it("should create a component", () => {
    const fixture = TestBed.createComponent(Slide);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it("should hide content", async () => {
    @Component({
      selector: "test-component",
      imports: [Slide],
      template: "<xpr-slide><p>Test Content</p></xpr-slide>",
    })
    class TestComponent {
    }

    const fixture = TestBed.createComponent(TestComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const slide = await loader.getHarness(SlideHarness);
    const content = await slide.content();
    expect(content).toBeFalsy();
  });

  it("should show content on show()", async () => {
    @Component({
      selector: "test-component",
      imports: [Slide],
      template: '<xpr-slide [display]="true"><p>Test Content</p></xpr-slide>',
    })
    class TestComponent {
    }

    const fixture = TestBed.createComponent(TestComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const slide = await loader.getHarness(SlideHarness);
    const content = await slide.content();
    expect(content).toBeTruthy();
  });
});
