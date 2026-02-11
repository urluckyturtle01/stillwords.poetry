import { X } from "lucide-react";

interface EbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EbookModal({ isOpen, onClose }: EbookModalProps) {
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
        <div className="w-full max-w-[200px] md:max-w-[160px] mx-auto mb-3 md:mb-4">
          <img 
            src="/book-cover.jpg" 
            alt="Quiet enough book cover"
            className="w-full h-auto object-cover shadow-md"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl text-stone-800 mb-0.5">
          Quiet enough
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-lg text-stone-500 mb-2.5 md:mb-3 italic">
          Seven pieces of stillness
        </p>

        {/* Description */}
        <p className="text-md md:text-md text-stone-600 mb-3 md:mb-4 leading-relaxed">
          These seven pieces were written slowly during moments when nothing needed to be fixed, achieved, or explained. They do not offer lessons or conclusions. They stay with uncertainty, stillness, and the subtle work of becoming.
        </p>

        {/* Buy Button */}
        <a
          href="https://amzn.in/d/06QupJhP"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2 px-0 bg-stone-900 text-stone-50 text-sm md:text-sm hover:bg-stone-800 transition-colors duration-150"
        >
          Buy on Amazon
        </a>
      </div>
    </div>
  );
}
