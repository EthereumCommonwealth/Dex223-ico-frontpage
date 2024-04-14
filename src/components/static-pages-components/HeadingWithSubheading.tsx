import React from "react";

export default function HeadingWithSubheading({heading, subheading}: {heading: string, subheading: string}) {
  return <>
    <h1 className="mb-3 text-center text-30 md:text-58 font-bold">{heading}</h1>
    <p className="text-secondary-text text-center text-18 px-2">{subheading}</p>
  </>
}
