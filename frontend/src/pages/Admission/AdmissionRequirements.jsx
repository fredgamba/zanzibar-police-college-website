import React, { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Users,
  Calendar,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Clock,
  Target,
  Shield,
  Radio,
  Car,
  Award,
} from "lucide-react";

/* ─────────────────────────────────────────────
   ALL STYLES – injected as a <style> tag so
   no separate .css file is needed
───────────────────────────────────────────── */
const css = `
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap");

:root {
  --navy:        #0B1E3D;
  --navy-mid:    #152d57;
  --black:       #0D0D0D;
  --steel:       #4B5563;
  --mid-grey:    #9CA3AF;
  --light-grey:  #E5E7EB;
  --off-white:   #F3F4F6;
  --white:       #FFFFFF;
  --gold:        #C9A84C;
  --gold-light:  #F0D080;
  --gold-dark:   #9A7730;
  --primary:        #0B1E3D;
  --primary-light:  #3b82f6;
  --dark:           #0D0D0D;
  --gray:           #4B5563;
  --gray-light:     #E5E7EB;
  --gradient-1: linear-gradient(135deg, #0B1E3D 0%, #1a3a6e 100%);
  --gradient-2: linear-gradient(135deg, #0D0D0D 0%, #0B1E3D 100%);
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.14);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.22);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

.admission-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f0f2f5 0%, #ffffff 100%);
  font-family: "Inter", sans-serif;
  color: var(--black);
  padding-bottom: 60px;
}

/* ── HERO ── */
.hero-section {
  position: relative;
  min-height: 78vh;
  display: flex;
  padding-bottom: 6rem
  align-items: center;
  overflow: hidden;
  background: var(--navy);
}
.hero-bg-split {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, var(--navy) 0%, var(--navy) 58%, #122444 58%, #122444 100%);
  z-index: 0;
}
.hero-dot-grid {
  position: absolute;
  inset: 0;
  z-index: 1;
  background-image: radial-gradient(circle, rgba(201,168,76,0.12) 1px, transparent 1px);
  background-size: 28px 28px;
}
.hero-gold-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 5px;
  background: linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light), var(--gold), var(--gold-dark));
  z-index: 10;
}
.hero-gold-bar-bottom { top: auto; bottom: 0; height: 3px; }

.hero-inner {
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 100px 48px 80px;
  display: flex;
  align-items: center;
  gap: 60px;
}
.hero-left {
  flex: 1;
  min-width: 0;
  animation: fadeInLeft 0.9s cubic-bezier(0.22,1,0.36,1) both;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(201,168,76,0.15);
  border: 1px solid rgba(201,168,76,0.45);
  color: var(--gold-light);
  padding: 9px 20px;
  border-radius: 4px;
  font-family: "Oswald", sans-serif;
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 36px;
}
.hero-title { display: flex; flex-direction: column; margin-bottom: 24px; }
.hero-title-main {
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: clamp(56px, 7vw, 88px);
  line-height: 1;
  letter-spacing: -1px;
  color: var(--white);
  text-transform: uppercase;
}
.hero-title-accent {
  font-family: "Oswald", sans-serif;
  font-weight: 400;
  font-size: clamp(42px, 5.5vw, 68px);
  line-height: 1.05;
  letter-spacing: 6px;
  text-transform: uppercase;
  background: linear-gradient(90deg, var(--gold-dark) 0%, var(--gold-light) 50%, var(--gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-divider { display: flex; align-items: center; gap: 12px; margin: 24px 0 28px; }
.divider-line {
  flex: 1; max-width: 80px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.divider-star { color: var(--gold); font-size: 16px; line-height: 1; }
.hero-subtitle {
  font-family: "EB Garamond", serif;
  font-size: clamp(17px, 1.8vw, 21px);
  line-height: 1.65;
  color: var(--light-grey);
  max-width: 520px;
  margin-bottom: 44px;
}
.hero-cta-row { display: flex; gap: 16px; flex-wrap: wrap; }
.hero-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light));
  color: var(--black);
  border: none;
  ali
  padding: 16px 36px;
  border-radius: 4px;
  font-family: "Oswald", sans-serif;
  font-size: 15px; font-weight: 600; letter-spacing: 1.5px;
  text-transform: uppercase; cursor: pointer;
  box-shadow: 0 6px 24px rgba(201,168,76,0.35);
  transition: transform 0.25s, box-shadow 0.25s;
}
.hero-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(201,168,76,0.5); }
.hero-btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: var(--light-grey);
  border: 1px solid rgba(229,231,235,0.35);
  padding: 16px 32px; border-radius: 4px;
  font-family: "Oswald", sans-serif;
  font-size: 15px; font-weight: 400; letter-spacing: 1.5px;
  text-transform: uppercase; cursor: pointer;
  transition: background 0.25s, border-color 0.25s, color 0.25s;
}
.hero-btn-ghost:hover { background: rgba(255,255,255,0.08); border-color: var(--gold); color: var(--gold-light); }

.hero-right {
  flex-shrink: 0; position: relative;
  width: 320px; height: 320px;
  display: flex; align-items: center; justify-content: center;
  animation: fadeInRight 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both;
}
.emblem-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(201,168,76,0.3); }
.emblem-ring-outer  { width: 300px; height: 300px; animation: spinSlow 30s linear infinite; border-style: dashed; border-color: rgba(201,168,76,0.2); }
.emblem-ring-middle { width: 220px; height: 220px; border-color: rgba(201,168,76,0.4); animation: spinSlow 20s linear infinite reverse; }
.emblem-core {
  width: 140px; height: 140px;
  background: linear-gradient(145deg, var(--navy-mid), #0f2040);
  border: 2px solid var(--gold); border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  color: var(--gold-light);
  box-shadow: 0 0 0 6px rgba(201,168,76,0.08), 0 0 40px rgba(201,168,76,0.18), 0 12px 40px rgba(0,0,0,0.22);
  z-index: 2;
}
.emblem-core svg { opacity: 0.9; }
.emblem-core span { font-family: "Oswald", sans-serif; font-size: 20px; font-weight: 700; letter-spacing: 4px; color: var(--gold); }

.stat-chip {
  position: absolute;
  display: flex; align-items: center; gap: 8px;
  background: rgba(11,30,61,0.85);
  border: 1px solid rgba(201,168,76,0.4);
  backdrop-filter: blur(12px);
  color: var(--gold-light);
  padding: 10px 18px; border-radius: 40px;
  font-family: "Inter", sans-serif; font-size: 12px; font-weight: 600;
  letter-spacing: 0.5px; white-space: nowrap; z-index: 3;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}
.stat-chip svg { color: var(--gold); flex-shrink: 0; }
.stat-chip-top    { top: -16px;    right: -24px; animation: floatUp 3s ease-in-out infinite; }
.stat-chip-bottom { bottom: -16px; left: -24px;  animation: floatUp 3s ease-in-out 1.5s infinite; }

/* ── INFO BANNER ── */
.info-banner {
  max-width: 1200px;
  position: relative; z-index: 3;
  display: grid;
  margin: 2rem auto 64px;
  grid-template-columns: 1fr auto 1fr;
  align-items: stretch;
  background: var(--white);
  border-radius: 20px;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  border-top: 4px solid var(--gold);
  animation: fadeInUp 0.9s ease-out 0.7s backwards;
}
.info-banner-left {
  display: flex; align-items: flex-start; gap: 20px;
  padding: 40px 44px;
  background: linear-gradient(135deg, #f6f8fb 0%, #edf0f5 100%);
}
.info-banner-right {
  display: flex; align-items: flex-start; gap: 20px;
  padding: 40px 44px;
  background: linear-gradient(135deg, #fdfbf5 0%, #f9f4e4 100%);
}
.info-banner-divider {
  width: 1px;
  background: linear-gradient(to bottom, transparent, var(--gold) 30%, var(--gold) 70%, transparent);
  margin: 24px 0; flex-shrink: 0;
}
.info-banner-icon {
  flex-shrink: 0; width: 54px; height: 54px;
  background: var(--navy); border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: var(--gold);
  box-shadow: 0 6px 20px rgba(11,30,61,0.18);
}
.info-banner-icon--gold {
  background: linear-gradient(135deg, var(--gold-dark), var(--gold));
  color: var(--black);
}
.info-banner-title {
  font-family: "Oswald", sans-serif;
  font-size: 18px; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--navy); margin-bottom: 10px;
}
.info-banner-title--gold {
  background: linear-gradient(90deg, var(--gold-dark), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.info-banner-body { font-size: 15px; line-height: 1.65; color: var(--steel); }

/* ── PROGRAMS SECTION ── */
.programs-section { max-width: 1400px; margin: 0 auto 80px; padding: 0 24px; }
.section-header {
  text-align: center; margin-bottom: 60px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
.section-header svg { color: var(--navy); }
.section-header h2 {
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 4vw, 36px); font-weight: 700;
  color: var(--navy); letter-spacing: 3px; text-transform: uppercase;
}
.section-header p { font-size: 16px; color: var(--steel); max-width: 700px; line-height: 1.6; }

.carousel-container {
  position: relative; width: 100%; height: 600px;
  display: flex; align-items: center; justify-content: center;
  overflow: visible; margin: 60px 0;
}
.carousel-track {
  position: relative; width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
}
.carousel-card {
  position: absolute; width: 420px; max-width: 90vw;
  background: var(--white); border-radius: 20px; padding: 48px 40px;
  box-shadow: var(--shadow-md); border: 1px solid var(--light-grey);
  transition: all 0.6s cubic-bezier(0.4,0,0.2,1); cursor: pointer;
}
.carousel-card-hidden { opacity: 0; transform: translateX(0) scale(0.8); pointer-events: none; z-index: 1; }
.carousel-card-prev   { opacity: 0.4; transform: translateX(-450px) scale(0.85); z-index: 2; filter: blur(2px); }
.carousel-card-active { opacity: 1; transform: translateX(0) scale(1); z-index: 3; box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
.carousel-card-next   { opacity: 0.4; transform: translateX(450px) scale(0.85); z-index: 2; filter: blur(2px); }
.carousel-card:hover.carousel-card-active { transform: translateX(0) scale(1.02); box-shadow: 0 24px 70px rgba(0,0,0,0.2); }

.card-accent {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 80px; height: 4px; background: var(--card-color); border-radius: 0 0 4px 4px;
}
.card-icon-large {
  width: 80px; height: 80px; background: var(--card-color); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--white); margin: 0 auto 24px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
}
.card-icon-large svg { width: 40px; height: 40px; }
.card-tag {
  display: inline-block; background: rgba(11,30,61,0.08); color: var(--navy);
  padding: 8px 20px; border-radius: 20px; font-size: 12px; font-weight: 700;
  letter-spacing: 1px; margin-bottom: 20px;
}
.card-title {
  font-family: "Oswald", sans-serif; font-size: 22px; font-weight: 600;
  color: var(--navy); margin-bottom: 16px; text-align: center; line-height: 1.3;
}
.card-description {
  font-size: 15px; line-height: 1.6; color: var(--steel);
  text-align: center; margin-bottom: 28px; min-height: 48px;
}
.card-meta-inline { display: flex; gap: 12px; justify-content: center; margin-bottom: 32px; flex-wrap: wrap; }
.meta-item {
  display: flex; align-items: center; gap: 6px; font-size: 13px;
  color: var(--steel); background: var(--off-white); padding: 8px 16px;
  border-radius: 20px; font-weight: 500;
}
.meta-item svg { width: 16px; height: 16px; }
.card-actions { display: flex; flex-direction: column; gap: 12px; }

.btn-apply {
  width: 100%; background: var(--navy); color: var(--gold); border: none;
  padding: 16px 24px; border-radius: 10px;
  font-family: "Oswald", sans-serif; font-size: 14px; font-weight: 600;
  letter-spacing: 1px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all 0.3s ease; text-transform: uppercase;
}
.btn-apply:hover { background: var(--card-color); color: var(--white); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }



.carousel-nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 52px; height: 52px; background: var(--navy);
  border: 1px solid rgba(201,168,76,0.3); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--gold); cursor: pointer; z-index: 4;
  transition: all 0.3s ease; box-shadow: var(--shadow-md);
}
.carousel-nav:hover { background: var(--gold); color: var(--navy); transform: translateY(-50%) scale(1.1); }
.carousel-nav-prev { left: -28px; }
.carousel-nav-next { right: -28px; }

.carousel-pagination {
  position: absolute; bottom: -50px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 12px; z-index: 4;
}
.pagination-dot {
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--light-grey); border: none; cursor: pointer;
  transition: all 0.3s ease; padding: 0;
}
.pagination-dot:hover { background: var(--mid-grey); transform: scale(1.2); }
.pagination-dot.active { background: var(--gold); width: 40px; border-radius: 6px; }

/* ── TIMELINE ── */
.timeline-section { max-width: 1400px; margin: 0 auto 80px; padding: 0 24px; }
.timeline-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0; align-items: center;
  background: var(--white); border-radius: 20px; padding: 40px; box-shadow: var(--shadow-md);
}
.timeline-item { text-align: center; padding: 20px; animation: fadeInUp 1s ease-out backwards; }
.timeline-item:nth-child(1) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.4s; }
.timeline-item:nth-child(5) { animation-delay: 0.6s; }
.timeline-item:nth-child(7) { animation-delay: 0.8s; }
.timeline-number {
  width: 60px; height: 60px; background: var(--gradient-1);
  border: 2px solid var(--gold); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: "Oswald", sans-serif; font-size: 22px; font-weight: 700;
  color: var(--gold); margin: 0 auto 16px;
  box-shadow: 0 8px 24px rgba(11,30,61,0.25);
}
.timeline-content h4 { font-family: "Oswald", sans-serif; font-size: 17px; font-weight: 600; color: var(--navy); margin-bottom: 6px; }
.timeline-content p  { font-size: 13px; font-weight: 700; color: var(--gold-dark); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
.timeline-detail { font-size: 13px; color: var(--steel); display: block; }
.timeline-connector {
  width: 100%; height: 2px;
  background: linear-gradient(90deg, var(--light-grey) 0%, var(--gold) 50%, var(--light-grey) 100%);
  position: relative;
}
.timeline-connector::after {
  content: ""; position: absolute; right: 0; top: 50%; transform: translateY(-50%);
  width: 0; height: 0;
  border-left: 8px solid var(--gold); border-top: 6px solid transparent; border-bottom: 6px solid transparent;
}

/* ── CTA ── */
.cta-section { max-width: 1200px; margin: 80px auto 0; padding: 0 24px; }
.cta-content {
  background: var(--gradient-1); border: 1px solid rgba(201,168,76,0.25);
  border-radius: 24px; padding: 80px 40px; text-align: center;
  color: var(--white); position: relative; overflow: hidden; box-shadow: var(--shadow-lg);
}
.cta-content::before {
  content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--gold-dark), var(--gold-light), var(--gold-dark));
}
.cta-content::after {
  content: ""; position: absolute; top: -50%; right: -20%;
  width: 400px; height: 400px; background: rgba(201,168,76,0.06);
  border-radius: 50%; filter: blur(80px);
}
.cta-content h2 {
  font-family: "Oswald", sans-serif; font-size: clamp(32px, 5vw, 48px);
  font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  margin-bottom: 16px; position: relative; z-index: 1;
}
.cta-content p { font-family: "EB Garamond", serif; font-size: 20px; margin-bottom: 40px; opacity: 0.85; position: relative; z-index: 1; }
.cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }

.btn-primary, .btn-secondary {
  padding: 18px 40px; border-radius: 6px;
  font-family: "Oswald", sans-serif; font-size: 15px; font-weight: 600;
  letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; border: none;
  transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px;
}
.btn-primary {
  background: linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light));
  color: var(--black); box-shadow: 0 8px 24px rgba(201,168,76,0.35);
}
.btn-primary:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(201,168,76,0.5); }
.btn-secondary { background: transparent; color: var(--gold-light); border: 1.5px solid rgba(201,168,76,0.5); }
.btn-secondary:hover { background: rgba(201,168,76,0.1); border-color: var(--gold); transform: translateY(-4px); }

/* ── ANIMATIONS ── */
@keyframes fadeIn    { from { opacity:0 } to { opacity:1 } }
@keyframes fadeInUp  { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
@keyframes fadeInLeft  { from { opacity:0; transform:translateX(-40px) } to { opacity:1; transform:translateX(0) } }
@keyframes fadeInRight { from { opacity:0; transform:translateX(40px)  } to { opacity:1; transform:translateX(0) } }
@keyframes spinSlow  { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
@keyframes floatUp   { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .hero-inner { flex-direction: column; text-align: center; padding: 80px 32px 60px; gap: 48px; }
  .hero-left  { display: flex; flex-direction: column; align-items: center; }
  .hero-subtitle { text-align: center; margin-left: auto; margin-right: auto; }
  .hero-right { width: 240px; height: 240px; }
  .emblem-ring-outer  { width: 220px; height: 220px; }
  .emblem-ring-middle { width: 160px; height: 160px; }
  .emblem-core { width: 110px; height: 110px; }
  .carousel-container { height: 650px; }
  .carousel-card { width: 380px; }
  .carousel-card-prev { transform: translateX(-320px) scale(0.8); }
  .carousel-card-next { transform: translateX(320px) scale(0.8); }
  .timeline-grid { grid-template-columns: 1fr; gap: 32px; }
  .timeline-connector {
    width: 2px; height: 40px; margin: 0 auto;
    background: linear-gradient(180deg, var(--light-grey) 0%, var(--gold) 50%, var(--light-grey) 100%);
  }
  .timeline-connector::after {
    top: auto; bottom: 0; left: 50%; right: auto; transform: translateX(-50%);
    border-left: 6px solid transparent; border-right: 6px solid transparent;
    border-top: 8px solid var(--gold); border-bottom: none;
  }
}
@media (max-width: 900px) {
  .info-banner { grid-template-columns: 1fr; margin: -50px 20px 48px; }
  .info-banner-divider {
    width: 80%; height: 1px; margin: 0 auto;
    background: linear-gradient(to right, transparent, var(--gold) 30%, var(--gold) 70%, transparent);
  }
  .info-banner-left, .info-banner-right { padding: 32px 28px; }
}
@media (max-width: 768px) {
  .carousel-container { height: 600px; margin: 40px 0; }
  .carousel-card { width: 340px; }
  .carousel-card-prev, .carousel-card-next { opacity:0; transform:translateX(0) scale(0.8); pointer-events:none; }
  .carousel-nav { width: 44px; height: 44px; }
  .carousel-nav-prev { left: 10px; }
  .carousel-nav-next { right: 10px; }
  .cta-content { padding: 60px 24px; }
  .cta-buttons { flex-direction: column; width: 100%; }
  .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
}
@media (max-width: 480px) {
  .hero-title-main   { font-size: 46px; }
  .hero-title-accent { font-size: 34px; }
  .section-header h2 { font-size: 24px; }
  .carousel-card { width: 300px; padding: 40px 28px; }
  .card-title { font-size: 18px; }
  .card-icon-large { width: 68px; height: 68px; }
  .card-icon-large svg { width: 32px; height: 32px; }
  .stat-chip-top    { top: -30px; right: 0; }
  .stat-chip-bottom { bottom: -30px; left: 0; }
}
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const programs = [
  {
    id: 1, icon: <GraduationCap />,
    title: "Technician Certificate in Police Science (NTA Level 5)",
    duration: "1-2 Years", intake: "Annual", tag: "TC-PS",
    description: "Foundational to intermediate training in police science and law enforcement",
    color: "#1e40af",
  },
  {
    id: 2, icon: <Radio />,
    title: "Charge Room Office Course",
    duration: "3-6 Months", intake: "Multiple", tag: "CRC",
    description: "Specialized training for charge room operations and station management",
    color: "#0f766e",
  },
  {
    id: 3, icon: <Car />,
    title: "Traffic Course",
    duration: "3-6 Months", intake: "Multiple", tag: "TRF",
    description: "Professional training in traffic control, enforcement and road safety",
    color: "#dc2626",
  },
  {
    id: 4, icon: <Users />,
    title: "Auxiliary Police Courses",
    duration: "3-12 Months", intake: "As Scheduled", tag: "AUX",
    description: "Training for auxiliary/reserve police personnel and community support",
    color: "#9333ea",
  },
  {
    id: 5, icon: <Car />,
    title: "Driving Courses (Class A, B1, C, D)",
    duration: "1-6 Months", intake: "Multiple", tag: "DRV",
    description: "Certification for various classes of police and emergency vehicle driving",
    color: "#6366f1",
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const AdmissionRequirement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX   = useRef(0);

  /* Inject styles once on mount */
  useEffect(() => {
    if (!document.getElementById("admission-styles")) {
      const tag = document.createElement("style");
      tag.id = "admission-styles";
      tag.textContent = css;
      document.head.appendChild(tag);
    }
    return () => { document.getElementById("admission-styles")?.remove(); };
  }, []);

  /* Auto-play */
  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(() => setCurrentIndex(p => (p + 1) % programs.length), 5000);
    return () => clearInterval(id);
  }, [currentIndex, isAutoPlaying]);

  const nextSlide = () => setCurrentIndex(p => (p + 1) % programs.length);
  const prevSlide = () => setCurrentIndex(p => (p - 1 + programs.length) % programs.length);
  const goToSlide = i => { setCurrentIndex(i); setIsAutoPlaying(false); };

  const handleTouchStart = e => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove  = e => { touchEndX.current   = e.touches[0].clientX; };
  const handleTouchEnd   = () => {
    if (touchStartX.current - touchEndX.current >  50) { nextSlide(); setIsAutoPlaying(false); }
    if (touchStartX.current - touchEndX.current < -50) { prevSlide(); setIsAutoPlaying(false); }
  };

  const getVisibleCards = () => {
    const prev = (currentIndex - 1 + programs.length) % programs.length;
    const next = (currentIndex + 1) % programs.length;
    return [prev, currentIndex, next];
  };

  return (
    <div className="admission-container">

      {/* ── HERO ── */}
      <div className="hero-section">
        <div className="hero-bg-split" />
        <div className="hero-dot-grid" />
        <div className="hero-gold-bar" />

        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge"><Shield size={16} /><span>Zanzibar Police College</span></div>
            <h1 className="hero-title">
              <span className="hero-title-main">Admission</span>
              <span className="hero-title-accent">Requirements</span>
            </h1>
            <div className="hero-divider">
              <span className="divider-line" />
              <span className="divider-star">★</span>
              <span className="divider-line" />
            </div>
            <p className="hero-subtitle">
              Begin your journey to becoming a professional law enforcement officer
              at one of East Africa's premier training institutions.
            </p>
            <div className="hero-cta-row">
              <button className="hero-btn-primary" onClick={() => window.open('https://dpa.tpf.go.tz/apply','_blank')}>
                Apply Now <ChevronRight size={18} />
              </button>
             
            </div>
          </div>

          <div className="hero-right">
            <div className="emblem-ring emblem-ring-outer" />
            <div className="emblem-ring emblem-ring-middle" />
            <div className="emblem-core">
              <Shield size={64} strokeWidth={1.5} />
              <span>ZPC</span>
            </div>
            <div className="stat-chip stat-chip-top"><Award size={14} /><span>Zanzibar</span></div>
            <div className="stat-chip stat-chip-bottom"><GraduationCap size={14} /><span>NTA Accredited</span></div>
          </div>
        </div>

        <div className="hero-gold-bar hero-gold-bar-bottom" />
      </div>

      {/* ── INFO BANNER ── */}
      <div className="info-banner">
        <div className="info-banner-left">
          <div className="info-banner-icon"><AlertCircle size={26} /></div>
          <div className="info-banner-text">
            <h3 className="info-banner-title">Terms &amp; Regulations</h3>
            <p className="info-banner-body">
              Admission to the academy implies full acceptance and commitment to uphold all
              institutional statutes, regulations, ethical standards, and codes of conduct
              throughout your training period.
            </p>
          </div>
        </div>
        <div className="info-banner-divider" />
        <div className="info-banner-right">
          <div className="info-banner-icon info-banner-icon--gold"><Target size={26} /></div>
          <div className="info-banner-text">
            <h3 className="info-banner-title info-banner-title--gold">Our Programs</h3>
            <p className="info-banner-body">
              Explore our comprehensive range of training programs designed to develop
              professional excellence across all law enforcement disciplines.
            </p>
          </div>
        </div>
      </div>

      {/* ── PROGRAMS CAROUSEL ── */}
      <div className="programs-section">
        <div className="section-header">
          <Target size={32} />
          <h2>OUR PROGRAMS</h2>
          <p>Explore our comprehensive range of training programs designed to develop professional excellence</p>
        </div>

        <div
          className="carousel-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <button className="carousel-nav carousel-nav-prev" onClick={prevSlide} aria-label="Previous">
            <ChevronLeft size={32} />
          </button>
          <button className="carousel-nav carousel-nav-next" onClick={nextSlide} aria-label="Next">
            <ChevronRight size={32} />
          </button>

          <div className="carousel-track">
            {programs.map((program, index) => {
              const visible  = getVisibleCards();
              const position = visible.indexOf(index);
              let cls = "carousel-card";
              if      (position === 0) cls += " carousel-card-prev";
              else if (position === 1) cls += " carousel-card-active";
              else if (position === 2) cls += " carousel-card-next";
              else                     cls += " carousel-card-hidden";

              return (
                <div key={program.id} className={cls} style={{ "--card-color": program.color }}>
                  <div className="card-accent" />
                  <div className="card-icon-large">{program.icon}</div>
                  <div className="card-tag">{program.tag}</div>
                  <h3 className="card-title">{program.title}</h3>
                  <p className="card-description">{program.description}</p>
                  <div className="card-meta-inline">
                    <div className="meta-item"><Clock size={16} /><span>{program.duration}</span></div>
                    <div className="meta-item"><Calendar size={16} /><span>{program.intake}</span></div>
                  </div>
                  <div className="card-actions">
                    <button className="btn-apply" onClick={() => window.open('https://dpa.tpf.go.tz/apply','_blank')}>
                      APPLY NOW <ChevronRight size={18} />
                    </button>
                   
                  </div>
                </div>
              );
            })}
          </div>

          <div className="carousel-pagination">
            {programs.map((_, i) => (
              <button
                key={i}
                className={`pagination-dot ${i === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(i)}
                aria-label={`Go to program ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div className="timeline-section">
        <div className="section-header">
          <Calendar size={32} />
          <h2>Application Timeline</h2>
        </div>
        <div className="timeline-grid">
          {[
            { n:"01", h:"December",           p:"Applications Open",   d:"Registration begins for next academic year" },
            { n:"02", h:"January – April",    p:"Application Period",  d:"Submit documents and complete screening"    },
            { n:"03", h:"May",                p:"Selection & Results", d:"Final selections announced"                 },
            { n:"04", h:"Next Academic Year", p:"Program Begins",      d:"Orientation and coursework start"           },
          ].map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="timeline-connector" />}
              <div className="timeline-item">
                <div className="timeline-number">{item.n}</div>
                <div className="timeline-content">
                  <h4>{item.h}</h4>
                  <p>{item.p}</p>
                  <span className="timeline-detail">{item.d}</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Take the first step towards a rewarding career in law enforcement</p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => window.open('https://dpa.tpf.go.tz/apply','_blank')}>
              Apply Now
            </button>
            
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdmissionRequirement;