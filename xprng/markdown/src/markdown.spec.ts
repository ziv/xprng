import { TestBed } from "@angular/core/testing";
import { Markdown } from "./markdown";
import { provideZonelessChangeDetection } from "@angular/core";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { beforeEach, expect } from "vitest";

let http: HttpTestingController;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [Markdown],
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
  const fixture = TestBed.createComponent(Markdown);
  expect(fixture.debugElement.nativeElement.innerHTML).toEqual(
    "<!--container--><!--container-->",
  );
});

it("should display provided content (markdown)", async () => {
  const fixture = TestBed.createComponent(Markdown);
  fixture.componentRef.setInput("content", "# Header\n\n## Subheader");
  fixture.detectChanges();

  const h1 = fixture.debugElement.nativeElement.querySelector("h1");
  expect(h1.innerHTML).toContain("Header");
});

it("should fetch content from remote source (markdown)", async () => {
  const fixture = TestBed.createComponent(Markdown);
  fixture.componentRef.setInput("src", "test.md");
  fixture.detectChanges();

  http.expectOne("test.md").flush("# Test Header\n\n# Another Heading");
  await fixture.whenStable();

  const h1 = fixture.debugElement.nativeElement.querySelector("h1");
  expect(h1.innerHTML).toContain("Header");
});

// it("should display error in case of loading error (markdown)", async () => {
//   const fixture = TestBed.createComponent(Markdown);
//   fixture.componentRef.setInput("src", "test.md");
//   fixture.detectChanges();
//
//   http.expectOne("test.md").flush("error", {
//     status: 404,
//     statusText: "Not Found",
//   });
//   await fixture.whenStable();
//
//   const el = fixture.debugElement.nativeElement.innerHTML;
//   expect(el).toBeTruthy();
// });
//
// @Component({
//   selector: "test-component",
//   imports: [Markdown],
//   template: '<xpr-markdown [content]="content"/>',
// })
// class TestContentComponent {
//   content = "# Test Markdown\n\n# Another Heading";
// }
//
// @Component({
//   selector: "test-src-component",
//   imports: [
//     Markdown,
//     ErrorState,
//   ],
//   template: `
//     <xpr-markdown src="test.md">
//       <xpr-error-state>error</xpr-error-state>
//     </xpr-markdown>
//   `,
// })
// class TestSrcComponent {
// }
//
// @Component({
//   selector: "test-component",
//   imports: [Markdown],
//   template: `
//     <xpr-markdown/>
//   `,
// })
// class TestEmptyComponent {
// }
