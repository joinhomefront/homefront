export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <div
        className="fixed bottom-0 left-0 top-0 z-0 w-screen skew-y-[11deg] transform overflow-hidden md:-top-[150px]"
        style={{ scrollbarGutter: "stable" }}
      >
        <div className="absolute left-0 top-[calc(0%+200px)] h-10 w-[calc(50%-100px)] bg-primary-600 md:-left-3 md:right-[calc(50%+330px)] md:top-[500px] md:w-auto" />
        <div className="absolute left-0 top-[calc(0%+170px)] h-10 w-[calc(50%-200px)] bg-primary-300 md:-left-3 md:right-[calc(50%+430px)] md:top-[470px] md:w-auto" />
        <div className="absolute left-0 top-[calc(0%+200px)] h-2.5 w-[calc(50%-200px)] bg-primary-700 md:-left-3 md:right-[calc(50%+430px)] md:top-[500px] md:w-auto" />
        <div className="absolute left-[calc(50%+170px)] top-[calc(100%-130px)] h-10 w-[700px] bg-primary-600 md:-right-3 md:left-[calc(50%+430px)] md:top-[640px]" />
        <div className="absolute left-[calc(50%+120px)] top-[calc(100%-160px)] h-10 w-[700px] bg-primary-300 md:-right-3 md:left-[calc(50%+330px)] md:top-[610px]" />
        <div className="absolute left-[calc(50%+170px)] top-[calc(100%-130px)] h-2.5 w-[700px] bg-primary-700 md:-right-3 md:left-[calc(50%+430px)] md:top-[640px]" />
      </div>
      {children}
    </div>
  );
}
