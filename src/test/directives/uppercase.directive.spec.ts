import {
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect,
} from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { UppercaseDirective } from "../../app/directives/uppercase.directive";
import { By } from "@angular/platform-browser";

@Component({
  template: `<input toUppercase />`,
})
class TestComponent {}

describe("UppercaseDirective", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      imports: [UppercaseDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.directive(UppercaseDirective));
  });

  it("should create the test component", () => {
    expect(component).toBeTruthy();
  });

  it("should create an instance of the directive", () => {
    const directive = inputElement.injector.get(UppercaseDirective);
    expect(directive).toBeTruthy();
  });

  it("should transform input to uppercase on input event", () => {
    const input: HTMLInputElement = inputElement.nativeElement;

    input.value = "test";
    input.dispatchEvent(new Event("input"));

    expect(input.value).toBe("TEST");
  });
});
