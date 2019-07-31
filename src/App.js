import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: 5,
      level: 0,
      num: 0,
      gameStart: false,
      timerON: false
    }
  }

  startGame = () => {
    var newNum = Math.floor(Math.random() * ((Math.pow(10, this.state.level+1)-1)-Math.pow(10, this.state.level))) + Math.pow(10, this.state.level)
    this.setState({
      num: newNum,
      gameStart: true,
      timerON: true
    })

    var timer = setInterval(() => {
      var count1 = this.state.count;
      if(count1===0){
        clearInterval(timer)
        this.setState({
          count: 5,
          timerON: false
        })
      } else {
        this.setState({
        count: count1-1,
        timerON: true
        })
      }
    },1000)


  }

    
   
  
  
 render() {
    return (
      <div>
        {
          !this.state.gameStart ? <button onClick={this.startGame}>START THE GAME</button> :
        
        
          <Card 
            num={this.state.num}
            level={this.state.level} 
            func={()=>{
              if (this.state.num == this.state.input) {
                var lvlUp = this.state.level + 1
                this.setState({
                            level: lvlUp, 
                            input: ''
                            })
                this.startGame()
              } else {
                this.setState({level: 0, gameStart: false})
              }
            }}
            timerON={this.state.timerON}
            count={this.state.count}
            changefunc={(e)=>{
              this.setState({
                input: e.target.value
              })
            }}
          />
        }
      </div>
    )
  }
}

function Card(props){
  return <div>
          <h1>ЗАПОМНИ ЧИСЛО!</h1>
          {
            !props.timerON ? <p> </p> : <h3> {props.count} секунд</h3>
          }
          {
            props.timerON ? <h1>{props.num}</h1> : <input onChange={props.changefunc} />
          }
          {
            props.timerON ? <p> </p> : <button onClick={props.func}>CLICK</button>
          }
          
          <p>LEVEL: {props.level}</p>
        </div>
}

Card.defaultProps = {
  num: 'Все пошло по пизде'
}

Card.propTypes = {
  num: PropTypes.number,
  level: PropTypes.number,
  func: PropTypes.func.isRequired,
  changefunc: PropTypes.func.isRequired
}

export default App;
