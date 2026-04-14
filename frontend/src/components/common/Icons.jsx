function IconBase({ children }) {
  return (
    <svg
      aria-hidden="true"
      className="button-icon"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

export function SunIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5" />
      <path d="M12 19.5V22" />
      <path d="M4.93 4.93l1.77 1.77" />
      <path d="M17.3 17.3l1.77 1.77" />
      <path d="M2 12h2.5" />
      <path d="M19.5 12H22" />
      <path d="M4.93 19.07 6.7 17.3" />
      <path d="M17.3 6.7l1.77-1.77" />
    </IconBase>
  );
}

export function MoonIcon() {
  return (
    <IconBase>
      <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4a7 7 0 1 0 11.5 11.5Z" />
    </IconBase>
  );
}

export function PlusIcon() {
  return (
    <IconBase>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </IconBase>
  );
}

export function SaveIcon() {
  return (
    <IconBase>
      <path d="M5 4h11l3 3v13H5Z" />
      <path d="M8 4v6h8" />
      <path d="M9 17h6" />
    </IconBase>
  );
}

export function TrashIcon() {
  return (
    <IconBase>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M7 7l1 12h8l1-12" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </IconBase>
  );
}

