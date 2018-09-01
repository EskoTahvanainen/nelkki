import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import _ from 'lodash';

//import { Button } from 'reactstrap';


const Stars = (props) => {
  //const numberofstars = 1 + Math.floor(Math.random() * 9);

  //let stars = [];
  //for (let i = 0; i < numberofstars; i++) {
  //  stars.push(<FontAwesomeIcon icon={faStar} style={{margin: '0.5em'}} key={i}/>);
  // }
  return (
    <div className="col-5">
      {_.range(props.numberofstars).map((i) => <FontAwesomeIcon icon={faStar} style={{margin: '0.5em'}} key={i}/>)} 
    </div>
  )
}

const Button = (props) => {
  //console.log('Button');
  let button;
  switch(props.answerIsCorrect) {
    case true:
      button = 
        <button className="btn btn-success" onClick={props.acceptAnswer}>
        ++
        </button>;
      break;
    case false:
      button = 
        <button className="btn btn-danger">
        --
        </button>;
      break;
    default:
      button =
        <button className="btn" 
                onClick={props.countAnswerSum}
                disabled={props.selectedNumbers.length === 0}>
        ==
        </button>
      break;
  }
  return (
    <div className="col-2 text-center">
      {button}
      <br /><br />
      <button className="btn btn-warning btn-sm" onClick={props.redraw} disabled={props.redraws === 0}>
        <FontAwesomeIcon icon={faCoffee} />{props.redraws}
      </button>
    </div>
  )
}

const Answer = (props) => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) => 
        <span key={i} onClick={() => props.unSelectNumber(number)}>{number}</span>
      )} 
    </div>
  )
}

const Numbers = (props) => {
  const numberClassName = (number) => {
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
  }

  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) => 
          <span key={i} className={numberClassName(number)} onClick={() => props.selectNumber(number)}>{number}</span>)} 
      </div>
    </div>
  )
}
Numbers.list = _.range(1, 10);

const DoneFrame = (props) => {
  return (
    <div>
      <h2>{props.doneStatus}</h2>
    </div>
  )
}

class Game extends Component {
  static randomNumber = () => 1 + Math.floor(Math.random() * 9);

  constructor(props)
  {
    super(props);
    this.state = {
      selectedNumbers: [],
      usedNumbers: [],
      numberOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      redraws: 5,
      doneStatus: null,
    }
  };

  selectNumber = (clickednumber) => {
    console.log('selectNumber');
    if (this.state.selectedNumbers.indexOf(clickednumber) >= 0) return;
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickednumber)
    }));
  };

  unSelectNumber = (clickednumber) => {
    console.log('unSelectNumber');
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number != clickednumber)
    }));
  };

  countAnswerSum = () => {
    console.log('countAnswerSum');
    this.setState(prevState => ({
      //answerIsCorrect: true
      answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  }

  acceptAnswer = () => {
    console.log('acceptAnswer');
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber()
    }));
  };

  redraw = () => {
    if (this.state.redraws === 0) { return; }
    console.log('redraw');
    this.setState(prevState => ({
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber(),
      redraws: prevState.redraws - 1
    }));
  }

  render() {
    const {selectedNumbers, usedNumbers, numberOfStars, answerIsCorrect, redraws, doneStatus} = this.state;

    return (
      <div className="container">
        <h3>Play Nine</h3>
        <div className="row">
          <Stars numberofstars={numberOfStars}> </Stars>
          <Button selectedNumbers={selectedNumbers} redraws={redraws} countAnswerSum={this.countAnswerSum} acceptAnswer={this.acceptAnswer} answerIsCorrect={answerIsCorrect} redraw={this.redraw}></Button>
          <Answer selectedNumbers={selectedNumbers} unSelectNumber={this.unSelectNumber}/>
        </div>
        <br />
        {doneStatus ? 
        <DoneFrame doneStatus={doneStatus} /> :
        <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers} />
        }
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
