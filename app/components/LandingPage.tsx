'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const RESUME_URL = 'https://docs.google.com/document/d/1kJXpgu7S5lFq9HH17c6Z8UCdyr2HIYIcWYiah9Npoec'
const LINKEDIN = 'https://www.linkedin.com/in/-anurag-sindhu'

function toggle(card: HTMLElement) {
  const header = card.querySelector('.exp-header')
  const toggleEl = header?.querySelector('.exp-toggle')
  const isOpen = card.classList.contains('open')
  card.classList.toggle('open')
  if (toggleEl) toggleEl.textContent = isOpen ? '▼ expand' : '▲ collapse'
}

const BADGES = [
  'Node.js',
  'JavaScript',
  'TypeScript',
  'NestJS',
  'Python',
  'Kafka',
  'MySQL',
  'MongoDB',
  'Redis',
  'Agentic AI',
  'AWS',
  'GCP',
  'Docker',
  'AWS SQS',
  'Jest',
  'REST APIs',
  'Microservices',
  'System Design',
  'API Gateway',
  'MariaDB',
  'Jenkins',
]

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const cur = root.querySelector('.cursor') as HTMLElement
    const ring = root.querySelector('.cursor-ring') as HTMLElement
    if (!cur || !ring) return

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    root.addEventListener('mousemove', onMove)

    let rafId: number
    const tick = () => {
      cur.style.left = `${mx - 5}px`
      cur.style.top = `${my - 5}px`
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = `${rx - 17}px`
      ring.style.top = `${ry - 17}px`
      rafId = requestAnimationFrame(tick)
    }
    tick()

    const hoverables = root.querySelectorAll(
      'a, button, .skill-card, .insight-row, .link-card, .feature'
    )
    const onEnter = () => {
      cur.style.transform = 'scale(2)'
      ring.style.width = '56px'
      ring.style.height = '56px'
    }
    const onLeave = () => {
      cur.style.transform = 'scale(1)'
      ring.style.width = '34px'
      ring.style.height = '34px'
    }
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const spotlightEls = root.querySelectorAll(
      '.skill-card, .exp-card, .link-card, .feature, .prof-item, .insight-row'
    )
    const onSpotlightMove = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${(e as MouseEvent).clientX - rect.left}px`)
      el.style.setProperty('--my', `${(e as MouseEvent).clientY - rect.top}px`)
    }
    spotlightEls.forEach((el) => el.addEventListener('mousemove', onSpotlightMove))

    const progress = root.querySelector('.scroll-progress') as HTMLElement
    const onScroll = () => {
      const d = document.documentElement
      const scrolled = d.scrollTop / (d.scrollHeight - d.clientHeight || 1)
      if (progress) progress.style.transform = `scaleX(${scrolled})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const navEl = root.querySelector('nav') as HTMLElement
    const navToggle = root.querySelector('.nav-toggle') as HTMLElement
    const onToggleClick = () => navEl.classList.toggle('menu-open')
    navToggle?.addEventListener('click', onToggleClick)
    const navLinkEls = root.querySelectorAll('.nav-links a')
    const onNavLinkClick = () => navEl.classList.remove('menu-open')
    navLinkEls.forEach((a) => a.addEventListener('click', onNavLinkClick))

    const expHeaders = root.querySelectorAll('.exp-header')
    expHeaders.forEach((header) => {
      header.addEventListener('click', () => {
        const card = (header as HTMLElement).closest('.exp-card')
        if (card) toggle(card as HTMLElement)
      })
    })

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.08 }
    )
    root.querySelectorAll('.fade-up').forEach((el) => obs.observe(el))

    return () => {
      root.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      spotlightEls.forEach((el) => el.removeEventListener('mousemove', onSpotlightMove))
      window.removeEventListener('scroll', onScroll)
      navToggle?.removeEventListener('click', onToggleClick)
      navLinkEls.forEach((a) => a.removeEventListener('click', onNavLinkClick))
      expHeaders.forEach((header) => {
        header.removeEventListener('click', () => {})
      })
      obs.disconnect()
    }
  }, [])

  return (
    <div ref={rootRef} className="landing-root">
      <div className="scroll-progress" />
      <div className="cursor" />
      <div className="cursor-ring" />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      <nav>
        <div className="logo">Anurag Sindhu</div>
        <button className="nav-toggle" aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
        <div className="nav-links">
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#project">Project</a>
          <a href="#insights">Insights</a>
          <a href="#connect">Connect</a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="hire-btn">
            Resume ↓
          </a>
        </div>
      </nav>

      <div>
        <section className="hero">
          <div className="hero-content">
            <div className="status-badge">🟢 Available for opportunities</div>
            <h1>
              <span className="outline">Software</span>
              <br />
              <em>Engineer</em>
            </h1>
            <p className="hero-desc">
              8+ years building and scaling backend &amp; distributed systems (Node.js, NestJS,
              TypeScript, Kafka, Redis). Currently SDE-3 at{' '}
              <strong style={{ color: 'var(--text)' }}>
                Aditya Birla Fashion and Retail Ltd (Aditya Birla Group)
              </strong>
              , Bangalore 🇮🇳 — delivering fraud-prevention, payments, and AI-driven
              ad-intelligence platforms at scale.
            </p>
            <div className="hero-meta">
              <span>📍 Bangalore, India</span>
              <span>
                📧 <a href="mailto:sindhuanurag2@gmail.com">sindhuanurag2@gmail.com</a>
              </span>
              <span>🎓 VTU Graduate</span>
            </div>
            <div className="hero-ctas">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn-p">
                Connect on LinkedIn
              </a>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn-s">
                Download Resume →
              </a>
              <a
                href="https://market.anuragsindhu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-s"
              >
                Live Project →
              </a>
            </div>
            <div className="stats">
              <div>
                <span className="stat-num">8+</span>
                <div className="stat-lbl">Years Exp</div>
              </div>
              <div>
                <span className="stat-num">SDE-3</span>
                <div className="stat-lbl">Current Level</div>
              </div>
              <div>
                <span className="stat-num">AI</span>
                <div className="stat-lbl">Agentic Systems</div>
              </div>
              <div>
                <span className="stat-num">
                  18%<sup style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>*</sup>
                </span>
                <div className="stat-lbl">Stock CAGR</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="terminal">
              <div className="t-bar">
                <div className="dot dr" />
                <div className="dot dy" />
                <div className="dot dg" />
                <span className="t-title">anurag@dev ~ zsh</span>
              </div>
              <div className="t-body">
                <div>
                  <span className="tp">→</span>
                  <span>whoami</span>
                </div>
                <div style={{ paddingLeft: 14 }}>
                  <span className="tk">name:</span> <span className="tv">Anurag Sindhu</span>
                </div>
                <div style={{ paddingLeft: 14 }}>
                  <span className="tk">role:</span> <span className="tv">SDE-3 @ ABFRL (ABG)</span>
                </div>
                <div style={{ paddingLeft: 14 }}>
                  <span className="tk">location:</span>{' '}
                  <span className="tv">Bangalore, India 🇮🇳</span>
                </div>
                <div style={{ paddingLeft: 14 }}>
                  <span className="tk">exp:</span> <span className="tv">8+ years</span>
                </div>
                <br />
                <div>
                  <span className="tp">→</span>
                  <span>skills --top</span>
                </div>
                <div style={{ paddingLeft: 14 }}>
                  <span className="tk">[0]</span> <span className="tv">Node.js / NestJS</span>
                </div>
                <div style={{ paddingLeft: 14 }}>
                  <span className="tk">[1]</span> <span className="tv">System Design</span>
                </div>
                <div style={{ paddingLeft: 14 }}>
                  <span className="tk">[2]</span> <span className="tv">MySQL / MongoDB / Redis</span>
                </div>
                <div style={{ paddingLeft: 14 }}>
                  <span className="tk">[3]</span> <span className="tv">Kafka / AWS / Agentic LLM</span>
                </div>
                <br />
                <div>
                  <span className="tp">→</span>
                  <span>status</span>
                </div>
                <div style={{ paddingLeft: 14 }}>
                  <span className="tk">open_to_work:</span> <span className="tg">true</span>
                </div>
                <div style={{ paddingLeft: 14 }}>
                  <span className="tk">remote_ok:</span> <span className="tg">true</span>
                </div>
                <br />
                <div>
                  <span className="tp">→</span>
                  <span>
                    hire <span className="tc" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="badge-section">
        <div className="badge-track">
          {[0, 1].map((copy) => (
            <div className="badge-scroll" key={copy} aria-hidden={copy === 1}>
              {BADGES.map((label, i) => (
                <div key={label} className={i < 4 ? 'badge hot' : 'badge'}>
                  {label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="experience" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="s-wrap">
          <div className="s-label fade-up">Work History</div>
          <h2 className="s-title fade-up">
            One Mission,
            <br /><em>Many Chapters</em>
          </h2>
          <div className="exp-list fade-up">
            <div className="exp-card open">
              <div className="exp-header">
                <div className="exp-left">
                  <div className="exp-company">🛍️ Aditya Birla Fashion and Retail Ltd</div>
                  <div className="exp-role">SDE-3 · Node.js · Agentic AI</div>
                </div>
                <div className="exp-right">
                  <div className="exp-date">Mar 2023 — Present</div>
                  <div className="exp-toggle">▲ collapse</div>
                </div>
              </div>
              <div className="exp-body">
                <div className="exp-inner">
                  <ul className="exp-achievements">
                    <li>
                      Lead a <strong>cross-channel AI ad intelligence platform</strong>, automating
                      data ingestion from Meta and Google.
                    </li>
                    <li>
                      Built from scratch and scaled a{' '}
                      <strong>low-latency microservices platform for order processing</strong>,
                      integrating agentic LLM workflows with fault tolerance.
                    </li>
                    <li>
                      Engineered an <strong>OTP-based anti-fraud system</strong> using Redis and
                      request throttling, preventing large-scale fraudulent requests.
                    </li>
                    <li>
                      Integrated AI-driven prompt engineering and{' '}
                      <strong>LLM-powered workflows using agent orchestration</strong> into
                      production products, improving automation and user engagement.
                    </li>
                  </ul>
                  <div className="exp-stack">
                    <span>Node.js</span>
                    <span>Kafka</span>
                    <span>Redis</span>
                    <span>Agentic LLM</span>
                    <span>AWS</span>
                    <span>NestJS</span>
                    <span>Microservices</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="exp-card">
              <div className="exp-header">
                <div className="exp-left">
                  <div className="exp-company">🏥 Medibuddy</div>
                  <div className="exp-role">SDE-3 · Performance · Distributed Systems</div>
                </div>
                <div className="exp-right">
                  <div className="exp-date">Oct 2022 — Jan 2023</div>
                  <div className="exp-toggle">▼ expand</div>
                </div>
              </div>
              <div className="exp-body">
                <div className="exp-inner">
                  <ul className="exp-achievements">
                    <li>
                      Boosted system performance by <strong>25%</strong> via SQL query tuning and
                      code profiling with Neo4j/Node.js.
                    </li>
                    <li>
                      Optimized inventory system queries, improving speed by{' '}
                      <strong>60%</strong> using indexed views and query optimization.
                    </li>
                    <li>
                      Cut <strong>Google Maps API costs by 70%</strong> by implementing a
                      write-ahead caching system using Redis and BullMQ.
                    </li>
                  </ul>
                  <div className="exp-stack">
                    <span>Node.js</span>
                    <span>MySQL</span>
                    <span>Neo4j</span>
                    <span>Redis</span>
                    <span>BullMQ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="exp-card">
              <div className="exp-header">
                <div className="exp-left">
                  <div className="exp-company">🏪 Falabella India</div>
                  <div className="exp-role">Software Engineer · APIs · Latency</div>
                </div>
                <div className="exp-right">
                  <div className="exp-date">Aug 2020 — Oct 2022</div>
                  <div className="exp-toggle">▼ expand</div>
                </div>
              </div>
              <div className="exp-body">
                <div className="exp-inner">
                  <ul className="exp-achievements">
                    <li>
                      Delivered notification services with <strong>99%+ availability</strong>{' '}
                      using geo-distributed architecture with Node.js, AWS SNS/SQS.
                    </li>
                    <li>
                      Reduced API latency from <strong>850ms to 510ms</strong> through improved
                      query complexity and db tuning.
                    </li>
                    <li>
                      Migrated frontend logic to backend, optimizing{' '}
                      <strong>30+ complex queries</strong> using MySQL.
                    </li>
                    <li>
                      Collaborated with <strong>Flipkart, Myntra, and other third-party
                      vendors</strong> for analytics integrations.
                    </li>
                  </ul>
                  <div className="exp-stack">
                    <span>Node.js</span>
                    <span>AWS SNS/SQS</span>
                    <span>MySQL</span>
                    <span>REST APIs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="exp-card">
              <div className="exp-header">
                <div className="exp-left">
                  <div className="exp-company">🛡️ SpringWorks</div>
                  <div className="exp-role">Software Engineer · SpringVerify</div>
                </div>
                <div className="exp-right">
                  <div className="exp-date">Dec 2019 — Aug 2020</div>
                  <div className="exp-toggle">▼ expand</div>
                </div>
              </div>
              <div className="exp-body">
                <div className="exp-inner">
                  <ul className="exp-achievements">
                    <li>
                      Built <strong>SpringVerify from scratch</strong> — a low-latency,
                      high-availability background verification platform for mobile and web.
                    </li>
                    <li>
                      Partnered with vendors, including <strong>Flipkart and Razorpay</strong>,
                      to integrate SpringVerify.
                    </li>
                    <li>
                      Migrated frontend dependencies to the backend, fine-tuning databases for
                      significant performance gains.
                    </li>
                  </ul>
                  <div className="exp-stack">
                    <span>Node.js</span>
                    <span>MySQL</span>
                    <span>Razorpay</span>
                    <span>REST APIs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="exp-card">
              <div className="exp-header">
                <div className="exp-left">
                  <div className="exp-company">💼 In Time Tec</div>
                  <div className="exp-role">Associate Software Engineer · Foundation Years</div>
                </div>
                <div className="exp-right">
                  <div className="exp-date">Feb 2018 — Dec 2019</div>
                  <div className="exp-toggle">▼ expand</div>
                </div>
              </div>
              <div className="exp-body">
                <div className="exp-inner">
                  <ul className="exp-achievements">
                    <li>
                      Completed a <strong>12-month Learn and Code program</strong>, delivering
                      real-world JavaScript/Node.js projects.
                    </li>
                    <li>
                      Achieved <strong>100% API test coverage</strong> with Jest, building a
                      strong foundation in test-driven development.
                    </li>
                  </ul>
                  <div className="exp-stack">
                    <span>JavaScript</span>
                    <span>Node.js</span>
                    <span>MySQL</span>
                    <span>MongoDB</span>
                    <span>Jest</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="s-wrap">
          <div className="s-label fade-up">Technical Stack</div>
          <h2 className="s-title fade-up">
            Built for Scale,
            <br />
            Engineered for <em>Speed</em>
          </h2>
          <div className="skills-grid fade-up">
            {[
              {
                icon: '⚙️',
                name: 'Node.js / NestJS',
                desc: 'High-throughput APIs, microservices, event-driven architectures. gRPC with Protocol Buffers for binary-efficient transport.',
                tag: 'Primary Stack · 8+ years',
              },
              {
                icon: '🗄️',
                name: 'Databases',
                desc: 'MySQL, MongoDB, MariaDB, Redis — optimized schemas, UUID PKs for IDOR prevention, large-scale query refactoring.',
                tag: 'Data Layer',
              },
              {
                icon: '🤖',
                name: 'AI / LLM',
                desc: 'Agentic LLM workflows, prompt engineering, agent orchestration, Gen AI feature integration into production products.',
                tag: 'Applied AI',
              },
              {
                icon: '☁️',
                name: 'Cloud & DevOps',
                desc: 'AWS, Oracle-CI, Containers, Jenkins, CI/CD pipelines. ESLint, Husky, Jest — 100% test coverage culture.',
                tag: 'Infrastructure',
              },
              {
                icon: '🏗️',
                name: 'System Design',
                desc: 'HLD/LLD documentation, distributed systems, Kafka message queues, API Gateway patterns, SOLID principles, MSA migrations at scale.',
                tag: 'Architecture',
              },
              {
                icon: '🔌',
                name: 'APIs & Protocols',
                desc: 'REST APIs, Kafka, message queues, SQS integrations. OAuth, auth-authz, session management.',
                tag: 'Communication',
              },
            ].map((s) => (
              <div key={s.name} className="skill-card">
                <div className="skill-icon">{s.icon}</div>
                <div className="skill-name">{s.name}</div>
                <div className="skill-desc">{s.desc}</div>
                <div className="skill-tag">{s.tag}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 52 }}>
            <div className="s-label fade-up" style={{ marginBottom: 24 }}>
              Proficiency
            </div>
            <div className="prof-grid fade-up">
              {[
                'JavaScript',
                'Node.js',
                'TypeScript',
                'Python',
                'MySQL',
                'MongoDB',
                'Kafka',
                'System Design',
                'Testing / Jest',
                'REST APIs',
                'Redis',
                'Docker',
              ].map((name, i) => (
                <div key={name} className="prof-item">
                  <div className="prof-name">{name}</div>
                  <div className="prof-stars">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div
                        key={j}
                        className={name === 'Docker' && j >= 4 ? 'star empty' : 'star'}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="insights" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="s-wrap">
          <div className="s-label fade-up">Thought Leadership</div>
          <h2 className="s-title fade-up">
            Engineering Insights
            <br />
            from the <em>Trenches</em>
          </h2>
          <div className="insights-list fade-up">
            {[
              {
                n: '01',
                txt: (
                  <>
                    Writing <strong>1 as an integer costs 1 byte (8 bits)</strong>, but as binary it
                    needs just 1 bit — an 8× reduction. Exactly why gRPC with Protocol Buffers
                    crushes REST+JSON at scale.{' '}
                  </>
                ),
                tag: '#gRPC',
              },
              {
                n: '02',
                txt: (
                  <>
                    Always use <strong>UUIDs as primary keys in SQL</strong> to eliminate sequential
                    ID enumeration. One architectural decision that prevents entire classes of IDOR
                    attacks.{' '}
                  </>
                ),
                tag: '#Security',
              },
              {
                n: '03',
                txt: (
                  <>
                    <strong>Leaderless Replication</strong> achieves strong consistency via
                    quorum-based reads and writes. When <strong>R + W &gt; N</strong>, you guarantee
                    overlap — no stale data sneaks through.{' '}
                  </>
                ),
                tag: '#DistributedSystems',
              },
              {
                n: '04',
                txt: (
                  <>
                    <strong>Bloom Filters</strong> eliminate unnecessary DB calls, trading just{' '}
                    <strong>1.13 MB of memory</strong> for a 1% false positive rate across 1 million
                    records. A go-to trick for cutting DB load at scale.{' '}
                  </>
                ),
                tag: '#Performance',
              },
              {
                n: '05',
                txt: (
                  <>
                    UUID collisions are practically impossible — generating 1 billion UUIDs per
                    second for <strong>100 years</strong> only brings the duplicate probability to
                    50%. Ship with confidence.{' '}
                  </>
                ),
                tag: '#Reliability',
              },
            ].map((item) => (
              <div key={item.n} className="insight-row">
                <div className="insight-n">{item.n}</div>
                <div className="insight-txt">
                  {item.txt}
                  <span className="insight-tag">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="project" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="s-wrap">
          <div className="s-label fade-up">Personal Projects</div>
          <h2 className="s-title fade-up">
            Code That Pays
            <br />
            <em>Dividends</em>
          </h2>
          <div className="project-card fade-up">
            <div className="project-header">
              <div className="project-badge">Passion Project</div>
              <div className="project-title">📈 Stock Market Automation App</div>
              <p className="project-desc">
                A custom Node.js application built from passion for the markets — automating
                buy/sell strategies, portfolio management, and real-time alerts. 23,000+ lines of
                code, 4 years in the making, currently managing 3 portfolios.
              </p>
            </div>
            <div className="project-highlights">
              <div className="p-stat">
                <span className="p-num">
                  18%<sup style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>*</sup>
                </span>
                <div className="p-lbl">CAGR over 4 Years</div>
              </div>
              <div className="p-stat">
                <span className="p-num">23K+</span>
                <div className="p-lbl">Lines of Code</div>
              </div>
              <div className="p-stat">
                <span className="p-num">1hr/wk</span>
                <div className="p-lbl">Time to Manage</div>
              </div>
            </div>
            <div className="project-features">
              {[
                {
                  title: '💡 Systematic Buy on Dips',
                  desc: 'Auto-creates GTT/Trigger setups with dynamic dip % per share. Auto-increases quantity after a trigger fires. Maintains configured gap between current & trigger price.',
                },
                {
                  title: '💰 Smart Sell / Target Engine',
                  desc: 'Creates daily sell orders with user-defined or pre-defined % thresholds based on stock price. Handles intraday / STBT scenarios automatically.',
                },
                {
                  title: '📊 Movement Tracker',
                  desc: 'Monitors any stock up to 150 days of history. Sends WhatsApp alerts on target price or % hit. Lets you add personal notes per stock.',
                },
                {
                  title: '🤖 Full Automation',
                  desc: 'App starts when market opens, sleeps when it closes. Runs on autopilot — Zerodha-integrated buy, track, sell. Stack: MongoDB, MySQL, Redis, Node.js, React.js, AWS.',
                },
              ].map((f) => (
                <div key={f.title} className="feature">
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
            <div className="project-footer">
              <a
                href="https://market.anuragsindhu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-p"
              >
                Live App →
              </a>
              <a
                href="https://github.com/anurag-sindhu/market_explore"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-s"
              >
                Backend Code →
              </a>
              <a
                href="https://github.com/anurag-sindhu/market_explore_ui"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-s"
              >
                Frontend Code →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="connect" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="s-wrap">
          <div className="s-label fade-up">Across the Web</div>
          <h2 className="s-title fade-up">
            Find Me in the
            <br />
            <em>Digital Realm</em>
          </h2>
          <div className="links-grid fade-up">
            {[
              { plat: 'Professional', name: 'LinkedIn', handle: '/in/-anurag-sindhu', href: LINKEDIN },
              {
                plat: 'Portfolio',
                name: 'Personal Website',
                handle: 'anurag-sindhu.github.io',
                href: 'https://anurag-sindhu.github.io',
              },
              {
                plat: 'Code',
                name: 'GitHub',
                handle: 'github.com/anurag-sindhu',
                href: 'https://github.com/anurag-sindhu',
              },
              {
                plat: 'Algorithms',
                name: 'LeetCode',
                handle: 'leetcode.com/anurag-sindhu',
                href: 'https://leetcode.com/anurag-sindhu',
              },
              {
                plat: 'Community',
                name: 'Stack Overflow',
                handle: '/users/9768827',
                href: 'https://stackoverflow.com/users/9768827/anurag-sindhu',
              },
              {
                plat: 'Writing',
                name: 'Medium',
                handle: '@anurag-sindhu',
                href: 'https://medium.com/@anurag-sindhu',
              },
              {
                plat: 'Competitive',
                name: 'HackerRank',
                handle: 'anurag_sindhu',
                href: 'https://hackerrank.com/anurag_sindhu',
              },
              {
                plat: 'Certificate',
                name: 'Node.js Certified',
                handle: 'cutshort.io',
                href: 'https://cutshort.io/certificate/6659',
              },
              {
                plat: 'Direct',
                name: 'Email Me',
                handle: 'sindhuanurag2@gmail.com',
                href: 'mailto:sindhuanurag2@gmail.com',
              },
              {
                plat: 'Direct',
                name: 'Call Me',
                handle: '+91-8867544254',
                href: 'tel:+918867544254',
              },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('mailto:') || link.href.startsWith('tel:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') || link.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                className="link-card"
              >
                <div className="link-plat">{link.plat}</div>
                <div className="link-name">{link.name}</div>
                <div className="link-handle">{link.handle}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--border)' }}>
        <div className="s-wrap">
          <div className="cta-box fade-up">
            <h2>
              Ready to Build
              <br />
              Something <em style={{ color: 'var(--accent)' }}>Exceptional?</em>
            </h2>
            <p>Let&apos;s architect your next high-scale system together.</p>
            <div className="cta-links">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn-p">
                Connect on LinkedIn
              </a>
              <a href="mailto:sindhuanurag2@gmail.com" className="btn-s">
                Email Directly →
              </a>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn-s">
                Download Resume →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/*
      <section id="photo" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="s-wrap">
          <div className="s-label fade-up">Off The Clock</div>
          <h2 className="s-title fade-up">
            Beyond the <em>Code</em>
          </h2>
          <div className="photo-card fade-up">
            <Image
              src="https://cdn.droptocdn.com/files/29ea4f5a-5354-4d44-b06d-41d92c307839/IMG_3989.jpg"
              alt="Anurag Sindhu"
              width={900}
              height={1200}
              sizes="(max-width: 480px) 100vw, 420px"
            />
          </div>
        </div>
      </section>
      */}

      <footer>
        <p>© 2026 Anurag Sindhu · SDE-3 @ ABFRL (Aditya Birla Group) · Bangalore 🇮🇳</p>
        <p>Node.js · NestJS · Kafka · System Design · Agentic AI · AWS</p>
      </footer>
    </div>
  )
}
