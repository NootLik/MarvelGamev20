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
    pointValue: 92,
    strength: 88,
    speed: 84,
    reaction: 92,
    durability: 76,
    psychicResistance: 68,
    traits: ["Spider-Sense", "Web-Slinging", "Agile", "Genius Intellect"],
    accent: "#e53935",
  },
  {
    name: "Sergei Kravinoff",
    alias: "Kraven the Hunter",
    pointValue: 80,
    strength: 83,
    speed: 78,
    reaction: 79,
    durability: 74,
    psychicResistance: 60,
    traits: ["Master Tracker", "Predator Tactics", "Savage Instincts"],
    accent: "#795548",
  },
  {
    name: "Steve Rogers",
    alias: "Captain America",
    pointValue: 90,
    strength: 85,
    speed: 80,
    reaction: 86,
    durability: 88,
    psychicResistance: 78,
    traits: ["Vibranium Shield", "Tactical Genius", "Unbreakable Will"],
    accent: "#1e88e5",
  },
  {
    name: "Sam Wilson",
    alias: "The Falcon",
    pointValue: 76,
    strength: 68,
    speed: 90,
    reaction: 82,
    durability: 70,
    psychicResistance: 65,
    traits: ["Aerial Assault", "Winged Rig", "Recon Specialist"],
    accent: "#f4511e",
  },
  {
    name: "Dr. Curt Connors",
    alias: "The Lizard",
    pointValue: 84,
    strength: 86,
    speed: 74,
    reaction: 72,
    durability: 88,
    psychicResistance: 54,
    traits: ["Regenerative", "Savage Strength", "Reptilian Instincts"],
    accent: "#43a047",
  },
  {
    name: "Matt Murdock",
    alias: "Daredevil",
    pointValue: 82,
    strength: 74,
    speed: 78,
    reaction: 90,
    durability: 76,
    psychicResistance: 70,
    traits: ["Radar Sense", "Martial Arts", "Fearless"],
    accent: "#d32f2f",
  },
  {
    name: "Logan",
    alias: "Wolverine",
    pointValue: 94,
    strength: 90,
    speed: 76,
    reaction: 80,
    durability: 96,
    psychicResistance: 72,
    traits: ["Adamantium Claws", "Regeneration", "Berserker"],
    accent: "#fbc02d",
  },
  {
    name: "Frank Castle",
    alias: "Punisher",
    pointValue: 74,
    strength: 72,
    speed: 68,
    reaction: 78,
    durability: 74,
    psychicResistance: 66,
    traits: ["Heavy Arsenal", "Tactical Ops", "Relentless"],
    accent: "#455a64",
  },
  {
    name: "John Walker",
    alias: "U.S. Agent",
    pointValue: 81,
    strength: 82,
    speed: 76,
    reaction: 78,
    durability: 80,
    psychicResistance: 70,
    traits: ["Combat Shield", "Enhanced Physique", "Command Training"],
    accent: "#5c6bc0",
  },
  {
    name: "Scott Summers",
    alias: "Cyclops",
    pointValue: 87,
    strength: 70,
    speed: 74,
    reaction: 80,
    durability: 76,
    psychicResistance: 74,
    traits: ["Optic Blast", "Team Leader", "Precision Control"],
    accent: "#3949ab",
  },
  {
    name: "Street Thug",
    alias: "Thug (Generic)",
    pointValue: 48,
    strength: 52,
    speed: 50,
    reaction: 46,
    durability: 50,
    psychicResistance: 40,
    traits: ["Improvised Weapons", "Ambush Tactics"],
    accent: "#6d4c41",
  },
  {
    name: "S.H.I.E.L.D. Operative",
    alias: "Shield Agent (Generic)",
    pointValue: 62,
    strength: 60,
    speed: 62,
    reaction: 64,
    durability: 58,
    psychicResistance: 54,
    traits: ["Field Training", "Energy Sidearm", "Team Support"],
    accent: "#00897b",
  },
  {
    name: "Contract Fighter",
    alias: "Mercenary (Generic)",
    pointValue: 66,
    strength: 64,
    speed: 66,
    reaction: 64,
    durability: 60,
    psychicResistance: 52,
    traits: ["Tactical Gear", "Paid Precision", "High Mobility"],
    accent: "#546e7a",
  },
  {
    name: "Shadow Operative",
    alias: "Ninja (Generic)",
    pointValue: 68,
    strength: 60,
    speed: 82,
    reaction: 80,
    durability: 56,
    psychicResistance: 58,
    traits: ["Stealth Mastery", "Smoke Bombs", "Blade Work"],
    accent: "#8e24aa",
  },
  {
    name: "Infantry",
    alias: "Soldier (Generic)",
    pointValue: 60,
    strength: 62,
    speed: 60,
    reaction: 58,
    durability: 64,
    psychicResistance: 50,
    traits: ["Field Discipline", "Rifle Training", "Armor Kit"],
    accent: "#4e6e5d",
  },
  {
    name: "Elektra Natchios",
    alias: "Elektra",
    pointValue: 84,
    strength: 72,
    speed: 86,
    reaction: 88,
    durability: 74,
    psychicResistance: 70,
    traits: ["Sai Mastery", "Assassin Training", "Silent Footwork"],
    accent: "#b71c1c",
  },
  {
    name: "Pete Petruski",
    alias: "Paste Pot Pete",
    pointValue: 58,
    strength: 55,
    speed: 52,
    reaction: 50,
    durability: 56,
    psychicResistance: 48,
    traits: ["Adhesive Blasts", "Improviser", "Sticky Traps"],
    accent: "#ffa726",
  },
  {
    name: "Mortimer Toynbee",
    alias: "The Toad",
    pointValue: 64,
    strength: 62,
    speed: 70,
    reaction: 68,
    durability: 60,
    psychicResistance: 46,
    traits: ["Super Leap", "Tongue Lash", "Acrobatic"],
    accent: "#7cb342",
  },
  {
    name: "St. John Allerdyce",
    alias: "Pyro",
    pointValue: 72,
    strength: 58,
    speed: 60,
    reaction: 62,
    durability: 64,
    psychicResistance: 55,
    traits: ["Flame Control", "Area Denial", "Fear Tactics"],
    accent: "#ef6c00",
  },
  {
    name: "Jubilation Lee",
    alias: "Jubilee",
    pointValue: 70,
    strength: 58,
    speed: 72,
    reaction: 74,
    durability: 62,
    psychicResistance: 66,
    traits: ["Plasmoid Bursts", "Team Booster", "Quick Learner"],
    accent: "#f06292",
  },
];

