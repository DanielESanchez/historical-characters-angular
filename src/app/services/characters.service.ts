import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { v4 as genUUID } from "uuid";
import { Character } from "../interfaces/character";
import { lastValueFrom } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CharactersService {
  constructor(private httpClient: HttpClient) {}

  async getAllCharacters(): Promise<Character[]> {
    const { API_URL } = environment;
    return await lastValueFrom(
      this.httpClient.get<Character[]>(
        `${API_URL}/characters?_sort=bornDate&_order=desc`
      )
    );
  }

  async getCharacterById(idCharacter: string): Promise<Character> {
    const { API_URL } = environment;
    return await lastValueFrom(
      this.httpClient.get<Character>(
        `${API_URL}/characters/${idCharacter}`
      )
    );
  }

  async filterCharacterByName(term: string): Promise<Character[]> {
    const { API_URL } = environment;
    return await lastValueFrom(
      this.httpClient.get<Character[]>(
        `${API_URL}/characters?name_like=${term}&_sort=bornDate&_order=desc`
      )
    );
  }

  async addCharacter(newCharacter: Character): Promise<boolean> {
    const { API_URL } = environment;
    newCharacter.id = genUUID();
    await lastValueFrom(
      this.httpClient.post(`${API_URL}/characters`, newCharacter)
    );
    return true;
  }
}
