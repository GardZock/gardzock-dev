import Card from "@/components/card"

export default function Projects() {

  return (
    <main>
      <header className="py-10 sm:py-16 text-center font-bold">
        <h1 className="text-white text-6xl mt-[100px]">My Projects</h1>
        <p className="text-white mt-2">And some that contribute.</p>
      </header>

      <div className="sm:hidden py-6">
        <ul className="mx-10">
          <li className="py-5"><Card width="350" height="400" title="WARCORD" image="/warcord.webp" desc="An NPM Library created to be an alternative option to the WarGaming API." tec="TYPESCRIPT" link="https://github.com/Warcord/WarCord-Lib" /></li>
          <li className="py-5"><Card width="350" height="400" title="Red Dragon Bot" image="/reddragon.webp" desc="My first project, which was not finished, was a Discord bot." tec="JAVASCRIPT" /></li>
          <li className="py-5"><Card width="350" height="400" title="Flaming Eyes" image="/flamingeyes.webp" desc="It was my first 'public' project. A server on discord with the premise of being a bot store." tec={["JAVASCRIPT", "TYPESCRIPT", "MONGODB"]} /></li>
          <li className="py-5"><Card width="350" height="400" title="Car Drift Game" image="/unity.webp" desc="Created in Unity and never given a name, it was a project to make an Initial D-style drift car game." tec={["CSHARP", "UNITY"]} link="https://github.com/Warcord/WarCord-Lib" /></li>
          <li className="py-5"><Card width="350" height="400" title="Video Player" image="/react.webp" desc="An Expo project, an attempt to make a video player like youtube." tec={["REACTNATIVE", "TYPESCRIPT"]} /></li>
          <li className="py-5"><Card width="350" height="400" title="Bot DashBoard" image="/nextjs.webp" desc="A DashBoard for Discord bots." tec={["NEXTJS", "TYPESCRIPT", "MONGODB"]} /></li>
          <li className="m-5"><Card width="1300" height="400" title="Discloud Visual Studio Code Extesion" image="/vscode.webp" desc="I contributed for Discloud Visual Studio Code extention creation, it was made for easy help the bot developer." tec={["TYPESCRIPT"]} link="https://github.com/discloud/vscode-discloud" /></li>
        </ul>
      </div>

      <div className="w-full flex justify-center mx-auto sm:visible mb-10">
        <ul>
          <li className="m-5"><Card width="1300" height="400" title="Warcord" image="/warcord.webp" desc="An NPM Library created to be an alternative option to the WarGaming API." tec="TYPESCRIPT" link="https://github.com/Warcord/WarCord-Lib" /></li>
          <li className="m-5"><Card width="1300" height="400" title="Red Dragon Bot" image="/reddragon.webp" desc="My first project, which was not finished, was a Discord bot." tec="JAVASCRIPT" /></li>
          <li className="m-5"><Card width="1300" height="400" title="Flaming Eyes" image="/flamingeyes.webp" desc="It was my first 'public' project. A server on discord with the premise of being a bot store." tec={["JAVASCRIPT", "TYPESCRIPT", "MONGODB"]} /></li>
          <li className="m-5"><Card width="1300" height="400" title="Car Drift Game" image="/unity.webp" desc="Created in Unity and never given a name, it was a project to make an Initial D-style drift car game." tec={["CSHARP", "UNITY"]} link="https://github.com/Warcord/WarCord-Lib" /></li>
          <li className="m-5"><Card width="1300" height="400" title="Video Player" image="/react.webp" desc="An Expo project, an attempt to make a video player like youtube." tec={["REACTNATIVE", "TYPESCRIPT"]} /></li>
          <li className="m-5"><Card width="1300" height="400" title="Bot DashBoard" image="/nextjs.webp" desc="A DashBoard for Discord bots." tec={["NEXTJS", "TYPESCRIPT", "MONGODB"]} /></li>
          <li className="m-5"><Card width="1300" height="400" title="Discloud Visual Studio Code Extesion" image="/vscode.webp" desc="I contributed for Discloud Visual Studio Code extention creation, it was made for easy help the bot developer." tec={["TYPESCRIPT"]} link="https://github.com/discloud/vscode-discloud" /></li>
        </ul>
      </div>
    </main>
  )
}
