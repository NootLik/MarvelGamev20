import { routes } from "./routes";
import { WsClient } from "../net/wsClient";

type ScreenView = "title" | "characters" | "lobby" | "pvc-lobby" | "rules" | "match";

type CharacterProfile = {
  name: string;
  alias: string;
  pointValue: number;
  strength: number;
  speed: number;
  reaction: number;
  durability: number;
  psychicResistance: number;
  goodness: number;
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
    goodness: 9,
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
    goodness: -6,
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
    goodness: 10,
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
    goodness: 8,
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
    goodness: -8,
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
    goodness: 9,
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
    goodness: 7,
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
    goodness: -3,
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
    goodness: 2,
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
    goodness: 9,
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
    goodness: -7,
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
    goodness: 6,
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
    goodness: -2,
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
    goodness: -4,
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
    goodness: 5,
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
    goodness: 3,
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
    goodness: -5,
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
    goodness: -6,
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
    goodness: -7,
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
    goodness: 8,
    traits: ["Plasmoid Bursts", "Team Booster", "Quick Learner"],
    accent: "#f06292",
  },
];

const TRAIT_DESCRIPTIONS: Record<string, string> = {
  "Spider-Sense": "Automatically reacts first to sudden threats, reducing ambush penalties.",
  "Web-Slinging": "Traverses the battlefield quickly and can reposition without spending extra stamina.",
  Agile: "Dodges incoming attacks more often, boosting evasion against heavy hitters.",
  "Genius Intellect": "Unlocks tactical rerolls and improves team strategy checks.",
  "Master Tracker": "Reveals hidden foes and boosts accuracy against marked targets.",
  "Predator Tactics": "Gains bonus damage when striking isolated or fleeing enemies.",
  "Savage Instincts": "Shrugs off crowd control and deals extra damage at low health.",
  "Vibranium Shield": "Blocks ranged attacks and reflects a portion of damage back.",
  "Tactical Genius": "Improves team initiative and grants a bonus action once per encounter.",
  "Unbreakable Will": "Resists psychic effects and keeps morale steady under pressure.",
  "Aerial Assault": "Strikes from above, ignoring ground hazards and melee counters.",
  "Winged Rig": "Maintains superior mobility and grants a short hover to avoid traps.",
  "Recon Specialist": "Highlights enemy weak points, boosting ally critical chances.",
  Regenerative: "Rapidly restores health between turns and mitigates bleed effects.",
  "Savage Strength": "Delivers crushing melee blows that can stagger tougher foes.",
  "Reptilian Instincts": "Gains heightened senses to detect stealth and trap setups.",
  "Radar Sense": "Automatically detects hidden threats and reduces surprise damage.",
  "Martial Arts": "Chains swift strikes together, increasing combo damage.",
  Fearless: "Immune to fear effects and gains attack power when outnumbered.",
  "Adamantium Claws": "Pierces armor and ignores a portion of enemy defense.",
  Regeneration: "Heals each round and shortens negative status durations.",
  Berserker: "Deals escalating damage as health drops, but defense dips slightly.",
  "Heavy Arsenal": "Access to high-impact ranged attacks with splash damage.",
  "Tactical Ops": "Grants a utility gadget that can disable or debuff enemies.",
  Relentless: "Keeps pressing attacks, reducing stamina costs for follow-up strikes.",
  "Combat Shield": "Raises guard to reduce incoming damage and protect nearby allies.",
  "Enhanced Physique": "Boosts strength and endurance, improving damage and durability.",
  "Command Training": "Provides team buffs that enhance accuracy and defense.",
  "Optic Blast": "Powerful ranged beam that pierces through multiple targets.",
  "Team Leader": "Increases squad cohesion, granting small bonuses to all allies.",
  "Precision Control": "Improves accuracy and minimizes collateral damage from powers.",
  "Improvised Weapons": "Finds usable gear mid-fight for surprise damage boosts.",
  "Ambush Tactics": "Opens fights with a high-damage strike before enemies react.",
  "Field Training": "Versatile support that improves adaptability and defense.",
  "Energy Sidearm": "Reliable ranged attack that ignores light armor.",
  "Team Support": "Provides quick heals or buffs to stabilize allies.",
  "Tactical Gear": "Deploys tools that enhance mobility or defense.",
  "Paid Precision": "Focuses on high-value targets for increased accuracy and crits.",
  "High Mobility": "Quickly repositions to flank or escape danger.",
  "Stealth Mastery": "Avoids detection and gains bonus damage from stealth.",
  "Smoke Bombs": "Creates cover to reduce enemy accuracy and break targeting.",
  "Blade Work": "Expert melee slashes that bleed targets over time.",
  "Field Discipline": "Maintains steady defense and reduces incoming status effects.",
  "Rifle Training": "Improves long-range accuracy and headshot potential.",
  "Armor Kit": "Adds extra plating to reduce sustained damage.",
  "Sai Mastery": "Swift dual-weapon strikes that bypass light armor.",
  "Assassin Training": "Excels at eliminating priority targets quickly.",
  "Silent Footwork": "Moves without alerting enemies, improving ambush success.",
  "Adhesive Blasts": "Pins foes in place, reducing their mobility.",
  Improviser: "Adapts to the situation, gaining a bonus to random checks.",
  "Sticky Traps": "Sets hazards that slow or root approaching enemies.",
  "Super Leap": "Vaults over obstacles to reach backline targets.",
  "Tongue Lash": "Pulls enemies closer, disrupting their formation.",
  Acrobatic: "Evades area attacks with nimble movement.",
  "Flame Control": "Deals burning damage and clears enemy cover.",
  "Area Denial": "Forces foes to reposition, controlling the battlefield.",
  "Fear Tactics": "Applies fear to weaken enemy attacks.",
  "Plasmoid Bursts": "Delivers explosive energy damage in a small radius.",
  "Team Booster": "Increases ally morale, boosting speed and accuracy.",
  "Quick Learner": "Gains a small stat boost each turn as the fight progresses.",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const escapeAttribute = (value: string) => value.replace(/"/g, "&quot;");

const hexToRgb = (value: string) => {
  const normalized = value.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((channel) => `${channel}${channel}`)
          .join("")
      : normalized;
  if (expanded.length !== 6) {
    return null;
  }
  const numeric = Number.parseInt(expanded, 16);
  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255,
  };
};

const rgbToHsl = (r: number, g: number, b: number) => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const lightness = (max + min) / 2;
  if (delta === 0) {
    return { h: 0, s: 0, l: lightness * 100 };
  }
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;
  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;
    case green:
      hue = (blue - red) / delta + 2;
      break;
    default:
      hue = (red - green) / delta + 4;
      break;
  }
  return { h: hue * 60, s: saturation * 100, l: lightness * 100 };
};

const hslToHex = (h: number, s: number, l: number) => {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const hueSegment = h / 60;
  const second = chroma * (1 - Math.abs((hueSegment % 2) - 1));
  const match = lightness - chroma / 2;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (hueSegment >= 0 && hueSegment < 1) {
    red = chroma;
    green = second;
  } else if (hueSegment >= 1 && hueSegment < 2) {
    red = second;
    green = chroma;
  } else if (hueSegment >= 2 && hueSegment < 3) {
    green = chroma;
    blue = second;
  } else if (hueSegment >= 3 && hueSegment < 4) {
    green = second;
    blue = chroma;
  } else if (hueSegment >= 4 && hueSegment < 5) {
    red = second;
    blue = chroma;
  } else {
    red = chroma;
    blue = second;
  }
  const toHex = (channel: number) => Math.round((channel + match) * 255).toString(16).padStart(2, "0");
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
};

const generateDistinctHighlightColor = (baseColor: string) => {
  const fallback = { r: 229, g: 57, b: 53 };
  const base = hexToRgb(baseColor) ?? fallback;
  const baseHue = rgbToHsl(base.r, base.g, base.b).h;
  const offset = 90 + Math.random() * 180;
  const hue = (baseHue + offset) % 360;
  return hslToHex(hue, 70, 45);
};

