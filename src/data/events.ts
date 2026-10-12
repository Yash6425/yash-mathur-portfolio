/**
 * LEADERSHIP & EVENTS
 * -------------------
 * To add event photos: put them in public/events/ and list them in `photos`,
 * e.g. photos: ['/events/scat-sports-league-2025-1.jpg', '/events/scat-sports-league-2025-2.jpg']
 * Until a photo is added, the card shows a clean illustrated header instead.
 */

export type EventIcon = 'sports' | 'hackathon' | 'orientation' | 'community';

export interface EventItem {
  id: string;
  title: string;
  /** Leave empty if you're not sure of the year. */
  year?: string;
  role: string;
  organisation: string;
  icon: EventIcon;
  description?: string;
  photos?: string[];
}

export const events: EventItem[] = [
  {
    id: 'scat-orientation-2026',
    title: 'SCAT Orientation 2026',
    year: '2026',
    role: 'Tech Head',
    organisation: 'SCAT Department, Galgotias University',
    icon: 'orientation',
  },
  {
    id: 'sih-2025',
    title: 'Smart India Hackathon 2025',
    year: '2025',
    role: 'Volunteer · Cyber Cell Member',
    organisation: 'Grand Finale (Hardware Edition), Galgotias University',
    icon: 'hackathon',
  },
  {
    id: 'scat-sports-league-2025',
    title: 'SCAT Sports League 2025',
    year: '2025',
    role: 'Tech Head',
    organisation: 'SCAT Department, Galgotias University',
    icon: 'sports',
  },
  {
    id: 'nss-event',
    title: 'NSS Event',
    role: 'Tech Head',
    organisation: 'SCAT Department, Galgotias University',
    icon: 'community',
  },
];
