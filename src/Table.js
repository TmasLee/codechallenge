import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
const R = require('ramda');

class Table extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      progress: 'Not yet run',
      ants: null,
    }

    this.calculateAntWin = this.calculateAntWin.bind(this);
  }

  //  Initialize progress property of each ant.
  //  Not optimal to call setState here but won't cause performance issues
  componentDidMount(){
    var updatedAnts = this.props.ants.ants.map(ant => {
      ant.progress = 'Not  run yet';
      return ant;
    });
    this.setState({
      ants: updatedAnts
    });
  }

  /**  
  Call generateAntWinLikelihoodCalculator on each ant and pass in callback
  to add progress/winChance property to each ant. Call setState after updating
  each ant. Check progress of each ant as well. 

  Too much logic!! Should abstract each ant.
  */
  calculateAntWin(){
    var updatedAnts = this.props.ants.ants.map(ant => {
      generateAntWinLikelihoodCalculator()((chance) => {
        console.log(ant.name);
        ant.progress = 'Calculated';
        ant.winChance = chance;
        console.log(ant.winChance);
        this.setState({ants: updatedAnts});

        //  After updating each ant check if all ants are calculated.
        //  Again, too much logic!
        if (this.state.ants){
          var count = 1;
          this.state.ants.forEach(ant => {
            if (ant.progress === 'Calculated'){
              count++;
            }
          })
          if (count === this.state.ants.length){
            this.setState({progress: 'All calculated'});
          }
        }

        //  I also have to sort the ant array in here based on winChance.
        if (this.state.ants){
          console.log(sortByWinChance(this.state.ants));
          this.setState({ants: sortByWinChance(this.state.ants)});
        }
        this.setState({});


      });
    var antProgress = this.props.ants.ants.map(()=>{
      if (!ant.winChance){
        ant.progress = 'In progress';
        this.setState({ants: updatedAnts});
      } 
    })
      return ant;
    });

    console.log(updatedAnts);
    this.setState({
      ants: updatedAnts,
      progress: 'In Progress'
    });
  }

  render(){

    if (this.state.progress === 'Not yet run'){
      return (
        <div className='table'>
          <BootstrapTable data={this.state.ants}>
            <TableHeaderColumn dataField='name' isKey>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='length'>Length</TableHeaderColumn>
            <TableHeaderColumn dataField='color'>Color</TableHeaderColumn>
            <TableHeaderColumn dataField='weight'>Weight</TableHeaderColumn>
            <TableHeaderColumn dataField='winChance' datasort={true}>Win Chance</TableHeaderColumn>
            <TableHeaderColumn dataField='progress'>Calculation Progress</TableHeaderColumn>
          </BootstrapTable>
          <br/>
          <p>Progress: {this.state.progress}</p>
          <br/>
          <button className='winChanceBtn' onClick={this.calculateAntWin}>
            Calculate Win Chance
          </button>
      </div>
      )
    }

    return(
      <div className='table'>
        <BootstrapTable data={this.state.ants}>
          <TableHeaderColumn dataField='name' isKey>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='length'>Length</TableHeaderColumn>
          <TableHeaderColumn dataField='color'>Color</TableHeaderColumn>
          <TableHeaderColumn dataField='weight' >Weight</TableHeaderColumn>
          <TableHeaderColumn dataField='winChance' datasort={true}>Win Chance</TableHeaderColumn>
          <TableHeaderColumn dataField='progress'>Calculation Progress</TableHeaderColumn>
        </BootstrapTable>
        <br/>
        <p>Progress: {this.state.progress}</p>
        <br/>
        <button className='winChanceBtn' onClick={this.calculateAntWin}>
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
console.log(sortByWinChance);