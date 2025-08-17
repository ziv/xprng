import { Routes } from "@angular/router";

export function routesToNavigation(
  routes: Routes,
): { label: string; route: string }[] {
  return routes.map((r) => ({
    label: (r.title ?? "Unknown") as string,
    route: `/app/docs/${r.path}`,
  }));
}
