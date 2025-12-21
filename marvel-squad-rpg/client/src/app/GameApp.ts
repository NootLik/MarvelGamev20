import { routes } from "./routes";

export class GameApp {
  constructor(private readonly selector: string) {}

  mount() {
    const root = document.querySelector(this.selector);
    if (!root) {
      throw new Error(`Root element not found: ${this.selector}`);
    }

    root.innerHTML = `
      <main class="app-shell title-screen">
        <div class="title-screen__overlay"></div>
        <section class="title-screen__content">
          <header class="title-screen__header">
            <p class="title-screen__eyebrow">Marvel Squad RPG</p>
            <h1 class="title-screen__title">Assemble Your Squad</h1>
            <p class="title-screen__subtitle">Choose how you want to play.</p>
          </header>
          <nav class="title-screen__menu" aria-label="Main menu">
            <button class="title-screen__button" type="button">Player vs Player</button>
            <button class="title-screen__button" type="button">Computer vs Computer</button>
            <button class="title-screen__button" type="button">Available Characters</button>
            <button class="title-screen__button" type="button">Rules</button>
            <button class="title-screen__button" type="button">Settings</button>
          </nav>
          <footer class="title-screen__footer">
            <span>Routes: ${routes.join(", ")}</span>
          </footer>
        </section>
        <audio class="title-screen__music" src="/assets/title-theme.mp4" autoplay loop></audio>
      </main>
    `;
  }
}
