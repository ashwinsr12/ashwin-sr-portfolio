import { useCallback, useEffect, useState } from "react";
import "./ProjectGallery.css";

export default function ProjectGallery({ images, title }) {
  const [openIndex, setOpenIndex] = useState(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i + 1) % images.length),
    [images.length],
  );

  // Keyboard nav + lock page scroll while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, showPrev, showNext]);

  if (!images || images.length === 0) return null;

  return (
    <div className="gallery">
      <div className="gallery__grid">
        {images.map((img, i) => (
          <button
            type="button"
            className="gallery__thumb"
            key={img.src}
            onClick={() => setOpenIndex(i)}
            aria-label={`Open image ${i + 1} of ${images.length}: ${img.alt}`}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
            <span className="gallery__zoom" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
          onClick={close}
        >
          <button type="button" className="lightbox__close" onClick={close} aria-label="Close image viewer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              aria-label="Previous image"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          )}

          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={images[openIndex].src} alt={images[openIndex].alt} />
            <figcaption className="lightbox__caption">
              {images[openIndex].alt}
              <span className="lightbox__count num"> · {openIndex + 1} / {images.length}</span>
            </figcaption>
          </figure>

          {images.length > 1 && (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              aria-label="Next image"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