export class GameApp {
  private currentScreen: ScreenView = "title";
  private characterSelectionMode: CharacterSelectionMode = "browse";
  private draftOrigin: "lobby" | "cpu-setup" | "pvc-lobby" | null = null;
  private teamPointCap = 20;
  private pointsRemaining = { one: 20, two: 20 };
  private selectedCharacters = { one: [] as string[], two: [] as string[] };
  private activeDraftPlayer: DraftPlayer = "one";
  private draftSettings: DraftSettings = {
    seeOpponentSelection: false,
    allowDuplicateSelection: true,
  };
  private readyState = { playerOne: false, playerTwo: false };
  private playerHighlightColor = "#e53935";
  private cpuHighlightColor = "#1e88e5";
  private lobbyPlayers = { count: 0, assigned: [] as DraftPlayer[] };
  private lobbySettings = {
    map: "Stark Tower Atrium",
    mapSize: "Standard",
    gameType: "Skirmish",
  };
  private cpuDifficulty = "Veteran";
  private cpuRosterSelection: CpuRosterSelection = "random";
  private wsClient?: WsClient;
  private playerId: DraftPlayer | null = null;
  private roomId = "local";

  constructor(private readonly selector: string) {}

  mount() {
    const root = document.querySelector(this.selector);
    if (!root) {
      throw new Error(`Root element not found: ${this.selector}`);
    }

    this.setupLobbyConnection();
    this.render(root);
  }

  private setupLobbyConnection() {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const serverPort = window.location.port === "5173" ? "8000" : window.location.port;
    const serverHost = serverPort ? `${window.location.hostname}:${serverPort}` : window.location.hostname;
    const url = `${protocol}://${serverHost}/ws/lobby?room=${encodeURIComponent(this.roomId)}`;
    this.wsClient = new WsClient({ url });
    this.wsClient.onMessage((message) => this.handleLobbyMessage(message));
    this.wsClient.connect();
  }

  private handleLobbyMessage(message: { type?: string; payload?: any }) {
    if (message.type !== "state") {
      return;
    }
    const payload = message.payload ?? {};
    const settings = payload.settings ?? {};
    this.playerId = (payload.playerId as DraftPlayer) ?? this.playerId;
    this.teamPointCap = Number(settings.teamPointCap ?? this.teamPointCap);
    this.lobbySettings = {
      map: String(settings.map ?? this.lobbySettings.map),
      mapSize: String(settings.mapSize ?? this.lobbySettings.mapSize),
      gameType: String(settings.gameType ?? this.lobbySettings.gameType),
    };
    this.draftSettings = {
      seeOpponentSelection: Boolean(settings.seeOpponentSelection),
      allowDuplicateSelection:
        Boolean(settings.allowDuplicateSelection) || !Boolean(settings.seeOpponentSelection),
    };
    const players = payload.players ?? {};
    this.lobbyPlayers = {
      count: Number(players.count ?? this.lobbyPlayers.count),
      assigned: Array.isArray(players.assigned) ? players.assigned : this.lobbyPlayers.assigned,
    };

    const selections = payload.selections ?? {};
    const ready = payload.ready ?? {};
    if (this.playerId === "one") {
      this.selectedCharacters = {
        one: selections.self ?? [],
        two: selections.opponent ?? [],
      };
      this.readyState = {
        playerOne: Boolean(ready.self),
        playerTwo: Boolean(ready.opponent),
      };
    } else if (this.playerId === "two") {
      this.selectedCharacters = {
        one: selections.opponent ?? [],
        two: selections.self ?? [],
      };
      this.readyState = {
        playerOne: Boolean(ready.opponent),
        playerTwo: Boolean(ready.self),
      };
    }
    this.syncPointsRemaining();
    const returnToLobby = Boolean(payload.returnToLobby);
    if (returnToLobby) {
      this.resetDraftSelections();
      this.characterSelectionMode = "draft";
      this.draftOrigin = "lobby";
      this.currentScreen = "lobby";
    } else if (
      this.draftOrigin === "lobby" &&
      this.draftSettings.seeOpponentSelection &&
      !this.draftSettings.allowDuplicateSelection
    ) {
      this.updateAlternatingDraftTurn();
    }
    const root = document.querySelector(this.selector);
    if (root) {
      this.render(root);
    }
  }

  private sendLobbyMessage(type: string, payload: Record<string, unknown>) {
    this.wsClient?.send({ type, payload });
  }

  private syncPointsRemaining() {
    const totals = {
      one: this.teamPointCap,
      two: this.teamPointCap,
    };
    const rosterValue = new Map(CHARACTER_ROSTER.map((character) => [slugify(character.alias), character.pointValue]));
    (["one", "two"] as DraftPlayer[]).forEach((player) => {
      const spent = this.selectedCharacters[player].reduce((sum, id) => sum + (rosterValue.get(id) ?? 0), 0);
      totals[player] = Math.max(this.teamPointCap - spent, 0);
    });
    this.pointsRemaining = totals;
  }

  private updateAlternatingDraftTurn() {
    const canPick = (player: DraftPlayer) => {
      const rosterValue = new Map(CHARACTER_ROSTER.map((character) => [slugify(character.alias), character.pointValue]));
      return CHARACTER_ROSTER.some((character) => {
        const id = slugify(character.alias);
        const alreadySelected =
          this.selectedCharacters.one.includes(id) || this.selectedCharacters.two.includes(id);
        if (alreadySelected) {
          return false;
        }
        return this.pointsRemaining[player] - (rosterValue.get(id) ?? 0) >= 0;
      });
    };
    const hasOnePick = canPick("one");
    const hasTwoPick = canPick("two");
    if (!hasOnePick && !hasTwoPick) {
      return;
    }
    if (!hasOnePick) {
      this.activeDraftPlayer = "two";
      return;
    }
    if (!hasTwoPick) {
      this.activeDraftPlayer = "one";
      return;
    }
    const selectionDiff = this.selectedCharacters.one.length - this.selectedCharacters.two.length;
    if (selectionDiff === 0) {
      this.activeDraftPlayer = "one";
      return;
    }
    this.activeDraftPlayer = selectionDiff < 0 ? "one" : "two";
  }

  private render(root: Element) {
    if (this.currentScreen === "title") {
      this.renderTitle(root);
      return;
    }

    if (this.currentScreen === "lobby") {
      this.renderLobby(root);
      return;
    }

    if (this.currentScreen === "pvc-lobby") {
      this.renderPlayerVsComputerLobby(root);
      return;
    }

    if (this.currentScreen === "rules") {
      this.renderRules(root);
      return;
    }

    if (this.currentScreen === "match") {
      this.renderMatch(root);
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
            <button class="title-screen__button" type="button" data-action="open-lobby">Player vs Player</button>
            <button class="title-screen__button" type="button" data-action="open-pvc-lobby">Player vs Computer</button>
            <button class="title-screen__button" type="button" data-action="open-characters">
              Available Characters
            </button>
            <button class="title-screen__button" type="button" data-action="open-rules">Rules</button>
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
      this.characterSelectionMode = "browse";
      this.draftOrigin = null;
      this.currentScreen = "characters";
      this.render(root);
    });

    const lobbyButton = root.querySelector<HTMLButtonElement>("[data-action='open-lobby']");
    lobbyButton?.addEventListener("click", () => {
      this.currentScreen = "lobby";
      this.render(root);
    });

    const playerVsComputerButton = root.querySelector<HTMLButtonElement>("[data-action='open-pvc-lobby']");
    playerVsComputerButton?.addEventListener("click", () => {
      this.currentScreen = "pvc-lobby";
      this.render(root);
    });

    const rulesButton = root.querySelector<HTMLButtonElement>("[data-action='open-rules']");
    rulesButton?.addEventListener("click", () => {
      this.currentScreen = "rules";
      this.render(root);
    });

