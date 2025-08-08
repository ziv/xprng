import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CodeExample } from "./code-example";

describe("CodeExample", () => {
  let component: CodeExample;
  let fixture: ComponentFixture<CodeExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeExample],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CodeExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
