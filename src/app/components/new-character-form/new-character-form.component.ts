import { Component, OnInit, ViewEncapsulation } from "@angular/core";
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
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { UppercaseDirective } from "../../directives/uppercase.directive";

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
  ],
  templateUrl: "./new-character-form.component.html",
  styleUrl: "./new-character-form.component.scss",
  encapsulation: ViewEncapsulation.Emulated,
})
export class NewCharacterFormComponent implements OnInit {
  public characterForm!: FormGroup;
  public submitted: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private dynamicDialogRef: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.characterForm = this.formBuilder.group({
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      country: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
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
    if (!this.characterForm.valid) return;
    const newCharacter: Character = {
      name: this.name?.value.toUpperCase(),
      country: this.country?.value,
      position: this.position?.value,
      description: this.description?.value,
      bornDate: this.bornDate?.value,
    };
    this.dynamicDialogRef.close(newCharacter);
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

  get country(): AbstractControl<any, any> | null {
    return this.characterForm.get("country");
  }

  get bornDate(): AbstractControl<any, any> | null {
    return this.characterForm.get("bornDate");
  }
}