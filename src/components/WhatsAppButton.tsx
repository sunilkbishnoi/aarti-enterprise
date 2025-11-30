import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "919427055205";
  const message = encodeURIComponent("Hello AARTI ENTERPRISE, I need a quotation for stainless steel products.");
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-float group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-charcoal text-white text-sm px-4 py-2 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