    const cpuSetupButton = root.querySelector<HTMLButtonElement>("[data-action='open-cpu-setup']");
    cpuSetupButton?.addEventListener("click", () => {
      this.currentScreen = "cpu-setup";
      this.render(root);
    });
  }

  private renderLobby(root: Element) {
    const playerIndicator = this.playerId
      ? `You are: ${this.playerId === "two" ? "Player Two" : "Player One"}`
      : "Waiting for player slot...";
    const opponentJoined = this.lobbyPlayers.count >= 2;
    const opponentIndicator = opponentJoined ? "Opponent joined ✓" : "Awaiting another player...";
    const proceedDisabled = !opponentJoined || !this.playerId;
    root.innerHTML = `
      <main class="app-shell lobby-screen">
        <div class="lobby-screen__overlay"></div>
        <section class="lobby-screen__content">
          <header class="lobby-screen__header">
            <div>
              <p class="title-screen__eyebrow">Marvel Squad RPG</p>
              <h1 class="lobby-screen__title">Player vs Player Lobby</h1>
              <p class="lobby-screen__subtitle">
                Securely connect through Cloudflare Tunnel and confirm match settings before you draft.
              </p>
              <p class="lobby-screen__player-indicator">${playerIndicator}</p>
              <p class="lobby-screen__player-indicator lobby-screen__player-indicator--status">${opponentIndicator}</p>
            </div>
            <div class="lobby-screen__actions">
              <button class="title-screen__button" type="button" data-action="cancel-game">
                Cancel Game
              </button>
              <button
                class="title-screen__button lobby-screen__button-next"
                type="button"
                data-action="open-characters"
                ${proceedDisabled ? "disabled" : ""}
                ${proceedDisabled ? 'title="awaiting other player"' : ""}
              >
                Character Selection
              </button>
            </div>
          </header>

          <section class="lobby-screen__panel" aria-label="Cloudflare setup">
            <h2>Cloudflare Setup (Secure by Default)</h2>
            <ol class="lobby-screen__instructions">
              <li>Install Cloudflare Warp: <span class="lobby-screen__accent">https://one.one.one.one/</span></li>
              <li>Create a free Cloudflare account and enroll in Zero Trust.</li>
              <li>Install cloudflared and run a named tunnel for this match.</li>
              <li>Share the generated tunnel URL with your opponent (never your raw IP).</li>
              <li>Require short-lived tokens and rotate tunnel credentials after each session.</li>
            </ol>
            <div class="lobby-screen__note">
              <strong>Security tip:</strong> Keep the tunnel private, use multi-factor authentication, and disable the
              tunnel when the match ends.
            </div>
          </section>

          <section class="lobby-screen__grid" aria-label="Match settings and connection status">
            <div class="lobby-screen__panel">
              <h2>Game Settings</h2>
              <div class="lobby-screen__form">
                <label>
                  Map
                  <select data-setting="map">
                    <option>Stark Tower Atrium</option>
                    <option>Madripoor Backstreets</option>
                    <option>Helicarrier Hangar</option>
                    <option>Xavier Institute</option>
                    <option>Quantum Realm Rift</option>
                  </select>
                </label>
                <label>
                  Map Size
                  <select data-setting="map-size">
                    <option>Compact</option>
                    <option>Standard</option>
                    <option>Large</option>
                    <option>Massive</option>
                  </select>
                </label>
                <label>
                  Total Team Points
                  <select data-setting="team-points">
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                  </select>
                </label>
                <label>
                  See opponent character selection
                  <select data-setting="see-opponent">
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </label>
                <label>
                  Allow duplicate hero selection
                  <select data-setting="allow-duplicate">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
                <label>
                  Game Type
                  <select data-setting="game-type">
                    <option>Skirmish</option>
                    <option>Capture the Relic</option>
                    <option>King of the Hill</option>
                    <option>Escort</option>
                    <option>Survival</option>
                  </select>
                </label>
                <label>
                  Your Highlight Color
                  <input type="color" data-setting="player-color" aria-label="Your highlight color" />
                </label>
              </div>
            </div>

            <div class="lobby-screen__panel">
              <h2>Cloudflare Connection</h2>
              <div class="lobby-screen__connection">
                <div>
                  <h3>Player One (You)</h3>
                  <p class="lobby-screen__status lobby-screen__status--online">Tunnel: Connected</p>
                  <p>Warp Client: Protected</p>
                  <p>Public IP (masked): 203.0.113.xxx</p>
                  <p>Latency: 32 ms · Throughput: 48 Mbps</p>
                </div>
                <div>
                  <h3>Player Two</h3>
                  <p class="lobby-screen__status lobby-screen__status--online">Tunnel: Connected</p>
                  <p>Warp Client: Protected</p>
                  <p>Public IP (masked): 198.51.100.xxx</p>
                  <p>Latency: 41 ms · Throughput: 41 Mbps</p>
                </div>
              </div>
              <div class="lobby-screen__note">
                Diagnostics are shared to verify the tunnel is healthy without exposing real IP addresses.
              </div>
            </div>
          </section>
        </section>
        <audio class="lobby-screen__music" src="/assets/title-theme.mp4" autoplay loop></audio>
      </main>
    `;

    const cancelButton = root.querySelector<HTMLButtonElement>("[data-action='cancel-game']");
    cancelButton?.addEventListener("click", () => {
      this.currentScreen = "title";
      this.render(root);
    });

    const proceedButton = root.querySelector<HTMLButtonElement>("[data-action='open-characters']");
    proceedButton?.addEventListener("click", () => {
      if (proceedDisabled) {
        return;
      }
      const mapSelect = root.querySelector<HTMLSelectElement>("[data-setting='map']");
      const mapSizeSelect = root.querySelector<HTMLSelectElement>("[data-setting='map-size']");
      const gameTypeSelect = root.querySelector<HTMLSelectElement>("[data-setting='game-type']");
      const pointsSelect = root.querySelector<HTMLSelectElement>("[data-setting='team-points']");
      const seeOpponentSelect = root.querySelector<HTMLSelectElement>("[data-setting='see-opponent']");
      const allowDuplicateSelect = root.querySelector<HTMLSelectElement>("[data-setting='allow-duplicate']");
      this.lobbySettings = {
        map: mapSelect?.value ?? this.lobbySettings.map,
        mapSize: mapSizeSelect?.value ?? this.lobbySettings.mapSize,
        gameType: gameTypeSelect?.value ?? this.lobbySettings.gameType,
      };
      this.teamPointCap = Number(pointsSelect?.value ?? 20);
      this.pointsRemaining = { one: this.teamPointCap, two: this.teamPointCap };
      this.selectedCharacters = { one: [], two: [] };
      this.activeDraftPlayer = "one";
      this.readyState = { playerOne: false, playerTwo: false };
      const seeOpponentSelection = (seeOpponentSelect?.value ?? "no") === "yes";
      const allowDuplicateSelection =
        (allowDuplicateSelect?.value ?? "yes") === "yes" || !seeOpponentSelection;
      this.draftSettings = { seeOpponentSelection, allowDuplicateSelection };
      this.sendLobbyMessage("settings:update", {
        teamPointCap: this.teamPointCap,
        seeOpponentSelection,
        allowDuplicateSelection,
        map: this.lobbySettings.map,
        mapSize: this.lobbySettings.mapSize,
        gameType: this.lobbySettings.gameType,
      });
      this.sendLobbyMessage("draft:reset", {});
      this.draftOrigin = "lobby";
      this.characterSelectionMode = "draft";
      this.currentScreen = "characters";
      this.render(root);
    });

    const mapSelect = root.querySelector<HTMLSelectElement>("[data-setting='map']");
    const mapSizeSelect = root.querySelector<HTMLSelectElement>("[data-setting='map-size']");
    const gameTypeSelect = root.querySelector<HTMLSelectElement>("[data-setting='game-type']");
    const pointsSelect = root.querySelector<HTMLSelectElement>("[data-setting='team-points']");
    const seeOpponentSelect = root.querySelector<HTMLSelectElement>("[data-setting='see-opponent']");
    const allowDuplicateSelect = root.querySelector<HTMLSelectElement>("[data-setting='allow-duplicate']");
    if (mapSelect) {
      mapSelect.value = this.lobbySettings.map;
      mapSelect.addEventListener("change", () => {
        this.lobbySettings.map = mapSelect.value;
        this.sendLobbyMessage("settings:update", { map: this.lobbySettings.map });
      });
    }

    if (mapSizeSelect) {
      mapSizeSelect.value = this.lobbySettings.mapSize;
      mapSizeSelect.addEventListener("change", () => {
        this.lobbySettings.mapSize = mapSizeSelect.value;
        this.sendLobbyMessage("settings:update", { mapSize: this.lobbySettings.mapSize });
      });
    }

    if (gameTypeSelect) {
      gameTypeSelect.value = this.lobbySettings.gameType;
      gameTypeSelect.addEventListener("change", () => {
        this.lobbySettings.gameType = gameTypeSelect.value;
        this.sendLobbyMessage("settings:update", { gameType: this.lobbySettings.gameType });
      });
    }
    if (pointsSelect) {
      pointsSelect.value = String(this.teamPointCap);
      pointsSelect.addEventListener("change", () => {
        this.teamPointCap = Number(pointsSelect.value);
        this.sendLobbyMessage("settings:update", { teamPointCap: this.teamPointCap });
      });
    }

    if (seeOpponentSelect && allowDuplicateSelect) {
      seeOpponentSelect.value = this.draftSettings.seeOpponentSelection ? "yes" : "no";
      allowDuplicateSelect.value = this.draftSettings.allowDuplicateSelection ? "yes" : "no";
      allowDuplicateSelect.disabled = !this.draftSettings.seeOpponentSelection;

      const syncSelectionSettings = () => {
        const seeOpponent = seeOpponentSelect.value === "yes";
        allowDuplicateSelect.disabled = !seeOpponent;
        if (!seeOpponent) {
          allowDuplicateSelect.value = "yes";
        }
        const allowDuplicate = allowDuplicateSelect.value === "yes" || !seeOpponent;
        this.sendLobbyMessage("settings:update", {
          seeOpponentSelection: seeOpponent,
          allowDuplicateSelection: allowDuplicate,
        });
      };

      seeOpponentSelect.addEventListener("change", syncSelectionSettings);
      allowDuplicateSelect.addEventListener("change", syncSelectionSettings);
    }

    const playerColorInput = root.querySelector<HTMLInputElement>("[data-setting='player-color']");
    if (playerColorInput) {
      playerColorInput.value = this.playerHighlightColor;
      playerColorInput.addEventListener("change", () => {
        this.playerHighlightColor = playerColorInput.value;
      });
    }
  }

  private renderCpuSetup(root: Element) {
    root.innerHTML = `
      <main class="app-shell lobby-screen">
        <div class="lobby-screen__overlay"></div>
        <section class="lobby-screen__content">
          <header class="lobby-screen__header">
            <div>
              <p class="title-screen__eyebrow">Marvel Squad RPG</p>
              <h1 class="lobby-screen__title">Player vs Computer Setup</h1>
              <p class="lobby-screen__subtitle">
                Configure the match rules and pick the AI difficulty before drafting your squad.
              </p>
            </div>
            <div class="lobby-screen__actions">
              <button class="title-screen__button" type="button" data-action="cancel-game">
                Back to Title
              </button>
              <button
                class="title-screen__button lobby-screen__button-next"
                type="button"
                data-action="open-characters"
              >
                Character Selection
              </button>
            </div>
          </header>

          <section class="lobby-screen__grid" aria-label="Match settings">
            <div class="lobby-screen__panel">
              <h2>Game Settings</h2>
              <div class="lobby-screen__form">
                <label>
                  Map
                  <select>
                    <option>Stark Tower Atrium</option>
                    <option>Madripoor Backstreets</option>
                    <option>Helicarrier Hangar</option>
                    <option>Xavier Institute</option>
                    <option>Quantum Realm Rift</option>
                  </select>
                </label>
                <label>
                  Map Size
                  <select>
                    <option>Compact</option>
                    <option>Standard</option>
                    <option>Large</option>
                    <option>Massive</option>
                  </select>
                </label>
                <label>
                  Total Team Points
                  <select data-setting="team-points">
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                  </select>
                </label>
                <label>
                  See opponent character selection
                  <select data-setting="see-opponent">
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </label>
                <label>
                  Allow duplicate hero selection
                  <select data-setting="allow-duplicate">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
                <label>
                  Game Type
                  <select>
                    <option>Skirmish</option>
                    <option>Capture the Relic</option>
                    <option>King of the Hill</option>
                    <option>Escort</option>
                    <option>Survival</option>
                  </select>
                </label>
                <label>
                  Computer Difficulty
                  <select data-setting="cpu-difficulty">
                    <option>Recruit</option>
                    <option>Veteran</option>
                    <option>Heroic</option>
                    <option>Legendary</option>
                  </select>
                </label>
                <label>
                  Computer Roster Selection
                  <select data-setting="cpu-roster">
                    <option value="random">Random</option>
                    <option value="player">Player Chosen</option>
                  </select>
                </label>
                <label>
                  Player Highlight Color
                  <input type="color" data-setting="player-color" aria-label="Player highlight color" />
                </label>
              </div>
            </div>
          </section>
        </section>
        <audio class="lobby-screen__music" src="/assets/title-theme.mp4" autoplay loop></audio>
      </main>
    `;

    const cancelButton = root.querySelector<HTMLButtonElement>("[data-action='cancel-game']");
    cancelButton?.addEventListener("click", () => {
      this.currentScreen = "title";
      this.render(root);
    });

    const proceedButton = root.querySelector<HTMLButtonElement>("[data-action='open-characters']");
    proceedButton?.addEventListener("click", () => {
      const pointsSelect = root.querySelector<HTMLSelectElement>("[data-setting='team-points']");
      const seeOpponentSelect = root.querySelector<HTMLSelectElement>("[data-setting='see-opponent']");
      const allowDuplicateSelect = root.querySelector<HTMLSelectElement>("[data-setting='allow-duplicate']");
      this.teamPointCap = Number(pointsSelect?.value ?? 20);
      this.pointsRemaining = { one: this.teamPointCap, two: this.teamPointCap };
      this.selectedCharacters = { one: [], two: [] };
      this.activeDraftPlayer = "one";
      this.readyState = { playerOne: false, playerTwo: false };
      const seeOpponentSelection = (seeOpponentSelect?.value ?? "no") === "yes";
      const allowDuplicateSelection =
        (allowDuplicateSelect?.value ?? "yes") === "yes" || !seeOpponentSelection;
      this.draftSettings = { seeOpponentSelection, allowDuplicateSelection };
      this.draftOrigin = "cpu-setup";
      this.characterSelectionMode = "draft";
      const rosterSelect = root.querySelector<HTMLSelectElement>("[data-setting='cpu-roster']");
      this.cpuRosterSelection = (rosterSelect?.value ?? "random") as CpuRosterSelection;
      this.assignCpuHighlightColor();
      if (this.cpuRosterSelection === "random") {
        this.generateCpuRoster();
        this.activeDraftPlayer = "one";
      }
      this.currentScreen = "characters";
      this.render(root);
    });

    const pointsSelect = root.querySelector<HTMLSelectElement>("[data-setting='team-points']");
    const seeOpponentSelect = root.querySelector<HTMLSelectElement>("[data-setting='see-opponent']");
    const allowDuplicateSelect = root.querySelector<HTMLSelectElement>("[data-setting='allow-duplicate']");
    const cpuDifficultySelect = root.querySelector<HTMLSelectElement>("[data-setting='cpu-difficulty']");
    const cpuRosterSelect = root.querySelector<HTMLSelectElement>("[data-setting='cpu-roster']");
    if (pointsSelect) {
      pointsSelect.value = String(this.teamPointCap);
      pointsSelect.addEventListener("change", () => {
        this.teamPointCap = Number(pointsSelect.value);
      });
    }

    if (seeOpponentSelect && allowDuplicateSelect) {
      seeOpponentSelect.value = this.draftSettings.seeOpponentSelection ? "yes" : "no";
      allowDuplicateSelect.value = this.draftSettings.allowDuplicateSelection ? "yes" : "no";
      allowDuplicateSelect.disabled = !this.draftSettings.seeOpponentSelection;

      const syncSelectionSettings = () => {
        const seeOpponent = seeOpponentSelect.value === "yes";
        allowDuplicateSelect.disabled = !seeOpponent;
        if (!seeOpponent) {
          allowDuplicateSelect.value = "yes";
        }
      };

      seeOpponentSelect.addEventListener("change", syncSelectionSettings);
      allowDuplicateSelect.addEventListener("change", syncSelectionSettings);
    }

    if (cpuDifficultySelect) {
      cpuDifficultySelect.value = this.cpuDifficulty;
      cpuDifficultySelect.addEventListener("change", () => {
        this.cpuDifficulty = cpuDifficultySelect.value;
      });
    }

    if (cpuRosterSelect) {
      cpuRosterSelect.value = this.cpuRosterSelection;
      cpuRosterSelect.addEventListener("change", () => {
        this.cpuRosterSelection = cpuRosterSelect.value as CpuRosterSelection;
      });
    }

    const playerColorInput = root.querySelector<HTMLInputElement>("[data-setting='player-color']");
    if (playerColorInput) {
      playerColorInput.value = this.playerHighlightColor;
      playerColorInput.addEventListener("change", () => {
        this.playerHighlightColor = playerColorInput.value;
      });
    }
  }

  private renderPlayerVsComputerLobby(root: Element) {
    root.innerHTML = `
      <main class="app-shell lobby-screen lobby-screen--pvc">
        <div class="lobby-screen__overlay"></div>
        <section class="lobby-screen__content">
          <header class="lobby-screen__header">
            <div>
              <p class="title-screen__eyebrow">Marvel Squad RPG</p>
              <h1 class="lobby-screen__title">Player vs Computer Lobby</h1>
              <p class="lobby-screen__subtitle">
                Tune the match settings before drafting your squad against the AI.
              </p>
            </div>
            <div class="lobby-screen__actions">
              <button class="title-screen__button" type="button" data-action="cancel-game">
                Cancel Game
              </button>
              <button
                class="title-screen__button lobby-screen__button-next"
                type="button"
                data-action="open-characters"
              >
                Character Selection
              </button>
            </div>
          </header>

          <section class="lobby-screen__panel" aria-label="Match settings">
            <h2>Game Settings</h2>
            <div class="lobby-screen__form">
              <label>
                Map
                <select>
                  <option>Stark Tower Atrium</option>
                  <option>Madripoor Backstreets</option>
                  <option>Helicarrier Hangar</option>
                  <option>Xavier Institute</option>
                  <option>Quantum Realm Rift</option>
                </select>
              </label>
              <label>
                Map Size
                <select>
                  <option>Compact</option>
                  <option>Standard</option>
                  <option>Large</option>
                  <option>Massive</option>
                </select>
              </label>
              <label>
                Total Team Points
                <select data-setting="team-points">
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                </select>
              </label>
              <label>
                Computer Character Selection
                <select data-setting="cpu-roster">
                  <option value="player">Player Selected</option>
                  <option value="random">Computer Selected</option>
                </select>
              </label>
              <label>
                Game Type
                <select>
                  <option>Skirmish</option>
                  <option>Capture the Relic</option>
                  <option>King of the Hill</option>
                  <option>Escort</option>
                  <option>Survival</option>
                </select>
              </label>
              <label>
                AI Difficulty
                <select data-setting="cpu-difficulty">
                  <option>Story</option>
                  <option>Veteran</option>
                  <option>Heroic</option>
                  <option>Legendary</option>
                </select>
              </label>
            </div>
          </section>
        </section>
        <audio class="lobby-screen__music" src="/assets/title-theme.mp4" autoplay loop></audio>
      </main>
    `;

    const cancelButton = root.querySelector<HTMLButtonElement>("[data-action='cancel-game']");
    cancelButton?.addEventListener("click", () => {
      this.currentScreen = "title";
      this.render(root);
    });

    const proceedButton = root.querySelector<HTMLButtonElement>("[data-action='open-characters']");
    proceedButton?.addEventListener("click", () => {
      const pointsSelect = root.querySelector<HTMLSelectElement>("[data-setting='team-points']");
      const cpuRosterSelect = root.querySelector<HTMLSelectElement>("[data-setting='cpu-roster']");
      const cpuDifficultySelect = root.querySelector<HTMLSelectElement>("[data-setting='cpu-difficulty']");
      this.teamPointCap = Number(pointsSelect?.value ?? 20);
      this.pointsRemaining = { one: this.teamPointCap, two: this.teamPointCap };
      this.selectedCharacters = { one: [], two: [] };
      this.activeDraftPlayer = "one";
      this.readyState = { playerOne: false, playerTwo: false };
      this.draftSettings = { seeOpponentSelection: true, allowDuplicateSelection: true };
      this.draftOrigin = "pvc-lobby";
      this.characterSelectionMode = "draft";
      this.cpuRosterSelection = (cpuRosterSelect?.value ?? "random") as CpuRosterSelection;
      this.cpuDifficulty = cpuDifficultySelect?.value ?? this.cpuDifficulty;
      this.assignCpuHighlightColor();
      if (this.cpuRosterSelection === "random") {
        this.generateCpuRoster();
        this.activeDraftPlayer = "one";
      }
      this.currentScreen = "characters";
      this.render(root);
    });

    const pointsSelect = root.querySelector<HTMLSelectElement>("[data-setting='team-points']");
    const cpuDifficultySelect = root.querySelector<HTMLSelectElement>("[data-setting='cpu-difficulty']");
    const cpuRosterSelect = root.querySelector<HTMLSelectElement>("[data-setting='cpu-roster']");
    if (pointsSelect) {
      pointsSelect.value = String(this.teamPointCap);
      pointsSelect.addEventListener("change", () => {
        this.teamPointCap = Number(pointsSelect.value);
      });
    }
    if (cpuDifficultySelect) {
      cpuDifficultySelect.value = this.cpuDifficulty;
      cpuDifficultySelect.addEventListener("change", () => {
        this.cpuDifficulty = cpuDifficultySelect.value;
      });
    }
    if (cpuRosterSelect) {
      cpuRosterSelect.value = this.cpuRosterSelection;
      cpuRosterSelect.addEventListener("change", () => {
        this.cpuRosterSelection = cpuRosterSelect.value as CpuRosterSelection;
      });
    }
  }

  private renderCharacters(root: Element) {
    const isDraft = this.characterSelectionMode === "draft";
    const showOpponentSelection = this.draftSettings.seeOpponentSelection;
    const allowDuplicateSelection = this.draftSettings.allowDuplicateSelection;
    const isAlternatingDraft = showOpponentSelection && !allowDuplicateSelection;
    const isCpuMatch = this.draftOrigin === "cpu-setup" || this.draftOrigin === "pvc-lobby";
    const isCpuRandom = isCpuMatch && this.cpuRosterSelection === "random";
    const showPlayerToggle = isCpuMatch && this.cpuRosterSelection === "player";
    const isNetworkMatch = this.draftOrigin === "lobby";
    const opponentHighlightColor = isNetworkMatch ? "#1e88e5" : this.cpuHighlightColor;
    const playerColors =
      isNetworkMatch && this.playerId === "two"
        ? {
            one: [opponentHighlightColor],
            two: [this.playerHighlightColor],
          }
        : {
            one: [this.playerHighlightColor],
            two: [opponentHighlightColor],
          };
    const draftBackLabel = this.draftOrigin === "cpu-setup" ? "Back to Game Setup" : "Back to Lobby";
    const networkPlayerLabel = this.playerId === "two" ? "Player Two" : "Player One";
    const networkOpponentLabel = this.playerId === "two" ? "Player One" : "Player Two";
    const networkIndicator = this.playerId ? `You are: ${networkPlayerLabel}` : "Waiting for player slot...";
    if (isCpuRandom) {
      this.activeDraftPlayer = "one";
    }
    if (isNetworkMatch && this.playerId && !isAlternatingDraft) {
      this.activeDraftPlayer = this.playerId;
    }

    const isSelectedByPlayer = (player: DraftPlayer, id: string) =>
      this.selectedCharacters[player].includes(id);
    const getSelectionColor = (player: DraftPlayer, id: string) => {
      const index = this.selectedCharacters[player].indexOf(id);
      const palette = playerColors[player];
      return palette[Math.max(index, 0) % palette.length];
    };
    const playerLabel = (player: DraftPlayer) =>
      isCpuMatch ? (player === "one" ? "Player" : "Computer") : player === "one" ? "Player One" : "Player Two";
    const canPlayerPick = (player: DraftPlayer) =>
      CHARACTER_ROSTER.some((character) => {
        const id = slugify(character.alias);
        const alreadySelected =
          isSelectedByPlayer("one", id) || isSelectedByPlayer("two", id);
        if (!allowDuplicateSelection && alreadySelected) {
          return false;
        }
        if (allowDuplicateSelection && isSelectedByPlayer(player, id)) {
          return false;
        }
        return this.pointsRemaining[player] - character.pointValue >= 0;
      });

    const cards = CHARACTER_ROSTER.map((character) => {
      const slug = slugify(character.alias);
      const portrait = `/assets/characters/portraits/${slug}.svg`;
      const avatar = `/assets/characters/avatars/${slug}.svg`;
      const selectedByOne = isSelectedByPlayer("one", slug);
      const selectedByTwo = isSelectedByPlayer("two", slug);
      const showPlayerOne = selectedByOne && (showOpponentSelection || this.activeDraftPlayer === "one");
      const showPlayerTwo = selectedByTwo && (showOpponentSelection || this.activeDraftPlayer === "two");
      const isSelected = showPlayerOne || showPlayerTwo;
      const isContested = showPlayerOne && showPlayerTwo;
      const selectionColor = showPlayerOne
        ? getSelectionColor("one", slug)
        : showPlayerTwo
          ? getSelectionColor("two", slug)
          : undefined;
      const secondaryColor = showPlayerOne && showPlayerTwo ? getSelectionColor("two", slug) : undefined;
      const alreadySelected =
        isSelectedByPlayer("one", slug) || isSelectedByPlayer("two", slug);
      const cannotAfford = this.pointsRemaining[this.activeDraftPlayer] - character.pointValue < 0;
      const isPlayerTurn =
        !isAlternatingDraft || !isNetworkMatch || !this.playerId || this.activeDraftPlayer === this.playerId;
      const cannotSelect =
        !isDraft ||
        !isPlayerTurn ||
        cannotAfford ||
        (!allowDuplicateSelection && alreadySelected) ||
        (allowDuplicateSelection && isSelectedByPlayer(this.activeDraftPlayer, slug));
      const traitsMarkup = character.traits
        .map((trait) => {
          const description = TRAIT_DESCRIPTIONS[trait] ?? "Trait details unavailable.";
          const tooltip = escapeAttribute(description);
          return `
            <span
              class="character-card__trait"
              tabindex="0"
              role="button"
              aria-label="${trait}: ${tooltip}"
              data-tooltip="${tooltip}"
            >
              ${trait}
            </span>
          `;
        })
        .join("");

      return `
        <article
          class="character-card${isSelected ? " character-card--selected" : ""}${isContested ? " character-card--contested" : ""}${cannotSelect ? " character-card--disabled" : ""}"
          data-character-id="${slug}"
          data-point-value="${character.pointValue}"
          ${
            selectionColor
              ? `style="--selection-color: ${selectionColor};${
                  secondaryColor ? ` --selection-color-secondary: ${secondaryColor};` : ""
                }"`
              : ""
          }
        >
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
            <div>
              <dt>Goodness</dt>
              <dd>${character.goodness}</dd>
            </div>
            <div class="character-card__traits">
              <dt>Traits</dt>
              <dd>
                <div class="character-card__traits-list">
                  ${traitsMarkup}
                </div>
              </dd>
            </div>
          </dl>
        </article>
      `;
    }).join("");

    root.innerHTML = `
      <main class="app-shell character-screen${isDraft ? " character-screen--draft" : ""}">
        <div class="character-screen__overlay"></div>
        <section class="character-screen__content">
          <header class="character-screen__header">
            <div>
              <p class="title-screen__eyebrow">Marvel Squad RPG</p>
              <h1 class="character-screen__title">Available Characters</h1>
              <p class="character-screen__subtitle">
                Point value balances fair team builds. Each match has a maximum point cap for team totals.
              </p>
              ${isNetworkMatch ? `<p class="character-screen__player-indicator">${networkIndicator}</p>` : ""}
            </div>
            <div class="character-screen__actions">
              ${
                isDraft
                  ? `
                    <div class="character-screen__points">
                      ${
                        showOpponentSelection
                          ? `
                            <div class="character-screen__points-block">
                              <span class="character-screen__points-label">${playerLabel("one")}</span>
                              <span class="character-screen__points-value" data-role="points-remaining" data-player="one">${this.pointsRemaining.one}</span>
                              <span class="character-screen__points-total">/ ${this.teamPointCap}</span>
                            </div>
                            <div class="character-screen__points-block">
                              <span class="character-screen__points-label">${playerLabel("two")}</span>
                              <span class="character-screen__points-value" data-role="points-remaining" data-player="two">${this.pointsRemaining.two}</span>
                              <span class="character-screen__points-total">/ ${this.teamPointCap}</span>
                            </div>
                          `
                          : `
                            <div class="character-screen__points-block">
                              <span class="character-screen__points-label" data-role="points-label">${playerLabel(this.activeDraftPlayer)}</span>
                              <span class="character-screen__points-value" data-role="points-remaining">${this.pointsRemaining[this.activeDraftPlayer]}</span>
                              <span class="character-screen__points-total">/ ${this.teamPointCap}</span>
                            </div>
                          `
                      }
                    </div>
                    <div class="character-screen__ready">
                      ${
                        showPlayerToggle
                          ? `
                            <div class="character-screen__player-toggle" role="group" aria-label="Active player selection">
                              <button
                                class="title-screen__button character-screen__player-button"
                                type="button"
                                data-action="set-active-player"
                                data-player="one"
                              >
                                Selecting: Player
                              </button>
                              <button
                                class="title-screen__button character-screen__player-button"
                                type="button"
                                data-action="set-active-player"
                                data-player="two"
                              >
                                Selecting: Computer
                              </button>
                            </div>
                          `
                          : `
                            <div class="character-screen__turn-indicator">
                              Current turn: ${playerLabel(this.activeDraftPlayer)}
                            </div>
                          `
                      }
                      ${
                        isNetworkMatch
                          ? `
                            <button
                              class="title-screen__button character-screen__ready-button"
                              type="button"
                              data-action="toggle-ready"
                              data-player="self"
                            >
                              ${networkPlayerLabel} Ready
                            </button>
                            <div class="character-screen__ready-status" data-role="opponent-ready">
                              ${networkOpponentLabel} not ready
                            </div>
                            <button
                              class="title-screen__button character-screen__start-button"
                              type="button"
                              data-action="start-game"
                              disabled
                            >
                              Waiting on other player
                            </button>
                          `
                          : `
                            <button
                              class="title-screen__button character-screen__ready-button"
                              type="button"
                              data-action="toggle-ready"
                              data-player="one"
                            >
                              ${playerLabel("one")} Ready
                            </button>
                            <button
                              class="title-screen__button character-screen__ready-button"
                              type="button"
                              data-action="toggle-ready"
                              data-player="two"
                            >
                              ${playerLabel("two")} Ready
                            </button>
                            <button
                              class="title-screen__button character-screen__start-button"
                              type="button"
                              data-action="start-game"
                              disabled
                            >
                              Waiting on other player
                            </button>
                          `
                      }
                    </div>
                  `
                  : ""
              }
              <button
                class="title-screen__button character-screen__back"
                type="button"
                data-action="back-screen"
              >
                ${isDraft ? draftBackLabel : "Back to Title"}
              </button>
            </div>
          </header>
          <div class="character-screen__grid" role="list">
            ${cards}
          </div>
        </section>
      </main>
    `;

    const backButton = root.querySelector<HTMLButtonElement>("[data-action='back-screen']");
    backButton?.addEventListener("click", () => {
      if (isDraft) {
        if (isNetworkMatch) {
          this.sendLobbyMessage("lobby:return", {});
          this.resetDraftSelections();
          this.currentScreen = "lobby";
        } else {
          this.resetDraftSelections();
          this.currentScreen =
            this.draftOrigin === "cpu-setup"
              ? "cpu-setup"
              : this.draftOrigin === "pvc-lobby"
                ? "pvc-lobby"
                : "lobby";
        }
      } else {
        this.currentScreen = "title";
      }
      this.render(root);
    });

    if (!isDraft) {
      return;
    }

    const pointsRemainingEls = root.querySelectorAll<HTMLElement>("[data-role='points-remaining']");
    const pointsLabel = root.querySelector<HTMLElement>("[data-role='points-label']");
    const readyButtons = root.querySelectorAll<HTMLButtonElement>("[data-action='toggle-ready']");
    const opponentReadyStatus = root.querySelector<HTMLElement>("[data-role='opponent-ready']");
    const playerButtons = root.querySelectorAll<HTMLButtonElement>("[data-action='set-active-player']");
    const startButton = root.querySelector<HTMLButtonElement>("[data-action='start-game']");
    const cardElements = Array.from(root.querySelectorAll<HTMLElement>(".character-card"));

    const updateDraftUI = () => {
      pointsRemainingEls.forEach((element) => {
        const player = (element.dataset.player as DraftPlayer | undefined) ?? this.activeDraftPlayer;
        element.textContent = String(this.pointsRemaining[player]);
      });
      if (pointsLabel && !showOpponentSelection) {
        pointsLabel.textContent = playerLabel(this.activeDraftPlayer);
      }

      readyButtons.forEach((button) => {
        const player = button.dataset.player;
        const isReady =
          player === "self"
            ? this.playerId === "two"
              ? this.readyState.playerTwo
              : this.readyState.playerOne
            : player === "one"
              ? this.readyState.playerOne
              : this.readyState.playerTwo;
        button.classList.toggle("character-screen__ready-button--active", isReady);
        button.textContent = isReady
          ? `${player === "self" ? networkPlayerLabel : player === "one" ? playerLabel("one") : playerLabel("two")} Ready ✓`
          : `${player === "self" ? networkPlayerLabel : player === "one" ? playerLabel("one") : playerLabel("two")} Ready`;
      });

      const allReady = this.readyState.playerOne && this.readyState.playerTwo;
      if (startButton) {
        startButton.disabled = !allReady;
        startButton.textContent = allReady ? "Start Game" : "Waiting on other player";
      }

      if (opponentReadyStatus && isNetworkMatch) {
        const opponentReady = this.playerId === "two" ? this.readyState.playerOne : this.readyState.playerTwo;
        opponentReadyStatus.textContent = opponentReady
          ? `${networkOpponentLabel} ready ✓`
          : `${networkOpponentLabel} not ready`;
      }

      playerButtons.forEach((button) => {
        const player = button.dataset.player as DraftPlayer | undefined;
        if (!player) {
          return;
        }
        button.classList.toggle("character-screen__player-button--active", player === this.activeDraftPlayer);
      });

      cardElements.forEach((card) => {
        const id = card.dataset.characterId;
        const value = Number(card.dataset.pointValue ?? 0);
        if (!id) {
          return;
        }
        const selectedByOne = isSelectedByPlayer("one", id);
        const selectedByTwo = isSelectedByPlayer("two", id);
        const showPlayerOne = selectedByOne && (showOpponentSelection || this.activeDraftPlayer === "one");
        const showPlayerTwo = selectedByTwo && (showOpponentSelection || this.activeDraftPlayer === "two");
        const selectionColor = showPlayerOne
          ? getSelectionColor("one", id)
          : showPlayerTwo
            ? getSelectionColor("two", id)
            : undefined;
        const secondaryColor = showPlayerOne && showPlayerTwo ? getSelectionColor("two", id) : undefined;
        const isSelected = Boolean(showPlayerOne || showPlayerTwo);
        const alreadySelected = selectedByOne || selectedByTwo;
        const cannotAfford = this.pointsRemaining[this.activeDraftPlayer] - value < 0;
        const isPlayerTurn =
          !isAlternatingDraft || !isNetworkMatch || !this.playerId || this.activeDraftPlayer === this.playerId;
        const cannotSelect =
          !isPlayerTurn ||
          cannotAfford ||
          (!allowDuplicateSelection && alreadySelected) ||
          (allowDuplicateSelection && isSelectedByPlayer(this.activeDraftPlayer, id));
        card.classList.toggle("character-card--selected", isSelected);
        card.classList.toggle("character-card--contested", showPlayerOne && showPlayerTwo);
        if (selectionColor) {
          card.style.setProperty("--selection-color", selectionColor);
        } else {
          card.style.removeProperty("--selection-color");
        }
        if (secondaryColor) {
          card.style.setProperty("--selection-color-secondary", secondaryColor);
        } else {
          card.style.removeProperty("--selection-color-secondary");
        }
        card.classList.toggle("character-card--disabled", cannotSelect);
      });
    };

    readyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const player = button.dataset.player;
        if (player === "self") {
          if (this.playerId === "two") {
            this.readyState.playerTwo = !this.readyState.playerTwo;
            this.sendLobbyMessage("ready:update", { ready: this.readyState.playerTwo });
          } else {
            this.readyState.playerOne = !this.readyState.playerOne;
            this.sendLobbyMessage("ready:update", { ready: this.readyState.playerOne });
          }
        } else if (player === "one") {
          this.readyState.playerOne = !this.readyState.playerOne;
        } else {
          this.readyState.playerTwo = !this.readyState.playerTwo;
        }
        updateDraftUI();
      });
    });

    playerButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const player = button.dataset.player as DraftPlayer | undefined;
        if (!player) {
          return;
        }
        this.activeDraftPlayer = player;
        updateDraftUI();
      });
    });

    cardElements.forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.dataset.characterId;
        const value = Number(card.dataset.pointValue ?? 0);
        if (!id) {
          return;
        }
        if (isNetworkMatch && !this.playerId) {
          return;
        }
        if (isAlternatingDraft && isNetworkMatch && this.playerId && this.activeDraftPlayer !== this.playerId) {
          return;
        }
        const activePlayer = isNetworkMatch && this.playerId ? this.playerId : this.activeDraftPlayer;
        const selectedByOne = isSelectedByPlayer("one", id);
        const selectedByTwo = isSelectedByPlayer("two", id);
        const alreadySelected = selectedByOne || selectedByTwo;
        if (!allowDuplicateSelection && alreadySelected) {
          return;
        }
        if (this.pointsRemaining[activePlayer] - value < 0) {
          return;
        }
        const currentSelections = this.selectedCharacters[activePlayer];
        const isSelectedByActive = currentSelections.includes(id);
        if (allowDuplicateSelection) {
          if (isSelectedByActive) {
            currentSelections.splice(currentSelections.indexOf(id), 1);
            this.pointsRemaining[activePlayer] += value;
            if (isNetworkMatch) {
              this.sendLobbyMessage("selection:update", { selections: currentSelections });
            }
            updateDraftUI();
            return;
          }
          currentSelections.push(id);
          this.pointsRemaining[activePlayer] -= value;
          if (!showPlayerToggle && this.draftOrigin === "lobby" && !isNetworkMatch) {
            this.activeDraftPlayer = this.activeDraftPlayer === "one" ? "two" : "one";
          }
          if (isNetworkMatch) {
            this.sendLobbyMessage("selection:update", { selections: currentSelections });
          }
          updateDraftUI();
          return;
        }
        if (isSelectedByActive) {
          return;
        }
        currentSelections.push(id);
        this.pointsRemaining[activePlayer] -= value;
        if (isNetworkMatch) {
          this.sendLobbyMessage("selection:update", { selections: currentSelections });
        } else if (!isCpuRandom) {
          const otherPlayer: DraftPlayer = this.activeDraftPlayer === "one" ? "two" : "one";
          if (canPlayerPick(otherPlayer)) {
            this.activeDraftPlayer = otherPlayer;
          } else if (!canPlayerPick(this.activeDraftPlayer)) {
            this.activeDraftPlayer = otherPlayer;
          }
        }
        if (isNetworkMatch && isAlternatingDraft) {
          this.updateAlternatingDraftTurn();
        }
        updateDraftUI();
      });
    });

    startButton?.addEventListener("click", () => {
      if (startButton.disabled) {
        return;
      }
      this.currentScreen = "match";
      this.render(root);
    });

    updateDraftUI();
  }

  private resetDraftSelections() {
    this.selectedCharacters = { one: [], two: [] };
    this.pointsRemaining = { one: this.teamPointCap, two: this.teamPointCap };
    this.activeDraftPlayer = "one";
    this.readyState = { playerOne: false, playerTwo: false };
  }

  private assignCpuHighlightColor() {
    this.cpuHighlightColor = generateDistinctHighlightColor(this.playerHighlightColor);
  }

  private generateCpuRoster() {
    const shuffled = [...CHARACTER_ROSTER];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    const picks: string[] = [];
    let remainingPoints = this.teamPointCap;
    shuffled.forEach((character) => {
      if (character.pointValue <= remainingPoints) {
        picks.push(slugify(character.alias));
        remainingPoints -= character.pointValue;
      }
    });
    this.selectedCharacters.two = picks;
    this.pointsRemaining.two = remainingPoints;
  }

  private renderMatch(root: Element) {
    const rosterById = new Map(CHARACTER_ROSTER.map((character) => [slugify(character.alias), character]));
    const fallbackTeam = (startIndex: number) =>
      CHARACTER_ROSTER.slice(startIndex, startIndex + 4).map((character) => slugify(character.alias));
    const playerOneIds = this.selectedCharacters.one.length ? this.selectedCharacters.one : fallbackTeam(0);
    const playerTwoIds = this.selectedCharacters.two.length ? this.selectedCharacters.two : fallbackTeam(4);
    const buildRosterCard = (id: string) => {
      const character = rosterById.get(id);
      const portrait = `/assets/characters/portraits/${id}.svg`;
      return `
        <article class="match-screen__unit-card">
          <div class="match-screen__unit-portrait">
            <img src="${portrait}" alt="${character?.alias ?? "Unknown"} portrait" />
          </div>
          <div class="match-screen__unit-meta">
            <h3>${character?.alias ?? "Unknown Operative"}</h3>
            <p>${character?.name ?? "Combatant"}</p>
          </div>
          <div class="match-screen__bars">
            <div class="match-screen__bar">
              <span>Health</span>
              <div class="match-screen__bar-track">
                <div class="match-screen__bar-fill match-screen__bar-fill--health" style="width: 78%;"></div>
              </div>
            </div>
            <div class="match-screen__bar">
              <span>Momentum</span>
              <div class="match-screen__bar-track">
                <div class="match-screen__bar-fill match-screen__bar-fill--momentum" style="width: 42%;"></div>
              </div>
            </div>
          </div>
          <div class="match-screen__status-row">
            <span class="match-screen__status">Status Slot</span>
            <span class="match-screen__status match-screen__status--muted">+</span>
          </div>
        </article>
      `;
    };

    root.innerHTML = `
      <main class="app-shell match-screen">
        <div class="match-screen__overlay"></div>
        <section class="match-screen__content">
          <header class="match-screen__header">
            <div>
              <p class="title-screen__eyebrow">Marvel Squad RPG</p>
              <h1 class="match-screen__title">Skirmish Arena</h1>
              <p class="match-screen__subtitle">Track squads, monitor statuses, and command the hex grid battlefield.</p>
            </div>
            <button class="title-screen__button match-screen__exit" type="button" data-action="exit-match">
              Exit Match
            </button>
          </header>
          <div class="match-screen__grid">
            <aside class="match-screen__roster match-screen__roster--ally">
              <h2>Player Squad</h2>
              <div class="match-screen__roster-list" role="list">
                ${playerOneIds.map((id) => buildRosterCard(id)).join("")}
              </div>
            </aside>

            <section class="match-screen__map" aria-label="Battlefield map">
              <div class="match-screen__map-header">
                <h2>Battle Map</h2>
                <div class="match-screen__map-controls" role="group" aria-label="Map zoom controls">
                  <button class="match-screen__map-button" type="button" data-action="zoom-out">-</button>
                  <input
                    class="match-screen__map-slider"
                    type="range"
                    min="0.7"
                    max="1.6"
                    step="0.05"
                    value="1"
                    data-action="zoom-slider"
                    aria-label="Map zoom"
                  />
                  <button class="match-screen__map-button" type="button" data-action="zoom-in">+</button>
                  <button class="match-screen__map-button" type="button" data-action="zoom-reset">Reset</button>
                </div>
              </div>
              <div class="match-screen__map-viewport">
                <div class="match-screen__map-canvas" data-role="map-canvas" aria-label="Hex grid map">
                  <div class="match-screen__map-object match-screen__map-object--alpha">Alpha Zone</div>
                  <div class="match-screen__map-object match-screen__map-object--beta">Beta Ridge</div>
                  <div class="match-screen__map-object match-screen__map-object--gamma">Gamma Point</div>
                </div>
              </div>
            </section>

            <aside class="match-screen__roster match-screen__roster--enemy">
              <h2>Opponent Squad</h2>
              <div class="match-screen__roster-list" role="list">
                ${playerTwoIds.map((id) => buildRosterCard(id)).join("")}
              </div>
            </aside>
          </div>
        </section>
      </main>
    `;

    const exitButton = root.querySelector<HTMLButtonElement>("[data-action='exit-match']");
    exitButton?.addEventListener("click", () => {
      this.currentScreen = "title";
      this.render(root);
    });

    const mapCanvas = root.querySelector<HTMLElement>("[data-role='map-canvas']");
    const zoomSlider = root.querySelector<HTMLInputElement>("[data-action='zoom-slider']");
    const zoomIn = root.querySelector<HTMLButtonElement>("[data-action='zoom-in']");
    const zoomOut = root.querySelector<HTMLButtonElement>("[data-action='zoom-out']");
    const zoomReset = root.querySelector<HTMLButtonElement>("[data-action='zoom-reset']");
    const baseSize = { width: 1400, height: 900 };
    let currentZoom = 1;

    const updateZoom = (nextZoom: number) => {
      if (!mapCanvas) {
        return;
      }
      currentZoom = Math.min(1.6, Math.max(0.7, nextZoom));
      mapCanvas.style.width = `${baseSize.width * currentZoom}px`;
      mapCanvas.style.height = `${baseSize.height * currentZoom}px`;
      if (zoomSlider) {
        zoomSlider.value = String(currentZoom);
      }
    };

    zoomSlider?.addEventListener("input", () => {
      const value = Number(zoomSlider.value);
      updateZoom(value);
    });

    zoomIn?.addEventListener("click", () => updateZoom(currentZoom + 0.1));
    zoomOut?.addEventListener("click", () => updateZoom(currentZoom - 0.1));
    zoomReset?.addEventListener("click", () => updateZoom(1));

    updateZoom(currentZoom);
  }

  private renderRules(root: Element) {
    root.innerHTML = `
      <main class="app-shell rules-screen">
        <div class="rules-screen__overlay"></div>
        <section class="rules-screen__content">
          <header class="rules-screen__header">
            <div>
              <p class="title-screen__eyebrow">Marvel Squad RPG</p>
              <h1 class="rules-screen__title">Rules of Engagement</h1>
              <p class="rules-screen__subtitle">
                Draft your squad, master initiative, and outmaneuver opponents in tactical arenas.
              </p>
            </div>
            <button class="title-screen__button rules-screen__back" type="button" data-action="back-title">
              Back to Title
            </button>
          </header>

          <section class="rules-screen__grid">
            <article class="rules-card">
              <h2>Squad Draft &amp; Point Budget</h2>
              <p>
                Every match sets a total points cap (for example: 15 points). You can spend those points on any
                combination of characters. Players do <strong>not</strong> need the same number of characters.
              </p>
              <ul>
                <li>Extreme example: one player drafts a single 15-point powerhouse.</li>
                <li>Another player could field fifteen 1-point fighters.</li>
                <li>Most squads land somewhere in the middle with a mix of heroes and support.</li>
              </ul>
            </article>

            <article class="rules-card">
              <h2>Traits &amp; Stats</h2>
              <p>
                Traits are the signature abilities that define a character’s role. They hint at unique powers,
                tactics, or passives such as <em>Spider-Sense</em>, <em>Area Denial</em>, or <em>Regeneration</em>.
              </p>
              <p>
                Stats like Strength, Speed, Reaction, Durability, and Psychic Resistance govern damage output,
                initiative gain, defensive survivability, and resistance to mind-affecting effects.
              </p>
            </article>

            <article class="rules-card">
              <h2>Fog of War</h2>
              <p>
                Battlefields are shrouded until explored. Areas your squad has not discovered remain obscured,
                forcing you to scout and control sight lines before committing to an attack.
              </p>
            </article>

            <article class="rules-card">
              <h2>Cover &amp; Line of Sight</h2>
              <p>
                Characters positioned behind map objects can gain <strong>cover</strong>. Covered targets cannot be
                hit by ranged attacks until the attacker establishes a clear line of sight.
              </p>
            </article>

            <article class="rules-card">
              <h2>Initiative &amp; Turn Flow</h2>
              <p>
                The initiative bar fills based on each character’s Speed. Faster characters may act multiple times
                before slower characters earn a turn, so turn order is dynamic rather than fixed.
              </p>
            </article>

            <article class="rules-card rules-card--lore">
              <h2>Backstory: The Shattered Accord</h2>
              <p>
                A Kree signal artifact has fractured reality across Marvel hotspots. The artifact projects distorted
                visions that make every hero and villain believe they alone can stabilize the multiverse.
              </p>
              <p>
                S.H.I.E.L.D. quarantined the zones, but the signal hijacked their tactical networks. Squads now fight
                over the artifact’s fragments, each convinced the other is an impostor created by the rift.
              </p>
            </article>
          </section>
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
