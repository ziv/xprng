import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "markdown",
    loadComponent: () => import("./markdown-example/markdown-example"),
  },
  {
    path: "highlighter",
    loadComponent: () => import("./code-example/code-example"),
  },
];
