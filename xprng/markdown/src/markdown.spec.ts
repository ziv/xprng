import { ComponentFixture, TestBed } from "@angular/core/testing";

import Markdown from "./markdown";
import { provideZonelessChangeDetection } from "@angular/core";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { expect } from "vitest";

describe("Markdown", () => {
  let component: Markdown;
  let fixture: ComponentFixture<Markdown>;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Markdown],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Markdown);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load markdown from src", async () => {
    // set a new input for the component
    fixture.componentRef.setInput("src", "test.md");
    fixture.detectChanges();

    // the component should request the markdown file
    httpTesting.expectOne("test.md").flush("# Test Markdown");

    // wait for the component to stabilize
    await fixture.whenStable();
    const el = fixture.debugElement.nativeElement as HTMLElement;

    // the template should render the markdown as HTML
    expect(el).toBeInstanceOf(HTMLElement);
    expect(el.querySelectorAll("h1").length).toBe(1);
  });
});
