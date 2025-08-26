import { bootstrapApplication } from "@angular/platform-browser";
import Config from "./app/app.config";
import { XpdShell } from "@xprng/docs";

bootstrapApplication(XpdShell, Config).catch((err) => console.error(err));
