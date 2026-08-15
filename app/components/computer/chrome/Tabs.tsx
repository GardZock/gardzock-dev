import { IoMdClose } from "react-icons/io";
import Image from "next/image";

type Tab = {
  name: string;
  iconPath: string;
};

export const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  return (
    <>
      <ul className="flex pt-4 px-4 text-[#D3DAE3] w-full">
        {tabs.map(({ name, iconPath }) => {
          return (
            <li
              key={name}
              className="flex justify-between bg-[#101013] p-2 rounded-t-lg gap-5 items-center "
            >
              <Image src={iconPath} width={50} height={50} alt="Favicon" className="rounded-full" />
              <p className="flex text-wrap w-full text-3xl">{name}</p>
              <div className="hover:bg-[#232326] p-1 rounded-full">
                <IoMdClose size={40} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
