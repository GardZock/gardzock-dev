import Image from "next/image"
import Link from "next/link"
import Card from "@/components/card"

export default function Projects() {

  return (
    <main>
      <header className="py-10 sm:py-16 text-center font-bold">
        <h1 className="text-white text-6xl uppercase">My Projects</h1>
      </header>

      <div className="sm:hidden py-6">
        <ul className="mx-10">
          <li className="py-5"><Card title="WARCORD" image="/warcord.webp" desc="An NPM Library created to be an alternative option to the WarGaming API." tec="TYPESCRIPT" link="https://github.com/Warcord/WarCord-Lib" /></li>
          <li className="py-5"><Card title="Red Dragon Bot" image="/reddragon.webp" desc="My first project, not finished, was a discord bot." tec="JAVASCRIPT" /></li>
          <li className="py-5"><Card title="Flaming Eyes" image="/flamingeyes.webp" desc="It was my first 'public' project. A server on discord with the premise of being a bot store." tec={["JAVASCRIPT", "TYPESCRIPT", "MONGODB"]} /></li>
          <li className="py-5"><Card title="Car Drift Game" image="/unity.webp" desc="Created in Unity, never given a name, it was a project to make an Initial D-style drift car game." tec={["CSHARP", "UNITY"]} link="https://github.com/Warcord/WarCord-Lib" /></li>
          <li className="py-5"><Card title="Video Player" image="/react.webp" desc="An Expo Project, an attempt to make a video player, like youtube." tec={["REACTNATIVE", "TYPESCRIPT"]} /></li>
          <li className="py-5"><Card title="Bot DashBoard" image="/nextjs.webp" desc="An DashBoard for Discord Bots." tec={["NEXTJS", "TYPESCRIPT", "MONGODB"]} /></li>
        </ul>
      </div>

      <div className="py-16 mx-40 sm:visible hidden">
        <ul className="flex gap-10 justify-center">
          <li><Card title="WARCORD" image="/warcord.webp" desc="An NPM Library created to be an alternative option to the WarGaming API." tec="TYPESCRIPT" link="https://github.com/Warcord/WarCord-Lib" /></li>
          <li><Card title="Red Dragon Bot" image="/reddragon.webp" desc="My first project, not finished, was a discord bot." tec="JAVASCRIPT" /></li>
          <li><Card title="Flaming Eyes" image="/flamingeyes.webp" desc="It was my first 'public' project. A server on discord with the premise of being a bot store." tec={["JAVASCRIPT", "TYPESCRIPT", "MONGODB"]} /></li>
        </ul>
        <ul className="flex gap-10 justify-center py-10">
          <li><Card title="Car Drift Game" image="/unity.webp" desc="Created in Unity, never given a name, it was a project to make an Initial D-style drift car game." tec={["CSHARP", "UNITY"]} link="https://github.com/Warcord/WarCord-Lib" /></li>
          <li><Card title="Video Player" image="/react.webp" desc="An Expo Project, an attempt to make a video player, like youtube." tec={["REACTNATIVE", "TYPESCRIPT"]} /></li>
          <li><Card title="Bot DashBoard" image="/nextjs.webp" desc="An DashBoard for Discord Bots." tec={["NEXTJS", "TYPESCRIPT", "MONGODB"]} /></li>
        </ul>
      </div>
    </main> 
  )
}
