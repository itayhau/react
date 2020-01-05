

What is JSX:
~~~~~~~~~~~~
special syntax for JS
try it:

https://babeljs.io/repl/build/7.0/
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
      </header>
    </div>
	
	
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script type="text/babel">
      class App extends React.Component {
        render(){
          return(
            <div className="app-content">
              <h1>Hello World!!</h1>
              <p>Random number: { Math.random() * 10 }</p>
            </div>
          )
        }
      }
      ReactDOM.render(<App />, document.getElementById('app'));
	  
	  // for fun
	  const elem = <h1>Hello World!</h1>
    </script>
  </body>
  </html>

Run in Live-server...

    class App extends React.Component {
      state = {
        name: 'Ryu',
        age: 30
      }
      render(){
        return(
          <div className="app-content">
            <h1>Hello World!!</h1>
            <p>My name is: { this.state.name } and I am { this.state.age }</p>
          </div>
        )
      }
    }

Install React extension in Chrome
Show it on site in developer tools -- App component (we can see the state)

update the data (age) in devloper tools -> update page!

it adds blue/ red icon on the top left (blue-production, red-development)

goto: https://reactjs.org/
blue icon
open React in developer tools:
  MarkdownEditor > see State value on right. enter text in text box and you will see State > value changes
  Timer > seconds 
also examples in this site for React code

so, we saw that every change it the search causes the page to Render again to reflect the change in the HTML!!!
state modifications -> render again

in the development tools > react there is "Highlight update" which highlights the HTML item which was updated

let's try some events: (see improve below)
~~~~~~~~~~~~~~~~~~~~~~
  <script type="text/babel">
    class App extends React.Component {
      state = {
        name: 'Ryu',
        age: 30
      }
      // 2
      handleMouseOver(e){
        console.log(e); // can see the entire event
        console.log(e.screenX); 
        console.log(e.pageX); 
      }
      // 1
      handleClick(e){
        console.log(e);
        console.log(e.target);
        // console.log(this.state.age); --> will not work. the problem is the thiskeyword. how can we set this?? answer: =>
      }
      // 3
      handleCopy(e){
        console.log(e);
        console.log('Try being original for once');
      }
      render(){
        return(
          <div className="app-content">
            <h1>Hello World!</h1>
            <p>My name is: { this.state.name } and I am { this.state.age }</p>
            <button onClick={this.handleClick}>Click me</button> {/* not -- this.handleClick() will trigger */}
            <button onMouseOver={this.handleMouseOver}>Hover me</button>
            <p onCopy={this.handleCopy}>What we think, we become</p> {/* Ctrl + C */}
          </div>
        )
      }
    }
    ReactDOM.render(<App />, document.getElementById('app'));
  </script>

full events list: (in slides)
https://reactjs.org/docs/events.html#supported-events

Solution for the this:
~~~~~~~~~~~~~~~~~~~~~
      handleMouseOver = (e) => {
        console.log(e.target, e.pageX);
      }
      handleClick = (e) => {
        console.log(e.target);
        console.log(this.state);
          this.setState({
             age:this.state.age+1
        });
      }
      handleCopy = (e) => {
        console.log('Try being original for once');
      }

improve:
~~~~~~~~
    <button onClick={this.handleClick} name="btn1">Click me</button> {/* not -- this.handleClick() will trigger */}
      // 1
        handleClick(e){
          console.log(e);
          console.log(e.target);
          let btn = e.target;
          console.log(btn)
          
          for(let f in btn)
          {
            console.log(`${f} : ${btn[f]}`)
          }
          console.log(btn.name)
          // console.log(this.state.age); --> will not work. the problem is the thiskeyword. how can we set this?? answer: =>
        }
          	  
	  
