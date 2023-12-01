import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ButtonModule } from "primeng/button";
import { DataViewModule } from "primeng/dataview";
import { InputTextModule } from "primeng/inputtext";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { ProgressSpinnerModule } from "primeng/progressspinner";

import { Character } from "../../interfaces/character";
import { CharactersService } from "../../services/characters.service";
import { NewCharacterFormComponent } from "../../components/new-character-form/new-character-form.component";
import { LoadingService } from "../../services/loading.service";
import { CountriesService } from "../../services/countries.service";
import { Country } from "../../interfaces/country";

@Component({
  selector: "app-characters-list",
  standalone: true,
  templateUrl: "./characters-list.component.html",
  styleUrl: "./characters-list.component.scss",
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ProgressSpinnerModule,
  ],
  providers: [DialogService, MessageService],
})
export class CharactersListComponent implements OnInit, OnDestroy {
  public characters!: Character[];
  public isLoading = signal(true);
  private saveCharacterDialogRef!: DynamicDialogRef;
  public searchTerm?: string;

  constructor(
    private readonly charactersService: CharactersService,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
    private readonly loadingService: LoadingService,
    private readonly countriesService: CountriesService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadCharacters();
    this.isLoading = this.loadingService.getSignal();
  }

  async loadCharacters(): Promise<void> {
    this.characters = await this.charactersService.getAllCharacters();
  }

  async loadCountries(): Promise<Country[]> {
    return await this.countriesService.getAllCountries();
  }

  async filterByName(input: string): Promise<void> {
    if (input.length < 1) this.searchTerm = "";
    this.searchTerm = input;
    this.characters = await this.charactersService.filterCharacterByName(input);
  }

  async showSaveCharacterDialog(): Promise<void> {
    const countriesDataDialog = await this.loadCountries();
    const dialogCong: DynamicDialogConfig = {
      header: "Save new character",
      width: "70%",
      style: { "text-align": "center" },
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      maximizable: true,
      data: countriesDataDialog,
    };

    this.saveCharacterDialogRef = this.dialogService.open(
      NewCharacterFormComponent,
      dialogCong
    );

    this.saveCharacterDialogRef.onClose.subscribe(
      async (character: Character) => {
        if (character) {
          await this.charactersService.addCharacter(character);
          this.showCompletedMessage(character.name);
        } else {
          this.showNotSavedMessage();
        }
      }
    );
  }

  showCompletedMessage(characterName: string): void {
    this.messageService.add({
      key: "saved",
      severity: "success",
      summary: "New character added",
      detail: characterName,
    });
  }

  showNotSavedMessage(): void {
    this.messageService.add({
      key: "error",
      severity: "warn",
      summary: "Saving cancelled",
      detail: "Did not fill all the fields, saving process cancelled",
    });
  }

  ngOnDestroy(): void {
    if (this.saveCharacterDialogRef) {
      this.saveCharacterDialogRef.close();
    }
  }
}
