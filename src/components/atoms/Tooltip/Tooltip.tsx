import React, { useState } from "react";
import {
  autoUpdate,
  FloatingPortal,
  offset,
  useDismiss, useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  flip,
  shift, useTransitionStyles
} from "@floating-ui/react";
import Svg from "@/components/atoms/Svg";
import styles from "./Tooltip.module.scss";
import clsx from "clsx";
import { golos_text } from "@/assets/fonts";

export default function Tooltip({text}) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start"
      }),
      shift()
    ]
  });

  const {isMounted, styles: transitionStyles} = useTransitionStyles(context, {
    duration: {
      open: 200,
      close: 200
    },
  });

  // Event listeners to change the open state
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ]);

  return (
    <>
      <span className={styles.tooltipIcon} ref={refs.setReference} {...getReferenceProps()}>
        <Svg iconName="info" />
      </span>
      <FloatingPortal>
        {isMounted && (
          <div
            className={clsx(styles.tooltip, golos_text.className, )}
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...transitionStyles }}
            {...getFloatingProps()}
          >
            {text}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
