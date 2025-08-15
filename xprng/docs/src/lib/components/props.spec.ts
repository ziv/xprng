import { ComponentFixture, TestBed } from "@angular/core/testing";
import Props from "./props";

describe("Props", () => {
  let component: Props;
  let fixture: ComponentFixture<Props>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Props],
    })
      .compileComponents();

    fixture = TestBed.createComponent(Props);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
