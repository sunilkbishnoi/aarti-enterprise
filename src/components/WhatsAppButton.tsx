import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "919427055205";
  const message = encodeURIComponent("Hello AARTI ENTERPRISE, I need a quotation for stainless steel products.");
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium animate-pulse">
        Chat
      </span>
    </a>
  );
};

export default WhatsAppButton;
