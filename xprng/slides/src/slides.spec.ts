import { TestBed } from "@angular/core/testing";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { Slides } from "./slides";
import { Slide } from "./slide";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { SlidesHarness } from "@xprng/slides/testing";

@Component({
  selector: "test-component",
  imports: [Slides, Slide],
  template: `
        <xpr-slides>
            <xpr-slide>A</xpr-slide>
            <xpr-slide>B</xpr-slide>
            <xpr-slide>C</xpr-slide>
        </xpr-slides>
    `,
})
class TestComponent {
}

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [Slides],
    providers: [
      provideZonelessChangeDetection(),
    ],
  });
});

describe("Slides errors", () => {
  it("should create a component (sanity)", () => {
    const fixture = TestBed.createComponent(Slides);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it("should show first item", async () => {
    const fixture = TestBed.createComponent(TestComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const slides = await loader.getHarnessOrNull(SlidesHarness);
    expect(slides).toBeTruthy();

    const host = await (slides as SlidesHarness).host();
    expect(await host?.text()).toEqual("A");
  });

  it("should show second item", async () => {
    const fixture = TestBed.createComponent(TestComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const slides = await loader.getHarnessOrNull(SlidesHarness);
    expect(slides).toBeTruthy();

    const host = await (slides as SlidesHarness).host();
    await host.dispatchEvent("click");
    expect(await host?.text()).toEqual("B");
  });

  it("should show third item", async () => {
    const fixture = TestBed.createComponent(TestComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);

    const slides = await loader.getHarnessOrNull(SlidesHarness);
    expect(slides).toBeTruthy();

    const host = await (slides as SlidesHarness).host();
    await host.dispatchEvent("click");
    await host.dispatchEvent("click");
    expect(await host?.text()).toEqual("C");
  });
});
