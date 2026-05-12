'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const statsDone = useRef(false)
  const statsHasScrolled = useRef(false)
  const statsIsVisible = useRef(false)
  const [statDisplay, setStatDisplay] = useState({ pct: 0, mult: 0 })

  const [demoForm, setDemoForm] = useState({ name: '', email: '', firm: '' })
  const [demoSubmitted, setDemoSubmitted] = useState(false)

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const scrollToSolution = useCallback(() => {
    document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const startStatsAnimation = useCallback(() => {
    if (statsDone.current) return
    statsDone.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStatDisplay({ pct: 73, mult: 3 })
      return
    }

    const duration = 1400
    const start = performance.now()
    const from = { pct: 0, mult: 0 }
    const to = { pct: 73, mult: 3 }

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const e = easeOutCubic(t)
      setStatDisplay({
        pct: Math.round(from.pct + (to.pct - from.pct) * e),
        mult: Math.round((from.mult + (to.mult - from.mult) * e) * 10) / 10,
      })
      if (t < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const firstScroll = !statsHasScrolled.current
      if (firstScroll) {
        statsHasScrolled.current = true
        if (statsIsVisible.current) startStatsAnimation()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [startStatsAnimation])

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-lp-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('lp-reveal-visible')
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = document.getElementById('lp-stats')
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          statsIsVisible.current = entry.isIntersecting
          if (!entry.isIntersecting) return
          if (statsDone.current) return
          if (!statsHasScrolled.current) return

          startStatsAnimation()
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [startStatsAnimation])

  const faqItems = [
    {
      q: 'How does the AI qualify personal injury and immigration leads?',
      a: 'It reads each inquiry like an intake coordinator would: practice fit, urgency, jurisdiction, and completeness. High-signal PI matters (clear liability windows, treatment timeline, damages story) and immigration paths with realistic timelines surface first so your team replies in the right order.',
    },
    {
      q: 'Will this fit how our firm already handles intake?',
      a: 'Yes. Think of it as a first pass that tags, summarizes, and routes. Your policies stay yours. Firms keep their existing channels; we reduce the noise before a human ever picks up the phone.',
    },
    {
      q: 'How fast can we go live?',
      a: 'Most teams start with a focused pilot: connect your inbound flow, tune a few screening rules, and train the handoff. Book a short demo and we will map your intake steps to a realistic timeline.',
    },
  ]

  return (
    <main className="w-full overflow-x-hidden pb-28">
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes lpFadeUpHero { to { opacity: 1; transform: translateY(0); } }
.lp-hero-line1 { opacity: 0; transform: translateY(20px); animation: lpFadeUpHero 0.7s ease forwards; animation-delay: 0ms; }
.lp-hero-line2 { opacity: 0; transform: translateY(20px); animation: lpFadeUpHero 0.7s ease forwards; animation-delay: 200ms; }
.lp-hero-line3 { opacity: 0; transform: translateY(20px); animation: lpFadeUpHero 0.7s ease forwards; animation-delay: 400ms; }
.lp-pill-cta { border-radius: 50px; transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
.lp-pill-cta:hover { transform: scale(1.04); box-shadow: 0 0 22px rgba(55, 17, 66, 0.45); }
.lp-pill-cta:focus-visible { outline: 2px solid rgba(200, 160, 214, 0.5); outline-offset: 3px; }
[data-lp-reveal] { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; transition-delay: var(--lp-del, 0ms); }
[data-lp-reveal].lp-reveal-visible { opacity: 1; transform: translateY(0); }
.lp-sticky-demo-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 999; transform: translateY(100%); animation: lpStickyBarUp 0.5s ease 1.5s forwards; background: rgba(14, 14, 14, 0.92); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border-top: 1px solid rgba(55, 17, 66, 0.2); box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.45); }
@keyframes lpStickyBarUp { to { transform: translateY(0); } }

@keyframes lpBottomPulse {
  0%, 86%, 100% { transform: translateZ(0) scale(1); box-shadow: none; }
  92% { transform: translateZ(0) scale(1.03); box-shadow: 0 0 18px rgba(55, 17, 66, 0.45); }
}
.lp-bottom-bar-attention { animation: lpBottomPulse 4s ease-in-out infinite; }
.lp-faq-panel { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
.lp-faq-panel.lp-faq-open { max-height: 500px; }
.lp-faq-chevron { transition: transform 0.35s ease; }
.lp-faq-chevron.lp-faq-chevron-open { transform: rotate(180deg); }
.lp-testimonial-card { transition: transform 0.3s ease; }
.lp-testimonial-card:hover { transform: translateY(-4px); }
.lp-accent-text { color: #f4e8f8; text-shadow: 0 1px 12px rgba(0, 0, 0, 0.45); }
.lp-accent-label { color: #f0dbf6; text-shadow: 0 1px 12px rgba(0, 0, 0, 0.35); }
.lp-hero-accent { text-shadow: 0 2px 18px rgba(0, 0, 0, 0.55); }
.lp-hero-bg { opacity: 0.26; }
@media (max-width: 640px) { .lp-hero-bg { opacity: 0.38; } }
@media (prefers-reduced-motion: reduce) {
  .lp-hero-line1, .lp-hero-line2, .lp-hero-line3 { animation: none; opacity: 1; transform: none; }
  .lp-sticky-demo-bar { animation: none; transform: translateY(0); }
  .lp-bottom-bar-attention { animation: none; }
  [data-lp-reveal] { opacity: 1; transform: none; transition: none; }
  .lp-pill-cta { transition: none; }
  .lp-pill-cta:hover { transform: none; box-shadow: none; }
  .lp-testimonial-card:hover { transform: none; }
  .lp-faq-panel { transition: none; }
  .lp-faq-chevron { transition: none; }
}
`,
        }}
      />

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-20 pb-20 sm:pt-24 sm:pb-28 px-6 sm:px-8 bg-radial-plum overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none lp-hero-bg">
          <img
            alt=""
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=80"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif tracking-tighter text-on-surface mb-8 leading-tight lp-hero-line1">
            Your intake desk shouldn&apos;t feel like a call center. For{' '}
            <span className="bg-gradient-to-r from-primary via-[#d775f8] to-[#c8a0d6] bg-clip-text text-transparent font-semibold italic lp-hero-accent">
              PI &amp; immigration
            </span>
            , it doesn&apos;t have to.
          </h1>

          <div className="mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed tracking-wide font-light lp-hero-line2">
            <p className="text-base sm:text-lg md:text-xl lp-accent-text mb-3">PI &amp; immigration intake, handled.</p>
            <p className="text-base sm:text-lg md:text-xl text-on-surface-variant">
              NovaSphere sorts the noise, captures what matters, and hands your lawyers a clean brief.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 lp-hero-line3">
            <button
              type="button"
              onClick={scrollToContact}
              className="lp-pill-cta bg-secondary text-background text-xs font-sans font-semibold uppercase tracking-widest px-8 py-4 hover:bg-white transition-all duration-300 w-full sm:w-auto"
            >
              Book a demo
            </button>
            <button
              type="button"
              className="lp-pill-cta bg-primary text-on-primary text-xs font-sans font-semibold uppercase tracking-widest px-8 py-4 border border-white/10 hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch how it works
            </button>
          </div>

          <div
            className="max-w-3xl mx-auto border-t border-outline-variant/20 border-b border-outline-variant/20 py-3 opacity-70"
            data-lp-reveal
            style={{ ['--lp-del' as string]: '240ms' }}
          >
            <p className="text-[13px] text-on-surface-variant text-center">
              Trusted by 200+ PI and immigration firms across North America
            </p>
          </div>

          <div
            id="lp-stats"
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16 max-w-3xl mx-auto"
            aria-live="polite"
          >
            <div className="text-center" data-lp-reveal style={{ ['--lp-del' as string]: '0ms' }}>
              <p className="text-3xl sm:text-4xl md:text-5xl font-serif text-on-surface mb-2 tabular-nums">{statDisplay.pct}%</p>
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-outline">Less noise in intake</p>
            </div>
            <div className="text-center" data-lp-reveal style={{ ['--lp-del' as string]: '100ms' }}>
              <p className="text-3xl sm:text-4xl md:text-5xl font-serif text-on-surface mb-2 tabular-nums">
                {statDisplay.mult}×
              </p>
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-outline">Sharper consult focus</p>
            </div>
            <div className="text-center" data-lp-reveal style={{ ['--lp-del' as string]: '200ms' }}>
              <p className="text-3xl sm:text-4xl md:text-5xl font-serif text-on-surface mb-2">24/7</p>
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-outline">Always-on first response</p>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto mb-10 sm:mb-12">
            <div
              data-lp-reveal
              style={{ ['--lp-del' as string]: '0ms' }}
              className="aspect-video bg-surface-container-high/30 border border-outline-variant/40 backdrop-blur-xl rounded-lg overflow-hidden group cursor-pointer hover:bg-surface-container-high/40 transition-colors duration-300 premium-card"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-lg border border-outline-variant/40 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500 bg-surface-container/40">
                  <svg className="w-8 h-8 text-on-surface" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-6 left-6">
                <button
                  type="button"
                  onClick={scrollToSolution}
                  className="text-xs font-sans font-semibold uppercase tracking-widest text-outline mb-2 cursor-pointer"
                >
                  See the workflow
                </button>
                <p className="text-sm font-serif italic text-on-surface-variant">From web form to qualified brief</p>
              </div>
            </div>
          </div>

          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-outline">
            Built for firms where one missed detail costs the case
          </p>
        </div>
      </section>

      {/* SECTION 2: PROBLEM + TEAM + TESTIMONIALS */}
      <section id="product" className="w-full py-20 sm:py-28 px-6 sm:px-8 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 mb-16 sm:mb-32">
            <div className="lg:col-span-5" data-lp-reveal style={{ ['--lp-del' as string]: '0ms' }}>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif tracking-tighter text-on-surface mb-6 sm:mb-8 leading-tight">
                Sound familiar? The inbox is loud, but the docket is finite.
              </h2>
              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed tracking-wide font-light mb-6">
                Personal injury shops drown in soft-tissue noise. Immigration teams get incomplete stories and panicked timelines. In both worlds, the cost isn&apos;t just time. It&apos;s the high-value matter you never got to because you were chasing context.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: 'gavel',
                  title: 'Practice fit, fast',
                  desc: 'Surface PI matters with real liability hooks, and immigration inquiries where relief is plausible, not fantasy.',
                },
                {
                  icon: 'edit_note',
                  title: 'Complete stories',
                  desc: 'Missing dates, employers, or medical timelines? The system asks the next smart question before you do.',
                },
                {
                  icon: 'priority_high',
                  title: 'Priority you can defend',
                  desc: 'Rank by fit, urgency, and economics so your partners trust the queue, not just whoever shouted loudest online.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  data-lp-reveal
                  style={{ ['--lp-del' as string]: `${idx * 100}ms` }}
                  className="bg-gradient-to-br from-primary to-[#2a0d33] text-on-primary border border-white/10 rounded-lg p-5 md:p-6 flex flex-col gap-2 min-h-[180px] sm:min-h-[200px] max-h-[230px] overflow-hidden shadow-[0_18px_40px_rgba(55,17,66,0.35)] transition-colors duration-300 premium-card"
                >
                  <span className="material-symbols-outlined text-white/85 text-2xl">{item.icon}</span>
                  <h3 className="text-lg font-serif text-white">{item.title}</h3>
                  <p className="text-xs text-white/80 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-20 sm:pt-28 pb-12 sm:pb-16 border-t border-outline-variant/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 mb-12">
              <div className="lg:col-span-5" data-lp-reveal style={{ ['--lp-del' as string]: '0ms' }}>
                <h3 className="text-xs font-sans font-semibold uppercase tracking-widest lp-accent-label mb-6">Why we built this</h3>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tighter text-on-surface mb-6 sm:mb-8">
                  Because great lawyers shouldn&apos;t burn consults on misfires
                </h2>
                <p className="text-base text-on-surface-variant leading-relaxed tracking-wide font-light">
                  We come from automation and operations work where the bottleneck is always the same: good judgment trapped behind repetitive triage. NovaSphere gives your intake team air without dumbing down the standards your name is on.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div
                  data-lp-reveal
                  style={{ ['--lp-del' as string]: '100ms' }}
                  className="bg-surface-container-low/40 border border-outline-variant/30 backdrop-blur-xl rounded-xl p-6 md:p-8 premium-card"
                >
                  {[
                    { title: 'Intake language that sounds human', desc: 'Plain-English prompts that respect trauma and urgency, especially in PI and immigration.' },
                    { title: 'Firm-safe structure', desc: 'Summaries your partners can skim in seconds: facts, conflicts, timeline, and a recommended next step.' },
                    { title: 'Handoff without heroics', desc: 'Route to the right attorney, paralegal, or CRM field so nothing gets retyped at midnight.' },
                  ].map((dept, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 border-t border-outline-variant/20 pt-6 first:border-t-0 first:pt-0"
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/20 border border-white/10 flex items-center justify-center">
                        <span className="lp-accent-text text-xs font-sans font-semibold">0{idx + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-serif text-on-surface mb-2">{dept.title}</h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed">{dept.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 sm:pt-28 pb-12 sm:pb-16 border-t border-outline-variant/20">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tighter text-on-surface mb-10 sm:mb-12 text-center"
              data-lp-reveal
              style={{ ['--lp-del' as string]: '0ms' }}
            >
              What firms tell us after the switch
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  text: 'We cut morning triage from hours to minutes. Our coordinators finally sound like closers on the phone, not filters.',
                  author: 'Managing Partner, litigation boutique',
                },
                {
                  text: 'Consults feel different when the AI already asked the “hard” PI questions. We walk in with a theory of the case.',
                  author: 'Founder, personal injury practice',
                },
                {
                  text: 'Immigration intake used to be a scroll of half-facts. Now we open a file that reads like someone listened the first time.',
                  author: 'Senior attorney, immigration group',
                },
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  data-lp-reveal
                  style={{ ['--lp-del' as string]: `${idx * 100}ms` }}
                  className="lp-testimonial-card bg-surface-container-high/30 border border-outline-variant/30 backdrop-blur-xl rounded-lg p-8 cursor-pointer"
                >
                  {(() => {
                    const [descriptorRaw, ...rest] = testimonial.author.split(',')
                    const descriptor = (descriptorRaw ?? '').trim()
                    const firmType = rest.join(',').trim()

                    const descriptorWords = descriptor.split(/\s+/).filter(Boolean)
                    const initialsFromDescriptor = descriptorWords.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('')
                    const firmWords = firmType.split(/\s+/).filter(Boolean)
                    const initials = (initialsFromDescriptor + (firmWords[0]?.[0] ?? '')).toUpperCase().slice(0, 2)

                    return (
                      <>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/20 border border-[#c8a0d6]/25 lp-accent-text font-sans font-semibold">
                            {initials}
                          </div>
                          <p className="text-sm text-on-surface-variant font-sans leading-tight">
                            <span className="font-semibold text-on-surface">{descriptor}</span>
                            {firmType ? (
                              <>
                                {', '}
                                {firmType}
                              </>
                            ) : null}
                          </p>
                        </div>

                        <p className="lp-accent-text text-sm tracking-widest mb-4" aria-hidden>
                          ★★★★★
                        </p>

                        <p className="text-base text-on-surface leading-relaxed mb-6 italic">
                          &quot;{testimonial.text}&quot;
                        </p>
                      </>
                    )
                  })()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SOLUTION + KEY BENEFITS */}
      <section id="solution" className="w-full py-20 sm:py-28 px-6 sm:px-8 bg-background border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center mb-20 sm:mb-24">
            <div className="lg:col-span-6">
              <div
                data-lp-reveal
                style={{ ['--lp-del' as string]: '0ms' }}
                className="relative aspect-video bg-surface-container-high/30 border border-outline-variant/30 backdrop-blur-xl rounded-lg overflow-hidden group cursor-pointer hover:bg-surface-container-high/50 transition-colors duration-300 premium-card"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-lg border border-outline-variant/40 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500 bg-surface-container/40">
                    <svg className="w-6 h-6 text-on-surface" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="text-xs font-sans font-semibold uppercase tracking-widest text-outline-variant">Walkthrough</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:pl-12" data-lp-reveal style={{ ['--lp-del' as string]: '120ms' }}>
              <p className="text-xs font-sans font-semibold uppercase tracking-widest lp-accent-label mb-6">How it works</p>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif tracking-tighter text-on-surface mb-6 sm:mb-8 leading-tight">
                Instant response. Smarter questions. A queue your partners trust.
              </h2>
              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed tracking-wide font-light mb-6 sm:mb-8">
                NovaSphere meets people where they are (web form, chat, email) and returns a structured brief: who they are, what they need, whether you want the consult, and why. You stay in control; the busywork does not.
              </p>

              <div className="space-y-4">
                {[
                  { icon: 'check_circle', text: 'PI: liability, treatment, and damages signals captured early' },
                  { icon: 'check_circle', text: 'Immigration: relief path, deadlines, and evidence gaps flagged' },
                  { icon: 'check_circle', text: 'Consistent tone that protects trust before a human says hello' },
                  { icon: 'check_circle', text: 'Routing rules that mirror how your firm already decides' },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="material-symbols-outlined lp-accent-text text-xl">{benefit.icon}</span>
                    <p className="text-sm sm:text-base text-on-surface font-light">{benefit.text}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={scrollToContact}
                className="lp-pill-cta mt-8 sm:mt-10 bg-secondary text-background text-xs font-sans font-semibold uppercase tracking-widest px-8 py-4 hover:bg-white transition-all duration-300"
              >
                Book a demo
              </button>
            </div>
          </div>

          <div id="faq" className="max-w-3xl mx-auto border-t border-outline-variant/20 pt-20 sm:pt-28">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tighter text-on-surface mb-4 text-center"
              data-lp-reveal
              style={{ ['--lp-del' as string]: '0ms' }}
            >
              Questions partners ask before they say yes
            </h2>
            <p
              className="text-center text-on-surface-variant font-light mb-10 sm:mb-12 max-w-xl mx-auto text-sm sm:text-base"
              data-lp-reveal
              style={{ ['--lp-del' as string]: '80ms' }}
            >
              Straight answers, no jargon wall. If you want this mapped to your exact workflow, that is what the demo is for.
            </p>
            <div className="space-y-3">
              {faqItems.map((item, i) => {
                const open = openFaq === i
                return (
                  <div
                    key={item.q}
                    data-lp-reveal
                    style={{ ['--lp-del' as string]: `${i * 100}ms` }}
                    className="border border-outline-variant/30 rounded-lg bg-surface-container-low/40 backdrop-blur-xl overflow-hidden"
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span className="text-sm md:text-base font-serif text-on-surface pr-2">{item.q}</span>
                      <span
                        className={`material-symbols-outlined text-on-surface-variant shrink-0 lp-faq-chevron ${open ? 'lp-faq-chevron-open' : ''}`}
                        aria-hidden
                      >
                        expand_more
                      </span>
                    </button>
                    <div className={`lp-faq-panel px-5 ${open ? 'lp-faq-open' : ''}`}>
                      <p className="text-sm text-on-surface-variant leading-relaxed pb-4 pr-2">{item.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CALENDLY / CTA */}
      <section id="contact" className="w-full py-20 sm:py-28 px-6 sm:px-8 bg-surface-container-lowest border-t border-outline-variant/20 scroll-mt-28">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif tracking-tighter text-on-surface mb-4 sm:mb-6" data-lp-reveal style={{ ['--lp-del' as string]: '0ms' }}>
            Let&apos;s make intake feel like a conversation, not a chore
          </h2>

          <p className="text-base sm:text-lg text-on-surface-variant mb-6 sm:mb-8 leading-relaxed tracking-wide font-light" data-lp-reveal style={{ ['--lp-del' as string]: '100ms' }}>
            In one short session, we&apos;ll show you:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {[
              'How inquiries become a partner-ready brief',
              'How PI and immigration signals are separated from noise',
              'How your team keeps control without living in the inbox',
            ].map((item, idx) => (
              <div
                key={idx}
                data-lp-reveal
                style={{ ['--lp-del' as string]: `${idx * 100}ms` }}
                className="bg-surface-container-low/40 border border-outline-variant/30 backdrop-blur-xl rounded-lg p-5 sm:p-6 hover:bg-surface-container-low/60 transition-colors duration-300 premium-card"
              >
                <p className="text-base text-on-surface leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div
            className="bg-surface-container-high/30 border border-outline-variant/30 backdrop-blur-xl rounded-lg p-6 sm:p-10 md:p-12 mb-8"
            data-lp-reveal
            style={{ ['--lp-del' as string]: '0ms' }}
          >
            <div className="bg-surface-container-high/40 rounded border border-outline-variant/40 py-8 sm:py-10 text-center">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setDemoSubmitted(true)
                }}
                className="max-w-xl mx-auto px-0 sm:px-2"
              >
                <div className="space-y-4 text-left">
                  <div>
                    <label className="text-xs font-sans font-semibold uppercase tracking-widest text-on-surface-variant">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      value={demoForm.name}
                      onChange={(e) => setDemoForm((s) => ({ ...s, name: e.target.value }))}
                      className="mt-2 w-full bg-background/40 border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface outline-none focus:border-[#c8a0d6]/40"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-sans font-semibold uppercase tracking-widest text-on-surface-variant">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={demoForm.email}
                      onChange={(e) => setDemoForm((s) => ({ ...s, email: e.target.value }))}
                      className="mt-2 w-full bg-background/40 border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface outline-none focus:border-[#c8a0d6]/40"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-sans font-semibold uppercase tracking-widest text-on-surface-variant">
                      Firm name
                    </label>
                    <input
                      required
                      type="text"
                      value={demoForm.firm}
                      onChange={(e) => setDemoForm((s) => ({ ...s, firm: e.target.value }))}
                      className="mt-2 w-full bg-background/40 border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface outline-none focus:border-[#c8a0d6]/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="lp-pill-cta bg-primary text-on-primary text-xs font-sans font-semibold uppercase tracking-widest px-8 py-4 hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto"
                  >
                    Book My Demo →
                  </button>
                </div>

                {demoSubmitted ? (
                  <p className="text-on-surface-variant font-light mt-4">
                    We'll be in touch within one business day.
                  </p>
                ) : null}
              </form>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToContact}
            className="lp-pill-cta bg-primary text-on-primary text-xs font-sans font-semibold uppercase tracking-widest px-8 py-4 hover:bg-primary/90 transition-all duration-300"
          >
            Book a demo
          </button>
        </div>
      </section>

      {/* SECTION 5: FOOTER */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-lg font-serif tracking-tighter text-on-surface mb-4">NovaSphere</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                AI-assisted lead qualification for personal injury and immigration firms, so your best cases surface first.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-sans font-semibold uppercase tracking-widest lp-accent-label mb-6">Explore</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#product" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                    Product
                  </a>
                </li>
                <li>
                  <a href="#solution" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-sans font-semibold uppercase tracking-widest lp-accent-label mb-6">Resources</h4>
              <ul className="space-y-3">
                {['FAQ', 'Documentation', 'LinkedIn'].map((link) => (
                  <li key={link}>
                    <a href={link === 'FAQ' ? '#faq' : '#'} className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-outline-variant/20 pt-8">
            <p className="text-xs text-on-surface-variant text-center">© 2026 NovaSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div className="lp-sticky-demo-bar" role="region" aria-label="Book a demo">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <img
            src="/novawhite.png"
            alt="NovaSphere"
            className="h-6 sm:h-7 w-auto"
          />
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
    
            <p className="text-sm text-on-surface-variant font-light">
              Every unqualified lead costs your firm time and money. Fix intake this week.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToContact}
            className="lp-pill-cta bg-secondary text-background text-xs font-sans font-semibold uppercase tracking-widest px-8 py-3.5 hover:bg-white shrink-0 w-full sm:w-auto lp-bottom-bar-attention"
          >
            Book a Free Demo →
          </button>
        </div>
      </div>
    </main>
  )
}
