import React, { Component } from 'react';

class AntRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      progress: 'Not yet run',
      name: this.props.name,
      
    }

  }

  generateAntWinLikelihoodCalculator() {
    var delay = 7000 + Math.random() * 7000;
    var likelihoodOfAntWinning = Math.random();
  
    return function(callback) {
      setTimeout(function() {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }

  render(){
    return(
      <div className='ant'>

      </div>
    )
  }

}

export default AntRow;