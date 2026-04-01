import confetti from "canvas-confetti";

export const fireConfetti = () => {
  confetti({
    particleCount: 900,
    spread: 900,
    origin: { y: 0.9 },
  });
};
