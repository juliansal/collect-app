import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import axios from 'axios';

class Dashboard extends Component {

    state = {
        gallery: [],
        value: ''
    };

    componentWillMount() {
        this.fetchGallery();
    }

    fetchGallery() {
        fetch('/api/gallery')
			.then(res => res.json())
            .then(gallery => this.setState({gallery}, () => console.log('Customer fetched...', gallery)));
    }

    removeItem(id, k) {
        axios.delete('/api/gallery/' + id)
            .then(res => {
                console.log("deleted");
                this.setState({gallery: this.state.gallery});
                this.forceUpdate();
            });
    }

    render() {
        const listMap = this.state.gallery.map(item => {
            return (
                <tr key={ item.id } className="">
                    <td>
                    <Link to={`/item/${item.item_name}`}>
                        <span>{ item.item_name }</span>
                    </Link>
                    </td>
                    <td className="go-right">
                        <Link className="button" to={`/dashboard/edit/${item.id}`} >Edit</Link>
                        <button className="button" onClick={ this.removeItem.bind(this, item.id) }>Delete</button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h2><Link to={`/`} >Dashboard</Link></h2>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="1">Collectible</th>
                            <th className="go-right">
                                <Link className="button" to={`/dashboard/add`} >Add</Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { listMap }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Dashboard;

