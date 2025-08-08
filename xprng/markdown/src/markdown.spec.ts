import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Markdown} from "./markdown";
import {provideZonelessChangeDetection} from "@angular/core";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";
import {expect} from "vitest";

describe("markdown.ts", () => {
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

  it('should render markdown from input', async () => {
    fixture.componentRef.setInput("md", "# Test Markdown\n\n# Another Heading");

    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.debugElement.nativeElement as HTMLElement;
    expect(el).toBeInstanceOf(HTMLElement);
    expect(el.querySelectorAll("h1").length).toBe(2);
  });

  it("should load markdown from src", async () => {
    fixture.componentRef.setInput("src", "test.md");

    fixture.detectChanges();
    httpTesting.expectOne("test.md").flush("# Test Markdown");
    await fixture.whenStable();

    const el = fixture.debugElement.nativeElement as HTMLElement;
    expect(el).toBeInstanceOf(HTMLElement);
    expect(el.querySelectorAll("h1").length).toBe(1);
  });
});
