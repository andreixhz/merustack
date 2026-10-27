import type { Locale } from '@/i18n/config'

/** Localized project as consumed by the UI. */
export interface Project {
  id: string
  name: string
  description: string
  /** Skills/competencies applied (translatable). */
  skills: string[]
  /** Technologies/stack (proper nouns, not translated). */
  tech: string[]
  /** "YYYY-MM" — start date. */
  startedAt: string
  /** "YYYY-MM" or null for an ongoing project. */
  endedAt: string | null
  /** Image paths under /public. Leave empty for a gradient placeholder. */
  images: string[]
}

interface RawProject extends Omit<Project, 'description' | 'skills'> {
  description: Record<Locale, string>
  skills: Record<Locale, string[]>
}

// ── Edit your projects here ──────────────────────────────────────────────
// To add images: drop files in `public/projects/` and list them in `images`,
// e.g. images: ['/projects/avhealth-1.png', '/projects/avhealth-2.png'].
const projects: RawProject[] = [
  {
    id: 'kstar',
    name: 'KStar — Developer Desktop IDE',
    description: {
      en: 'Cross-platform desktop IDE built with Tauri, React 19, and Rust, designed for developer productivity. Features include multi-workspace management, integrated terminal, Git operations, task tracking with Jira sync, and AI-assisted coding with Claude integration. Native performance with web technologies.',
      pt: 'IDE desktop multiplataforma construída com Tauri, React 19 e Rust, projetada para produtividade do desenvolvedor. Recursos incluem gerenciamento de múltiplos workspaces, terminal integrado, operações Git, rastreamento de tarefas com sync do Jira e codificação assistida por IA com integração Claude. Performance nativa com tecnologias web.',
    },
    skills: {
      en: ['Desktop Development', 'Full Stack Development', 'Developer Tools', 'System Programming'],
      pt: ['Desenvolvimento Desktop', 'Desenvolvimento Full Stack', 'Ferramentas de Desenvolvedor', 'Programação de Sistemas'],
    },
    tech: ['Tauri', 'React 19', 'Rust', 'TypeScript', 'Tailwind CSS', 'SQLite', 'Git'],
    startedAt: '2025-03',
    endedAt: null,
    images: [],
  },
  {
    id: 'aortyx-pay',
    name: 'Aortyx Pay — Hospital Payment Hub',
    description: {
      en: 'Centralized payment hub for hospital systems, integrating multiple payment providers (PIX, credit cards, boletos) with healthcare billing workflows. Real-time transaction tracking, automated reconciliation, and compliance with Brazilian healthcare payment regulations. Hexagonal architecture with event-driven processing.',
      pt: 'Hub de pagamentos centralizado para sistemas hospitalares, integrando múltiplos provedores de pagamento (PIX, cartões de crédito, boletos) com fluxos de cobrança de saúde. Rastreamento de transações em tempo real, conciliação automatizada e conformidade com regulamentações brasileiras de pagamentos em saúde. Arquitetura hexagonal com processamento orientado a eventos.',
    },
    skills: {
      en: ['Payment Integration', 'Backend Development', 'System Integration', 'Financial Systems'],
      pt: ['Integração de Pagamentos', 'Desenvolvimento Backend', 'Integração de Sistemas', 'Sistemas Financeiros'],
    },
    tech: ['Quarkus', 'Java 21', 'React', 'PostgreSQL', 'Redis', 'Kafka', 'PIX API'],
    startedAt: '2024-11',
    endedAt: null,
    images: [],
  },
  {
    id: 'workiq',
    name: 'WorkIQ — Healthcare Workforce Platform',
    description: {
      en: 'End-to-end healthcare workforce platform for hospitals: shift scheduling, practitioner onboarding with identity verification, and integration with hospital HIS systems. Multi-tenant and LGPD-compliant, with a web app, a Flutter mobile app, and a hexagonal Quarkus backend deployed to Kubernetes across three environments via ArgoCD.',
      pt: 'Plataforma de gestão de força de trabalho hospitalar: escala de plantões, onboarding de profissionais com verificação de identidade e integração com sistemas HIS de hospitais. Multi-tenant e em conformidade com a LGPD, com aplicação web, app mobile em Flutter e backend Quarkus hexagonal, deployado em Kubernetes em três ambientes via ArgoCD.',
    },
    skills: {
      en: ['Software Architecture', 'Full Stack Development', 'Team Leadership', 'DevOps & GitOps'],
      pt: ['Arquitetura de Software', 'Desenvolvimento Full Stack', 'Liderança de Time', 'DevOps & GitOps'],
    },
    tech: ['Quarkus', 'Java 21', 'Next.js', 'React', 'Flutter', 'PostgreSQL', 'Keycloak', 'Kubernetes', 'ArgoCD'],
    startedAt: '2024-09',
    endedAt: null,
    images: [],
  },
  {
    id: 'avhealth-messaging',
    name: 'AVHealth — Multichannel Messaging',
    description: {
      en: 'Automated multichannel messaging subsystem (WhatsApp, SMS and email) powering notifications, OTP / identity verification and operational alerts across the platform. Provider-abstracted senders with delivery tracking and per-tenant settings, processing 240k+ messages/month at an 87% delivery rate.',
      pt: 'Subsistema de mensageria automatizada multicanal (WhatsApp, SMS e e-mail) que sustenta notificações, verificação de identidade (OTP) e alertas operacionais de toda a plataforma. Senders abstraídos por provedor, com rastreamento de entrega e configuração por tenant, processando 240k+ mensagens/mês com 87% de taxa de entrega.',
    },
    skills: {
      en: ['Backend Development', 'System Integration', 'Messaging & Notifications', 'API Integration'],
      pt: ['Desenvolvimento Backend', 'Integração de Sistemas', 'Mensageria & Notificações', 'Integração de APIs'],
    },
    tech: ['Quarkus', 'Java 21', 'WhatsApp API', 'SMS (Texra)', 'SMTP / Mailer', 'PostgreSQL'],
    startedAt: '2024-09',
    endedAt: null,
    images: [],
  },
  {
    id: 'neural-lens',
    name: 'Neural Lens — AI Safety Monitoring',
    description: {
      en: 'AI-powered maritime safety platform that detects PPE violations (helmet, gloves, boots, safety suit) and fallen persons in real time aboard ships. Edge-native computer-vision pipeline with custom-trained YOLO models, multimodal LLM validation (Gemini), and a multi-tenant command center aggregating an entire fleet of vessels.',
      pt: 'Plataforma de segurança marítima baseada em IA que detecta violações de EPI (capacete, luvas, botas, traje) e pessoas caídas em tempo real a bordo de navios. Pipeline de visão computacional edge-native com modelos YOLO treinados sob medida, validação multimodal por LLM (Gemini) e um command center multi-tenant que agrega toda a frota.',
    },
    skills: {
      en: ['Computer Vision', 'AI / ML Engineering', 'Backend Development', 'Edge Architecture'],
      pt: ['Visão Computacional', 'Engenharia de IA / ML', 'Desenvolvimento Backend', 'Arquitetura Edge'],
    },
    tech: ['Python', 'PyTorch', 'YOLO', 'OpenCV', 'Quarkus', 'Next.js', 'Gemini', 'Kafka', 'PostgreSQL'],
    startedAt: '2024-11',
    endedAt: '2025-04',
    images: [],
  },
  {
    id: 'fabrikando',
    name: 'Fabrikando — Manufacturing ERP (SaaS)',
    description: {
      en: 'Cloud SaaS ERP for the Brazilian textile and apparel industry, covering the full workflow from sales orders through multi-step production (cut, sewing, embroidery), quality control and automated reprocessing of defects. Quarkus (Java 21) backend with domain-driven modules, an Angular operator app and a Next.js back-office, event-driven via RabbitMQ, with PDF generation, S3 storage and full observability.',
      pt: 'ERP SaaS em nuvem para a indústria têxtil e de confecção brasileira, cobrindo todo o fluxo do pedido de venda à produção multi-etapa (corte, costura, bordado), controle de qualidade e reprocessamento automático de defeitos. Backend Quarkus (Java 21) com módulos orientados a domínio, app operacional em Angular e back-office em Next.js, orientado a eventos via RabbitMQ, com geração de PDF, armazenamento S3 e observabilidade completa.',
    },
    skills: {
      en: ['Software Architecture', 'Full Stack Development', 'Domain-Driven Design', 'DevOps & Observability'],
      pt: ['Arquitetura de Software', 'Desenvolvimento Full Stack', 'Domain-Driven Design', 'DevOps & Observabilidade'],
    },
    tech: ['Quarkus', 'Java 21', 'Angular', 'Next.js', 'PostgreSQL', 'RabbitMQ', 'MinIO / S3', 'OpenTelemetry', 'Docker'],
    startedAt: '2025-01',
    endedAt: null,
    images: ['/projects/fabrikando-1.jpg'],
  },
  {
    id: 'observability-stack',
    name: 'LGTM Observability Stack',
    description: {
      en: 'End-to-end observability (metrics, traces, logs) across Kubernetes clusters, cutting mean time to detect incidents by 90%.',
      pt: 'Observabilidade ponta a ponta (métricas, traces, logs) em clusters Kubernetes, reduzindo o tempo de detecção de incidentes em 90%.',
    },
    skills: {
      en: ['Observability', 'DevOps', 'Infrastructure'],
      pt: ['Observabilidade', 'DevOps', 'Infraestrutura'],
    },
    tech: ['OpenTelemetry', 'Grafana', 'Loki', 'Tempo', 'Prometheus'],
    startedAt: '2023-09',
    endedAt: '2023-12',
    images: [],
  },
]

export function getProjects(locale: Locale): Project[] {
  return projects.map(({ description, skills, ...rest }) => ({
    ...rest,
    description: description[locale],
    skills: skills[locale],
  }))
}

/** Formats "Started At — Ended At" localized; falls back to `presentLabel`. */
export function formatDuration(
  project: Pick<Project, 'startedAt' | 'endedAt'>,
  locale: Locale,
  presentLabel: string,
): string {
  const fmt = (value: string) =>
    new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
      month: 'short',
      year: 'numeric',
    }).format(new Date(`${value}-01T00:00:00`))

  const start = fmt(project.startedAt)
  const end = project.endedAt ? fmt(project.endedAt) : presentLabel
  return `${start} — ${end}`
}
