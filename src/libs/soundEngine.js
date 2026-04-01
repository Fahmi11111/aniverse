export function playSpatialPop(type = "success") {
  if (typeof window === "undefined") return;

  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const panner = ctx.createStereoPanner();

  oscillator.type = "sine";

  if (type === "success") oscillator.frequency.value = 880;
  if (type === "error") oscillator.frequency.value = 220;
  if (type === "info") oscillator.frequency.value = 660;

  panner.pan.value = Math.random() > 0.9 ? -0.9 : 0.9;

  oscillator.connect(gainNode);
  gainNode.connect(panner);
  panner.connect(ctx.destination);

  oscillator.start();

  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.009, ctx.currentTime + 0.2);

  oscillator.stop(ctx.currentTime + 0.9);
}
