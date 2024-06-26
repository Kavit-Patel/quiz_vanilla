const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const score = urlParams.get("score");

const totalQue = 10;
const correct = document.querySelector("#correct") as HTMLElement;
const incorrect = document.querySelector("#incorrect") as HTMLElement;
const scorecard = document.querySelector("#scoreCard");

if (score) {
  if (JSON.parse(score).length > 0) {
    const correctAns = JSON.parse(score).reduce(
      (acc: number, el: number) => acc + el,
      0
    );
    const correctPercentage = (100 * correctAns) / totalQue;
    const incorrectPercentage = (100 * (totalQue - correctAns)) / totalQue;
    // correct?.classList.add(`w-[${correctPercentage}%]`);
    // incorrect?.classList.add(`w-[${incorrectPercentage}%]`);

    correct.style.width = `${correctPercentage}%`;
    incorrect.style.width = `${incorrectPercentage}%`;

    if (scorecard) {
      scorecard.textContent = `${correctAns}/${totalQue}`;
    }
  } else {
    alert("You haven't selected any answer !");
  }
}
