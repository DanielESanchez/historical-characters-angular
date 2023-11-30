import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Country } from "../interfaces/country";

@Injectable({
  providedIn: "root",
})
export class CountriesService {
  constructor(private httpClient: HttpClient) {}

  async getAllCountries(): Promise<Country[]> {
    return await lastValueFrom(
      this.httpClient.get<Country[]>(
        "http://localhost:3000/countries?_sort=name&_order=asc"
      )
    );
  }
}
