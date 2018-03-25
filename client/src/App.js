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
				<div class="footer">
					<p class="col">Copyright 2018</p>
					<p class="col">Design by <a target="_blank" href="https://github.com/juliansal">Julio Salguero</a></p>
				</div>
			</div>
		);
	}
}

export default App;