Forms:
~~~~~~
<body>
  <div id="app"></div>
  <script type="text/babel">
    class App extends React.Component {
      state = {
        name: 'Ryu',
        age: 30
      }
      // 1
      handleChange = (e) => {
        this.setState({
          name: e.target.value
        })
      }
      // 2
      handleSubmit = (e) => {
        e.preventDefault(); // default action is page refresh. we want to prevent that. it's simple JS
        console.log('form submitted', this.state);
      }
      render(){
        return(
          <div className="app-content">
            <h1>My name is {this.state.name}</h1>
            <form onSubmit={this.handleSubmit}>  {/* why don't we do button onClock? answer: because also ENTER submits the form */}
              <input type="text" onChange={this.handleChange} /> {/* call handleChange */}
              <button>Submit</button>
            </form>
          </div>
        )
      }
    }
    ReactDOM.render(<App />, document.getElementById('app'));
  </script>
</body>

Upgrade to full application:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
installation in ppt
npx create-react-app my-app
cd my-app
npm run
............ but for demo.... show starter folder only:
D:\work\bottomline\29.04\reactjs\demo2\starter , with npm run ...

show:
index.js:
  import App from './App';
  ReactDOM.render(<App />, document.getElementById('root')); 
  export
is connected to index.HTML:
    <div id="root"></div>

now, hello world:
~~~~~~~~~~~~~~~~~
remove app.css
remove app.test
remove from App.js: import logo from './logo.svg';

modify App.js:
~~~~~~~~~~~~~~
  import React, { Component } from 'react';
  class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World!</h1>
        </header>
      </div>
    );
  }
  }
export default App;

  - root component is the base component
  
  next example:
  - create class Cars.js and copy from App.js
Cars.js:
~~~~~~~~
import React, { Component } from 'react';
class Cars extends Component {
  render() {
    return (
      <div >
          <div>Brand: Honda</div>
          <div>Model: Civic</div>
          <div>Color: Black</div>
      </div>
    );
  }
}
export default Cars;

App.js:
~~~~~~~
import React, { Component } from 'react';
import Car from './Cars';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World!</h1>
          <Car />
        </header>
      </div>
    );
  }
}
export default App;

- explore in dev tools React 

why do we need components?
- modular programming
- multi usage
- state

------ sending parameters to Component:

Cars.js:
~~~~~~~~
import React, { Component } from 'react';

class Cars extends Component {
  render() {
    // 1
	// console.log(this.props);
	// 3.1
    const { brand, model, color } = this.props;
    return (
      <div >
		  // 2 -- <div> Brand: { this.props.brand }</div>
		  // 3.2
          <div>Brand: { brand }</div> 
          <div>Model: { model }</div>
          <div>Color: { color }</div>
      </div>
    );
  }
}
export default Cars;

App.js:
~~~~~~~
import React, { Component } from 'react';
import Car from './Cars';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World!</h1>
          <Car brand="Honda" model="Civic" color="black"/>
          <br/>
          <Car brand="Ferrari" model="Testa Rossa" color="red"/>
          <br/>
          <Car brand="Chevrolet" model="calvalier" color="green"/>
        </header>
      </div>
    );
  }
}
export default App;

f12 - react tools - modify properties

------ ouputiing list of cars:
App.js:
~~~~~~~
import React, { Component } from 'react';
import Car from './Cars';
class App extends Component {
  state = {
    cars: [
	  // start without id, show warning and then add id
      { brand: "Honda", model:"Civic", color:"black", id: 1},
      { brand: "Ferrari", model:"Testa Rossa", color:"red", id: 2},
      { brand: "Chevrolet", model:"Cicalvaliervic", color:"green", id: 3}
    ]
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World!</h1>
          <Car cars={this.state.cars} />
        </header>
      </div>
    );
  }
}
export default App;

Cars.js:
~~~~~~~~
import React, { Component } from 'react';
class Cars extends Component {
  render() {
    const { cars } = this.props;

    // or copy this directly into the return (below)
    const carsList = cars.map(car => { 
    return (
      <div key={car.id}>
          <div>Brand: { car.brand }</div>
          <div>Model: { car.model }</div>
          <div>Color: { car.color }</div>
          <br/>
      </div>
    );
  });
  return (
      <div >
      { carsList }
      </div>
  )
  }
}

export default Cars;

--- container components vs UI components (show slides)

Cars.js:
~~~~~~~~
(1)
// this will make an error since there is no this.props!!
// see below till final

