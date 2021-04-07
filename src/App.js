import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Input from './Input/Input';

class App extends Component {
  state = {
    persons:[
      {id: 0, name:'Miki', age: 21},
      {id: 1, name:'Mike', age: 22},
      {id: 2, name:'John', age: 23},
      {id: 3, name:'Dan', age: 32},
      {id: 4, name:'Steve', age: 42},
      {id: 5, name:'Moe', age: 28},
      {id: 6, name:'Phil', age: 29}
    ],
    otherState:'some other value'
  };


  switchNameHandler = (name) => {
    this.setState(
      {
        persons:[
                {name: name, age: 21},
                {name:'Mike', age: 22}
                ],
        showPersons: false
  
  });
  }

  togglePersonsHandler = () => {
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (index) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({persons: persons});
  }

// add the curly braces around the div to inject javascript code into JSX, use a ternary
//expression
  render() {

    let persons = null;
    if(this.state.showPersons){
        persons = (
          <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            click={() => this.deletePersonHandler(index)} 
            name = {person.name} 
            age = {person.age}
            key = {person.id}/>
          })

          }
        </div>
        );
    }
    return (
      <div className="App">

        <h1>Hi, I'm a React App</h1>
        <button onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}

        <Input inputType= "input" />
      </div>
    );
  }
}

export default App;
