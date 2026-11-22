import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Flame, Trophy } from 'lucide-react';

// NOTE: Update subtitle strings if needed after checking zoomed-in Figma text on slides 15:2, 15:30, 15:58
const SLIDES = [
  {
    id: 1,
    tag: 'FOCUS NOTES · 1 OF 3',
    title: 'Make today count.',
    subtitle: 'A little focus goes a long way. Tackle your top priority first.',
    previewTitle: 'Design landing page',
    previewProgress: '65%',
    previewWidth: '65%',
    icon: Flame,
  },
  {
    id: 2,
    tag: 'FOCUS NOTES · 2 OF 3',
    title: 'Small steps, big progress.',
    subtitle: 'Break complex work into clear, manageable milestones.',
    previewTitle: 'Fix mobile navigation',
    previewProgress: '45%',
    previewWidth: '45%',
    icon: CheckCircle2,
  },
  {
    id: 3,
    tag: 'FOCUS NOTES · 3 OF 3',
    title: 'Celebrate the wins.',
    subtitle: 'Every completed task moves your workspace forward.',
    previewTitle: 'Review onboarding copy',
    previewProgress: '100%',
    previewWidth: '100%',
    icon: Trophy,
  },
];

export default function FocusNotes({ completionRate }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = SLIDES[activeIndex];
  const SlideIcon = currentSlide.icon;

  return (
    <section className="focus-carousel" aria-label="Focus Notes Carousel">
      <div className="focus-carousel-content">
        <div className="focus-slide-copy">
          <span className="focus-slide-tag">{currentSlide.tag}</span>
          <h2 className="focus-slide-title">{currentSlide.title}</h2>
          <p className="focus-slide-subtitle">{currentSlide.subtitle}</p>

          <div className="focus-indicators" role="tablist" aria-label="Carousel slides">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                className={`focus-dot ${idx === activeIndex ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </div>

        <div className="focus-carousel-right">
          {/* Decorative Figma Mini-Card */}
          <div className="focus-mini-card" aria-hidden="true">
            <div className="focus-mini-top">
              <span className="focus-mini-badge">
                <SlideIcon size={13} />
                Highlight
              </span>
              <span className="focus-mini-pct">
                {activeIndex === 2 ? `${completionRate}%` : currentSlide.previewProgress}
              </span>
            </div>
            <p className="focus-mini-title">{currentSlide.previewTitle}</p>
            <div className="focus-mini-bar">
              <div
                className="focus-mini-fill"
                style={{
                  width: activeIndex === 2 ? `${completionRate}%` : currentSlide.previewWidth,
                }}
              />
            </div>
          </div>

          <div className="focus-controls">
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={handlePrev}
              aria-label="Previous focus note"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="carousel-arrow-btn"
              onClick={handleNext}
              aria-label="Next focus note"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
