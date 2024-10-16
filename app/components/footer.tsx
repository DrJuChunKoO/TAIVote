"use client";
export default function Footer() {
  return (
    <footer className="container">
      <div className="group text-center text-sm text-white text-opacity-50 transition-opacity">
        Support by{" "}
        <TipText tip="Emerging Technology Exchange Association">ETEA</TipText>{" "}
        in partnership with <TipText tip="Tools for Humanity">THF</TipText>
      </div>
    </footer>
  );
}
function TipText({
  children,
  tip,
}: {
  children: React.ReactNode;
  tip: string;
}) {
  return (
    <span className="group/item relative inline-block group-hover:underline">
      <div className="glass-effect pointer-events-none absolute -top-7 right-[50%] h-max w-max origin-bottom translate-x-[50%] translate-y-3 scale-90 rounded-xl bg-white/10 px-3 py-1 opacity-0 transition-all group-hover/item:translate-y-0 group-hover/item:scale-100 group-hover/item:opacity-100">
        {tip}
      </div>
      {children}
    </span>
  );
}
