import { routes } from "./routes";

export class GameApp {
  constructor(private readonly selector: string) {}

  mount() {
    const root = document.querySelector(this.selector);
    if (!root) {
      throw new Error(`Root element not found: ${this.selector}`);
    }

    root.innerHTML = `
      <main class="app-shell">
        <h1>Marvel Squad RPG</h1>
        <p>Client shell loaded. Routes: ${routes.join(", ")}</p>
      </main>
    `;
  }
}
