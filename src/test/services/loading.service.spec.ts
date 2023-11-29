import { TestBed } from "@angular/core/testing";
import { LoadingService } from "../../app/services/loading.service";

describe("LoadingService", () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    service = TestBed.inject(LoadingService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should emit and get the loading signal", () => {
    expect(service.getSignal()).toBeDefined();
    expect(service.getSignal()()).toBeFalse();

    service.emitSignal(true);
    expect(service.getSignal()).toBeDefined();
    expect(service.getSignal()()).toBeTrue();

    service.emitSignal(false);
    expect(service.getSignal()).toBeDefined();
    expect(service.getSignal()()).toBeFalse();
  });
});