const palette = ["#0d47a1", "#4a148c", "#1b5e20", "#bf360c", "#263238"];

const createPortrait = (label: string, accent: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="360" viewBox="0 0 300 360">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#0b0f1f" />
        </linearGradient>
      </defs>
      <rect width="300" height="360" rx="24" fill="url(#grad)" />
      <circle cx="150" cy="140" r="74" fill="rgba(245,245,245,0.22)" />
      <path d="M90 250c24-28 96-28 120 0v36H90z" fill="rgba(245,245,245,0.18)" />
      <text x="150" y="320" text-anchor="middle" font-family="Segoe UI, sans-serif" font-size="24" fill="#f5f5f5">
        ${label}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const createPixelAvatar = (seed: string) => {
  const hash = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const accent = palette[hash % palette.length];
  const secondary = palette[(hash + 2) % palette.length];
  const pattern = Array.from({ length: 36 }, (_, index) => ((hash + index * 7) % 5) > 1);
  const pixels = pattern
    .map((fill, index) => {
      const x = (index % 6) * 8;
      const y = Math.floor(index / 6) * 8;
      return `<rect x="${x}" y="${y}" width="8" height="8" fill="${fill ? accent : secondary}" />`;
    })
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <rect width="48" height="48" rx="10" fill="#0b0f1f" />
      ${pixels}
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

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
      const portrait = createPortrait(character.alias, character.accent);
      const avatar = createPixelAvatar(character.alias);

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
