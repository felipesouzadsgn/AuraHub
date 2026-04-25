export function AuraLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* A estilizado minimalista */}
      <path
        d="M20 4L4 36H12L15.5 28H24.5L28 36H36L20 4ZM17.5 22L20 12.5L22.5 22H17.5Z"
        fill="currentColor"
      />
      {/* Aura glow point */}
      <circle cx="20" cy="8" r="2" fill="#C21313" className="animate-pulse" />
    </svg>
  );
}
