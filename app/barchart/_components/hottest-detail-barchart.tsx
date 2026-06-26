"use client";

import { useState } from "react";
import { BaseDetailCard } from "../../_components/stock-detail/base-detail-card";
import { SegmentedBar } from "../../_components/stock-detail/segmented-bar";
import { StockSelector } from "../../_components/stock-detail/stock-selector";
import { BARCHART_STOCKS } from "./data";

const SENTIMENT_SEGMENTS = [
  { color: "#2589F4", label: "Positive" },
  { color: "#e34850", label: "Negative" },
  { color: "#E0E9F2", label: "Neutral"  },
] as const;

export function BarchartHottestInteractive() {
  const [selectedTicker, setSelectedTicker] = useState("GOOGL");
  const active = BARCHART_STOCKS.find((s) => s.ticker === selectedTicker)!;

  return (
    <>
      <StockSelector stocks={BARCHART_STOCKS} selectedTicker={selectedTicker} onChange={setSelectedTicker} />
      <div className="px-6">
        <BaseDetailCard
          stock={active}
          sentimentSlot={
            <SegmentedBar
              segments={SENTIMENT_SEGMENTS.map((s, i) => ({
                ...s,
                pct: [active.sentiment.positive, active.sentiment.negative, active.sentiment.neutral][i],
              }))}
            />
          }
        />
      </div>
    </>
  );
}
