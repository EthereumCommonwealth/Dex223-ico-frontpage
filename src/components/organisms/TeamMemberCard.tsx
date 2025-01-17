import clsx from "clsx";
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
    <div className="bg-primary-bg rounded-5 flex flex-col relative overflow-hidden">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="w-full h-[440px] bg-center bg-cover relative"
      >
        <div className="absolute inset-0 bg-blue-500 opacity-10" />
      </div>

      <div className="flex flex-col p-5 flex-1">
        <span className="text-tertiary-text text-18 mb-1">{position}</span>

        <div className="flex flex-col justify-end flex-1">
          <span className="text-24 font-bold mb-4">{name}</span>
          <div className="grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] grid gap-2">
            {Object.keys(socials).map((key) => (
              <a
                key={key}
                target="_blank"
                href={socials[key]}
                className="flex items-center justify-center rounded-3 bg-tertiary-bg w-full rounded transition duration-300 hover:border-green-500 py-2"
              >
                <img alt="" src={socialIcons[key]} className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
