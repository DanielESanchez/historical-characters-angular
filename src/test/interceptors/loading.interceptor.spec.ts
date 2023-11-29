import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "../../app/services/loading.service";

describe("LoadingInterceptor", () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadingService, provideHttpClientTesting()],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should emit loading signal as false after completing a request", inject(
    [LoadingService],
    (loadingService: LoadingService) => {
      httpClient.get("/api/data").subscribe();

      const req = httpTestingController.expectOne("/api/data");
      expect(req.request.method).toBe("GET");

      req.flush({ data: "test" });

      expect(loadingService.getSignal()()).toBeFalse();
    }
  ));
});
