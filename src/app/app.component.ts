import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { TopBarComponent } from "./components/top-bar/top-bar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopBarComponent, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "historical-characters-angular";
  constructor(private primengConfig: PrimeNGConfig) {}
  
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
