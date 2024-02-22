import { ChevronDown } from "lucide-react";
import Image from "next/image";

const TokenSelector = () => {
  return (
    <button className="flex gap-2">
      <Image alt="logo" src="/images/logo.svg" height={24} width={24} />
      <p>ETH</p>
      <ChevronDown size={24} />
    </button>
  );
};

const SwapCard = ({ text }: { text: string }) => {
  return (
    <div className=" relative flex w-96 flex-col rounded-md bg-[#1b1b1b] p-4 ring-[#1b1b1b] hover:ring-1">
      <p className="text-sm">{text}</p>
      <input
        className="w-4/5 bg-[#1b1b1b] text-4xl text-white placeholder-gray-400 outline-none"
        placeholder="0"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <TokenSelector />
      </div>
    </div>
  );
};

export default async function Home() {
  return (
    <main className="flex">
      <SwapCard text="You pay" />
    </main>
  );
}
