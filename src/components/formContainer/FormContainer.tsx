import { Overlay } from "@components/overlay/Overlay";
import { useEffect } from "react";

type FormContainerProps =
  | { children: React.ReactNode; hasOverlay?: undefined; onClose?: undefined }
  | { hasOverlay: true; onClose: () => void; children: React.ReactNode };

export function FormContainer({
  hasOverlay,
  onClose,
  children,
}: FormContainerProps) {
  useEffect(() => {
    if (!onClose) return;
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (hasOverlay) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {hasOverlay && <Overlay onClick={onClose} />}
      <div className="relative z-30">{children}</div>
    </>
  );
}
