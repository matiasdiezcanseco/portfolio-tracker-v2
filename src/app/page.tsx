const TokenSelector = () => {
  return (
    <select>
      <option>ETH</option>
      <option>BTC</option>
    </select>
  );
};

const SwapCard = ({ text }: { text: string }) => {
  return (
    <div className=" relative flex w-96 flex-col rounded-md border border-[#1b1b1b] bg-[#1b1b1b] p-4  hover:border-[#252627]">
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
