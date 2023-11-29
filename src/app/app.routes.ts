import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/home/home.component").then(
        (c) => c.HomeComponent
      ),
    pathMatch: "full",
  },
  {
    path: "characters",
    loadComponent: () =>
      import("./pages/characters-list/characters-list.component").then(
        (c) => c.CharactersListComponent
      ),
  },
  {
    path: "**",
    loadComponent: () =>
      import("./pages/not-found/not-found.component").then(
        (c) => c.NotFoundComponent
      ),
  },
];
