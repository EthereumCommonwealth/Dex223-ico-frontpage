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
import { PropsWithChildren, useId } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  placement?: "left" | "bottom";
  handlers?: any;
}

export default function Drawer({
  isOpen,
  setIsOpen,
  children,
  placement = "bottom",
  handlers = {},
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

  const headingId = useId();
  const descriptionId = useId();

  return (
    <FloatingPortal>
      <div {...handlers}>
        {isMounted && (
          <FloatingOverlay className="drawer-overlay" style={{ ...transitionStyles }} lockScroll />
        )}
        {isMountedDrawer && (
          <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
            <div
              className={clsx(
                "drawer-container bg-primary-bg rounded-t-5",
                placement === "left" && "h-full",
                placement === "bottom" && "w-full max-h-[100vh]",
              )}
              ref={refs.setFloating}
              aria-labelledby={headingId}
              aria-describedby={descriptionId}
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
