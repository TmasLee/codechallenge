import React, { Component } from 'react';
import './App.css';
import Table from './Table';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      antsArray: null,

    }
  }

  componentDidMount(){
    this.fetchAnts();

  }

  fetchAnts(){
    const query = `{
      ants{
        name
        color
        length
        weight
      }
    }`
    fetch('https://antserver-blocjgjbpw.now.sh/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query})
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log(response.data);
      this.setState({antsArray: response.data});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {

    if (!this.state.antsArray){
      return null
    }

    return (
      <Table ants={this.state.antsArray}/>
    );
  }
}

export default App;

