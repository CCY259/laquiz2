const questions = [
  // A 
  { question: "A $\\implies$ B", answer: true },
  { question: "A $\\implies$ C", answer: true },
  { question: "A $\\implies$ D", answer: false },
  { question: "A $\\implies$ E", answer: false },
  { question: "A $\\implies$ F", answer: true },
  // B 
  { question: "B $\\implies$ A", answer: false },
  { question: "B $\\implies$ C", answer: false },
  { question: "B $\\implies$ D", answer: false },
  { question: "B $\\implies$ E", answer: false },
  { question: "B $\\implies$ F", answer: false },
  // C
  { question: "C $\\implies$ A", answer: true },
  { question: "C $\\implies$ B", answer: true },
  { question: "C $\\implies$ D", answer: false },
  { question: "C $\\implies$ E", answer: false },
  { question: "C $\\implies$ F", answer: true },
  // D
  { question: "D $\\implies$ A", answer: true },
  { question: "D $\\implies$ B", answer: true },
  { question: "D $\\implies$ C", answer: true },
  { question: "D $\\implies$ E", answer: true },
  { question: "D $\\implies$ F", answer: true },
  // E
  { question: "E $\\implies$ A", answer: true },
  { question: "E $\\implies$ B", answer: true },
  { question: "E $\\implies$ C", answer: true },
  { question: "E $\\implies$ D", answer: false },
  { question: "E $\\implies$ F", answer: true },

  // F implies...
  { question: "F $\\implies$ A", answer: true },
  { question: "F $\\implies$ B", answer: true },
  { question: "F $\\implies$ C", answer: true },
  { question: "F $\\implies$ D", answer: false },
  { question: "F $\\implies$ E", answer: false }
];

const container = document.getElementById("quiz-container");
const scoreBox = document.getElementById("score-summary");

let answeredCount = 0;
let correctCount = 0;

const intro = document.createElement("intro")
intro.innerHTML = `<p>  Let $V$ be a vector space over a field $\\mathbb{F}$. Consider the statements: </p>
 <ul style="list-style-type: none; padding-left: 0;">
    <li><b>(A)</b> $v_1, \\dots, v_n$ are linearly dependent.</li>
    <li><b>(B)</b> $\\exists \\alpha_1, \\dots, \\alpha_n \\in \\mathbb{F}$ such that $\\alpha_1 v_1 + \\dots + \\alpha_n v_n = 0$.</li>
    <li><b>(C)</b> $\\exists \\alpha_1, \\dots, \\alpha_n \\in \\mathbb{F}$ with $\\alpha_i \\neq 0$ for some $i$, such that $\\alpha_1 v_1 + \\dots + \\alpha_n v_n = 0$.</li>
    <li><b>(D)</b> $\\exists \\alpha_1, \\dots, \\alpha_{n-1} \\in \\mathbb{F}$ with $\\alpha_i \\neq 0$ for some $i$, such that $v_n = \\alpha_1 v_1 + \\dots + \\alpha_{n-1} v_{n-1}$.</li>
    <li><b>(E)</b> $\\exists \\alpha_1, \\dots, \\alpha_{n-1} \\in \\mathbb{F}$ such that $v_n = \\alpha_1 v_1 + \\dots + \\alpha_{n-1} v_{n-1}$.</li>
    <li><b>(F)</b> There is no basis $\\mathcal{B}$ of $V$ such that $v_1, \\dots, v_n \\in \\mathcal{B}$.</li>
  </ul>`
container.appendChild(intro)


// Set up place for two columns
const placeForQuestions = document.createElement("div");
placeForQuestions.style.display = "flex";// for layout
placeForQuestions.style.flexWrap = "wrap";// for columns to stack
placeForQuestions.style.gap = "30px";// for gap between columns

// Set up columns
const column1 = document.createElement("div");
column1.style.flex = "1";         
column1.style.minWidth = "300px";             

const column2 = document.createElement("div");
column2.style.flex = "1";
column2.style.minWidth = "300px";

// Add columns
placeForQuestions.appendChild(column1);
placeForQuestions.appendChild(column2);

// Add the place
container.appendChild(placeForQuestions);

// Create questions
questions.forEach((q, i) => {
  const div = document.createElement("div");
  
  //div.style.marginBottom = "5px"; // Spacing between questions
  
  // Create True False buttons
  div.innerHTML = `
    <p><b>Q${i + 1}.</b> ${q.question}</p>
    <button style="font-size: 1.1em; padding: 5px 14px;" id="true-${i}" onclick="checkAnswer(${i}, true)">True</button>
    <button style="font-size: 1.1em; padding: 5px 14px;" id="false-${i}" onclick="checkAnswer(${i}, false)">False</button>
    <span id="feedback-${i}" style="min-width: 100px; margin-left: 30px;"></span>
  `;

  // Put questions in corresponding columns
  if (i < 15) {
    column1.appendChild(div);
  } else {
    column2.appendChild(div);
  }
}
);

const savedAnswer = localStorage.getItem(`question-${i}`);
if (savedAnswer !== null) {
  checkAnswer(i, savedAnswer === 'true', true); // true = restoring
}


function checkAnswer(index, selected) {
  const correct = questions[index].answer;
  const feedback = document.getElementById(`feedback-${index}`);
  const trueBtn = document.getElementById(`true-${index}`);
  const falseBtn = document.getElementById(`false-${index}`);

  if (trueBtn.disabled || falseBtn.disabled) return; // prevent double-clicking

  // Disable buttons
  trueBtn.disabled = true;
  falseBtn.disabled = true;

  // Highlight the clicked button
  const selectedBtn = selected ? trueBtn : falseBtn;
  if (selected === correct) {
    selectedBtn.classList.add("correct");
  } else {
    selectedBtn.classList.add("wrong");
  }

  const isCorrect = selected === correct;
  feedback.innerHTML = isCorrect ? "(¦3[▓▓]" : "＼(・｀(エ)・)/ ";

  answeredCount++;
  if (isCorrect) correctCount++;

  // Show final score after last answer
  if (answeredCount === questions.length) {
    let grade;
    if (correctCount == questions.length) grade = 'Genius Level! I love you so matcha.';
    else if (correctCount >= questions.length-3) grade = 'So close! Give you a chocolatte.';
    else if (correctCount >= questions.length-7) grade = 'Good Job. Give you a cookie. Crooked Hillary.';
    else if (correctCount >= questions.length-10) grade = 'Masih memuaskan. Kasih satu nasi lemak.';
    else if (correctCount >= questions.length-15) grade = 'Need more practice!';
    else grade = 'Hello what happen? Habis lah!';
    scoreBox.innerHTML = `<div style="font-size: 1.5em; font-weight: bold; margin-top: 50px; margin-bottom: 50px;">
    You got ${correctCount} out of ${questions.length} correct. ${grade}
    </div>`
  }
}



