interface LinkButtonProps {
  onClick?: () => void;
  href?: string;
  target?: string;
  children: React.ReactNode;
}

export default function LinkButton({ onClick, href, target, children }: LinkButtonProps) {
  const className = "text-lg md:text-xl text-stone-700 hover:text-stone-900 hover:opacity-70 transition-opacity duration-150 text-left";

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} target={target} className={className}>
      {children}
    </a>
  );
}
