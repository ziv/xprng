import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "markdown",
    loadComponent: () => import("../routes/markdown-example"),
  },
  {
    path: "highlighter",
    loadComponent: () => import("../routes/code-example"),
  },
  {
    path: "",
    loadComponent: () => import("../routes/free"),
  },
];
