// wired, but this test cause vitest to hang and fallback to karma :(

// import { TestBed } from "@angular/core/testing";
// import { Component, provideZonelessChangeDetection } from "@angular/core";
// import {
//   HttpTestingController,
//   provideHttpClientTesting,
// } from "@angular/common/http/testing";
// import { provideHttpClient } from "@angular/common/http";
// import { beforeEach, expect } from "vitest";
// import { Code } from "./code";
//
// let http: HttpTestingController;
//
// // setup environment
// beforeEach(() => {
//   TestBed.configureTestingModule({
//     imports: [Code],
//     providers: [
//       provideZonelessChangeDetection(),
//       provideHttpClient(),
//       provideHttpClientTesting(),
//     ],
//   });
//   http = TestBed.inject(HttpTestingController);
// });
//
// afterEach(() => {
//   // verify that there are no outstanding requests
//   http.verify();
// });
//
// describe("Code harness", () => {
//   it("should throw error for missing attributes", () => {
//     // expect(11).toBeTruthy()
//     // try {
//     //   // const fixture = TestBed.createComponent(TestEmptyComponent);
//     //   // fixture.detectChanges();
//     //   // fail('Expected an error to be thrown due to missing "code" input');
//     // } catch (e) {
//     //   // expect(e).toBeInstanceOf(Error);
//     // }
//     expect(1).toBeTruthy();
//   });
//   //
//   // it("should create the main with md content", async () => {
//   //   const fixture = TestBed.createComponent(TestMdComponent);
//   //   fixture.detectChanges();
//   //
//   //   const loader = TestbedHarnessEnvironment.loader(fixture);
//   //   const harness = await loader.getHarness(MarkdownHarness);
//   //
//   //   expect(await harness.getLocal()).toBeTruthy();
//   // });
//   //
//   // it("should create the main with src from remote", async () => {
//   //   const fixture = TestBed.createComponent(TestSrcComponent);
//   //   fixture.detectChanges();
//   //
//   //   http.expectOne("test.md").flush("# Test Markdown\n\n# Another Heading", {
//   //     status: 200,
//   //     statusText: "OK",
//   //   });
//   //   await fixture.whenStable();
//   //
//   //   const loader = TestbedHarnessEnvironment.loader(fixture);
//   //   const harness = await loader.getHarness(MarkdownHarness);
//   //
//   //   expect(await harness.getLoaded()).toBeTruthy();
//   // });
//   //
//   // it("should create the error content", async () => {
//   //   const fixture = TestBed.createComponent(TestSrcComponent);
//   //   fixture.detectChanges();
//   //
//   //   http.expectOne("test.md").flush("error", {
//   //     status: 404,
//   //     statusText: "Not Found",
//   //   });
//   //   await fixture.whenStable();
//   //
//   //   const loader = TestbedHarnessEnvironment.loader(fixture);
//   //   const harness = await loader.getHarness(MarkdownHarness);
//   //   const errorStateHarness = await harness.getHarnessOrNull(ErrorStateHarness);
//   //   expect(errorStateHarness).toBeTruthy();
//   // });
// });
//
// // @Component({
// //   selector: "test-component",
// //   imports: [Markdown],
// //   template: '<xpr-markdown [md]="md"/>',
// // })
// // class TestMdComponent {
// //   md = "# Test Markdown\n\n# Another Heading";
// // }
// //
// // @Component({
// //   selector: "test-src-component",
// //   imports: [
// //     Markdown,
// //     ErrorState,
// //   ],
// //   template: `
// //     <xpr-markdown src="test.md">
// //       <xpr-error-state>error</xpr-error-state>
// //     </xpr-markdown>
// //   `,
// // })
// // class TestSrcComponent {
// // }
//
// // @Component({
// //   selector: "test-component",
// //   imports: [Code],
// //   template: `
// //     <xpr-code/>
// //   `,
// // })
// // class TestEmptyComponent {
// // }
