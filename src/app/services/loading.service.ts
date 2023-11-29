import { Injectable, WritableSignal, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private loadingSignal = signal(false);

  constructor() {}

  emitSignal(data: boolean): void {
    this.loadingSignal.update(() => data);
  }

  getSignal(): WritableSignal<boolean> {
    return this.loadingSignal;
  }
}
