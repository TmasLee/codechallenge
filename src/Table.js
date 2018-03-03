import Ant from './Ant';
import React, { Component } from 'react';
const R = require('ramda');

class Table extends Component {
  
  constructor(props){
    super(props);

    this.tableProgress = 'Not yet run';

    this.state = {
      ants: this.props.ants.ants,
    }

    this.calculateAndSortWin = this.calculateAndSortWin.bind(this);
  }

  /** 
   * Before first render create Ant objects from json
  */
  componentDidMount(){
    var updatedAnts = this.state.ants.map(ant => {
      ant.winChance = null;
      ant.progress = 'Not yet run';
      return ant;
    });
    this.setState({ants: updatedAnts});
  }

  checkAntsProgress(){
    var count = 0;
    this.state.ants.forEach(ant => {
      if (ant.progress === 'Calculated'){
        count++;
      }
    });
    if (count === 5){
      this.tableProgress = 'Calculated';
    }
  }

  calculateAndSortWin(){
    this.tableProgress = 'In progress';
    var updatedAnts = this.state.ants.map(ant => {
      ant.progress = 'In progress';
      generateAntWinLikelihoodCalculator()((chance) => {
        ant.winChance = chance;
        ant.progress = 'Calculated';
        this.setState({ants: sortByWinChance(updatedAnts)});
      });
      return ant
    });
    this.setState({});
  }

  render(){

    this.checkAntsProgress();

    return(
      <div className='table'>
        <table border='1'>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Length</th>
              <th>Color</th>
              <th>Weight</th>
              <th>Chance</th>
              <th>Progress</th>
            </tr>
          </tbody>
          {this.state.ants.map(ant => {
            return <Ant {...ant} key={ant.name}/>
          })}
        </table>
        <br/>
        <p>Progress: {this.tableProgress}</p>
        <br/>
        <button className='winChanceBtn' onClick={this.calculateAndSortWin}>
          Calculate Win Chance
        </button>
      </div>
    );
  }
}

export default Table;

function generateAntWinLikelihoodCalculator() {
  var delay = 7000 + Math.random() * 7000;
  var likelihoodOfAntWinning = Math.random();

  return function(callback) {
    setTimeout(function() {
      callback(likelihoodOfAntWinning);
    }, delay);
  };
}

function winChance(o){
  return o.winChance;
}

const sortByWinChance = R.sortBy(winChance);