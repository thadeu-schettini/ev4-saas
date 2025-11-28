import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

interface CelebrationConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const CelebrationConfetti = ({ trigger, onComplete }: CelebrationConfettiProps) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger && !isActive) {
      setIsActive(true);
      const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
      const pieces: ConfettiPiece[] = [];

      for (let i = 0; i < 80; i++) {
        pieces.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -20,
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 10 + 5,
          velocityX: (Math.random() - 0.5) * 8,
          velocityY: Math.random() * 3 + 2,
          rotationSpeed: (Math.random() - 0.5) * 10,
        });
      }

      setConfetti(pieces);

      setTimeout(() => {
        setIsActive(false);
        setConfetti([]);
        onComplete?.();
      }, 4000);
    }
  }, [trigger, isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confetti-fall 4s ease-out forwards`,
            "--velocity-x": `${piece.velocityX}px`,
            "--velocity-y": `${piece.velocityY}px`,
            "--rotation-speed": `${piece.rotationSpeed}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
