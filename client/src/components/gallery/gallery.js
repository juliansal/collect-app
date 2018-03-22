import React, { Component } from 'react';
import './gallery.css';
import { Link } from 'react-router-dom';

class Gallery extends Component {
    state = {
		gallery: []
	};

    componentWillMount() {
		fetch('/api/gallery')
			.then(res => res.json())
            .then(gallery => this.setState({gallery}, () => console.log('Customer fetched...', gallery)));
        
    }
    
    render() {
        return (
            <div>
                <header>
					<h1 className="header">Welcome to My Collection</h1>
				</header>
                <div className="images_area">
                {   
                    this.state.gallery.map(item => 
                        <div key={ item.id } className="image_box">
                            <Link to={`/item/${item.item_name}`}>
                                <img alt="some pic" src={ item.images[0] }/>
                            </Link>
                        </div>
                    )
                }
                </div>
            </div>
        );
    }
}

export default Gallery;
