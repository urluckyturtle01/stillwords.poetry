import { Instagram, Youtube } from "lucide-react";

const basePath = process.env.NODE_ENV === 'production' ? '/stillwords.poetry' : '';

export default function Home() {
  const links = [
    { text: "Quiet enough | poetry ebook", href: "https://amzn.in/d/06QupJhP", target: "_blank" },
    
    
    { text: "Substack", href: "https://stillwordspoetry.substack.com/", target: "_blank" },
    //{ text: "About", href: "/about" }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-[600px] flex flex-col">
        {/* Site Logo */}
        <img 
          src={`${basePath}/logo.svg`}
          alt="stillwords" 
          className="w-24 md:w-32 mb-4"
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
          {links.map((link) => (
            <a
              key={link.text}
              href={link.href}
              target={link.target}
              className="text-lg md:text-xl text-stone-700 hover:text-stone-900 hover:opacity-70 transition-opacity duration-150"
            >
              {link.text}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <footer className="text-sm text-stone-400 mt-auto">
          © {new Date().getFullYear()} stillwords
        </footer>
      </div>
    </main>
  );
}
