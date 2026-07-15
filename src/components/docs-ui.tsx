import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type IconName = 'arrow' | 'book' | 'check' | 'code' | 'coins' | 'layers' | 'route' | 'shield' | 'spark' | 'wallet'

function Icon({ name }: { name: IconName }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, strokeWidth: 1.7 }
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M4 12 12 4" /><path d="M5 4h7v7" /></>,
    book: <><path d="M4 3.5h6.5A1.5 1.5 0 0 1 12 5v8H5a2 2 0 0 1-2-2V4.5a1 1 0 0 1 1-1Z" /><path d="M5 10h7" /></>,
    check: <><path d="m4 8 2.5 2.5L12 5" /><circle cx="8" cy="8" r="6" /></>,
    code: <><path d="m6 4-4 4 4 4" /><path d="m10 4 4 4-4 4" /></>,
    coins: <><ellipse cx="8" cy="4.5" rx="5" ry="2.5" /><path d="M3 4.5v3C3 8.9 5.2 10 8 10s5-1.1 5-2.5v-3" /><path d="M3 7.5v3C3 11.9 5.2 13 8 13s5-1.1 5-2.5v-3" /></>,
    layers: <><path d="m8 2 6 3-6 3-6-3 6-3Z" /><path d="m2 8 6 3 6-3" /><path d="m2 11 6 3 6-3" /></>,
    route: <><circle cx="3" cy="4" r="1.5" /><circle cx="13" cy="12" r="1.5" /><path d="M4.5 4h3A2.5 2.5 0 0 1 10 6.5v3A2.5 2.5 0 0 0 12.5 12" /></>,
    shield: <path d="M8 2 13 4v3.5c0 3.1-2.1 5.4-5 6.5-2.9-1.1-5-3.4-5-6.5V4l5-2Z" />,
    spark: <><path d="m8 1 1.2 4.1L13 7 9.2 8.9 8 13l-1.2-4.1L3 7l3.8-1.9L8 1Z" /></>,
    wallet: <><path d="M2.5 4.5A1.5 1.5 0 0 1 4 3h8v10H4a1.5 1.5 0 0 1-1.5-1.5v-7Z" /><path d="M10 7h4v3h-4a1.5 1.5 0 0 1 0-3Z" /></>,
  }
  return <svg className="docs-icon" viewBox="0 0 16 16" aria-hidden="true" {...common}>{paths[name]}</svg>
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="docs-eyebrow"><span />{children}</div>
}

export function HomeHero() {
  return (
    <section className="docs-hero">
      <div className="docs-hero-glow" />
      <div className="docs-hero-grid" />
      <div className="docs-hero-content">
        <Eyebrow>Protocol documentation · BNB Chain</Eyebrow>
        <h1>DeFi you can<br /><span>understand.</span></h1>
        <p>Learn how BitBlocks Finance routes trades, creates liquidity positions, and distributes on-chain rewards—before you sign.</p>
        <div className="docs-hero-actions">
          <Link href="/guides" className="docs-button docs-button-primary">Start here <Icon name="arrow" /></Link>
          <a href="https://bitblocks.finance" target="_blank" rel="noreferrer" className="docs-button docs-button-secondary">Open the app <Icon name="arrow" /></a>
        </div>
        <div className="docs-hero-proof">
          <span><Icon name="check" /> Non-custodial flows</span>
          <span><Icon name="check" /> Chain ID 56</span>
          <span><Icon name="check" /> Verifiable contracts</span>
        </div>
      </div>
      <div className="docs-hero-visual" aria-hidden="true">
        <div className="docs-orbit docs-orbit-one" />
        <div className="docs-orbit docs-orbit-two" />
        <div className="docs-coin docs-coin-main"><Image src="/images/coins/BBKFI.png" width={106} height={106} alt="" priority /></div>
        <div className="docs-route-card docs-route-card-a"><span>01</span><strong>Choose</strong><small>Token pair</small></div>
        <div className="docs-route-card docs-route-card-b"><span>02</span><strong>Compare</strong><small>Best routes</small></div>
        <div className="docs-route-card docs-route-card-c"><span>03</span><strong>Verify</strong><small>Then sign</small></div>
        <svg className="docs-route-line" viewBox="0 0 520 460"><path d="M80 365C120 300 150 342 206 268s71-115 140-108 68-67 108-90" /><circle cx="80" cy="365" r="5" /><circle cx="206" cy="268" r="5" /><circle cx="346" cy="160" r="5" /><circle cx="454" cy="70" r="5" /></svg>
      </div>
    </section>
  )
}

