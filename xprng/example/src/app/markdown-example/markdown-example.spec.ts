import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MarkdownExample } from "./markdown-example";

describe("MarkdownExample", () => {
  let component: MarkdownExample;
  let fixture: ComponentFixture<MarkdownExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownExample],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MarkdownExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
