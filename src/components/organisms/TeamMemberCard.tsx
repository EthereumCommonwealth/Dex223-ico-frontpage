import Image from "next/image";
import React from "react";

interface Props {
  image: string;
  position: string;
  name: string;
  socials: {
    facebook?: string;
    telegram?: string;
    linkedin?: string;
    reddit?: string;
    github?: string;
    behance?: string;
  };
}

const socialIcons = {
  facebook: "/images/socials/facebook.svg",
  linkedin: "/images/socials/linkedin.svg",
  reddit: "/images/socials/reddit.svg",
  telegram: "/images/socials/telegram.svg",
  github: "/images/socials/github.svg",
  twitter: "/images/socials/twitter.svg",
  email: "/images/socials/email.svg",
  behance: "/images/socials/behance.svg",
};

export default function TeamMemberCard({ image, position, socials, name }: Props) {
  return (
    <div className="grid-rows-[auto_1fr] lg:grid-rows-1 bg-primary-bg rounded-5 relative overflow-hidden p-2 lg:p-5 grid grid-cols-1 lg:grid-cols-[172px_1fr] gap-3 lg:gap-5">
      <div className="w-full lg:w-[172px] relative aspect-square">
        <Image src={image} alt={name} fill className="rounded-3" />
      </div>

      <div className="flex flex-col flex-1 justify-between">
        <div className="flex flex-col flex-grow">
          <span className="text-14 lg:text-24 font-medium lg:font-bold mb-1">{name}</span>
          <span className="text-tertiary-text text-12 lg:text-18 mb-3 lg:mb-1">{position}</span>
        </div>

        <div className="flex flex-col justify-end flex-1">
          <div className="grid-cols-[repeat(auto-fit,_minmax(30px,_1fr))] grid gap-2">
            {Object.keys(socials).map((key) => (
              <a
                key={key}
                target="_blank"
                href={socials[key]}
                className="hocus:bg-green-bg flex items-center justify-center rounded-3 bg-tertiary-bg w-full rounded transition duration-200 py-2"
              >
                <img alt="" src={socialIcons[key]} className="w-4 h-4 lg:w-6 lg:h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
