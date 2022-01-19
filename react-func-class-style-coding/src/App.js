import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}

var funcStyle = 'color:blue'
var funcId = 0
function FuncComp(props) {
  var numberState = useState(props.initNumber)
  var number = numberState[0]
  var setNumber = numberState[1]

  var [_date, setDate] = useState((new Date()).toString())
  useEffect(function() {
    console.log('%cFunc => useEffect A (componentDidMount&componentDidUPdate) '+(++funcId), funcStyle)
    document.title = number + ' : ' + _date
  })

  useEffect(function() {
    console.log('%cFunc => useEffect B (componentDidMount&componentDidUPdate) '+(++funcId), funcStyle)
    document.title = number + ' : ' + _date
  })
  console.log('%cFunc => render '+(++funcId), funcStyle)
  return(
    <div className="container">
      <h2>function style component</h2>
      <p>Number: {number}</p>
      <p>Date: {_date}</p>
      <input type="button" value="random" onClick={
        function() {
          setNumber(Math.random())
        }
      }></input>
      <input type="button" value="date" onClick={
        function() {
          setDate((new Date()).toString())
        }
      }></input>
    </div>
  )
}

var classStyle = 'color:red'
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: (new Date()).toString()
  }
  UNSAFE_componentWillMount() {
    console.log('%cclass => componentWillMount', classStyle)
  }
  componentDidMount() {
    console.log('%cclass => componentDidMount', classStyle)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('%cclass => shouldComponentUpdate', classStyle)
    return true
  }
  UNSAFE_componentWillUpdate() {
    console.log('%cclass => componentWillUpdate', classStyle)
  }
  componentDidUpdate(nextProps, nextState) {
    console.log('%cclass => componentDidUpdate', classStyle)
  }
  render() {
    console.log('%cclass => render', classStyle)
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number: {this.state.number}</p>
        <p>Date: {this.state.date}</p>
        <input type="button" value="random" onClick={
          function() {
            this.setState({
              number: Math.random()
            })
          }.bind(this)
        }></input>
        <input type="button" value="date" onClick={
          function() {
            this.setState({
              date: (new Date()).toString()
            })
          }.bind(this)
        }></input>
      </div>
    )
  }
}


export default App;