type Feature = { icon: IconName; title: string; description: string; href: string; label?: string }

export function FeatureGrid({ items }: { items: Feature[] }) {
  return <div className="docs-feature-grid">{items.map((item, index) => (
    <Link key={item.title} href={item.href} className="docs-feature-card">
      <div className="docs-feature-top"><span className="docs-feature-icon"><Icon name={item.icon} /></span><span className="docs-feature-index">0{index + 1}</span></div>
      {item.label && <span className="docs-feature-label">{item.label}</span>}
      <h3>{item.title}</h3><p>{item.description}</p><span className="docs-feature-link">Read guide <Icon name="arrow" /></span>
    </Link>
  ))}</div>
}

export function SourceOfTruth() {
  return <div className="docs-source-card">
    <div className="docs-source-icon"><Icon name="code" /></div>
    <div><Eyebrow>Documentation policy</Eyebrow><h2>Code first. Claims second.</h2><p>This documentation is derived from the shipped interface, its configuration, and the verified contract source. Values that can change on-chain should always be confirmed in the app or explorer.</p></div>
    <Link href="/contracts/architecture" className="docs-source-link">See the architecture <Icon name="arrow" /></Link>
  </div>
}

export function StatsStrip() {
  return <div className="docs-stats-strip">
    <div><strong>56</strong><span>Chain ID</span></div>
    <div><strong>0.3%</strong><span>Default slippage</span></div>
    <div><strong>0.25%</strong><span>BitBlocks V2 fee / hop</span></div>
    <div><strong>3+</strong><span>Routing sources</span></div>
  </div>
}

export function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <header className="docs-page-intro"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{description}</p>{children}</header>
}

export function Pill({ children, tone = 'teal' }: { children: ReactNode; tone?: 'teal' | 'amber' | 'violet' | 'slate' }) {
  return <span className={`docs-pill docs-pill-${tone}`}>{children}</span>
}

export function InfoGrid({ children }: { children: ReactNode }) {
  return <div className="docs-info-grid">{children}</div>
}

export function InfoCard({ icon, title, children }: { icon: IconName; title: string; children: ReactNode }) {
  return <div className="docs-info-card"><span className="docs-info-icon"><Icon name={icon} /></span><h3>{title}</h3><div>{children}</div></div>
}

export function ContractCard({ name, kind, address, note }: { name: string; kind: string; address: string; note?: string }) {
  return <a className="docs-contract-card" href={`https://bscscan.com/address/${address}`} target="_blank" rel="noreferrer">
    <div><span className="docs-contract-kind">{kind}</span><h3>{name}</h3>{note && <p>{note}</p>}</div>
    <code>{address.slice(0, 8)}…{address.slice(-6)}</code><Icon name="arrow" />
  </a>
}

export function RouteDiagram() {
  return <div className="docs-route-diagram">
    <div className="docs-diagram-node docs-diagram-user"><Icon name="wallet" /><span>Your wallet</span></div>
    <span className="docs-diagram-arrow">→</span>
    <div className="docs-diagram-stack"><div><Icon name="route" /><span>Quote engine</span></div><small>compares output</small></div>
    <span className="docs-diagram-arrow">→</span>
    <div className="docs-diagram-routes"><span>BitBlocks V2</span><span>Pancake V2/V3</span><span>1inch*</span></div>
    <span className="docs-diagram-arrow">→</span>
    <div className="docs-diagram-node"><Icon name="check" /><span>Wallet signature</span></div>
  </div>
}
