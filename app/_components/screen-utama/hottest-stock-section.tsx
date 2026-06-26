import Image from "next/image";
import { ICONS } from "./data";

export function HottestStockHeader() {
  return (
    <div className="px-6">
      <header className="mb-1.5 flex items-start justify-between gap-3">
        <h2 className="typo-large font-bold">
          The Hottest Stocks Right Now
          <br />
          And There&rsquo;s a Good Reason for It
        </h2>
        <Image
          src={ICONS.aiBadge}
          alt="AI"
          width={21}
          height={21}
          className="mt-1 size-[21px] shrink-0"
        />
      </header>
      <p className="typo-base text-gray-w700">
        Why the world is diving in—see the reason at a glance.
      </p>
    </div>
  );
}
