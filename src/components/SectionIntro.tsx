import { ReactNode } from "react";

import ArticleHeading from "@/components/ArticleHeading";
import ReadMore from "@/components/atoms/ReadMore";

/**
 * Heading, one short lede, and the full explanation behind "Read more", so a section
 * lands in a glance and still keeps all of its detail.
 */
export default function SectionIntro({
  heading,
  lede,
  details,
  className,
}: {
  heading: ReactNode;
  lede: ReactNode;
  details?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <ArticleHeading text={heading} />
      <p className="text-primary-text/90 text-18 lg:text-20 leading-[1.5] max-w-[34ch] sm:max-w-[44ch]">
        {lede}
      </p>
      {details && (
        <ReadMore>
          <div className="text-secondary-text text-16 lg:text-18 flex flex-col gap-4">
            {details}
          </div>
        </ReadMore>
      )}
    </div>
  );
}
