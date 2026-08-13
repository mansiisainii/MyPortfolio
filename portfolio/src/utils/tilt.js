import { useRef, useEffect } from "react";

const isTouchDevice = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

export default function useTilt(active = true, maxTilt = 15) {
  const ref = useRef(null);

  useEffect(() => {
    if (!active || isTouchDevice()) return;

    const node = ref.current;
    if (!node) return;

    const handleMouseMove = (e) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = (x / rect.width - 0.5) * 2;
      const py = (y / rect.height - 0.5) * 2;

      const rotateX = -(py * maxTilt);
      const rotateY = px * maxTilt;

      node.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    };

    const reset = () => {
      node.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    };

    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseleave", reset);

    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", reset);
    };
  }, [active, maxTilt]);

  return ref;
}
