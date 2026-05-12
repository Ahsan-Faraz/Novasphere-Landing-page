'use client'

import { useCallback, useEffect, useState } from 'react'

/** Optional VSL: set `NEXT_PUBLIC_VSL_EMBED_URL` to your YouTube/Vimeo/Wistia embed URL (e.g. https://www.youtube-nocookie.com/embed/VIDEO_ID). */
const VSL_EMBED_SRC =
  typeof process.env.NEXT_PUBLIC_VSL_EMBED_URL === 'string' ? process.env.NEXT_PUBLIC_VSL_EMBED_URL.trim() : ''

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [vslOpen, setVslOpen] = useState(false)

  const scrollToApplication = useCallback(() => {
    document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  type ActiveFirm = 'yes' | 'no' | ''
  type RevenueOpt =
    | ''
    | 'under20'
    | '20to50'
    | '50to100'
    | '100to200'
    | 'over200'

  const [formPhone, setFormPhone] = useState('')
  const [formName, setFormName] = useState('')
  const [activeFirm, setActiveFirm] = useState<ActiveFirm>('')
  const [formWebsite, setFormWebsite] = useState('')
  const [revenue, setRevenue] = useState<RevenueOpt>('')
  const [practicePi, setPracticePi] = useState(false)
  const [practiceImm, setPracticeImm] = useState(false)
  const [teamSize, setTeamSize] = useState('')
  const [appSubmitted, setAppSubmitted] = useState(false)

  const disqualifiedNoFirm = activeFirm === 'no'
  const showUnder20Note = revenue === 'under20' && !disqualifiedNoFirm

  const practiceValid = practicePi || practiceImm

  const bothPracticeChecked = practicePi && practiceImm

  const canSubmit =
    !disqualifiedNoFirm &&
    formPhone.trim() &&
    formName.trim() &&
    activeFirm === 'yes' &&
    formWebsite.trim() &&
    revenue &&
    practiceValid

  const handleBothPractice = (checked: boolean) => {
    if (checked) {
      setPracticePi(true)
      setPracticeImm(true)
    } else {
      setPracticePi(false)
      setPracticeImm(false)
    }
  }

  const onAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setAppSubmitted(true)
  }

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
      a: "Most teams start with a focused pilot: connect your inbound flow, tune a few screening rules, and train the handoff. Book a short demo and we will map your intake steps to a realistic timeline.",
    },
    {
      q: 'What does it cost?',
      a: 'Pricing is based on firm size and intake volume. Most firms recover the cost within the first month from reduced coordinator hours alone. We share exact numbers on the audit call. Apply first and we will build the math around your firm.',
    },
    {
      q: "What if it doesn't work for us?",
      a: "You don't pay until the system is live and performing. If we don't hit the agreed intake benchmarks in 14 days, you owe nothing. That's the deal.",
    },
  ]

  const testimonials = [
    {
      text: 'We cut morning triage from hours to minutes. Our coordinators finally sound like closers on the phone, not filters.',
      title: 'Managing Partner',
      firmLine: '8 attorney PI firm, Texas',
      initials: 'MP',
    },
    {
      text: 'Consults feel different when the AI already asked the “hard” PI questions. We walk in with a theory of the case.',
      title: 'Founder',
      firmLine: 'Personal injury practice, Florida',
      initials: 'FN',
    },
    {
      text: 'Immigration intake used to be a scroll of half-facts. Now we open a file that reads like someone listened the first time.',
      title: 'Senior Attorney',
      firmLine: 'Immigration group, New York',
      initials: 'SA',
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
.lp-hero-line4 { opacity: 0; transform: translateY(20px); animation: lpFadeUpHero 0.7s ease forwards; animation-delay: 550ms; }
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
.lp-testimonial-card { transition: transform 0.3s ease; }
.lp-testimonial-card:hover { transform: translateY(-4px); }
.lp-accent-text { color: #f4e8f8; text-shadow: 0 1px 12px rgba(0, 0, 0, 0.45); }
.lp-accent-label { color: #f0dbf6; text-shadow: 0 1px 12px rgba(0, 0, 0, 0.35); }
.lp-hero-bg { opacity: 0.26; }
.lp-hero-headline-accent {
  background: linear-gradient(90deg, #a779b1 0%, #c8a0d6 28%, #d775f8 52%, #c49fd4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  filter: drop-shadow(0 0 14px rgba(167, 121, 177, 0.45));
}
.lp-mechanism { font-style: italic; letter-spacing: 0.02em; color: #e8d4ef; border-bottom: 1px solid rgba(200, 160, 214, 0.45); padding-bottom: 2px; }
.lp-onpage-accent-text {
  background: linear-gradient(90deg, #a779b1 0%, #d775f8 48%, #c8a0d6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.lp-faq-panel { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
.lp-faq-panel.lp-faq-open { max-height: 900px; }
.lp-faq-chevron { transition: transform 0.35s ease; }
.lp-faq-chevron.lp-faq-chevron-open { transform: rotate(180deg); }
@media (max-width: 640px) { .lp-hero-bg { opacity: 0.38; } }
@media (prefers-reduced-motion: reduce) {
  .lp-hero-line1, .lp-hero-line2, .lp-hero-line3, .lp-hero-line4 { animation: none; opacity: 1; transform: none; }
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

      {/* HERO */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-14 pb-20 sm:pt-20 sm:pb-28 px-6 sm:px-8 bg-radial-plum overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none lp-hero-bg">
          <img
            alt=""
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=80"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tighter text-on-surface mb-8 leading-[1.08] sm:leading-[1.06] lp-hero-line1 text-balance">
            <span className="block">
              <span className="font-bold lp-hero-headline-accent">Done For You</span>{' '}
              <span className="lp-mechanism">&ldquo;AI Intake&rdquo;</span>
            </span>
            <span className="block mt-3 sm:mt-4">
              <span className="font-black text-on-surface underline decoration-primary decoration-2 underline-offset-4">
                2 to 3× more qualified consults
              </span>
              <span className="text-on-surface"> in </span>
              <span className="font-bold">14 days.</span>
            </span>
          </h1>

          <div className="mb-8 sm:mb-10 max-w-[600px] mx-auto lp-hero-line2">
            <p className="text-[18px] sm:text-xl text-on-surface-variant font-light leading-relaxed tracking-wide">
              No monthly retainers. No long term contracts.
              <br />
              Fully installed in your firm within 14 days, or you don&apos;t pay.
            </p>
          </div>

          <div
            className="relative max-w-3xl mx-auto mb-10 sm:mb-12 lp-hero-line4"
            data-lp-reveal
            style={{ ['--lp-del' as string]: '0ms' }}
          >
            <p className="text-[11px] font-sans font-semibold uppercase tracking-widest text-outline-variant mb-3 text-center">
              Optional: quick overview (~2 min)
            </p>
            <div className="relative aspect-video bg-surface-container-high/30 border border-outline-variant/40 backdrop-blur-xl rounded-lg overflow-hidden premium-card group">
              {vslOpen && VSL_EMBED_SRC ? (
                <iframe
                  title="NovaSphere overview"
                  src={`${VSL_EMBED_SRC}${VSL_EMBED_SRC.includes('?') ? '&' : '?'}autoplay=1`}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : null}
              {!(vslOpen && VSL_EMBED_SRC) ? (
                <>
                  <button
                    type="button"
                    onClick={() => setVslOpen(true)}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-surface-container/20 hover:bg-surface-container-high/35 transition-colors duration-300 cursor-pointer border-0 p-0 w-full h-full"
                    aria-label={VSL_EMBED_SRC ? 'Play overview video' : 'Video not configured'}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-outline-variant/40 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500 bg-surface-container/40">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-on-surface" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="text-xs font-sans font-semibold uppercase tracking-widest text-outline px-4 text-center">
                      {VSL_EMBED_SRC ? 'Play overview' : 'Overview video (add embed URL)'}
                    </span>
                  </button>
                  {vslOpen && !VSL_EMBED_SRC ? (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm p-6 pt-12">
                      <p className="text-sm text-on-surface-variant text-center leading-relaxed max-w-sm">
                        {process.env.NODE_ENV === 'development' ? (
                          <>
                            Set{' '}
                            <span className="text-on-surface font-mono text-xs">NEXT_PUBLIC_VSL_EMBED_URL</span> to your
                            embed URL. Until then, apply below. Same story on the call.
                          </>
                        ) : (
                          <>
                            A short walkthrough will live here soon. You can apply below anytime. We cover the same
                            details on your audit call.
                          </>
                        )}
                      </p>
                      <button
                        type="button"
                        onClick={() => setVslOpen(false)}
                        className="mt-6 text-on-surface-variant hover:text-on-surface text-xs uppercase tracking-widest font-sans font-semibold"
                        aria-label="Close"
                      >
                        Close
                      </button>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
            <p className="text-[12px] text-on-surface-variant text-center mt-3 opacity-70 font-light">
              Skipping is fine. Apply below when you&apos;re ready.
            </p>
          </div>

          <div className="lp-hero-line3 flex flex-col items-center justify-center gap-5 mb-6">
            <button
              type="button"
              onClick={scrollToApplication}
              className="lp-pill-cta bg-primary text-on-primary text-xs font-sans font-semibold uppercase tracking-widest px-8 py-4 hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto border border-white/10"
            >
              Apply to Work With Us →
            </button>
            <p className="text-[13px] text-on-surface-variant text-center opacity-60">
              ✓ Free to apply · ✓ 15 min call · ✓ No obligation
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: APPLICATION FORM */}
      <section
        id="application"
        className="w-full scroll-mt-24 py-16 sm:py-24 px-6 sm:px-8 bg-surface-container-lowest border-t border-outline-variant/20"
      >
        <div className="max-w-[560px] mx-auto">
          <div className="mb-8 rounded-lg border border-outline-variant/30 bg-surface-container-low/40 px-4 py-3 sm:px-5 sm:py-3.5">
            <p className="text-center text-sm text-on-surface-variant leading-relaxed">
              For{' '}
              <span className="font-semibold text-on-surface">PI and immigration</span> law firms doing{' '}
              <span className="font-bold text-purple-600">$20k to $200k/month</span> that want more qualified consultation
              bookings, without hiring more staff.
            </p>
          </div>
          <p className="text-xs font-sans font-semibold uppercase tracking-widest lp-accent-label mb-4 text-center">
            Step 1 of 1: Tell us about your firm
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tighter text-on-surface mb-4 text-center">
            Apply for a Free Intake Audit
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant font-light mb-10 text-center leading-relaxed">
            We review every application manually. If it&apos;s a fit, we&apos;ll reach out within 1 business day.
          </p>

          <div
            data-lp-reveal
            style={{ ['--lp-del' as string]: '0ms' }}
            className="premium-card bg-surface-container-high/30 border border-outline-variant/30 backdrop-blur-xl rounded-lg p-6 sm:p-8"
          >
            {appSubmitted ? (
              <p className="text-on-surface leading-relaxed text-center text-base font-light">
                Application received. We&apos;ll review and reach out within 1 business day if it&apos;s a strong fit.
                Check your phone. We may text first.
              </p>
            ) : (
              <form onSubmit={onAppSubmit} className="space-y-6">
                <div>
                  <label className="text-xs font-sans font-semibold uppercase tracking-widest text-on-surface-variant block">
                    Your phone number
                  </label>
                  <input
                    required={!disqualifiedNoFirm}
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+1 (555) 000 0000"
                    className="mt-2 w-full bg-background/40 border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface outline-none focus:border-[#c8a0d6]/40"
                  />
                  <p className="text-xs text-on-surface-variant/80 mt-2">We&apos;ll only call to schedule your audit. No spam.</p>
                </div>

                <div>
                  <label className="text-xs font-sans font-semibold uppercase tracking-widest text-on-surface-variant block">
                    Your name
                  </label>
                  <input
                    required={!disqualifiedNoFirm}
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="First and last name"
                    className="mt-2 w-full bg-background/40 border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface outline-none focus:border-[#c8a0d6]/40"
                  />
                </div>

                <fieldset className="space-y-3">
                  <legend className="text-xs font-sans font-semibold uppercase tracking-widest text-on-surface-variant mb-3">
                    Are you currently running an active law firm?
                  </legend>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {(
                      [
                        { v: 'yes' as const, label: 'Yes, I am' },
                        { v: 'no' as const, label: 'No, not yet' },
                      ] as const
                    ).map(({ v, label }) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setActiveFirm(v)}
                        className={`lp-pill-cta flex-1 py-3 px-4 text-xs font-sans font-semibold uppercase tracking-widest border transition-all duration-300 ${
                          activeFirm === v
                            ? 'bg-primary text-on-primary border-white/15'
                            : 'bg-transparent text-on-surface-variant border-outline-variant/40 hover:border-outline-variant/70'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {disqualifiedNoFirm ? (
                  <p className="text-sm text-on-surface-variant leading-relaxed border border-outline-variant/30 rounded-lg p-4 bg-surface-container-low/40">
                    Thanks for your interest. NovaSphere is built for active firms only. We&apos;d love to connect when
                    you launch.
                  </p>
                ) : null}

                {!disqualifiedNoFirm ? (
                  <>
                    <div>
                      <label className="text-xs font-sans font-semibold uppercase tracking-widest text-on-surface-variant block">
                        Your firm&apos;s website
                      </label>
                      <input
                        required
                        type="url"
                        value={formWebsite}
                        onChange={(e) => setFormWebsite(e.target.value)}
                        placeholder="https://yourfirm.com"
                        className="mt-2 w-full bg-background/40 border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface outline-none focus:border-[#c8a0d6]/40"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-sans font-semibold uppercase tracking-widest text-on-surface-variant block">
                        Your firm&apos;s approximate monthly revenue
                      </label>
                      <select
                        required
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value as RevenueOpt)}
                        className="mt-2 w-full bg-background/40 border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface outline-none focus:border-[#c8a0d6]/40 appearance-none cursor-pointer bg-[length:16px] bg-[right_14px_center] bg-no-repeat"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23998d97' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E")`,
                        }}
                      >
                        <option value="">Select range</option>
                        <option value="under20">Under $20k/month</option>
                        <option value="20to50">$20k to $50k/month</option>
                        <option value="50to100">$50k to $100k/month</option>
                        <option value="100to200">$100k to $200k/month</option>
                        <option value="over200">Over $200k/month</option>
                      </select>
                      {showUnder20Note ? (
                        <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">
                          NovaSphere is best suited for firms at $20k+/month. You can still apply. We&apos;ll let you know
                          if it&apos;s a fit.
                        </p>
                      ) : null}
                    </div>

                    <fieldset className="space-y-3">
                      <legend className="text-xs font-sans font-semibold uppercase tracking-widest text-on-surface-variant mb-3">
                        Your primary practice area(s)
                      </legend>
                      <div className="space-y-2">
                        {(
                          [
                            { id: 'pi', label: 'Personal Injury', checked: practicePi, onChange: setPracticePi },
                            { id: 'imm', label: 'Immigration', checked: practiceImm, onChange: setPracticeImm },
                          ] as const
                        ).map(({ id, label, checked, onChange }) => (
                          <label
                            key={id}
                            className="flex items-center gap-3 cursor-pointer rounded-lg border border-outline-variant/30 px-4 py-3 bg-background/25 hover:bg-background/35 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => onChange(e.target.checked)}
                              className="h-4 w-4 rounded border-outline-variant accent-primary shrink-0"
                            />
                            <span className="text-sm text-on-surface">{label}</span>
                          </label>
                        ))}
                        <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-outline-variant/30 px-4 py-3 bg-background/25 hover:bg-background/35 transition-colors">
                          <input
                            type="checkbox"
                            checked={bothPracticeChecked}
                            onChange={(e) => handleBothPractice(e.target.checked)}
                            className="h-4 w-4 rounded border-outline-variant accent-primary shrink-0"
                          />
                          <span className="text-sm text-on-surface">Both</span>
                        </label>
                      </div>
                    </fieldset>

                    <div>
                      <label className="text-xs font-sans font-semibold uppercase tracking-widest text-on-surface-variant block">
                        How many people handle intake at your firm? <span className="normal-case font-normal">(optional)</span>
                      </label>
                      <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="mt-2 w-full bg-background/40 border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface outline-none focus:border-[#c8a0d6]/40 appearance-none cursor-pointer bg-[length:16px] bg-[right_14px_center] bg-no-repeat"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23998d97' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E")`,
                        }}
                      >
                        <option value="">Prefer not to say</option>
                        <option value="me">Just me</option>
                        <option value="2to3">2 to 3 people</option>
                        <option value="4to10">4 to 10 people</option>
                        <option value="10+">10+</option>
                      </select>
                    </div>
                  </>
                ) : null}

                {!disqualifiedNoFirm ? (
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="lp-pill-cta bg-primary text-on-primary text-xs font-sans font-semibold uppercase tracking-widest px-8 py-4 hover:bg-primary/90 transition-all duration-300 w-full border border-white/10 disabled:opacity-40 disabled:pointer-events-none disabled:hover:shadow-none disabled:hover:scale-100"
                  >
                    Submit My Application →
                  </button>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: TESTIMONIALS */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-8 bg-background border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tighter text-on-surface mb-10 sm:mb-14 text-center"
            data-lp-reveal
            style={{ ['--lp-del' as string]: '0ms' }}
          >
            Firms That Applied. Results They Got.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                data-lp-reveal
                style={{ ['--lp-del' as string]: `${idx * 100}ms` }}
                className="lp-testimonial-card bg-surface-container-high/30 border border-outline-variant/30 backdrop-blur-xl rounded-lg p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary text-on-primary font-sans font-bold text-sm shrink-0">
                    {testimonial.initials}
                  </div>
                  <p className="text-sm text-on-surface-variant font-sans leading-snug">
                    <span className="font-bold text-on-surface">{testimonial.title}</span>
                    <span className="text-on-surface-variant"> · </span>
                    <span>{testimonial.firmLine}</span>
                  </p>
                </div>

                <p
                  className="text-sm tracking-wider mb-4 lp-onpage-accent-text font-semibold"
                  aria-hidden
                >
                  ★★★★★
                </p>

                <p className="text-base text-on-surface leading-relaxed italic">&quot;{testimonial.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CASE STUDIES */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-8 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tighter text-on-surface mb-10 sm:mb-14 text-center"
            data-lp-reveal
            style={{ ['--lp-del' as string]: '0ms' }}
          >
            What Changes in 14 Days
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                eyebrow: 'PI Firm · 6 attorneys · Florida',
                stat: '47 hours',
                label: 'Saved per month on intake triage',
                detail: 'From 3 hour morning reviews to 20 minute partner briefs.',
              },
              {
                eyebrow: 'Immigration Group · 4 attorneys · New York',
                stat: '3.2×',
                label: 'More consultations booked per week',
                detail: 'Same team, same hours. Qualified pipeline tripled in 30 days.',
              },
              {
                eyebrow: 'PI Practice · Solo to 3 attorney · California',
                stat: '$4,100',
                label: 'Recovered monthly in coordinator time',
                detail: 'One coordinator now handles what two used to do.',
              },
            ].map((card, idx) => (
              <div
                key={idx}
                data-lp-reveal
                style={{ ['--lp-del' as string]: `${idx * 100}ms` }}
                className="premium-card bg-surface-container-high/30 border border-outline-variant/30 backdrop-blur-xl rounded-lg p-6 sm:p-8 flex flex-col"
              >
                <p className="text-xs font-sans uppercase tracking-widest text-outline mb-6">{card.eyebrow}</p>
                <p className="text-3xl sm:text-4xl font-serif text-on-surface mb-2 tabular-nums">{card.stat}</p>
                <p className="text-sm font-sans font-semibold text-on-surface mb-4">{card.label}</p>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed mt-auto">{card.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA REPEAT */}
      <section className="w-full py-16 sm:py-24 px-6 sm:px-8 bg-background border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tighter text-on-surface mb-4">
            Ready to install a system that works while you sleep?
          </h2>
          <p className="text-on-surface-variant font-light mb-8 text-base sm:text-lg">
            Applications take 2 minutes. If it&apos;s a fit, we&apos;ll do the rest.
          </p>
          <button
            type="button"
            onClick={scrollToApplication}
            className="lp-pill-cta bg-primary text-on-primary text-xs font-sans font-semibold uppercase tracking-widest px-8 py-4 hover:bg-primary/90 transition-all duration-300 border border-white/10"
          >
            Apply Now →
          </button>
          <p className="text-[13px] text-on-surface-variant mt-6 opacity-60">
            ✓ No retainer · ✓ 14 day install · ✓ Pay after results
          </p>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-8 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tighter text-on-surface mb-4 text-center"
            data-lp-reveal
            style={{ ['--lp-del' as string]: '0ms' }}
          >
            Questions before you apply
          </h2>
          <p
            className="text-center text-on-surface-variant font-light mb-10 sm:mb-12 text-sm sm:text-base"
            data-lp-reveal
            style={{ ['--lp-del' as string]: '80ms' }}
          >
            Straight answers below. Ready to move? Apply once and we&apos;ll map intake to your firm on the audit call.
          </p>
          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const open = openFaq === i
              return (
                <div
                  key={item.q}
                  data-lp-reveal
                  style={{ ['--lp-del' as string]: `${i * 80}ms` }}
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
      </section>

      {/* SECTION 8: TEAM */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-8 bg-background border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tighter text-on-surface mb-4 text-center">
            The team behind the system
          </h2>
          <p className="text-center text-on-surface-variant font-light mb-12 sm:mb-14 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We come from legal operations, AI automation, and intake consulting, not generic SaaS.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Morgan Ellis',
                role: 'Founder and Systems Lead',
                description:
                  '10+ years in legal operations and workflow automation. Built intake systems for 50+ firms before NovaSphere.',
              },
              {
                name: 'Jordan Kim',
                role: 'AI and Intake Architect',
                description:
                  'Designs the qualification logic and brief structure for PI and immigration workflows specifically.',
              },
              {
                name: 'Riley Nguyen',
                role: 'Client Success & Onboarding',
                description:
                  'Runs every 14 day install personally. Your firm is live, or we stay until it is.',
              },
            ].map((member, idx) => (
              <div
                key={member.name}
                data-lp-reveal
                style={{ ['--lp-del' as string]: `${idx * 100}ms` }}
                className="premium-card bg-surface-container-high/30 border border-outline-variant/30 backdrop-blur-xl rounded-lg p-6 sm:p-8"
              >
                <p className="text-xl sm:text-2xl font-bold text-on-surface mb-2">{member.name}</p>
                <p className="text-sm font-sans font-semibold uppercase tracking-wider lp-onpage-accent-text mb-4">
                  {member.role}
                </p>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-10">
          <p className="text-xs text-on-surface-variant text-center">
            © 2026 NovaSphere. All rights reserved.
          </p>
        </div>
      </footer>

      <div className="lp-sticky-demo-bar" role="region" aria-label="Apply to NovaSphere">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
          <div className="flex justify-center sm:justify-start shrink-0">
            <img src="/novawhite.png" alt="NovaSphere" className="h-6 sm:h-7 w-auto" />
          </div>
          <div className="flex-1 flex items-center justify-center text-center px-2">
            <p className="text-sm text-on-surface-variant font-light">
              Spots are limited. We onboard 4 new firms per month.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToApplication}
            className="lp-pill-cta bg-secondary text-background text-xs font-sans font-semibold uppercase tracking-widest px-8 py-3.5 hover:bg-white shrink-0 w-full sm:w-auto lp-bottom-bar-attention"
          >
            Apply Now →
          </button>
        </div>
      </div>
    </main>
  )
}
