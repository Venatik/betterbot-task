import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly THEME_KEY = "preferred-theme";

  private darkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    this.updateTheme(this.darkMode());
  }

  isDarkMode() {
    return this.darkMode;
  }

  toggleTheme() {
    const newValue = !this.darkMode();
    this.darkMode.set(newValue);

    localStorage.setItem(this.THEME_KEY, JSON.stringify(newValue));
    this.updateTheme(newValue);
  }

  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    return savedTheme
      ? JSON.parse(savedTheme)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  private updateTheme(isDarkMode: boolean) {
    document.documentElement.classList.toggle("dark-theme", isDarkMode);
  }
}
