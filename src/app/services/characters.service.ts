import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { v4 as genUUID } from "uuid";
import { Character } from "../interfaces/character";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CharactersService {
  constructor(private httpClient: HttpClient) {}

  async getAllCharacters() {
    return await lastValueFrom(
      this.httpClient.get<Character[]>("http://localhost:3000/characters")
    );
  }

  async getCharacterById(idCharacter: string) {
    return await lastValueFrom(
      this.httpClient.get<Character[]>(
        `http://localhost:3000/characters/${idCharacter}`
      )
    );
  }

  async filterCharacterByName(term: string) {
    return await lastValueFrom(
      this.httpClient.get<Character[]>(
        `http://localhost:3000/characters?name_like=${term}`
      )
    );
  }

  async addCharacter(newCharacter: Character) {
    newCharacter.id = genUUID();
    await lastValueFrom(
      this.httpClient.post("http://localhost:3000/characters", newCharacter)
    );
    return this.getAllCharacters();
  }
}
