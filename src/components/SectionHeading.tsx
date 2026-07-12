interface SectionHeadingProps {
  bgText: string;
  scriptText: string;
  className?: string;
}

export default function SectionHeading({ bgText, scriptText, className = '' }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${className}`}>
      {/* Background Large Text — magazine-style faded serif */}
      <span className="bg-text">
        {bgText}
      </span>
      {/* Script Overlay Text */}
      <h2 className="main-text">{scriptText}</h2>
      {/* Decorative Line */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <div className="w-16 h-px bg-accent/40" />
        <div className="w-2 h-2 rounded-full border border-accent" />
        <div className="w-16 h-px bg-accent/40" />
      </div>
    </div>
  );
}
