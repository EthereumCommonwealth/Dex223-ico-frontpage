import React from "react";

interface Props {
  height: string | number
}

export default function Spacer({ height }: Props) {
  return <div style={typeof height === "number"
    ? { height: `${height}px` }
    : { height }}/>;
}
