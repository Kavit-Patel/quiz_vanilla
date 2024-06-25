import data from "../../quiz.json";
data.questions.length = 2;
const questions = data.questions;
console.log(questions[0]);
let selectedOption: string | null = null;
const audioBtn = document.querySelector("#audioBtn");
const sound = document.querySelector("#sound") as HTMLImageElement;
const queIdx = document.querySelector("#queIdx");
const que = document.querySelector("#que");
const timer = document.querySelector("#timer");
const AnsSection = document.querySelector("#ans");
const next = document.querySelector("#next");

const score: boolean[] = [];

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
let i: number = 0;
let timerId: number | undefined;
operation(i); // initial(first) call
next?.addEventListener("click", () => {
  if (i === questions.length - 1) {
    console.log(score);
    window.location.href = `result.html?score=${JSON.stringify(score)}`;
  }
  i++;
  operation(i);
});

function operation(queNum: number) {
  if (queIdx) {
    queIdx.textContent = `${queNum + 1}/${questions.length}`;
  }
  const currentQuestion = questions[queNum];
  if (que) {
    que.textContent = currentQuestion.question;
  }
  let time = 30;
  function countDown() {
    time -= 1;

    if (timer) {
      timer.textContent = `00:${time < 10 ? 0 + time.toString() : time}`;
    }
    if (time === 0) {
      clearInterval(timerId);

      allAns.forEach((el) => {
        el.classList.remove("hover:border-blue-400", "cursor-pointer");
        el.disabled = true;
      });
    }
  }
  if (timerId) {
    console.log("called", timerId);
    clearInterval(timerId);
  }
  timerId = setInterval(countDown, 1000);

  if (AnsSection) {
    AnsSection.innerHTML = "";
  }
  questions[queNum].options.forEach((opt, idx) => {
    if (AnsSection) {
      AnsSection.innerHTML += `
        <button
              id=${idx}
              class="quiz-option bg-[#eae5e5] border-2 border-gray-300 p-4 text-xl rounded-lg cursor-pointer transition-all  "
            >${opt}</button>
      `;
    }
  });
  const allAns = document.querySelectorAll(
    ".quiz-option"
  ) as NodeListOf<HTMLButtonElement>;

  allAns.forEach((el) => {
    if (!selectedOption || timerId) {
      el.classList.add("hover:border-blue-400");
      el.addEventListener("click", (e) => {
        el.classList.remove("hover:border-blue-400");

        const selectedEl = e.target as HTMLElement;
        selectedEl.classList.add("border-green-500");
        selectedOption = selectedEl.innerText;
        clearInterval(timerId);
        allAns.forEach((el) => {
          el.classList.remove("hover:border-blue-400", "cursor-pointer");
          el.disabled = true;
        });
        if (selectedOption === questions[queNum].answer) {
          score.push(true);
          // alert(true);
        } else {
          score.push(false);
          // alert(false);
        }
      });
    }
  });
}
export default score;
