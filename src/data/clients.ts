import type { Locale } from '@/i18n/config'

/** Localized client as consumed by the UI. */
export interface Client {
  id: string
  name: string
  /** Short line about the client's field (translatable). */
  sector: string
  /** Optional site; the card becomes a link when set. */
  url?: string
  /** Optional logo under /public. Without one the name is shown as a wordmark. */
  logo?: string
}

interface RawClient extends Omit<Client, 'sector'> {
  sector: Record<Locale, string>
}

// ── Edit your clients here ───────────────────────────────────────────────
// To add a logo: drop the file in `public/clients/` and set
// logo: '/clients/<file>.svg'.
const clients: RawClient[] = [
  {
    id: 'avhealth',
    name: 'AVHealth',
    sector: { pt: 'Saúde e mensageria', en: 'Healthcare and messaging' },
  },
  {
    id: 'aortyx-pay',
    name: 'Aortyx Pay',
    sector: { pt: 'Pagamentos hospitalares', en: 'Hospital payments' },
  },
  {
    id: 'workiq',
    name: 'WorkIQ',
    sector: { pt: 'Gestão de equipes de saúde', en: 'Healthcare workforce' },
  },
  {
    id: 'neural-lens',
    name: 'Neural Lens',
    sector: { pt: 'IA e segurança do trabalho', en: 'AI and workplace safety' },
  },
  {
    id: 'fabrikando',
    name: 'Fabrikando',
    sector: { pt: 'ERP para indústria', en: 'Manufacturing ERP' },
    url: 'https://fabrikando.com.br',
  },
]

export function getClients(locale: Locale): Client[] {
  return clients.map((client) => ({ ...client, sector: client.sector[locale] }))
}
