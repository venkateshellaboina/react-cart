import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component
{
  constructor(props){
    super(props);
    this.state={
      response : '',
      x: 0,
      name : '',
      description : '',
      price :0,
      quantity : 0
    };
    
  }

  
  handle(e)
  {
    e.preventDefault();
    $.post("http://localhost:5000/add",//using a ajax call
     {
      name : this.state.name,
      description : this.state.description,
      price : this.state.price,
      quantity : this.state.quantity

    }, function(data) {
      console.log('Data back ' + JSON.stringify(data))
    })

    
  }
  modify(event){
    this.setState({
      name : document.getElementById('name').value,
      description : document.getElementById('description').value,
      price : document.getElementById('price').value,
      quantity : document.getElementById('quantity').value
    })
  }
  
  render() 
  {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{align: 'center'}}>

          <h1>ADD TO CART</h1>
         	<form onSubmit={(e) => {this.handle(e)} }>
         	<pre>
         	Item name   :	<input type="text" id="name" value={this.state.name} onChange={(event) =>{ this.modify(event)} }/> <br></br>
         	Description :	<input type="text" id="description" value={this.state.description} onChange={(event) => {this.modify(event)} }/> <br></br>
         	price        :	<input type="number" id="price" value={this.state.price} onChange={(event) => {this.modify(event)} }/> <br></br>
         	quantity     :	<input type="number" id="quantity" value={this.state.quantity} onChange={(event) => {this.modify(event)} }/> <br></br>
         	<input type="submit" name="Add" value="Add to cart" onClick={() => { this.setState( { x : this.state.x+1 }); } } />
          </pre>
          </form>
          <h1>total items are:{this.state.x} </h1>
        </div>

      </div>
    );
  }
}

export default App;
