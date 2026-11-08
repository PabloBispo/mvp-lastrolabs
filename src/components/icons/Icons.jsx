// Ícones de traço simples (stroke) usados na interface.
// Todos aceitam className e herdam a cor via currentColor.

function Icon({ className = 'h-4 w-4', strokeWidth = 1.6, children, ...props }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SettingsIcon = (p) => (
  <Icon {...p}>
    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </Icon>
);

export const SlidersIcon = (p) => (
  <Icon {...p}>
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </Icon>
);

export const ChevronDownIcon = (p) => (
  <Icon strokeWidth={2} {...p}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);

export const ChevronLeftIcon = (p) => (
  <Icon strokeWidth={2} {...p}>
    <path d="M15 18l-6-6 6-6" />
  </Icon>
);

export const ChevronRightIcon = (p) => (
  <Icon strokeWidth={2} {...p}>
    <path d="M9 6l6 6-6 6" />
  </Icon>
);

export const SearchIcon = (p) => (
  <Icon strokeWidth={2} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Icon>
);

export const SortIcon = (p) => (
  <Icon {...p}>
    <path d="M4 7h16M7 12h10M10 17h4" />
  </Icon>
);

export const FilterIcon = (p) => (
  <Icon {...p}>
    <path d="M4 5h16l-6 7.5V19l-4-2v-4.5L4 5z" />
  </Icon>
);

export const ArrowUpRightIcon = (p) => (
  <Icon strokeWidth={2.4} {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </Icon>
);

export const PencilIcon = (p) => (
  <Icon {...p}>
    <path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4" />
  </Icon>
);

export const TrashIcon = (p) => (
  <Icon {...p}>
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
  </Icon>
);
