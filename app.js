// Quiz questions and answers Array

const quizData = [
 {
  question: "If you see a Nigerian running suddenly, what is the best thing to do?",
  options: ["Ask why they are running", "Stand still and observe", "Start running too", "Take a selfie"],
  answer: "Start running too"
 },
 {
  question: "If someone mistakenly steps on you in Lagos, what is the most common response?",
  options: ["'Sorry oh!'", "'You no get eye?'", "'May God punish you!'", "'Can we be friends?'"],
  answer: "'You no get eye?'"
 },
 {
  question: "If a Nigerian says 'E go better,' what does it mean?",
  options: ["Things will improve", "Nothing will change", "You should give up", "They have no hope"],
  answer: "Things will improve"
 },
 {
  question: "Which of these is a common Nigerian way of saying 'Goodbye'?",
  options: ["'See you later'", "'Bye-bye'", "'We go see'", "'Safe journey'"],
  answer: "'We go see'"
 },
 {
  question: "Which of these Nigerian foods is 'swallow'?",
  options: ["Jollof rice", "Eba", "Moi Moi", "Bole"],
  answer: "Eba"
 },
 {
  question: "What is the best way to cross a busy Lagos road?",
  options: ["Wait for the traffic light", "Look left and right", "Follow the mad man crossing", "Pray and run"],
  answer: "Follow the mad man crossing"
 },
 {
  question: "A Nigerian mother shouts your full name from the kitchen. What does it mean?",
  options: ["She wants to give you money", "You are in trouble", "She forgot your name", "She is practicing for a singing competition"],
  answer: "You are in trouble"
 },
 {
  question: "A Nigerian says, 'I no dey for that one.'What does it mean?",
  options: ["They don't understand", "They are not interested", "They are planning to join", "They are waiting for approval"],
  answer: "They are not interested"
 },
 {
  question: "When a Nigerian says, 'Who go pay?' What do they really mean?",
  options: ["They are about to pay the bill", "They want to know who is responsible", "They want to borrow money", "They are talking about their landlord"],
  answer: "They want to know who is responsible"
 },
 {
  question: "What happens if you mistakenly drop your meat while eating outside?",
  options: ["You pick it up and eat it", "You respect yourself and leave it", "You cry", "You ask someone else to pick it"],
  answer: "You respect yourself and leave it"
 },
 {
  question: "A Nigerian mother says, 'So you have grown wings?' What does she mean?",
  options: ["You are about to fly", "You have become a bird", "You are being stubborn", "She is proud of you"],
  answer: "You are being stubborn"
 },
 {
  question: "Which Nigerian musician is known as the 'African Giant'?",
  options: ["Wizkid", "Burna Boy", "Davido", "Olamide"],
  answer: "Burna Boy"
 }
]

// ELEMENTS 

const previousBtn = document.querySelector(".previous-btn");
const questionProgress = document.querySelector(".progress");
const currentQuestion = document.querySelector(".current-question");
const quizCard = document.querySelector(".quiz-card");
const quizOptions = document.querySelector(".quiz-options");
const optionText = document.querySelectorAll(".option-text");
const optionsTest = document.getElementById("options-test")
const optionDiv = document.querySelectorAll(".option")
const nextBtn = document.querySelector(".next");
const finalScore = document.querySelector(".final-score-text");
const resetBtn = document.querySelector(".reset");


// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

//randomizing questions
const shuffleQuestions = () => {
 for (let i = quizData.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1)); // Random index
  [quizData[i], quizData[j]] = [quizData[j], quizData[i]]; // Swap elements
 }
};

// Function to display a question
const displayQuestion = () => {
 let questionObj = quizData[currentQuestionIndex];
 currentQuestion.textContent = questionObj.question;
 questionProgress.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;

 // Reset options and selection state
 quizOptions.innerHTML = "";
 answered = false;

 questionObj.options.forEach(option => {
  const optionDiv = document.createElement("div");
  optionDiv.classList.add("option");

  const optionText = document.createElement("p");
  optionText.textContent = option;
  optionText.classList.add("option-text");

  optionDiv.appendChild(optionText);
  quizOptions.appendChild(optionDiv);

  // Handle option click
  optionDiv.addEventListener("click", () => {
   if (!answered) {
    answered = true;
    checkAnswer(optionDiv, option, questionObj.answer);
    nextBtn.style.display = "block"
   }
  });
 });
};


// Function to check answer and change background color
const checkAnswer = (selectedElement, selectedOption, correctAnswer) => {
 document.querySelectorAll(".option").forEach(option => {
  option.style.pointerEvents = "none"; // Disable further clicks
 });

 if (selectedOption === correctAnswer) {
  selectedElement.style.backgroundColor = "#32cd32";
  selectedElement.style.color = "#fff";
  score++;
 } else {
  selectedElement.style.backgroundColor = "#e63946";
  selectedElement.style.color = "#fff";

 }
};


// Next question button functionality
nextBtn.addEventListener("click", () => {
 if (currentQuestionIndex < quizData.length - 1) {
  currentQuestionIndex++;
  displayQuestion();
 } else {
  showFinalScore();

 }
});

// Function to show final score
const showFinalScore = () => {
 // nextBtn.textContent = "Restart";
 // nextBtn.classList.add("btn");

 questionProgress.style.display = "none"
 nextBtn.style.display = "none"
 quizOptions.innerHTML = "";
 document.querySelector(".quiz-parts").style.display = "flex";
 let scorePercentage = Math.round(score / quizData.length * 100);
 if (scorePercentage > 50) {
  currentQuestion.textContent = `
 You're ${scorePercentage}% a true Nigerian!!`;
 } else {
  currentQuestion.textContent = `
 With ${scorePercentage}% you're not a true Nigerian!!`;
 }

 quizCard.classList.add("final-score-text");
 // finalScore.textContent = `Your final score is ${score}/${quizData.length}`;
 // finalScore.style.fontSize = "20px";
 // finalScore.style.fontWeight = "bold";
 // finalScore.style.textAlign = "center";
 // quizOptions.appendChild(finalScore);



};

// Call shuffle before starting the quiz
shuffleQuestions();
// nextBtn.addEventListener("click", restartQuiz());

// Start quiz
displayQuestion();