import React, { Component } from 'react';
const Cars = () => {
  const { cars } = this.props; // error!!! only props [its not on this]
  const carsList = cars.map(car => { 
    return (
      <div key={car.id}>
          <div>Brand: { car.brand }</div>
          <div>Model: { car.model }</div>
          <div>Color: { car.color }</div>
          <br/>
      </div>
    );
  });
  return (
      <div >
      { carsList }
      </div>
  )
 };
export default Cars;

(2)
change the function to 
const Cars = (props) => { 
props.cars (without this) } // this could work

(3)
best way:
const Cars = ({ cars }) => { ... }
ALSO remove import of Component...

so... finally:
import React from 'react';
const Cars = ({ cars }) => {
  const carsList = cars.map(car => { 
    return (
      <div key={car.id}>
          <div>Brand: { car.brand }</div>
          <div>Model: { car.model }</div>
          <div>Color: { car.color }</div>
          <br/>
      </div>
    );
  });
  return (
      <div >
      { carsList }
      </div>
  )
};
export default Cars;



now modify:

App.js:
~~~~~~~
the same.

--- conditional

App.js:
~~~~~~~
Adding year:

import React, { Component } from 'react';
import Car from './Cars';
class App extends Component {
  state = {
    cars: [
      { brand: "Honda", model:"Civic", color:"black", year: 2018, id: 1},
      { brand: "Ferrari", model:"Testa Rossa", color:"red", year: 2019, id: 2},
      { brand: "Chevrolet", model:"Cicalvaliervic", color:"green", year: 2020, id: 3}
    ]
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World!</h1>
          <Car cars={this.state.cars} />
        </header>
      </div>
    );
  }
}
export default App;

Cars.js:
~~~~~~~~
(1)
import React from 'react';
const Cars = ({ cars }) => {
  const carsList = cars.map(car => { 
    if (car.year > 2018)
      return (
        <div key={car.id}>
            <div>Brand: { car.brand }</div>
            <div>Model: { car.model }</div>
            <div>Color: { car.color }</div>
            <div>Color: { car.year }</div>
            <br/>
        </div>
      );
    else
    return null;
  });
  return (
      <div >
      { carsList }
      </div>
  )
 
};
export default Cars;

(2)
import React from 'react';
const Cars = ({ cars }) => {
  const carsList = cars.map(car => { 
    return car.year > 2018 ?  (
        <div key={car.id}>
            <div>Brand: { car.brand }</div>
            <div>Model: { car.model }</div>
            <div>Color: { car.color }</div>
            <div>Color: { car.year }</div>
            <br/>
        </div>
      ) :  null;
  });
  return (
      <div >
      { carsList }
      </div>
  )
  
};
export default Cars;

(3)
import React from 'react';
const Cars = ({ cars }) => {
  return (
      <div >
      { cars.map(car => { 
    return car.year > 2018 ?  (
        <div key={car.id}>
            <div>Brand: { car.brand }</div>
            <div>Model: { car.model }</div>
            <div>Color: { car.color }</div>
            <div>Color: { car.year }</div>
            <br/>
        </div>
      ) :  null; }) }
      </div>
  )
  
};
export default Cars;

----------------- forms

