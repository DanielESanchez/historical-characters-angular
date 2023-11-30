import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Country } from "../interfaces/country";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CountriesService {
  constructor(private httpClient: HttpClient) {}

  async getAllCountries(): Promise<Country[]> {
    const { API_URL } = environment;
    return await lastValueFrom(
      this.httpClient.get<Country[]>(
        `${API_URL}/countries?_sort=name&_order=asc`
      )
    );
  }
}
