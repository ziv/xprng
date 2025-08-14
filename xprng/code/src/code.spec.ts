import { TestBed } from "@angular/core/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { Code } from "./code";

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

it("should display provided content (code)", () => {
  const fixture = TestBed.createComponent(Code);
  fixture.componentRef.setInput("content", 'console.log("Hello, World!");');
  fixture.componentRef.setInput("lang", "javascript");
  fixture.detectChanges();

  const codeElement = fixture.debugElement.nativeElement.querySelector(
    ".xpr-local",
  );
  expect(codeElement).toBeTruthy();
  expect(codeElement.textContent).toContain("Hello, World!");
});

it("should fetch content from remote source (code)", async () => {
  const fixture = TestBed.createComponent(Code);
  fixture.componentRef.setInput("lang", "javascript");
  fixture.componentRef.setInput("src", "code.js");
  fixture.detectChanges();

  http.expectOne("code.js").flush("console.log('Hello, World!');");
  await fixture.whenStable();

  const codeElement = fixture.debugElement.nativeElement.querySelector(
    ".xpr-loaded",
  );
  expect(codeElement).toBeTruthy();
  expect(codeElement.textContent).toContain("Hello, World!");
});