create AddCar.js
~~~~~~~~~~~~~~~~
import React, { Component } from 'react'
class AddCar extends Component {
  state = {
    brand: null,
    model: null,
    color: null,
    year: null
  }
  handleChange = (e) => {
    // console.log(e.target.id, e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="brand">Brand:</label>  
          <input type="text" id="brand" onChange={this.handleChange} /> --- goes into e.target.id
          <label htmlFor="model">Model:</label>
          <input type="text" id="model" onChange={this.handleChange} /> --- goes into e.target.id
          <label htmlFor="color">Color:</label>
          <input type="text"id="color" onChange={this.handleChange} /> --- goes into e.target.id
          <label htmlFor="year">Year:</label>
          <input type="number"id="year" onChange={this.handleChange} />   --- goes into e.target.id        
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
export default AddCar

App.js:
~~~~~~~
import React, { Component } from 'react';
import Car from './Cars';
import AddCar from './AddCar';
class App extends Component {
  state = {
    cars: [
      { brand: "Honda", model:"Civic", color:"black", year: 2018, id: 1},
      { brand: "Ferrari", model:"Testa Rossa", color:"red", year: 2019, id: 2},
      { brand: "Chevrolet", model:"Cicalvaliervic", color:"green", year: 2020, id: 3}
    ]
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World!</h1>
          <Car cars={this.state.cars} />
          <AddCar  />
        </header>
      </div>
    );
  }
}
export default App;

----------------- how to add the form input into the array (add car to array)

REMOVE the condition from Cars.js
Cars.js:
~~~~~~~~
import React from 'react';
const Cars = ({ cars }) => {
  const carsList = cars.map(car => { 
    return (
        <div key={car.id}>
            <div>Brand: { car.brand }</div>
            <div>Model: { car.model }</div>
            <div>Color: { car.color }</div>
            <div>Year: { car.year }</div>
            <br/>
        </div>
      );
  });
  return (
      <div >
      { carsList }
      </div>
  ) 
};
export default Cars;

App.js:
~~~~~~~
import React, { Component } from 'react';
import Car from './Cars';
import AddCar from './AddCar';
class App extends Component {
  state = {
    cars: [
      { brand: "Honda", model:"Civic", color:"black", year: 2018, id: 1},
      { brand: "Ferrari", model:"Testa Rossa", color:"red", year: 2019, id: 2},
      { brand: "Chevrolet", model:"Cicalvaliervic", color:"green", year: 2020, id: 3}
    ]
  }
  
  // create method to pass as a prop to AddCar.js
  addCar = (newCar) => {
    console.log(newCar);

	// -------------------
	// ------------------- this do only after updating AddCar.js
	// -------------------
    // will not work -- bad practice to modify state without setState
    // this.state.cars.push({...newCar, id:this.state.cars.length + 1}); 
	
    const carsArr = [...this.state.cars]; // copying the array (spread)
    carsArr.push({...newCar, id:this.state.cars.length + 1});
	
    this.setState ({ cars: carsArr});
    console.log(this.state.cars);
	// -------------------
	
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World!</h1>
          <Car cars={this.state.cars} />
          <AddCar  addCar = {this.addCar}/> --- passing the method
        </header>
      </div>
    );
  }
}
export default App;

AddCar.js:
~~~~~~~~~~
import React, { Component } from 'react'

