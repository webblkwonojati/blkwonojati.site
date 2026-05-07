import MarketingWrapper from "./MarketingWrapper";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MarketingWrapper>
      {children}
    </MarketingWrapper>
  );
}
