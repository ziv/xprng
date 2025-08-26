import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "app",
    loadComponent: () => import("@xprng/docs").then((m) => m.XpdApp),
    children: [
      {
        path: "home",
        loadComponent: () => import("@xprng/docs").then((m) => m.XpdHome),
      },
      {
        path: "docs/:component",
        loadComponent: () =>
          import("@xprng/docs").then((m) => m.XpdDocumentation),
      },
    ],
  },
  {
    path: "iframe",
    loadComponent: () => import("@xprng/docs").then((m) => m.XpdIframe),
    loadChildren: () => import("./docs/routes"),
  },
  {
    path: "",
    redirectTo: "app/home",
    pathMatch: "full",
  },
];
