import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { MenuItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "app-top-bar",
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: "./top-bar.component.html",
  styleUrl: "./top-bar.component.scss",
})
export class TopBarComponent implements OnInit {
  items!: MenuItem[];
  icon: string = "pi pi-sun";
  isDark: boolean = false;
  themeClassButton:string = ""

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit() {
    this.items = [
      {
        label: "Home",
        icon: "pi pi-fw pi-home",
        routerLink: "/",
        routerLinkActiveOptions: "{exact:true}",
      },
      {
        label: "Characters list",
        icon: "pi pi-fw pi-user",
        routerLink: "/characters",
        routerLinkActiveOptions: { exact: true },
      },
    ];
  }

  changeTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      this.icon = "pi pi-moon";
      this.themeService.switchTheme("dark-theme");
      this.themeClassButton = "dark"
      return;
    }
    this.icon = "pi pi-sun";
    this.themeService.switchTheme("light-theme");
    this.themeClassButton = ""

  }
}
