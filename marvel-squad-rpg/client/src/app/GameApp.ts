import { routes } from "./routes";

type ScreenView = "title" | "characters";

type CharacterProfile = {
  name: string;
  alias: string;
  pointValue: number;
  strength: number;
  speed: number;
  reaction: number;
  durability: number;
  psychicResistance: number;
  traits: string[];
  accent: string;
};

const CHARACTER_ROSTER: CharacterProfile[] = [
  {
    name: "Peter Parker",
    alias: "Spider-Man",
    pointValue: 10,
    strength: 22,
    speed: 46,
    reaction: 50,
    durability: 18,
    psychicResistance: 12,
    traits: ["Spider-Sense", "Web-Slinging", "Agile", "Genius Intellect"],
    accent: "#e53935",
  },
  {
    name: "Sergei Kravinoff",
    alias: "Kraven the Hunter",
    pointValue: 8,
    strength: 16,
    speed: 28,
    reaction: 30,
    durability: 14,
    psychicResistance: 8,
    traits: ["Master Tracker", "Predator Tactics", "Savage Instincts"],
    accent: "#795548",
  },
  {
    name: "Steve Rogers",
    alias: "Captain America",
    pointValue: 9,
    strength: 18,
    speed: 32,
    reaction: 36,
    durability: 20,
    psychicResistance: 14,
    traits: ["Vibranium Shield", "Tactical Genius", "Unbreakable Will"],
    accent: "#1e88e5",
  },
  {
    name: "Sam Wilson",
    alias: "The Falcon",
    pointValue: 7,
    strength: 8,
    speed: 42,
    reaction: 34,
    durability: 10,
    psychicResistance: 9,
    traits: ["Aerial Assault", "Winged Rig", "Recon Specialist"],
    accent: "#f4511e",
  },
  {
    name: "Dr. Curt Connors",
    alias: "The Lizard",
    pointValue: 8,
    strength: 24,
    speed: 26,
    reaction: 24,
    durability: 22,
    psychicResistance: 2,
    traits: ["Regenerative", "Savage Strength", "Reptilian Instincts"],
    accent: "#43a047",
  },
  {
    name: "Matt Murdock",
    alias: "Daredevil",
    pointValue: 8,
    strength: 9,
    speed: 30,
    reaction: 40,
    durability: 12,
    psychicResistance: 16,
    traits: ["Radar Sense", "Martial Arts", "Fearless"],
    accent: "#d32f2f",
  },
  {
    name: "Logan",
    alias: "Wolverine",
    pointValue: 10,
    strength: 26,
    speed: 26,
    reaction: 32,
    durability: 28,
    psychicResistance: 14,
    traits: ["Adamantium Claws", "Regeneration", "Berserker"],
    accent: "#fbc02d",
  },
  {
    name: "Frank Castle",
    alias: "Punisher",
    pointValue: 6,
    strength: 7,
    speed: 18,
    reaction: 22,
    durability: 10,
    psychicResistance: 10,
    traits: ["Heavy Arsenal", "Tactical Ops", "Relentless"],
    accent: "#455a64",
  },
  {
    name: "John Walker",
    alias: "U.S. Agent",
    pointValue: 8,
    strength: 16,
    speed: 26,
    reaction: 30,
    durability: 18,
    psychicResistance: 12,
    traits: ["Combat Shield", "Enhanced Physique", "Command Training"],
    accent: "#5c6bc0",
  },
  {
    name: "Scott Summers",
    alias: "Cyclops",
    pointValue: 8,
    strength: 8,
    speed: 22,
    reaction: 28,
    durability: 12,
    psychicResistance: 14,
    traits: ["Optic Blast", "Team Leader", "Precision Control"],
    accent: "#3949ab",
  },
  {
    name: "Street Thug",
    alias: "Thug (Generic)",
    pointValue: 2,
    strength: 5,
    speed: 10,
    reaction: 8,
    durability: 6,
    psychicResistance: 4,
    traits: ["Improvised Weapons", "Ambush Tactics"],
    accent: "#6d4c41",
  },
  {
    name: "S.H.I.E.L.D. Operative",
    alias: "Shield Agent (Generic)",
    pointValue: 5,
    strength: 7,
    speed: 16,
    reaction: 18,
    durability: 8,
    psychicResistance: 8,
    traits: ["Field Training", "Energy Sidearm", "Team Support"],
    accent: "#00897b",
  },
  {
    name: "Contract Fighter",
    alias: "Mercenary (Generic)",
    pointValue: 3,
    strength: 6,
    speed: 14,
    reaction: 12,
    durability: 7,
    psychicResistance: 6,
    traits: ["Tactical Gear", "Paid Precision", "High Mobility"],
    accent: "#546e7a",
  },
  {
    name: "Shadow Operative",
    alias: "Ninja (Generic)",
    pointValue: 4,
    strength: 6,
    speed: 28,
    reaction: 26,
    durability: 6,
    psychicResistance: 6,
    traits: ["Stealth Mastery", "Smoke Bombs", "Blade Work"],
    accent: "#8e24aa",
  },
  {
    name: "Infantry",
    alias: "Soldier (Generic)",
    pointValue: 3,
    strength: 6,
    speed: 12,
    reaction: 12,
    durability: 8,
    psychicResistance: 5,
    traits: ["Field Discipline", "Rifle Training", "Armor Kit"],
    accent: "#4e6e5d",
  },
  {
    name: "Elektra Natchios",
    alias: "Elektra",
    pointValue: 8,
    strength: 10,
    speed: 34,
    reaction: 38,
    durability: 12,
    psychicResistance: 16,
    traits: ["Sai Mastery", "Assassin Training", "Silent Footwork"],
    accent: "#b71c1c",
  },
  {
    name: "Pete Petruski",
    alias: "Paste Pot Pete",
    pointValue: 3,
    strength: 5,
    speed: 10,
    reaction: 8,
    durability: 8,
    psychicResistance: 6,
    traits: ["Adhesive Blasts", "Improviser", "Sticky Traps"],
    accent: "#ffa726",
  },
  {
    name: "Mortimer Toynbee",
    alias: "The Toad",
    pointValue: 4,
    strength: 7,
    speed: 24,
    reaction: 22,
    durability: 9,
    psychicResistance: 5,
    traits: ["Super Leap", "Tongue Lash", "Acrobatic"],
    accent: "#7cb342",
  },
  {
    name: "St. John Allerdyce",
    alias: "Pyro",
    pointValue: 6,
    strength: 6,
    speed: 18,
    reaction: 18,
    durability: 10,
    psychicResistance: 8,
    traits: ["Flame Control", "Area Denial", "Fear Tactics"],
    accent: "#ef6c00",
  },
  {
    name: "Jubilation Lee",
    alias: "Jubilee",
    pointValue: 6,
    strength: 6,
    speed: 20,
    reaction: 20,
    durability: 10,
    psychicResistance: 12,
    traits: ["Plasmoid Bursts", "Team Booster", "Quick Learner"],
    accent: "#f06292",
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export class GameApp {
  private currentScreen: ScreenView = "title";

  constructor(private readonly selector: string) {}

  mount() {
    const root = document.querySelector(this.selector);
    if (!root) {
      throw new Error(`Root element not found: ${this.selector}`);
    }

    this.render(root);
  }

  private render(root: Element) {
    if (this.currentScreen === "title") {
      this.renderTitle(root);
      return;
    }

    this.renderCharacters(root);
  }

  private renderTitle(root: Element) {
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
            <button class="title-screen__button" type="button" data-action="open-characters">
              Available Characters
            </button>
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

    const button = root.querySelector<HTMLButtonElement>("[data-action='open-characters']");
    button?.addEventListener("click", () => {
      this.currentScreen = "characters";
      this.render(root);
    });
  }

  private renderCharacters(root: Element) {
    const cards = CHARACTER_ROSTER.map((character) => {
      const slug = slugify(character.alias);
      const portrait = `/assets/characters/portraits/${slug}.svg`;
      const avatar = `/assets/characters/avatars/${slug}.svg`;

      return `
        <article class="character-card">
          <div class="character-card__media">
            <img class="character-card__portrait" src="${portrait}" alt="Portrait of ${character.alias}" />
            <img class="character-card__avatar" src="${avatar}" alt="Pixel avatar for ${character.alias}" />
          </div>
          <div class="character-card__identity">
            <h3>${character.alias}</h3>
            <p>${character.name}</p>
          </div>
          <dl class="character-card__stats">
            <div>
              <dt>Point Value</dt>
              <dd>${character.pointValue}</dd>
            </div>
            <div>
              <dt>Strength</dt>
              <dd>${character.strength}</dd>
            </div>
            <div>
              <dt>Speed</dt>
              <dd>${character.speed}</dd>
            </div>
            <div>
              <dt>Reaction</dt>
              <dd>${character.reaction}</dd>
            </div>
            <div>
              <dt>Durability</dt>
              <dd>${character.durability}</dd>
            </div>
            <div>
              <dt>Psychic Resistance</dt>
              <dd>${character.psychicResistance}</dd>
            </div>
            <div class="character-card__traits">
              <dt>Traits</dt>
              <dd>${character.traits.join(", ")}</dd>
            </div>
          </dl>
        </article>
      `;
    }).join("");

    root.innerHTML = `
      <main class="app-shell character-screen">
        <div class="character-screen__overlay"></div>
        <section class="character-screen__content">
          <header class="character-screen__header">
            <div>
              <p class="title-screen__eyebrow">Marvel Squad RPG</p>
              <h1 class="character-screen__title">Available Characters</h1>
              <p class="character-screen__subtitle">
                Point value balances fair team builds. Each match has a maximum point cap for team totals.
              </p>
            </div>
            <button class="title-screen__button character-screen__back" type="button" data-action="back-title">
              Back to Title
            </button>
          </header>
          <div class="character-screen__grid" role="list">
            ${cards}
          </div>
        </section>
      </main>
    `;

    const backButton = root.querySelector<HTMLButtonElement>("[data-action='back-title']");
    backButton?.addEventListener("click", () => {
      this.currentScreen = "title";
      this.render(root);
    });
  }
}
