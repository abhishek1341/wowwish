import { formatInr } from "@/components/site/siteConstants";
import { getTemplatePricing, type PricingCategory } from "@/lib/pricing";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type PriceOnwardsProps = {
  priceInr: number;
  oldPriceInr: number;
  className?: string;
  priceClassName?: string;
  oldClassName?: string;
  vertical?: boolean;
};

export function PriceOnwards({
  priceInr,
  oldPriceInr,
  className,
  priceClassName,
  oldClassName,
  vertical = false,
}: PriceOnwardsProps) {
  return (
    <span className={cn("inline-flex", vertical ? "flex-col items-end" : "items-center gap-1.5", className)}>
      <span className={cn("line-through opacity-60", oldClassName)}>{formatInr(oldPriceInr)}</span>
      <span className={priceClassName}>{formatInr(priceInr)} onwards</span>
    </span>
  );
}

export function CategoryPriceOnwards({
  category,
  className,
  priceClassName,
  oldClassName,
  vertical,
}: {
  category: PricingCategory | string;
  className?: string;
  priceClassName?: string;
  oldClassName?: string;
  vertical?: boolean;
}) {
  const pricing = getTemplatePricing(category);

  return (
    <PriceOnwards
      priceInr={pricing.priceInr}
      oldPriceInr={pricing.oldPriceInr}
      className={className}
      priceClassName={priceClassName}
      oldClassName={oldClassName}
      vertical={vertical}
    />
  );
}
