'use client'

import { useState } from 'react'

export default function Home() {
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null)

  return (
    <main className="w-full overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/40 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="text-xl font-serif tracking-tighter text-on-surface">Lumina Axis</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#product" className="text-sm font-serif uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors">
              Overview
            </a>
            <a href="#solution" className="text-sm font-serif uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors">
              Process
            </a>
            <a href="#team" className="text-sm font-serif uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors">
              Studio
            </a>
            <a href="#contact" className="text-sm font-serif uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors">
              Connect
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-xs font-sans font-semibold uppercase tracking-widest px-4 py-2 border border-outline-variant text-on-surface-variant hover:text-on-surface transition-colors">
              View Reel
            </button>
            <button className="bg-secondary text-background text-xs font-sans font-semibold uppercase tracking-widest px-6 py-3 hover:bg-white transition-colors duration-300">
              Primary Action
            </button>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-32 px-8 bg-radial-plum overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img alt="Hero Background" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjOtxx28oSjzWI9OpQoZcd2ZKkU-xWvxSXp8nHrsKyo2OuhWFs7N5Wkfdw0laFCdIgzOzFdCB2bE-MB99VHc8Aj8eKwNkMwYtPTNgfwwYcs8l-hC4iTuUz18jIxvjr-VNVBaNmQVXQnoV64pCeOWm0v-qhJ8nMzO1VR9gyoisAyXHNPvDSw7403lOQSkBxgAXLL3AVpJLwxqSDuEyiQ-gXYDd5C9EL3zPvKVV8PWYAjbtGbNaVkfvQ2hFPUen3uPrd-eUBUh4J3Aq6" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-serif tracking-tighter text-on-surface mb-8 leading-tight animate-hero-reveal">
            A Bold Headline for a Premium Platform
          </h1>
          
          <p className="text-xl text-on-surface-variant mb-12 max-w-3xl mx-auto leading-relaxed tracking-wide font-light">
            Placeholder copy describing a clear value statement with calm, confident tone.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="bg-secondary text-background text-xs font-sans font-semibold uppercase tracking-widest px-8 py-4 hover:bg-white transition-all duration-300 w-full sm:w-auto">
              Primary Action
            </button>
            <button className="bg-surface-container-high/40 text-on-surface text-xs font-sans font-semibold uppercase tracking-widest px-8 py-4 border border-outline-variant/40 hover:bg-surface-container-high/60 transition-all duration-300 backdrop-blur-xl w-full sm:w-auto flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Secondary Action
            </button>
          </div>

          {/* Video Placeholder */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="aspect-video bg-surface-container-high/30 border border-outline-variant/40 backdrop-blur-xl rounded-lg overflow-hidden group cursor-pointer hover:bg-surface-container-high/40 transition-colors duration-300 premium-card">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-lg border border-outline-variant/40 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500 bg-surface-container/40">
                  <svg className="w-8 h-8 text-on-surface" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-6 left-6">
                <p className="text-xs font-sans font-semibold uppercase tracking-widest text-outline mb-2">Preview</p>
                <p className="text-sm font-serif italic text-on-surface-variant">Short Showcase Segment</p>
              </div>
            </div>
          </div>

          {/* Trust Line */}
          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-outline">
            Trusted by teams who value clarity, focus, and precision
          </p>
        </div>
      </section>

      {/* SECTION 2: PROBLEM + TEAM + TESTIMONIALS */}
      <section id="product" className="w-full py-32 px-8 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto">
          {/* Problem Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
            <div className="lg:col-span-5">
              <h2 className="text-5xl md:text-6xl font-serif tracking-tighter text-on-surface mb-8 leading-tight">
                A Clear Problem Statement Lives Right Here
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed tracking-wide font-light mb-6">
                Placeholder supporting text that introduces the challenge and stakes.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: 'folder_off',
                  title: 'Misaligned requests',
                  desc: 'Placeholder line describing wasted effort and low relevance.',
                },
                {
                  icon: 'person_cancel',
                  title: 'Low-fit audiences',
                  desc: 'Placeholder line describing mismatched audience and scope.',
                },
                {
                  icon: 'data_alert',
                  title: 'Missing context',
                  desc: 'Placeholder line describing gaps that slow progress.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-8 flex flex-col gap-4 hover:bg-surface-container-low/60 transition-colors duration-300 premium-card"
                >
                  <span className="material-symbols-outlined text-outline text-3xl">{item.icon}</span>
                  <h3 className="text-xl font-serif text-on-surface mb-2">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="py-16 border-t border-outline-variant/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
              <div className="lg:col-span-5">
                <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-6">Built By Specialists</h3>
                <h2 className="text-4xl md:text-5xl font-serif tracking-tighter text-on-surface mb-8">
                  Built by a Team That Values Precision
                </h2>
                <p className="text-base text-on-surface-variant leading-relaxed tracking-wide font-light">
                  Placeholder paragraph describing team background and design philosophy in a calm, editorial voice.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Strategy / Research', desc: 'Placeholder line describing thoughtful direction' },
                  { title: 'Design / Systems', desc: 'Placeholder line describing structured craft' },
                  { title: 'Delivery / Support', desc: 'Placeholder line describing steady execution' },
                ].map((dept, idx) => (
                  <div
                    key={idx}
                    className="bg-surface-container-low/40 border border-outline-variant/30 backdrop-blur-xl rounded-lg p-6 hover:bg-surface-container-low/60 transition-colors duration-300 premium-card"
                  >
                    <h4 className="text-sm font-serif text-on-surface mb-3">{dept.title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{dept.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="py-16 border-t border-outline-variant/20">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tighter text-on-surface mb-12 text-center">
              What Clients Are Saying
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  text: 'Placeholder quote that highlights a measurable improvement and clear impact.',
                  author: 'Director, Industry Team',
                },
                {
                  text: 'Placeholder quote emphasizing clarity, speed, and reduced complexity.',
                  author: 'Operations Lead, Services Group',
                },
                {
                  text: 'Placeholder quote focused on quality improvements and stronger outcomes.',
                  author: 'Senior Manager, Client Success',
                },
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-high/30 border border-outline-variant/30 backdrop-blur-xl rounded-lg p-8 hover:bg-surface-container-high/50 transition-all duration-300 cursor-pointer premium-card"
                  onMouseEnter={() => setHoveredTestimonial(idx)}
                  onMouseLeave={() => setHoveredTestimonial(null)}
                >
                  <p className="text-base text-on-surface leading-relaxed mb-6 italic">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <p className="text-sm text-on-surface-variant font-sans">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SOLUTION + KEY BENEFITS */}
      <section id="solution" className="w-full py-32 px-8 bg-background border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            <div className="lg:col-span-6">
              <div className="aspect-video bg-surface-container-high/30 border border-outline-variant/30 backdrop-blur-xl rounded-lg overflow-hidden group cursor-pointer hover:bg-surface-container-high/50 transition-colors duration-300 premium-card">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-lg border border-outline-variant/40 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500 bg-surface-container/40">
                    <svg className="w-6 h-6 text-on-surface" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="text-xs font-sans font-semibold uppercase tracking-widest text-outline-variant">Showcase Walkthrough</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:pl-12">
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-6">The Framework</p>
              <h2 className="text-5xl md:text-6xl font-serif tracking-tighter text-on-surface mb-8 leading-tight">
                A Structured System for Confident Decisions
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed tracking-wide font-light mb-8">
                Placeholder description of the platform approach, emphasizing clarity and consistency.
              </p>

              {/* Key Benefits */}
              <div className="space-y-4">
                {[
                  { icon: 'check_circle', text: 'Automated triage and routing' },
                  { icon: 'check_circle', text: 'Unified intake overview' },
                  { icon: 'check_circle', text: 'Streamlined handoffs' },
                  { icon: 'check_circle', text: 'Live status updates' },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary text-xl">{benefit.icon}</span>
                    <p className="text-base text-on-surface font-light">{benefit.text}</p>
                  </div>
                ))}
              </div>

              <button className="mt-10 bg-secondary text-background text-xs font-sans font-semibold uppercase tracking-widest px-8 py-4 hover:bg-white transition-all duration-300">
                Request a Walkthrough
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CALENDLY / CTA */}
      <section id="contact" className="w-full py-32 px-8 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-serif tracking-tighter text-on-surface mb-6">
            A Clear Call to Action Lives Here
          </h2>
          
          <p className="text-xl text-on-surface-variant mb-8 leading-relaxed tracking-wide font-light">
            In a short session, we will cover:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              'Where the workflow can be clarified',
              'How to reduce friction in key steps',
              'What a better process looks like',
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-container-low/40 border border-outline-variant/30 backdrop-blur-xl rounded-lg p-6 hover:bg-surface-container-low/60 transition-colors duration-300 premium-card"
              >
                <p className="text-base text-on-surface leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Calendly Embed Placeholder */}
          <div className="bg-surface-container-high/30 border border-outline-variant/30 backdrop-blur-xl rounded-lg p-12 mb-8">
            <div className="bg-surface-container-high/40 rounded border border-outline-variant/40 py-12 text-center">
              <p className="text-on-surface-variant font-light mb-2">Scheduling widget embedded here</p>
              <p className="text-xs font-sans uppercase tracking-widest text-outline-variant">
                Replace with your preferred scheduling embed
              </p>
            </div>
          </div>

          <button className="bg-primary text-on-primary text-xs font-sans font-semibold uppercase tracking-widest px-8 py-4 hover:bg-primary/90 transition-all duration-300">
            Schedule a Session
          </button>
        </div>
      </section>

      {/* SECTION 5: FOOTER */}
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-lg font-serif tracking-tighter text-on-surface mb-4">Lumina Axis</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Placeholder description of the brand and its clear point of view.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-6">Explore</h4>
              <ul className="space-y-3">
                {['Overview', 'Process', 'Details', 'Updates'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-primary mb-6">Resources</h4>
              <ul className="space-y-3">
                {['Documentation', 'Guides', 'Contact', 'LinkedIn'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-on-surface-variant hover:text-on-surface transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-outline-variant/20 pt-8">
            <p className="text-xs text-on-surface-variant text-center">
              © 2024 Lumina Axis. All rights reserved. Placeholder legal line here.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
