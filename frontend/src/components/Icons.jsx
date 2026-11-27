/**
 * Crisp SVG icon set — 20×20 viewBox, stroke-based, consistent weight.
 * All icons accept size (default 18) and color (default "currentColor").
 */

const defaults = { size: 18, color: 'currentColor' };

export function IconDashboard({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="7" height="7" rx="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function IconBook({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
      <path d="M13 2v16" />
      <path d="M6 7h4M6 10h4M6 13h2" />
    </svg>
  );
}

export function IconConflict({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4.5" cy="10" r="2.5" />
      <circle cx="15.5" cy="4.5" r="2.5" />
      <circle cx="15.5" cy="15.5" r="2.5" />
      <line x1="7" y1="10" x2="13" y2="5.5" />
      <line x1="7" y1="10" x2="13" y2="14.5" />
    </svg>
  );
}

export function IconGear({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" />
    </svg>
  );
}

export function IconCalendar({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="16" height="14" rx="2" />
      <path d="M2 8h16" />
      <path d="M6 2v4M14 2v4" />
      <path d="M6 12h2v2H6z" fill={color} stroke="none" />
      <path d="M12 12h2v2h-2z" fill={color} stroke="none" />
    </svg>
  );
}

export function IconBrain({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10c0-2.5 1.5-5 4-5s4 2 4 4c0 1.5-.8 2.8-2 3.5V15H7v-1.5C5.8 12.8 5 11.5 5 10c0-1.1.4-2.1 1-2.8" />
      <path d="M7 15h6" />
      <path d="M9 15v2M11 15v2" />
      <path d="M5 9c-1 .5-1.5 1.5-1.5 2.5" />
      <path d="M15 9c1 .5 1.5 1.5 1.5 2.5" />
    </svg>
  );
}

export function IconUsers({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="6" r="3" />
      <path d="M2 18c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="15" cy="7" r="2" />
      <path d="M15 13c1.7.3 3 1.9 3 4" />
    </svg>
  );
}

export function IconBolt({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 2L4 11h6l-1 7 7-9h-6l1-7Z" />
    </svg>
  );
}

export function IconPalette({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" />
      <circle cx="7" cy="8" r="1" fill={color} stroke="none" />
      <circle cx="11" cy="6.5" r="1" fill={color} stroke="none" />
      <circle cx="13.5" cy="10" r="1" fill={color} stroke="none" />
      <circle cx="12" cy="13" r="1" fill={color} stroke="none" />
      <path d="M2 10c2 2 4 3 6 3a3 3 0 0 0 3-3" />
    </svg>
  );
}

export function IconClock({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" />
      <path d="M10 6v4l2.5 2.5" />
    </svg>
  );
}

export function IconCheck({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" />
      <path d="M6.5 10.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

export function IconRefresh({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10a6 6 0 1 0 1.2-3.6" />
      <path d="M2 5l3 1-1 3" />
    </svg>
  );
}

export function IconPlus({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

export function IconEdit({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 3l4 4-9 9H4v-4L13 3Z" />
      <path d="M11 5l4 4" />
    </svg>
  );
}

export function IconTrash({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5h14" />
      <path d="M8 5V3h4v2" />
      <path d="M5 5l1 12h8l1-12" />
      <path d="M8 9v5M12 9v5" />
    </svg>
  );
}

export function IconRocket({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2c3 0 6 3 6 8l-3 3H7L4 10C4 5 7 2 10 2Z" />
      <path d="M7 13l-3 5 4-1 2-3" />
      <path d="M13 13l3 5-4-1-2-3" />
      <circle cx="10" cy="8" r="1.5" />
    </svg>
  );
}

export function IconTable({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="16" height="14" rx="2" />
      <path d="M2 8h16" />
      <path d="M8 8v9" />
    </svg>
  );
}

export function IconSave({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2h9l3 3v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" />
      <path d="M7 2v5h6V2" />
      <rect x="6" y="12" width="8" height="5" rx="1" />
    </svg>
  );
}

export function IconSearch({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="6" />
      <path d="M13.5 13.5l4 4" />
    </svg>
  );
}

export function IconWarning({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2L2 17h16L10 2Z" />
      <path d="M10 8v4" />
      <circle cx="10" cy="14.5" r=".8" fill={color} stroke="none" />
    </svg>
  );
}

export function IconInfo({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" />
      <path d="M10 9v5" />
      <circle cx="10" cy="6.5" r=".8" fill={color} stroke="none" />
    </svg>
  );
}

export function IconArrowRight({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export function IconCode({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 7l-4 3 4 3M14 7l4 3-4 3" />
      <path d="M11 4l-2 12" />
    </svg>
  );
}

export function IconGraph({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4" cy="10" r="2.5" />
      <circle cx="16" cy="4" r="2.5" />
      <circle cx="16" cy="16" r="2.5" />
      <line x1="6.2" y1="8.9" x2="13.8" y2="5.1" />
      <line x1="6.2" y1="11.1" x2="13.8" y2="14.9" />
    </svg>
  );
}

export function IconStar({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2l2.4 5H18l-4.5 3.3 1.7 5.2L10 12.5l-5.2 3L6.5 10.3 2 7h5.6L10 2Z" />
    </svg>
  );
}

export function IconClose({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

export function IconInbox({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10l3-7h10l3 7" />
      <rect x="2" y="10" width="16" height="8" rx="2" />
      <path d="M7 14h6" />
    </svg>
  );
}

export function IconRepeat({ size = defaults.size, color = defaults.color } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h8a4 4 0 0 1 4 4v1" />
      <path d="M15 16H7a4 4 0 0 1-4-4v-1" />
      <path d="M2 7l3-3 3 3" />
      <path d="M18 13l-3 3-3-3" />
    </svg>
  );
}
