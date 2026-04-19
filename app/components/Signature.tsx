interface SignatureProps {
  className?: string;
}

export default function Signature({ className = "" }: SignatureProps) {
  return (
    <span
      className={`signature text-[15px] md:text-base text-whisper select-none ${className}`}
      aria-label="still words signature"
    >
      still words
    </span>
  );
}
