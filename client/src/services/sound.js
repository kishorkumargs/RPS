import { Howl, Howler } from "howler";

let sounds = null;

export function initSounds() {
  if (sounds) return sounds;
  sounds = {
    win: new Howl({ src: ["/sounds/win.wav"], volume: 0.8 }),
    lose: new Howl({ src: ["/sounds/lose.wav"], volume: 0.8 }),
    tie: new Howl({ src: ["/sounds/tie.m4a"], volume: 0.8 }),
    btn: new Howl({ src: ["/sounds/click.mp3"], volume: 0.8 }),
    gameOver: new Howl({ src: ["/sounds/game_over.wav"], volume: 0.8 }),
    highScore: new Howl({ src: ["/sounds/high_score.wav"], volume: 0.8 }),
    playBtn: new Howl({ src: ["/sounds/play.wav"], volume: 0.8 }),
    hover: new Howl({src: ["/sounds/hover.wav"], volume: 0.3 }),
  };

  return sounds;
}
export function unlockAudio() {
  if (Howler.ctx?.state === "suspended") {
    console.log('✅ Audio context unlocked by user gesture');
    return Howler.ctx.resume();
  }
  return Promise.resolve();
}