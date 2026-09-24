import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import clsx from "clsx";
import { PropsWithChildren } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  placement?: "left" | "bottom";
  handlers?: any;
  /** Accessible name for the dialog, e.g. "Menu". */
  label?: string;
  /** Send focus back to the opener on close. Off when a link inside moved the page. */
  returnFocus?: boolean;
}

export default function Drawer({
  isOpen,
  setIsOpen,
  children,
  placement = "bottom",
  handlers = {},
  label,
  returnFocus = true,
}: PropsWithChildren<Props>) {
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: {
      open: 300,
      close: 300,
    },
  });

  const { isMounted: isMountedDrawer, styles: transitionStylesDrawer } = useTransitionStyles(
    context,
    {
      initial: {
        transform: placement === "left" ? "translateX(-100%)" : "translateY(100%)",
        opacity: 1,
      },
      open: {
        transform: placement === "left" ? "translateX(0)" : "translateY(0)",
      },
      duration: {
        open: 300,
        close: 300,
      },
    },
  );

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, {
    outsidePressEvent: "mousedown",
    outsidePress: (event: MouseEvent) => {
      if (!event.target) {
        return true;
      }

      return (event.target as HTMLDivElement).classList.contains("drawer-overlay");
    },
  });

  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  return (
    <FloatingPortal>
      <div {...handlers}>
        {isMounted && (
          // Release the scroll lock as soon as the drawer starts closing, so a link that
          // scrolls the page (an in-page #anchor) is not undone when the lock restores the
          // old position after the close animation.
          <FloatingOverlay
            className="drawer-overlay"
            style={{ ...transitionStyles }}
            lockScroll={isOpen}
          />
        )}
        {isMountedDrawer && (
          <FloatingFocusManager context={context} modal returnFocus={returnFocus}>
            <div
              className={clsx(
                "drawer-container bg-primary-bg",
                placement === "left" && "h-full",
                placement === "bottom" && "w-full max-h-[100vh] rounded-t-5",
              )}
              ref={refs.setFloating}
              aria-label={label}
              aria-modal="true"
              {...getFloatingProps()}
              style={{
                ...transitionStylesDrawer,
                top: placement === "left" ? 0 : "unset",
                bottom: placement === "bottom" ? 0 : "unset",
                ...(placement === "left" ? { width: "auto" } : {}),
              }}
            >
              {children}
            </div>
          </FloatingFocusManager>
        )}
      </div>
    </FloatingPortal>
  );
}
