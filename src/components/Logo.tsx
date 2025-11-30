import logoImage from '@/assets/logo.png';

const Logo = ({ className = "w-10 h-10 md:w-12 md:h-12" }: { className?: string }) => {
  return (
    <img 
      src={logoImage} 
      alt="AARTI ENTERPRISE Logo" 
      className={`${className} object-contain`}
    />
  );
};

export default Logo;
