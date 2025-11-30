const Logo = ({ className = "w-10 h-10 md:w-12 md:h-12" }: { className?: string }) => {
  return (
    <div className={`${className} relative`}>
      <div className="w-full h-full rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
        <span className="font-display text-lg md:text-xl font-bold text-primary-foreground tracking-tight">
          AE
        </span>
      </div>
      <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
    </div>
  );
};

export default Logo;
