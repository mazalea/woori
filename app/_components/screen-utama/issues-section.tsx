import Image from "next/image";
import { CardFrame } from "./card-frame";
import { ICONS, ISSUES } from "./data";

export function IssuesSection() {
  return (
    <section className="px-6">
      <header className="mb-1.5 flex items-start justify-between">
        <h2 className="typo-large font-bold">
          What&rsquo;s Driving the Market Today
        </h2>
        <Image
          src={ICONS.aiBadge}
          alt="AI"
          width={21}
          height={21}
          className="mt-1 size-[21px] shrink-0"
        />
      </header>

      <ul className="mt-[18px] flex flex-col gap-[18px]">
        {ISSUES.map((issue, idx) => (
          <li key={idx}>
            <CardFrame className="rounded-tl-none !p-[21px] flex flex-col">
              <header className="mb-1.5 flex items-center justify-between">
                <h3 className="typo-base line-clamp-2 max-w-[calc(100%-27px)] font-medium text-gray-w900">
                  {issue.title}
                </h3>
              </header>

              <p className="typo-tiny mb-3 line-clamp-3 text-gray-w700">
                {issue.body}
              </p>

              {issue.hero && (
                <div className="relative  w-full overflow-hidden rounded-lg h-0">
                  {/* <Image
                    src={issue.hero}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain"
                  /> */}
                </div>
              )}
            </CardFrame>
          </li>
        ))}
      </ul>
    </section>
  );
}
