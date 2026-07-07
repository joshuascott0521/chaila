import { cn } from "@/lib/utils";

type RollUpLabelProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Text roll-up hover effect for CTA buttons: the label slides up and out while
 * an identical copy slides in from below, clipped to the label's line box.
 * Pure CSS — the nearest `group` ancestor (the button/link) drives it on hover.
 */
export function RollUpLabel({ children, className }: RollUpLabelProps) {
  return (
    <span className={cn("relative inline-block overflow-hidden", className)}>
      <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-full left-0 block whitespace-nowrap transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  );
}
