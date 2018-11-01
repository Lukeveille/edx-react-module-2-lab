function Score(props) {
  return (
    <div id="score">
      <h2>
        <span>Correct: {props.correct}</span>
        <span>Incorrect: {props.incorrect}</span>
      </h2>
      <h3>{props.currentQuestion} / {props.qCount}</h3>
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
      <GameButtons answers={props.answers} handleClick={props.handleClick} shuffle={props.shuffle}/>
      <Score correct={props.correct} incorrect={props.incorrect} qCount={props.qCount} currentQuestion={props.currentQuestion}/>
    </div>
  )
}
// First answer is the correct one (answers are shuffled before they print)
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

    this.state = {
      questions: this.shuffledData(),
      correct: 0,
      incorrect: 0,
      qCount: QuestionData().length,
      currentQuestion: 1
    }
    this.handleClick = this.handleClick.bind(this);
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
  shuffledData() {
    var questions = QuestionData();
    // questions.map(question => {
    //   question.answers = this.shuffle(question.answers)
    // });
    return this.shuffle(questions);
  }

  handleClick(answer) {
    this.setState((prevState) => { 
      // if (prevState.currentQuestion < prevState.qCount) {
      var output = {};
      if (answer == prevState.questions[prevState.currentQuestion-1].answers[0]) {
        output.correct = prevState.correct + 1
      } else {
        output.incorrect = prevState.correct + 1
      }
      console.log(answer)
      if (prevState.currentQuestion < prevState.qCount) {
        console.log(prevState.questions[prevState.currentQuestion-1].answers[0])
        output.currentQuestion = prevState.currentQuestion + 1
      }
      return output
    });
  }
  render() {
    return <QuestionDisplay shuffle={this.shuffle} handleClick={this.handleClick} question={this.state.questions[this.state.currentQuestion-1].question} answers={this.state.questions[this.state.currentQuestion-1].answers} correct={this.state.correct} incorrect={this.state.incorrect} qCount={this.state.qCount} currentQuestion={this.state.currentQuestion}/>
  }
}

ReactDOM.render(
  <TriviaApp/>,
  document.getElementById('root')
);
