const audioBtn = document.querySelector("#audioBtn");
console.log(audioBtn);
const sound = document.querySelector("#sound") as HTMLImageElement;

audioBtn?.addEventListener("click", () => {
  const audio = document.querySelector("#myAudio") as HTMLAudioElement;
  if (audio.paused) {
    console.log("play");
    sound.src = "/images/sound.png";
    audio.play();
  } else {
    console.log("pause");
    sound.src = "/images/mute.png";
    audio.pause();
  }
});