class AddCar extends Component {
  state = {
    brand: null,
    model: null,
    color: null,
    year: null
  }
  handleChange = (e) => {
    // console.log(e.target.id, e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.addCar(this.state);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="brand">Brand:</label>
          <input type="text" id="brand" onChange={this.handleChange} />
          <label htmlFor="model">Model:</label>
          <input type="text" id="model" onChange={this.handleChange} />
          <label htmlFor="color">Color:</label>
          <input type="text"id="color" onChange={this.handleChange} />
          <label htmlFor="year">Year:</label>
          <input type="number" id="year" onChange={this.handleChange} />          
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
export default AddCar

-------------------- how to delete a car?
(1)
add button to cars screen:
this button needs a delete function, we send it in props

Cars.js:
~~~~~~~~
import React from 'react';
const Cars = ({ cars, deleteCar }) => {
  const carsList = cars.map(car => { 
    return (
        <div key={car.id}>
            <div>Brand: { car.brand }</div>
            <div>Model: { car.model }</div>
            <div>Color: { car.color }</div>
            <div>Year: { car.year }</div>
            <button onClick={() => {deleteCar(car.id)}}>Delete car</button>
            <br/>
        </div>
      );
  });
  return (
      <div >
      { carsList }
      </div>
  )
  
};
export default Cars;

(2)
add deleteCar method and send it as a prop to cars.js
App.js
~~~~~~
import React, { Component } from 'react';
import Car from './Cars';
import AddCar from './AddCar';

class App extends Component {
  state = {
    cars: [
      { brand: "Honda", model:"Civic", color:"black", year: 2018, id: 1},
      { brand: "Ferrari", model:"Testa Rossa", color:"red", year: 2019, id: 2},
      { brand: "Chevrolet", model:"Cicalvaliervic", color:"green", year: 2020, id: 3}
    ]
  }
  addCar = (newCar) => {
    console.log(newCar);

    // will not work -- bad practice
    // this.state.cars.push({...newCar, id:this.state.cars.length + 1}); 
    const carsArr = [...this.state.cars];
    carsArr.push({...newCar, id:this.state.cars.length + 1});
    this.setState ({ cars: carsArr});
    console.log(this.state.cars);
  }
  // ---------------------------- here
  deleteCar = (id) => {
    // console.log(id);
    let cars = this.state.cars.filter(car => {
      return car.id !== id
    });
    this.setState({
      cars
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World!</h1>
          <Car cars={this.state.cars} deleteCar = {this.deleteCar} />
          <AddCar  addCar = {this.addCar}/>
        </header>
      </div>
    );
  }
}
export default App;

--------------------------------------------------- virtual DOM slide


--------------------------------------------------- css in react
(1)
create Car.css
~~~~~~~~~~~~~~
body {
    background: pink
}

(2)
Car.js:
~~~~~~~
import React from 'react';
import './Car.css';
....

(3)
the css will spread on all files!!!!!!!!!
for-example:
update Car.css
~~~~~~~~~~~~~~
body {
    background: pink
}
form {
    background: white;
    border: solid 1px;
}

look? it updated the form!

(4)
solution:
Cars.js:
~~~~~~~~
...
        <div key={car.id} className="car"> 
...

Car.css:
~~~~~~~~
.car {
    background: pink
}

(4.5)
you can also modify index.css:

for example: copy this into index.css
.car {
    background: pink
}

(5)

NOT WORKING IN react 16!:
~~~~~~~~~~~~~~~~~~~~~~~~~~
show transitions..... vendor prefixes!!

CSS vendor prefixes, also sometimes known as or CSS browser prefixes, are a way for browser makers to 
add support for new CSS features before those features are fully supported in all browsers. 
This may be done during a sort of testing and experimentation period where the browser 
manufacturer is determining exactly how these new CSS features will be implemented. 
These prefixes became very popular with the rise of CSS3 a few years ago. 
CSS transitions allows you to change property values smoothly (from one value to another), over a given duration.
-webkit: Android, Chrome, Safari
Car.css
~~~~~~~
.body {
    transition: all 1s;
}
now open dev tools 
Elements > Head > React app > 2nd styles > see inside body:
-webkit-transition: all 1s; 
it added vendor prefix!

(6)
another alternative: CSS module!! using configuration file --- show slide
https://blog.pusher.com/css-modules-react/

const car3 = {
    backgroundColor: '#202020',
    padding: '12px',
    borderRadius: '2px',
    width: '100%'
}

const Cars = ({ cars, deleteCar }) => {
  const carsList = cars.map(car => { 
    return (
        <div key={car.id} style={car3}> 
...			

---------------------------------------------- TODO app
https://materializecss.com/getting-started.html
add CDN to index.html (in public) (only css)

----------------------------------------------------- Lifecycle
- show slides

App.js:
~~~~~~~
  componentDidMount(){
    console.log('component mounted');
  }
  
  // will fire after change- like deleting car
  componentDidUpdate(prevProps, prevState){
    console.log('component updated');
    console.log(prevProps, prevState);
  }
  
  // update will show prev empty PROP because the root has no props
  // if you add you will see the state with one less item in the array
  // if you delete you will see the previous state with one more item in the array
  
  
  you can change Car.js back to class, to add hooks:
  Car.js
  ~~~~~~
  import React, { Component } from 'react'
import './Cars.css';

const car3 = {
    backgroundColor: '#202020',
    padding: '12px',
    borderRadius: '2px',
    width: '100%'
}

class Cars extends Component {
// const Cars = ({ cars, deleteCar }) => {
  componentDidUpdate(prevProps, prevState){
    console.log('AddCar component updated');
    console.log(prevProps, prevState);
  }
  render() {
    const { cars, deleteCar } = this.props;
  const carsList = cars.map(car => { 
    return (
        <div key={car.id} style={car3}> 
            <div>Brand: { car.brand }</div>
            <div>Model: { car.model }</div>
            <div>Color: { car.color }</div>
            <div>Year: { car.year }</div>
            <button onClick={() => {deleteCar(car.id)}}>Delete car</button>
            <br/>
        </div>
      );
  });
  return (
      <div >
      { carsList }
      </div>
  )
  }
  
};
export default Cars;

----------------------------------------------------- Router
(1)
new project for router

(2)
remove app.css
remove app.test
delete logo.svg
remove from App.js: import logo from './logo.svg';

(3)
modify App.js: (starter)
  import React, { Component } from 'react';
  class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World!</h1>
        </header>
      </div>
    );
  }
  }
export default App;

(4)
add material cdn css to public > index.html

(5)
under src , create components folder

Home.js:
~~~~~~~~
import React from 'react'
const Home = () => {
  return (
    <div>
      <div className="container">
        <h4 className="center">Home</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repudiandae repellat illo magni eligendi cupiditate voluptates eius nam voluptate. Incidunt nihil ullam quae quia officia quaerat, deserunt eligendi explicabo totam?</p>
      </div>
    </div>
  )
}
export default Home

Contact.js:
~~~~~~~~~~~
import React from 'react'
const Contact = () => {
  return (
    <div>
      <div className="container">
        <h4 className="center">Contact</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repudiandae repellat illo magni eligendi cupiditate voluptates eius nam voluptate. Incidunt nihil ullam quae quia officia quaerat, deserunt eligendi explicabo totam?</p>
      </div>
    </div>
  )
}
export default Contact

Abouts.js:
~~~~~~~~~~
import React from 'react'
const About = () => {
  return (
    <div>
      <div className="container">
        <h4 className="center">About</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repudiandae repellat illo magni eligendi cupiditate voluptates eius nam voluptate. Incidunt nihil ullam quae quia officia quaerat, deserunt eligendi explicabo totam?</p>
      </div>
    </div>
  )
}
export default About

Navbar.js:  (also in components folder)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React from 'react';
const Navbar = () => {
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <a className="brand-logo">Poke' Times</a>
        <ul className="right">
          <li><a href="/">Home</a></li>
          <li><a href='/about'>About</a></li>
          <li><a href='/contact'>Contact</a></li>
        </ul>
      </div>
    </nav> 
  )
}
export default Navbar

(6)
modify App.js: (for navbar)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  import React, { Component } from 'react';
  import Navbar from './components/Navbar';
  class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App">
          <Navbar />
        </header>
      </div>
    );
  }
  }

