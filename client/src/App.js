import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Gallery from './components/gallery/gallery';
import Item from './components/gallery-item/item';

class App extends Component {
	constructor() {
		super();
		document.title = "Collect App";
	}

	render() {
		return (
			<div className="container">
				<Switch>
					<Route exact path="/" component={Gallery}/>
                	<Route path="/item/:name" component={Item}/>
                </Switch>
			</div>
		);
	}
}

export default App;

