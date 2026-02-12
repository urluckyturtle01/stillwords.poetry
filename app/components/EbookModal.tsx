'use client';

import { X } from "lucide-react";
import { useState } from "react";

interface EbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const amazonData = {
  us: { 
    link: "https://www.amzn.com/dp/B0GL9L95ZL", 
    price: "$2.49" 
  },
  india: { 
    link: "https://www.amazon.in/dp/B0GL9L95ZL", 
    price: "₹129" 
  },
  uk: { 
    link: "https://www.amazon.co.uk/dp/B0GL9L95ZL", 
    price: "£1.99" 
  },
  germany: { 
    link: "https://www.amazon.de/dp/B0GL9L95ZL", 
    price: "€2.10" 
  },
  france: { 
    link: "https://www.amazon.fr/dp/B0GL9L95ZL", 
    price: "€2.10" 
  },
  spain: { 
    link: "https://www.amazon.es/dp/B0GL9L95ZL", 
    price: "€2.10" 
  },
  italy: { 
    link: "https://www.amazon.it/dp/B0GL9L95ZL", 
    price: "€2.10" 
  },
  netherlands: { 
    link: "https://www.amazon.nl/dp/B0GL9L95ZL", 
    price: "€2.10" 
  },
  japan: { 
    link: "https://www.amazon.co.jp/dp/B0GL9L95ZL", 
    price: "¥382" 
  },
  brazil: { 
    link: "https://www.amazon.com.br/dp/B0GL9L95ZL", 
    price: "R$8.00" 
  },
  canada: { 
    link: "https://www.amazon.ca/dp/B0GL9L95ZL", 
    price: "$3.38 CAD" 
  },
  mexico: { 
    link: "https://www.amazon.com.mx/dp/B0GL9L95ZL", 
    price: "$42.82 MXN" 
  },
  australia: { 
    link: "https://www.amazon.com.au/dp/B0GL9L95ZL", 
    price: "$3.49 AUD" 
  },
};

export default function EbookModal({ isOpen, onClose }: EbookModalProps) {
  const [selectedCountry, setSelectedCountry] = useState("");

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-stone-50 rounded-sm max-w-md w-full p-5 md:p-6 relative animate-slideUp shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 transition-colors"
          aria-label="Close"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* Book Cover */}
        <div className="w-full max-w-[190px] md:max-w-[160px] mx-auto mb-3 md:mb-4">
          <img 
            src="/book-cover.jpg" 
            alt="Quiet enough book cover"
            className="w-full h-auto object-cover shadow-md"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-2xl text-stone-800 mb-0.5">
          Quiet enough
        </h2>

        {/* Subtitle */}
        <p className="text-md md:text-lg text-stone-500 mb-2.5 md:mb-3 italic">
          seven pieces of stillness
        </p>

        {/* Description */}
        <p className="text-sm md:text-md text-stone-600 mb-4 md:mb-4 leading-relaxed">
          these seven pieces were written slowly during moments when nothing needed to be fixed, achieved, or explained. They do not offer lessons or conclusions. They stay with uncertainty, stillness, and the subtle work of becoming.
        </p>

        {/* Country Selector */}
        <div className="mb-3">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full py-2 px-3 text-sm text-stone-700 border border-stone-300 focus:outline-none focus:border-stone-500 transition-colors"
          >
            <option value="">Select your country</option>
            <option value="us">United States</option>
            <option value="india">India</option>
            <option value="uk">United Kingdom</option>
            <option value="germany">Germany</option>
            <option value="france">France</option>
            <option value="spain">Spain</option>
            <option value="italy">Italy</option>
            <option value="netherlands">Netherlands</option>
            <option value="japan">Japan</option>
            <option value="brazil">Brazil</option>
            <option value="canada">Canada</option>
            <option value="mexico">Mexico</option>
            <option value="australia">Australia</option>
          </select>
        </div>

        {/* Buy Button */}
        <div className="flex justify-between items-center vertical-center"> 
        <p className="text-lg md:text-md text-stone-600 leading-relaxed">
          {selectedCountry ? amazonData[selectedCountry as keyof typeof amazonData].price : "—"}
        </p>
        <a
          href={selectedCountry ? amazonData[selectedCountry as keyof typeof amazonData].link : "#"}
          target={selectedCountry ? "_blank" : "_self"}
          rel={selectedCountry ? "noopener noreferrer" : ""}
          onClick={(e) => {
            if (!selectedCountry) {
              e.preventDefault();
            }
          }}
          className={`block text-center py-2 px-4 text-sm transition-colors duration-150 ${
            selectedCountry
              ? "bg-stone-900 text-stone-50 hover:bg-stone-800 cursor-pointer"
              : "bg-stone-300 text-stone-500 cursor-not-allowed"
          }`}
        >
          Buy on Amazon
        </a>
        </div>
      </div>
    </div>
  );
}
