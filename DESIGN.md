---
name: Architectural Noir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c3ce'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#998d97'
  outline-variant: '#4d444d'
  surface-tint: '#e8b5f1'
  primary: '#e8b5f1'
  on-primary: '#472051'
  primary-container: '#371142'
  on-primary-container: '#a779b1'
  inverse-primary: '#794f83'
  secondary: '#c8c6c1'
  on-secondary: '#30312d'
  secondary-container: '#474743'
  on-secondary-container: '#b6b5b0'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#222222'
  on-tertiary-container: '#8a8989'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#fbd7ff'
  primary-fixed-dim: '#e8b5f1'
  on-primary-fixed: '#30093b'
  on-primary-fixed-variant: '#5f376a'
  secondary-fixed: '#e4e2dd'
  secondary-fixed-dim: '#c8c6c1'
  on-secondary-fixed: '#1b1c19'
  on-secondary-fixed-variant: '#474743'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Noto Serif
    fontSize: 72px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.15em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-page: 64px
  section-gap: 128px
---

## Brand & Style
The brand personality for this design system is authoritative, avant-garde, and meticulously curated. It targets high-stakes legal professionals who value precision and discretion. The UI should evoke a sense of "digital sanctuary"—a calm, high-end environment that transforms complex legal intake into a structured, effortless experience.

The design style is a hybrid of **Minimalism** and **Glassmorphism**, leaning heavily into an "Editorial Luxe" aesthetic. It utilizes generous negative space to command attention and employs translucent surfaces to create a sense of depth without clutter. The visual language is architectural, favoring sharp lines and intentional layering over organic softness.

## Colors
The palette is rooted in a "Deep Plum Noir" foundation. The primary **Deep Plum (#371142)** serves as the sophisticated core, used for high-impact brand moments and subtle radial gradients. The secondary color is a **Muted Champagne/Silver (#D9D7D2)**, providing a cool, metallic contrast that replaces traditional gold for a more contemporary, "new luxury" feel.

The interface is natively dark. Use **Black (#0F0F0F)** for the primary canvas to ensure the Deep Plum and Glassmorphism effects have maximum resonance. Interaction states should utilize the soft metallic silver to signify value and precision.

## Typography
The typography strategy relies on a high-contrast pairing between the classical and the utilitarian. **Noto Serif** is reserved for headlines and editorial pull-outs, conveying history and legal authority. It should be typeset with tight tracking for a modern, compact look.

**Inter** handles all functional UI and body text. To achieve the "wide-tracked" luxe feel, body text and labels should use increased letter spacing (0.01em to 0.15em) and light weights (300/400). This creates an airy, legible environment that balances the density of legal content.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy with an editorial 12-column structure. Use significant vertical margins (Section Gaps) to separate distinct phases of the intake process. Elements should often be offset or asymmetrical to avoid a standard "SaaS dashboard" look.

Prioritize "Generous Whitespace": no element should feel crowded. Use the 64px page margins to frame the content, making the software feel like a high-end publication. Gutters are wide (32px) to allow the architectural shapes of the UI components to breathe.

## Elevation & Depth
Depth is communicated through **Glassmorphism** and tonal layering rather than traditional shadows. 

1.  **Base Surface:** Solid #0F0F0F.
2.  **Floating Elements (Cards/Modals):** Use a semi-transparent Deep Plum or Dark Grey background with a high `backdrop-filter: blur(20px)`.
3.  **Borders:** Apply a 1px "inner glow" border to glass elements using a low-opacity version of the Champagne/Silver color to simulate the edge of a glass pane.
4.  **Gradients:** Use subtle, large-scale radial gradients of #371142 in the background to create a sense of atmospheric light rather than distinct shadows.

## Shapes
This design system utilizes a sharp, architectural shape language. A minimal **ROUND_ONE** (4px) or **ROUND_TWO** (8px) radius is applied to maintain a sense of precision and structure. Containers and input fields should feel like blocks of cut stone or glass. Avoid large radii or pill-shaped buttons; even primary actions should remain rectangular with only the slightest softening at the corners to maintain the "top-class" professional aesthetic.

## Components
-   **Buttons:** Primary buttons use a solid Champagne/Silver fill with black text, no icons, and wide tracking. Secondary buttons are ghost-style with a 1px silver border.
-   **Input Fields:** Minimalist design—bottom border only or a very subtle glass-filled container. Focus states should transition the border from a muted grey to a vibrant Deep Plum glow.
-   **Glass Cards:** Used for intake modules. High blur (20px-40px) with a subtle silver rim. Content inside should be strictly aligned to a sub-grid.
-   **Progress Indicators:** Use thin, hairline-width bars in Silver against a Plum background. Avoid "bubbly" steppers; use Noto Serif numerals.
-   **Intake Lists:** High-contrast rows with significant vertical padding (24px+). Use the `label-caps` style for metadata to create a structured, organized feel.
-   **Data Visualizations:** Use monochromatic silver and plum tones. Line weights should be extremely thin (1px or 0.5px) to maintain the architectural precision.