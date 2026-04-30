import type { CollectionEntry } from 'astro:content';

type MemberData = CollectionEntry<'team'>['data'];

// ── Role labels ────────────────────────────────────────────────────────────

/**
 * Singular role labels — used on individual member profile pages.
 * Falls back to the raw role value for any unrecognised role.
 */
export const ROLE_LABELS: Record<string, string> = {
  'Faculty':                'Principal Investigator',
  'Postdoctoral Researcher':'Postdoctoral Researcher',
  'PhD Student':            'PhD Student',
  "Master's Student":       "Master's Student",
  'Undergraduate Student':  'Undergraduate Student',
  'Research Assistant':     'Research Assistant',
  'Visiting Researcher':    'Visiting Researcher',
  'Other':                  'Other',
};

/**
 * Plural role labels — used for section headings on the team listing page.
 * Falls back to the raw role value for any unrecognised role.
 */
export const ROLE_LABELS_PLURAL: Record<string, string> = {
  'Faculty':                'Principal Investigator',
  'Postdoctoral Researcher':'Postdoctoral Researchers',
  'PhD Student':            'PhD Students',
  "Master's Student":       "Master's Students",
  'Undergraduate Student':  'Undergraduate Students',
  'Research Assistant':     'Research Assistants',
  'Visiting Researcher':    'Visiting Researchers',
  'Other':                  'Other',
};

/** Canonical display order for role groups on the team listing page. */
export const ROLE_ORDER = [
  'Faculty',
  'Postdoctoral Researcher',
  'PhD Student',
  "Master's Student",
  'Undergraduate Student',
  'Research Assistant',
  'Visiting Researcher',
  'Other',
] as const;

// ── Per-member helpers ─────────────────────────────────────────────────────

/**
 * Returns a formatted tenure string, e.g. "Fall 2020 – Present".
 * Returns null when no start date is available.
 */
export function buildTenure(data: MemberData): string | null {
  const start = data.startDate ?? data.startYear?.toString();
  const end   = data.endDate ?? (data.alumni ? undefined : 'Present');
  if (!start) return null;
  return end ? `${start} – ${end}` : start;
}

/** Returns initials derived from the member's full name. */
export function buildInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('');
}

export interface MemberLink {
  href:  string;
  icon:  string;
  label: string;
}

/**
 * Returns the member's social/profile links in display order.
 * Only links with a non-empty value are included.
 */
export function buildLinks(data: MemberData): MemberLink[] {
  const { website, googleScholar, github, linkedin } = data;
  return [
    website       && { href: website,       icon: 'lucide:globe',               label: 'Website'        },
    googleScholar && { href: googleScholar,  icon: 'simple-icons:googlescholar', label: 'Google Scholar' },
    github        && { href: github,         icon: 'simple-icons:github',        label: 'GitHub'         },
    linkedin      && { href: linkedin,       icon: 'simple-icons:linkedin',      label: 'LinkedIn'       },
  ].filter(Boolean) as MemberLink[];
}
