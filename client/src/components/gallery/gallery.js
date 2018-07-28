import React, { Component } from 'react';
import './gallery.css';
import { Link } from 'react-router-dom';

class Gallery extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.filterList = this.filterList.bind(this);
    }

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

    handleChange(event) {
        this.setState({gallery: this.state.gallery});
    }

    filterList() {
        return this.state.gallery
            .filter(gallery => {
                let filter = document.getElementById('filter-collection').value;
                if(filter === 'All')
                    return gallery;
                else if(filter === 'Have it')
                    return gallery.have_it == true;
                else if(filter === 'Want it')
                    return gallery.have_it == false;
        });
    };

    render() {

        const listMap = this.filterList().map(item => {
            return (
                <div key={ item.id } className="image_box">
                    <Link to={`/item/${item.item_name}`}>
                        <img alt="some pic" src={ item.images[0] }/>
                    </Link>
                </div>
            );
        });

        return (
            <div>
                <header>
					<h1 className="header">Welcome to My Collection</h1>
                    <div className="select">
                        <select name="text" id="filter-collection" onChange={ this.handleChange }>
                            <option value="All">All</option>
                            <option value="Have it">Have it</option>
                            <option value="Want it">Want it</option>
                        </select>
                    </div>
				</header>
                <div className="images_area">
                    { listMap }
                </div>
            </div>
        );
    }
}

export default Gallery;
