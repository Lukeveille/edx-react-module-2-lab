// Functional components
function Score(props) {
  return (
    <div id="score">
      <h2>
        <span>Correct: {props.correct}</span>
        <span>Incorrect: {props.incorrect}</span>
      </h2>
      <h3>{props.currentQuestion + 1} / {props.qCount}</h3>
    </div>
  )
}
function Button(props) {
  return <button onClick={() => props.handleClick(props.answer)}>{props.answer}</button>
}
function GameButtons(props) {
  var buttons = []
  for (var i = 0; i < props.answers.length; i++) {
    buttons.push(<Button answer={props.answers[i]} handleClick={props.handleClick}/>)
  }
  props.shuffle(buttons);
  return <div id="buttons">{buttons}</div>;
}
function QuestionDisplay(props) {
  return (
    <div>
      <h1>{props.question}</h1>
      <GameButtons correctCount={props.correctCount} answers={props.answers} handleClick={props.handleClick} shuffle={props.shuffle}/>
      <Score correct={props.correct} incorrect={props.incorrect} qCount={props.qCount} currentQuestion={props.currentQuestion}/>
    </div>
  )
}
// First answer is the correct one (answers are shuffled before they print)
function QuestionData() {
  return [
    {question: 'what is a?',
    answers: ['a', 'b', 'c', 'd']},
    {question: 'what is e?',
    answers: ['e', 'f', 'g', 'h']},
    {question: 'what is i?',
    answers: ['i', 'j', 'k', 'l']},
    {question: 'what is m?',
    answers: ['m', 'n', 'o', 'p']},
    {question: 'what is q?',
    answers: ['q', 'r', 's', 't']},
    {question: 'what is u?',
    answers: ['u', 'v', 'w', 'x']},
    {question: 'what is y?',
    answers: ['y', 'z', '1', '2']},
    {question: 'what is 3?',
    answers: ['3', '4', '5', '6']},
    {question: 'what is 7?',
    answers: ['7', '8', '9', '10']},
    {question: 'what is 11?',
    answers: ['11', '12', '13', '14']},
    {question: 'what is 15?',
    answers: ['15', '16', '17', '18']},
    {question: 'what is 19?',
    answers: ['19', '20', '21', '22']},
  ]
}
function EndGame() {
  return {
    question: 'End of Quiz',
    answers: ['Try Again']
  }
}

// Class component for the game app itself
class TriviaApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.initialize();
    this.handleClick = this.handleClick.bind(this);
  }
  
  // Number of questions to be randomly selected from the dataset
  quizLength() {
    return 10;
  }

  initialize() {
    return {
      questions: this.shuffledData(this.quizLength()),
      qCount: this.quizLength(),
      correct: 0,
      incorrect: 0,
      currentQuestion: 0,
      game: true
    }
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
  shuffledData(n) {
    let data = QuestionData();
    let questions = data.slice(0, n);
    return this.shuffle(questions);
  }

  handleClick(answer) {
    this.setState((prevState) => { 
      var output = {};
      if (prevState.game === true) {
        if (answer === prevState.questions[prevState.currentQuestion].answers[0]) {
          output.correct = prevState.correct + 1;
        } else {
          output.incorrect = prevState.incorrect + 1;
        }

        if (prevState.currentQuestion < prevState.qCount-1) {
          output.currentQuestion = prevState.currentQuestion + 1;
        } else {
          output.game = false;
        }
      } else {
        output = this.initialize();
      }
      return output;
    });
  }

  render() {
    if (this.state.game) {
      var questionAnswer = this.state.questions[this.state.currentQuestion];
    } else {
      var questionAnswer = EndGame();
    }
    return <QuestionDisplay correctCount={this.state.correct + this.state.incorrect} game={this.state.game} shuffle={this.shuffle} handleClick={this.handleClick} question={questionAnswer.question} answers={questionAnswer.answers} correct={this.state.correct} incorrect={this.state.incorrect} qCount={this.state.qCount} currentQuestion={this.state.currentQuestion}/>
  }
}

ReactDOM.render(
  <TriviaApp/>,
  document.getElementById('root')
);
