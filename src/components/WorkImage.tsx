import { useState } from "react";
import { createPortal } from "react-dom";
import { MdArrowOutward, MdClose, MdZoomIn } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <>
      <div className="work-image">
        <div
          className="work-image-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          data-cursor="disable"
        >
          {props.link && (
            <a
              className="work-link"
              href={props.link}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              data-cursor="disable"
              aria-label="Open project link"
            >
              <MdArrowOutward />
            </a>
          )}

          <button
            type="button"
            className="work-image-preview-button"
            onClick={openPreview}
            aria-label={`Preview ${props.alt || "project image"}`}
            title="Click to preview"
            data-cursor="disable"
          >
            <img src={props.image} alt={props.alt} />

            <div className="work-preview-overlay">
              <div className="work-preview-badge">
                <MdZoomIn />
                <span>Click to preview</span>
              </div>
            </div>
          </button>

          {isVideo && <video src={video} autoPlay muted playsInline loop />}
        </div>
      </div>

      {isPreviewOpen &&
        createPortal(
          <div
            className="image-preview-modal"
            onClick={closePreview}
            role="dialog"
            aria-modal="true"
            aria-label={`${props.alt || "Project"} image preview`}
          >
            <button
              type="button"
              className="image-preview-close"
              onClick={closePreview}
              aria-label="Close image preview"
              data-cursor="disable"
            >
              <MdClose />
            </button>

            <div
              className="image-preview-content"
              onClick={(event) => event.stopPropagation()}
            >
              <img src={props.image} alt={props.alt} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default WorkImage;