export default App;

(7) 
let's hook the router:

npm install react-router-dom

-- you can take it from :
D:\work\bottomline\29.04\reactjs\demo2\router.rar
just FIX these line in App.js:
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/Abouts';

(8)
update App.js:
~~~~~~~~~~~~~~

  import React, { Component } from 'react';
  import Navbar from './components/Navbar';
  import { BrowserRouter, Route } from 'react-router-dom';
  import Home from './components/Home';
  import Contact from './components/Contacts';
  import About from './components/About';

  class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App">
            <Navbar />
            <Route path='/' component={Home} />
            <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} />
          </header>
        </div>
      </BrowserRouter>
    );
  }
  }
export default App;

(9)
this is bad... because we are in subset of /....
solution:

 <Route exact path='/' component={Home} />
 
  (10)
 problem: the page is still been reloaded!!
 
Navbar.js:  (also in components folder)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <a className="brand-logo">Poke' Times</a>
        <ul className="right">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav> 
  )
}
export default Navbar

 - Link prevent the action of request to server and just load the correct component, for the <a> tag.
    see in page it is still <a> tag

(11)	
change to NavLink:
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>

inspect the element, and you can see it added "active" class to the current link and we can modify the CSS for the active link

(12)
call links from code:

Contacts.js:
~~~~~~~~~~~~
import React from 'react'
const Contact = (props) => {
    console.log(props)
  return (
    <div>
      <div className="container">
        <h4 className="center">Contact</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repudiandae repellat illo magni eligendi cupiditate voluptates eius nam voluptate. Incidunt nihil ullam quae quia officia quaerat, deserunt eligendi explicabo totam?</p>
      </div>
    </div>
  )
}
export default Contact

