import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from "../services/theme.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatTooltipModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  darkMode = this.themeService.isDarkMode();

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
