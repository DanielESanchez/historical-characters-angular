import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { DialogModule } from "primeng/dialog";
import { CardModule } from "primeng/card";
import { DividerModule } from "primeng/divider";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ButtonModule } from "primeng/button";
import { Character } from "../../interfaces/character";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { UppercaseDirective } from "../../directives/uppercase.directive";
import { DropdownChangeEvent, DropdownModule } from "primeng/dropdown";
import { Country } from "../../interfaces/country";
import { CountriesService } from "../../services/countries.service";

@Component({
  selector: "app-new-character-form",
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    CardModule,
    DividerModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    UppercaseDirective,
    DropdownModule,
  ],
  templateUrl: "./new-character-form.component.html",
  styleUrl: "./new-character-form.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class NewCharacterFormComponent implements OnInit {
  public characterForm!: FormGroup;
  public submitted: boolean = false;
  public countries: Country[] = [];
  public selectedCountry!: Country;

  constructor(
    private readonly formBuilder: FormBuilder,
    private dynamicDialogRef: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig
  ) {
    this.countries = this.dynamicDialogConfig.data;
  }

  async ngOnInit(): Promise<void> {
    this.characterForm = this.formBuilder.group({
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      description: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      position: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      bornDate: new FormControl<Date | null>(null, [Validators.required]),
    });
  }

  save(): void {
    this.submitted = true;
    if (!this.characterForm.valid || !this.selectedCountry) return;
    const newCharacter: Character = {
      name: this.name?.value.toUpperCase(),
      country: this.selectedCountry.name,
      position: this.position?.value,
      description: this.description?.value,
      bornDate: this.bornDate?.value,
    };
    this.dynamicDialogRef.close(newCharacter);
  }

  changeCountry(event: DropdownChangeEvent) {
    this.selectedCountry = event.value;
  }

  get name(): AbstractControl<any, any> | null {
    return this.characterForm.get("name");
  }

  get description(): AbstractControl<any, any> | null {
    return this.characterForm.get("description");
  }

  get position(): AbstractControl<any, any> | null {
    return this.characterForm.get("position");
  }

  get bornDate(): AbstractControl<any, any> | null {
    return this.characterForm.get("bornDate");
  }
}
