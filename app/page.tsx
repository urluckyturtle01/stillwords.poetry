'use client';

import { Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import EbookModal from "./components/EbookModal";
import LinkButton from "./components/LinkButton";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const links = [
    { text: "Substack", href: "https://stillwordspoetry.substack.com/", target: "_blank" },
    { text: "About", href: "/about" }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-[600px] flex flex-col">
        {/* Site Logo */}
        <img 
          src="/logo.svg"
          alt="stillwords" 
          className="w-32 md:w-40 mb-4"
        />

        {/* Tagline */}
        <p className="text-base md:text-md text-stone-500 mb-8">
        writing for quiet minds.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 mb-12 md:mb-12">
          <a
            href="https://youtube.com/@stillwords.poetry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-[#FF0000] transition-colors duration-150"
            aria-label="YouTube"
          >
            <Youtube size={20} strokeWidth={1.5} />
          </a>
          <a
            href="https://instagram.com/stillwords.poetry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-[#E4405F] transition-colors duration-150"
            aria-label="Instagram"
          >
            <Instagram size={18} strokeWidth={1.5} />
          </a>
        </div>

        {/* Links */}
        <nav className="flex flex-col space-y-6 md:space-y-8 mb-20 md:mb-24">
          <LinkButton onClick={() => setIsModalOpen(true)}>
            Quiet enough | poetry ebook
          </LinkButton>
          
          {links.map((link) => (
            <LinkButton
              key={link.text}
              href={link.href}
              target={link.target}
            >
              {link.text}
            </LinkButton>


          ))}
        </nav>

        {/* Modal */}
        <EbookModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />

        {/* Footer */}
        <footer className="text-sm text-stone-400 mt-auto">
          © {new Date().getFullYear()} stillwords
        </footer>
      </div>
    </main>
  );
}