this will be printed:
{history: {…}, location: {…}, match: {…}, staticContext: undefined}

React adds info to the props while routing

let's add redirect after 2 seconds:
Contacts.js:
~~~~~~~~~~~~
import React from 'react'
const Contact = (props) => {
    console.log(props)
    setTimeout( () => { 
        props.history.push('/about') }, 2000);
  return (
    <div>
      <div className="container">
        <h4 className="center">Contact</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repudiandae repellat illo magni eligendi cupiditate voluptates eius nam voluptate. Incidunt nihil ullam quae quia officia quaerat, deserunt eligendi explicabo totam?</p>
      </div>
    </div>
  )
}
export default Contact		

let's try it on navbar.js:
~~~~~~~~~~~~~~~~~~~~~~~~~~
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
const Navbar = (props) => {
  console.log(props)
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <a className="brand-logo">Poke' Times</a>
        <ul className="right">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </div>
    </nav> 
  )
}
export default Navbar

this will be printed:
  {}
Will not work in Navbar.js by default because it is not in the route
will work with higher order component
apply properties to navbar

navbar.js:
~~~~~~~~~~
import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
const Navbar = (props) => {
  console.log(props)
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <a className="brand-logo">Poke' Times</a>
        <ul className="right">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </div>
    </nav> 
  )
}
export default withRouter(Navbar)

we use higher order component
it is a component who wrapps another components and give it powers
import higher order component - withRouter
this is a function: withRouter(Navbar)- it is applying the properties into the component. 
it is super-charging the component
this will also work now:
  setTimeout( () => { 
    props.history.push('/about') }, 2000);  
	
-- slide - higher order component

------------------------------------- high order
create hoc folder (brother of components)
inside create Rainbow.js
~~~~~~~~~~~~~~~~~~~~~~~~
import React from 'react'
const Rainbow = (WrappedComponent) => {
  const colours = ['red', 'pink', 'orange', 'blue', 'green', 'yellow'];
  const randomColour = colours[Math.floor(Math.random() * 6)];
  const className = randomColour + '-text';

  return (props) => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>  
  )
}
export default Rainbow

if you go: <WrappedComponent /> == you will not see the props!!!

About.js:
~~~~~~~~~
import React from 'react'
import Rainbow from '../hoc/Rainbow';
const About = (props) => {
    console.log(props)
  return (
    <div>
      <div className="container">
        <h4 className="center">About</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repudiandae repellat illo magni eligendi cupiditate voluptates eius nam voluptate. Incidunt nihil ullam quae quia officia quaerat, deserunt eligendi explicabo totam?</p>
      </div>
    </div>
  )
}
export default Rainbow(About)


---------------------------------- Axios

npm install axios

we said before ajax should be fired at componentDidMount
funcitonal component cannot uise lifecycle hooks:
so lets convert home to class:

we can use fetch instead of axios


Home.js:
~~~~~~~~
import React, { Component } from 'react'
import axios from 'axios'

class Home extends Component {
  state = {
    posts: []
  }
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/posts/')
      .then(res => {
        console.log(res);
        this.setState({
          posts: res.data.slice(0,10)
        });
      })
  }
  render(){
    const { posts } = this.state
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <div className="post card" key={post.id}>
            <div className="card-content">
              <span className="card-title">{post.title}</span>
              <p>{post.body}</p>
            </div>
          </div>
        )
      })
    ) : (
      <div className="center">No posts to show</div>
    );

    return (
      <div>
        <div className="container">
          <h4 className="center">Home</h4>
          {postList}
        </div>
      </div>
    )
  }
}
export default Home

------------------------------------------- route parameters

show slide

