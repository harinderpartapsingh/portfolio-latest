import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import {
  MdArrowBack,
  MdArrowForward,
  MdClose,
  MdOpenInNew,
  MdZoomIn,
} from "react-icons/md";
import "./styles/Certificates.css";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
};

const certificates: Certificate[] = [
  {
    title: "AWS Certified Developer Associate",
    issuer: "Amazon Web Services",
    date: "2026",
    image: "/images/certificates/aws-dev-associate.png",
    credentialUrl: "https://www.credly.com/badges/300cd8d3-3e6e-432c-9e73-20ff8ff9485c",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2025",
    image: "/images/certificates/aws-certified-cloud-practitioner.png",
    credentialUrl: "https://www.credly.com/badges/a4c7f00d-45fe-49c8-b328-73f8d9c76632",
  },
  {
    title: "French Certificate",
    issuer: "Concordia University",
    date: "2018",
    image: "/images/certificates/french.png",
  },
  {
    title: "Dean's List Certificate",
    issuer: "Concordia University",
    date: "2022",
    image: "/images/certificates/deanlist.png",
  },
];

const Certificates = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLLIElement[]>([]);
  const activeIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [previewCertificate, setPreviewCertificate] =
    useState<Certificate | null>(null);

  const addCardRef = (element: HTMLLIElement | null, index: number) => {
    if (element) {
      cardsRef.current[index] = element;
    }
  };

  const getCircularOffset = (cardIndex: number, currentIndex: number) => {
    const total = certificates.length;
    let offset = cardIndex - currentIndex;

    if (offset > total / 2) {
      offset -= total;
    }

    if (offset < -total / 2) {
      offset += total;
    }

    return offset;
  };

  const animateCards = (index: number) => {
    cardsRef.current.forEach((card, cardIndex) => {
      const offset = getCircularOffset(cardIndex, index);
      const distance = Math.abs(offset);

      const isActive = distance === 0;
      const isSide = distance === 1;

      gsap.to(card, {
        xPercent: offset * 78,
        scale: isActive ? 1 : isSide ? 0.82 : 0.62,
        opacity: isActive ? 1 : isSide ? 0.52 : 0.22,
        rotationY: offset * -24,
        z: isActive ? 80 : isSide ? 10 : -120,
        zIndex: isActive ? 20 : 20 - distance,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      });
    });
  };

  const goToCertificate = (index: number) => {
    const total = certificates.length;
    const nextIndex = (index + total) % total;

    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    animateCards(nextIndex);
  };

  const goToPrev = () => {
    goToCertificate(activeIndexRef.current - 1);
  };

  const goToNext = () => {
    goToCertificate(activeIndexRef.current + 1);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, {
        transformPerspective: 1200,
        transformOrigin: "center center",
      });

      animateCards(0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="certificates-section"
      id="certificates"
      ref={sectionRef}
    >
      <div className="certificates-container section-container">
        <div className="certificates-header">
          <p className="certificates-kicker">Credentials</p>
          <h2>
            My <span>Certificates</span>
          </h2>
          <p className="certificates-subtitle">
            A quick showcase of certifications, credentials, and achievements.
          </p>
        </div>

        <div className="certificates-gallery">
          <button
            type="button"
            className="certificate-arrow certificate-arrow-left"
            onClick={goToPrev}
            aria-label="Previous certificate"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>

          <ul className="certificate-cards">
            {certificates.map((certificate, index) => (
              <li
                key={certificate.title}
                ref={(element) => addCardRef(element, index)}
                className={`certificate-card ${
                  activeIndex === index ? "certificate-card-active" : ""
                }`}
              >
                <button
                  type="button"
                  className="certificate-image-button"
                  onClick={() => setPreviewCertificate(certificate)}
                  aria-label={`Preview ${certificate.title}`}
                  title="Click to preview"
                  data-cursor="disable"
                >
                  <img src={certificate.image} alt={certificate.title} />

                  <div className="certificate-preview-overlay">
                    <div className="certificate-preview-badge">
                      <MdZoomIn />
                      <span>Click to preview</span>
                    </div>
                  </div>
                </button>

                <div className="certificate-info">
                  <p className="certificate-issuer">{certificate.issuer}</p>
                  <h3>{certificate.title}</h3>
                  <p className="certificate-date">{certificate.date}</p>

                  {certificate.credentialUrl && (
                    <a
                      className="certificate-credential-link"
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="disable"
                    >
                      View Credential <MdOpenInNew />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="certificate-arrow certificate-arrow-right"
            onClick={goToNext}
            aria-label="Next certificate"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>
        </div>

        <div className="certificate-dots">
          {certificates.map((certificate, index) => (
            <button
              key={certificate.title}
              type="button"
              className={`certificate-dot ${
                activeIndex === index ? "certificate-dot-active" : ""
              }`}
              onClick={() => goToCertificate(index)}
              aria-label={`Go to ${certificate.title}`}
              data-cursor="disable"
            />
          ))}
        </div>
      </div>

      {previewCertificate &&
        createPortal(
          <div
            className="certificate-modal"
            onClick={() => setPreviewCertificate(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${previewCertificate.title} preview`}
          >
            <button
              type="button"
              className="certificate-modal-close"
              onClick={() => setPreviewCertificate(null)}
              aria-label="Close certificate preview"
              data-cursor="disable"
            >
              <MdClose />
            </button>

            <div
              className="certificate-modal-content"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={previewCertificate.image}
                alt={previewCertificate.title}
              />

              <div className="certificate-modal-footer">
                <div>
                  <p>{previewCertificate.issuer}</p>
                  <h3>{previewCertificate.title}</h3>
                </div>

                {previewCertificate.credentialUrl && (
                  <a
                    href={previewCertificate.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="disable"
                  >
                    View Credential <MdOpenInNew />
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Certificates;