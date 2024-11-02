const raw_questions = [
	{
		question: "Какой тег отвечает за абзац текста?",
		answers: [
			"h2", 
			"a", 
			"h1", 
			"p",
		],
		correct: 4,
	},
	{
		question: "Выравнивание текста",
		answers: [
			"text-decoration",
			"text-align",
			"text-shadow",
			"text-wrap",
		],
		correct: 2,
	},
	{
		question: "С каким позиционированием элемент устанавливается относительно его элемента-родителя?",
		answers: [
			"absolute",
			"relative",
			"static",
			"fixed",
		],
		correct: 1,
	},
	{
		question: "Позиционирование элемента относительно его исходного положения",
		answers: [
			"absolute",
			"relative",
			"static",
			"fixed",
		],
		correct: 2,
	},
	{
		question: "С каким позиционированием элемент остается на месте при прокрутке страницы?",
		answers: [
			"absolute",
			"relative",
			"static",
			"fixed",
		],
		correct: 4,
	},
	{
		question: "С каким позиционированием элементы располагаются в том порядке, в котором они прописаны в HTML-документе?",
		answers: [
			"absolute",
			"relative",
			"static",
			"fixed",
		],
		correct: 3,
	},
	{
		question: "Какой псевдокласс активируется при наведении мыши на объект?",
		answers: [
			"hover",
			"active",
			"visited",
			"first-child",
		],
		correct: 1,
	},
	{
		question: "Какой псевдокласс активируется при нажатии на объект?",
		answers: [
			"hover",
			"active",
			"visited",
			"first-child",
		],
		correct: 2,
	},
	{
		question: "Размер шрифта",
		answers: [
			"text-align",
			"font-family",
			"font-size",
			"border",
		],
		correct: 3,
	},
	{
		question: "Внутренний верхний отступ",
		answers: [
			"margin-top",
			"margin-bottom",
			"padding-bottom",
			"padding-top",
		],
		correct: 4,
	},
	{
		question: "Внешний нижний отступ",
		answers: [
			"margin-top",
			"margin-bottom",
			"padding-bottom",
			"padding-top",
		],
		correct: 2,
	},
	{
		question: "Внутренний нижний отступ",
		answers: [
			"margin-top",
			"margin-bottom",
			"padding-bottom",
			"padding-top",
		],
		correct: 3,
	},
	{
		question: "Внешний верхний отступ",
		answers: [
			"margin-top",
			"margin-bottom",
			"padding-bottom",
			"padding-top",
		],
		correct: 1,
	},
	{
		question: "Стиль шрифта курсив",
		answers: [
			"font-style: bold",
			"font-style: normal",
			"font-weight: 600",
			"font-style: italic",
		],
		correct: 4,
	},
	{
		question: "Стиль шрифта жирный",
		answers: [
			"font-style: bold",
			"font-style: normal",
			"font-weight: 600",
			"font-style: italic",
		],
		correct: 1,
	},
	{
		question: "Стиль шрифта обычный",
		answers: [
			"font-style: bold",
			"font-style: normal",
			"font-weight: 600",
			"font-style: italic",
		],
		correct: 2,
	},
	{
		question: "Граница",
		answers: [
			"border-radius",
			"border",
			"border-color",
			"border-collapse",
		],
		correct: 2,
	},
	{
		question: "Перевести в блочный тип контейнера",
		answers: [
			"display: flex",
			"display: inline",
			"display: block",
			"display: inline-block",
		],
		correct: 3,
	},
	{
		question: "Перевести во встроенный тип контейнера",
		answers: [
			"display: flex",
			"display: inline",
			"display: block",
			"display: inline-block",
		],
		correct: 2,
	},
	{
		question: "Селектор по классу",
		answers: [
			"main",
			"[main]",
			"#main",
			".main",
		],
		correct: 4,
	},
	{
		question: "Селектор по идентификатору",
		answers: [
			"main",
			"[main]",
			"#main",
			".main",
		],
		correct: 3,
	},
	
];


function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	while (0 !== currentIndex) {
  
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
  }
  questions = shuffle(raw_questions).slice(-10)


const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');



let score = 0;
let questionIndex = 0;
let incorrect = [];

clearPage();
showQuestion()

submitBtn.onclick = checkAnswer;

function clearPage(){

	headerContainer.innerHTML = ''
	listContainer.innerHTML = ''
}


function showQuestion(){

	const headerTemplate = '<h2 class="title">%title%</h2>';
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;


	for ([index, item] of questions[questionIndex]['answers'].entries()){

		const questionTemplate = 
			`<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

		const answerHTML = questionTemplate
								.replace('%answer%', item)
								.replace('%number%', index + 1);
		listContainer.innerHTML += answerHTML;


	}

}

function checkAnswer(){
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	if (!checkedRadio){
		submitBtn.blur(); 
		return
	}

	const userAnswer = parseInt(checkedRadio.value);

	questions[questionIndex]['correct']
	if (userAnswer === questions[questionIndex]['correct']){
		score++;
	} else {
		incorrect.push({
			quest: questions[questionIndex]['question'], 
			answer: questions[questionIndex]['answers'][questions[questionIndex]['correct'] -1 ],})
	}

	if (questionIndex !== questions.length - 1){
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		clearPage();
		showResults();
	}
}

function showResults(){
	
	const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<p class="result">%result%</p>
			<p class="incorrect">Проблемные вопросы:</p>

		`;
	let title, result;

	title = 'Ура! Это конец викторины!';
	result = `${score} из ${questionIndex + 1}`

	const finalMessage = resultsTemplate.replace('%title%', title).replace('%result%', result)
	headerContainer.innerHTML = finalMessage;


	for (item of incorrect){

		const incorrectTemplate = `
				<li>
					<h1 style="font-weight: 500">%question%</h1>
					<p style="font-style: italic">%answer%</p>
				</li>
			`;

		const incorHTML = incorrectTemplate
								.replace('%question%', item.quest)
								.replace('%answer%', item.answer);
		listContainer.innerHTML += incorHTML;
	}

	submitBtn.blur()
	submitBtn.innerText = 'Начать заново'
	submitBtn.onclick = () => { history.go()}
}
