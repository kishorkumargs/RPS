import { Howl, Howler } from "howler";

let sounds = null;

export function initSounds() {
  if (sounds) return sounds;
  sounds = {
    win: new Howl({ src: ["/sounds/win.wav"] }),
    lose: new Howl({ src: ["/sounds/lose.wav"] }),
    tie: new Howl({ src: ["/sounds/tie.m4a"] }),
    btn: new Howl({ src: ["/sounds/click.mp3"] }),
    gameOver: new Howl({ src: ["/sounds/game_over.wav"] }),
    highScore: new Howl({ src: ["/sounds/high_score.wav"] }),
    playBtn: new Howl({ src: ["/sounds/play.wav"] }),
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