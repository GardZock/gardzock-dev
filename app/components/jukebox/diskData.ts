import { ComponentType } from "react";
import { SiRedragon, SiDevbox, SiRoblox } from "react-icons/si";
import { FiPlus } from "react-icons/fi";
import { FaMusic, FaShieldAlt, FaWallet, FaBrain } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiFillApi } from "react-icons/ai";
import { GiTank } from "react-icons/gi";
import { VscVscode } from "react-icons/vsc";
import { PiPlantFill } from "react-icons/pi";
import { RiAiGenerate3dFill } from "react-icons/ri";

export interface DiskData {
  icon: ComponentType<{ className?: string; size?: number | string }>;
  iconPath?: string;
  track: string;
  github: string;
  youtubeUrl: string;
}

export function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export const DISK_DATA: Record<string, DiskData> = {
  REDRAGON: {
    icon: SiRedragon,
    track: "Daft Punk - Something About Us",
    github: "https://github.com/GardZock/Red-Dragon",
    youtubeUrl: "https://www.youtube.com/watch?v=em0MknB6wFo",
  },
  AMENS: {
    icon: FiPlus,
    track: "Wicked Game - Chris Isaak",
    github: "",
    youtubeUrl: "https://www.youtube.com/watch?v=oadhHk2xs6c",
  },
  CRUDAPI: {
    icon: AiFillApi,
    track: "Euro Truck Simulator 2 Soundtrack - Main Theme",
    github: "https://github.com/GardZock/PostGresSQL-Express-API",
    youtubeUrl: "https://www.youtube.com/watch?v=ez1_Mn6P_l0",
  },
  DASHBOARD: {
    icon: LuLayoutDashboard,
    track: "Aria Math - Minecraft [Slowed + Reverb]",
    github: "https://github.com/GardZock/Dashboard_Crud_Vue",
    youtubeUrl: "https://www.youtube.com/watch?v=-HXBIOJSOzs",
  },
  FEIRA: {
    icon: FaBrain,
    track: "505 - Artic Monkeys",
    github: "https://github.com/GardZock/projeto_feira",
    youtubeUrl: "https://www.youtube.com/watch?v=MrmPDUvKyLs",
  },
  FIRSTPORTFOLIO: {
    icon: SiDevbox,
    track: "KEROSENE - Crystal Castles",
    github: "https://github.com/GardZock/gardzock-dev/tree/v1",
    youtubeUrl: "https://www.youtube.com/watch?v=qR2QIJdtgiU",
  },
  HECTARA: {
    icon: PiPlantFill,
    track: "AI in the Fields",
    github: "https://github.com/Hectara",
    youtubeUrl: "https://www.youtube.com/watch?v=8ZhnF3mvygQ",
  },
  LASTPORTFOLIO: {
    icon: RiAiGenerate3dFill,
    track: "Daft Punk - Aerodynamic",
    github: "https://github.com/GardZock/gardzock-dev",
    youtubeUrl: "https://www.youtube.com/watch?v=L93-7vRfxNs",
  },
  MPBOT: {
    icon: FaWallet,
    track: "Tame Impala - Let It Happen",
    github: "",
    youtubeUrl: "https://www.youtube.com/watch?v=pFptt7Cargc",
  },
  MUSICBOT: {
    icon: FaMusic,
    track: "Eagles - Hotel California",
    github: "https://github.com/GardZock/Music-Bot",
    youtubeUrl: "https://www.youtube.com/watch?v=dLl4PZtxia8",
  },
  RPGBOT: {
    icon: FaShieldAlt,
    track: "Katyusha HardBass - Cosmowave",
    github: "https://github.com/Warcord/warbot",
    youtubeUrl: "https://www.youtube.com/watch?v=yL4eIUTovLM",
  },
  SECONDS: {
    icon: SiRoblox,
    track: "Mr.Kitty - After Dark",
    github: "https://github.com/TheresNoTime-Devs",
    youtubeUrl: "https://www.youtube.com/watch?v=sVx1mJDeUjY",
  },
  VSCODE: {
    icon: VscVscode,
    track: "The Stranglers - Golden Brown",
    github: "https://github.com/discloud/vscode-discloud",
    youtubeUrl: "https://www.youtube.com/watch?v=7KIHvuMl4Kk",
  },
  WARCORD: {
    icon: GiTank,
    track: "Studzianki - World of Tanks Original Soundtrack",
    github: "https://github.com/Warcord/WarCord-2.0",
    youtubeUrl: "https://www.youtube.com/watch?v=jYvm-77C7XY",
  },
};
