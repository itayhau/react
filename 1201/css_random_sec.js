import React, { Component } from 'react';

class Superheros extends Component
{
    state = {
        color : '#ffffff',
        carstyle : {
            backgroundColor: '#ffffff',
            padding: '12px',
            borderRadius: '2px',
            width: '100%'
        }
    }
 render(){
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

     const {heroes, delete_hero} =  this.props
     console.log(heroes, delete_hero)

    setInterval(() => {
        //my_color.color = getRandomColor()
        //carstyle.backgroundColor = getRandomColor()
        this.setState({ carstyle : {
            backgroundColor: getRandomColor(),
            padding: '12px',
            borderRadius: '2px',
            width: '100%'
        }})

    }, (1000));

     const heroe_jsx_list = heroes.map(hiro => {
        const {id, hero, avatar, power} = hiro

        return ( 
        <div key={id} style={this.state.carstyle }>
            <p>HERO: {hero}</p>
            <p>AVATAR: {avatar}</p>
            <p>POWER: {power}</p>
            <button className="btn" onClick={() => delete_hero(id)}>X</button>
            <hr/>
        </div>)
    }) 
    return ( 
            <div>
                {heroe_jsx_list}
            </div>
        )

    }
}

export default Superheros
