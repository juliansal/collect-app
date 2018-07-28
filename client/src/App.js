import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Gallery from './components/gallery/gallery';
import Item from './components/gallery-item/item';
import Dashboard from './components/dashboard/dashboard';
import DashboardAdd from './components/dashboard/add';
import DashboardEdit from './components/dashboard/edit';

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
					<Route exact path="/dashboard" component={Dashboard}/>
					<Route path="/dashboard/add" component={DashboardAdd}/>
					<Route path="/dashboard/edit/:id" component={DashboardEdit}/>
                </Switch>
				<div className="footer">
					<p className="col">Copyright 2018</p>
					<p className="col">Design by <a target="_blank" href="https://github.com/juliansal">Julio Salguero</a></p>
					<p className="col"><Link to={`/dashboard`} >Manage List</Link></p>
				</div>
			</div>
		);
	}
}

export default App;

