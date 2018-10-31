function Score(props) {
  return (
    <div id="score">
      <h2>
        <span>Correct: {0}</span>
        <span>Incorrect: {0}</span>
        </h2>  
    </div>
  )
}
function Button(props) {
  return <button>{props.answer}</button>
}
function GameButtons(props) {
  var buttons = []
  for (var i = 0; i < props.answers.length; i++) {
    buttons.push(<Button answer={props.answers[i]}/>)
  }
  return <div id="buttons">{buttons}</div>;
}
function QuestionDisplay(props) {
  return (
    <div>
      <h1>{props.question}</h1>
      <GameButtons answers={props.answers}/>
      <Score/>
    </div>
  )
}
function QuestionData() {
  return [
    {question: 'what is e?',
    answers: ['a', 'b', 'c', 'd']},
    {question: 'what is i?',
    answers: ['e', 'f', 'g', 'h']},
    {question: 'what is m?',
    answers: ['i', 'j', 'k', 'l']},
    {question: 'what is q?',
    answers: ['m', 'n', 'o', 'p']},
    {question: 'what is u?',
    answers: ['q', 'r', 's', 't']},
    {question: 'what is y?',
    answers: ['u', 'v', 'w', 'x']},
    {question: 'what is 3?',
    answers: ['y', 'z', '1', '2']},
  ]
}

class TriviaApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.generateQuestion()
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
  generateQuestion() {
    let questions = QuestionData();
    let shuffled = this.shuffle(questions);
    
    var chosenQuestion = shuffled[0]
    chosenQuestion.answers = this.shuffle(chosenQuestion.answers);
    return chosenQuestion;
  }
  render() {
    return <QuestionDisplay question={this.state.question} answers={this.state.answers}/>
  }
}

ReactDOM.render(
  <TriviaApp/>,
  document.getElementById('root')
);
