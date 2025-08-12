import { TestBed } from "@angular/core/testing";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { ErrorState } from "@xprng/common";
import { Code } from "./code";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { CodeHarness } from "../testing/code-harness";
import { ErrorStateHarness } from "@xprng/common/testing";

describe("Code", () => {
  // setup environment
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Code],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // verify that there are no outstanding requests
    http.verify();
  });

  it("should create an empty component", () => {
    const fixture = TestBed.createComponent(Code);
    expect(fixture.debugElement.nativeElement.innerHTML).toEqual(
      "<!--container--><!--container--><!--container--><!--container--><!--container-->",
    );
  });

  it("should highlight code with provided code", () => {
    const fixture = TestBed.createComponent(Code);
    fixture.componentRef.setInput("code", 'console.log("Hello, World!");');
    fixture.componentRef.setInput("lang", "javascript");
    fixture.detectChanges();

    const codeElement = fixture.debugElement.nativeElement.querySelector(
      "code",
    );
    expect(codeElement).toBeTruthy();
    expect(codeElement.textContent).toContain("Hello, World!");
  });

  it("should highlight code with provided url", async () => {
    const fixture = TestBed.createComponent(Code);
    fixture.componentRef.setInput("lang", "javascript");
    fixture.componentRef.setInput("src", "code.js");
    fixture.detectChanges();

    http.expectOne("code.js").flush("console.log('Hello, World!');");
    await fixture.whenStable();

    const codeElement = fixture.debugElement.nativeElement.querySelector(
      "code",
    );
    expect(codeElement).toBeTruthy();
    expect(codeElement.textContent).toContain("Hello, World!");
  });

  it("should display error when error loading", async () => {
    const fixture = TestBed.createComponent(TestErrorComponent);
    fixture.detectChanges();
    http.expectOne("error.js").flush("error", {
      status: 404,
      statusText: "Not Found",
    });
    await fixture.whenStable();
    const harness = await TestbedHarnessEnvironment.loader(fixture).getHarness(
      CodeHarness,
    );
    const errorState = await harness.getHarnessOrNull(ErrorStateHarness);
    expect(errorState).toBeTruthy();
  });
});

@Component({
  selector: "test-error",
  imports: [Code, ErrorState],
  template: `
    <xpr-code src="error.js" lang="javascript">
      <xpr-error-state>Error loading code.</xpr-error-state>
    </xpr-code>`,
})
class TestErrorComponent {
  // This component is used to test error state
}
