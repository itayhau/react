import React from 'react';

const Superheros = ({heroes, delete_hero}) =>
 {
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      
     console.log(heroes, delete_hero)
     var z = 0
     const heroe_jsx_list = heroes.map(hiro => {
        const {id, hero, avatar, power} = hiro
        return ( 
        <div key={id} style={{
            backgroundColor: getRandomColor(),
            padding: '12px',
            borderRadius: '2px',
            width: '100%'
        }}>
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

export default Superheros