App.js:
~~~~~~~

  import React, { Component } from 'react';
  import Navbar from './components/Navbar';
  import { BrowserRouter, Route } from 'react-router-dom';
  import Home from './components/Home';
  import Contact from './components/Contacts';
  import About from './components/About';
    import Post from './components/Post';

  class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App">
            <Navbar />
            <Route exact path='/' component={Home} />
            <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} />
            <Route path='/:post_id' component={Post} />
          </header>
        </div>
      </BrowserRouter>
    );
  }
  }
export default App;

-- the parameter is here: this.props.match.params.post_id

create post.js:
~~~~~~~~~~~~~~~
import React, { Component } from 'react'
class Post extends Component {
  state = {
    id: null
  }
  
  // ----> this is good time to find out the parameter
  componentDidMount(){ 
    let id = this.props.match.params.post_id;
    this.setState({
      id
    })
  }
  render() {
    return (
      <div className="container">
        <h4>{this.state.id}</h4>
      </div>
    )
  }
}
export default Post

Update app.js:
~~~~~~~~~~~~~~
import Post from './components/Post';
	
-- browse to: http://localhost:3006/2	

we got the parameter!!

----------- now lets print the post! + add click on post in home page opens the post. how? asnwer: link to

update Post.js:
~~~~~~~~~~~~~~~
import React, { Component } from 'react'
import axios from 'axios'

class Post extends Component {
  state = {
    post: null
  }
  componentDidMount(){
    let id = this.props.match.params.post_id;
    axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
      .then(res => {
        this.setState({
          post: res.data
        });
        //console.log(res.data);
      });
  }
  render() {

    const post = this.state.post ? (
      <div className="post">
        <h4 className="center">{this.state.post.title}</h4>
        <p>{this.state.post.body}</p>
      </div>
    ) : (
      <div className="center">Loading post...</div>
    );

    return (
      <div className="container">
        {post}
      </div>
    )
  }
}

export default Post

home.js:
~~~~~~~~
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Home extends Component {
  state = {
    posts: []
  }
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/posts/')
      .then(res => {
        console.log(res);
        this.setState({
          posts: res.data.slice(0,10)
        });
      })
  }
  render(){
    const { posts } = this.state
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <div className="post card" key={post.id}>
            <div className="card-content">
              <Link to={'/' + post.id}>
                <span className="card-title red-text">{post.title}</span>
              </Link>
              <p>{post.body}</p>
            </div>
          </div>
        )
      })
    ) : (
      <div className="center">No posts to show</div>
    );

    return (
      <div>
        <div className="container">
          <h4 className="center">Home</h4>
          {postList}
        </div>
      </div>
    )
  }
}

export default Home

-- browse to home page and click on posts + and try path param

------------------------------------- problem? browse to home + click post, then click About --- and you will see "post loading"
it is because the /about is concverted to :/post_id

(1)
modify App.js:
 <Route path='/posts/:post_id' component={Post} />
 
modify Home.js:
<Link to={'/posts/' + post.id}>
                <span className="card-title red-text">{post.title}</span>
              </Link>
			  
works!
			  
(2)
but what if we don't want to restructure?
answer: switch tag

modify App.js:
import { BrowserRouter, Route , Switch} from 'react-router-dom';
...
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/contact' component={Contact} />
              <Route path='/about' component={About} />
              <Route path='/:post_id' component={Post} /> --- must be last!!!
            </Switch>			  
 
how it works?
when it finds it stops it not continue looking.... 

--------- import images
download pokeball.png INTO the src folder
into Home component

Home.js:
~~~~~~~~~
import Pokeball from '../pokeball.png';
...
render(){
    const { posts } = this.state
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <div className="post card" key={post.id}>
              <img src={Pokeball} alt="a pokeball" />
            <div className="card-content">
              <Link to={'/' + post.id}>
                <span className="card-title red-text">{post.title}</span>
              </Link>
              <p>{post.body}</p>
            </div>
          </div>
        )
      })
    ) : (
      <div className="center">No posts to show</div>
    );

index.css:
~~~~~~~~~~
.post img{
  position: absolute;
  top: 20px;
  left: -100px;
  opacity: 0.6;
}

.post{
  overflow: hidden;
  padding-left: 80px;
}




