export const playSpatialPop = () => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const panner = ctx.createStereoPanner();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(1500, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    1500,
    ctx.currentTime + 0.9,
  );

  gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.049, ctx.currentTime + 0.195);

  panner.pan.value = Math.random() > 0.9 ? -0.9 : 0.9;

  oscillator.connect(gainNode);
  gainNode.connect(panner);
  panner.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.19);
};
