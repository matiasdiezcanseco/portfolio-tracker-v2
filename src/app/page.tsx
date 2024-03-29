"use client";

import { ChevronDown, X, Search, ArrowDown } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { DatePicker } from "~/components/ui/date-picker";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Skeleton } from "~/components/ui/skeleton";
import { useModal } from "~/lib/hooks/use-modal";
import { api } from "~/trpc/react";

type Token = {
  id: number;
  name: string;
  symbol: string;
  logo: string;
};

const TokenSelectorModal: React.FC<{
  isOpen: boolean;
  onSelect: (token: Token) => void;
  closeModal: () => void;
}> = ({ isOpen, closeModal, onSelect }) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const selectToken = (token: Token) => {
    onSelect(token);
    closeModal();
  };

  const tokens = api.token.getTokens.useQuery("").data?.tokens ?? [];

  const [search, setSearch] = useState("");

  const filteredTokens = useMemo(
    () =>
      tokens.filter(
        (token) =>
          token.name.toLowerCase().startsWith(search.toLowerCase()) ||
          token.symbol.toLowerCase().startsWith(search.toLowerCase()),
      ),
    [search, tokens],
  );

  return (
    <div
      className={`transition-200 fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 transition-all  ${
        isOpen ? "" : "hidden"
      }`}
      onClick={handleBackdropClick}
    >
      <div className="flex min-w-[400px] flex-col gap-4 rounded-xl border border-[#2b2b2b] bg-[#131313] py-4">
        <div className="flex flex-col gap-4 px-4">
          <div className="flex justify-between gap-4">
            <h3 className="font-semibold text-white">Select a token</h3>
            <button
              className="text-white hover:text-gray-400"
              onClick={closeModal}
            >
              <X />
            </button>
          </div>
          <div className="flex gap-2 rounded-lg border border-[#2b2b2b] p-2">
            <Search className="text-gray-400" />
            <input
              className="w-full bg-[#131313] text-white outline-none placeholder:text-gray-400"
              type="text"
              name="token"
              id="token"
              placeholder="Search name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="h-[1px] bg-[#2b2b2b]" />
        <div className="flex flex-col gap-4">
          <p className="px-4">Tokens</p>
          <div>
            {filteredTokens.map((token) => (
              <button
                onClick={() => selectToken(token satisfies Token)}
                key={token.id}
                className="px-w-full flex w-full items-center gap-4 px-4 py-2 hover:bg-[#1e1f21] "
              >
                <Image
                  alt="logo"
                  src={token.logo}
                  className="rounded-full"
                  height={40}
                  width={40}
                />
                <div className="text-left">
                  <p className="font-semibold text-white">{token.name}</p>
                  <p className="text-xs text-gray-400">{token.symbol}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TokenSelector: React.FC<{ onClick: () => void; token?: Token }> = ({
  onClick,
  token,
}) => {
  const defaultToken =
    api.token.getTokens.useQuery("").data?.tokens[0] ?? undefined;

  return (
    <>
      {defaultToken && (
        <button
          className="flex items-center gap-2 rounded-full bg-[#131313] p-1 hover:bg-[#252627]"
          onClick={onClick}
        >
          <Image
            alt="logo"
            src={token?.logo ?? defaultToken.logo}
            className="rounded-full"
            height={24}
            width={24}
          />
          <p className="text-xl font-semibold text-white">
            {token?.symbol.toUpperCase() ?? defaultToken.symbol}
          </p>
          <ChevronDown size={20} className="text-white" />
        </button>
      )}
      {!defaultToken && (
        <Skeleton className="h-9 w-[100px] rounded-full bg-[#131313]" />
      )}
    </>
  );
};

const SwapCard = ({
  text,
  showCut = false,
  token,
  setToken,
  onAmountChange,
  amount,
}: {
  text: string;
  showCut?: boolean;
  token?: Token;
  setToken: (token: Token) => void;
  onAmountChange: (amount: number) => void;
  amount?: number;
}) => {
  const modalProps = useModal();
  const { openModal } = modalProps;

  return (
    <>
      <div className="relative flex flex-col rounded-xl bg-[#1b1b1b] p-4 ring-0 ring-[#252628] hover:ring-1">
        <p className="text-sm">{text}</p>
        <input
          className="w-4/5 bg-[#1b1b1b] text-4xl text-white placeholder-gray-400 outline-none"
          placeholder="0"
          type="number"
          name="amount"
          id="amount"
          onChange={(e) => onAmountChange(Number(e.target.value))}
          value={amount}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <TokenSelector token={token} onClick={openModal} />
        </div>
        {showCut && (
          <div className="absolute -bottom-5 left-1/2 z-10 h-10 w-10 -translate-x-1/2 rounded-lg bg-[#131313]"></div>
        )}
      </div>
      <TokenSelectorModal onSelect={setToken} {...modalProps} />
    </>
  );
};

export default function Home() {
  const [firstToken, setFirstToken] = useState<Token>();
  const [secondToken, setSecondToken] = useState<Token>();

  const [firstAmount, setFirstAmount] = useState<number>();
  const [secondAmount, setSecondAmount] = useState<number>();

  const [date, setDate] = useState<Date>();

  const swapTokens = () => {
    const temp = firstToken;
    setFirstToken(secondToken);
    setSecondToken(temp);
    const tempAmount = firstAmount;
    setFirstAmount(secondAmount);
    setSecondAmount(tempAmount);
  };

  return (
    <main className="mx-auto flex max-w-[400px] flex-col gap-4">
      <div className="relative flex flex-col gap-1">
        <SwapCard
          text="You pay"
          showCut
          token={firstToken}
          setToken={setFirstToken}
          onAmountChange={setFirstAmount}
          amount={firstAmount}
        />
        <SwapCard
          text="You pay"
          token={secondToken}
          setToken={setSecondToken}
          onAmountChange={setSecondAmount}
          amount={secondAmount}
        />
        <button
          className="absolute left-1/2 top-1/2 z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-[55%] items-center justify-center rounded-md bg-[#1b1b1b]"
          onClick={swapTokens}
        >
          <ArrowDown color="white" size={18} />
        </button>
      </div>
      <Label className="text-gray flex flex-col gap-2 text-xs" id="fromPrice">
        {firstToken?.name ?? "Token"} price:
        <Input className="" name="fromPrice" type="number" />
      </Label>
      <DatePicker onSelect={setDate} label="Day of the trade" />
    </main>
  );
}
