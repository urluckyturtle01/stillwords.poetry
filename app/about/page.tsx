import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-[600px] flex flex-col">
        {/* Back button */}
        <Link 
          href="/" 
          className="text-stone-400 hover:text-stone-700 transition-colors mb-8 w-fit"
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </Link>

        {/* Site Logo */}
        <img 
          src="/logo.svg"
          alt="stillwords" 
          className="w-32 md:w-40 mb-12"
        />

        {/* About Text */}
        <div className="text-md md:text-md text-stone-600 leading-relaxed space-y-6 mb-20">
          <p>soft lines.</p>
          
          <p>
            nothing extra.<br />
            nothing loud.
          </p>
          
          <p>just what remains.</p>
        </div>

        {/* Footer */}
        <footer className="text-sm text-stone-400 mt-auto">
          © {new Date().getFullYear()} stillwords
        </footer>
      </div>
    </main>
  );
}