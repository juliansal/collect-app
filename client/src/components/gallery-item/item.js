import React, { Component } from 'react';
import './item.css';

class Item extends Component {
    state = {
        galleryItem: {
            id: '1',
            images: ['']
		},
		havesImgs: {
			have: '',
			want: ''
		}
            
	};

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params);
		fetch('/api/gallery')
			.then(res => res.json())
            .then(gallery => {
                const galleryItem = gallery.find(item => (item.item_name == params.name));
                this.setState({galleryItem}, () => console.log('Customer fetched...', galleryItem));
			});
			
		fetch('/api/have')
			.then(res => res.json())
			.then(data => {
				const have = data.have;
				const want = data.want;
				this.setState({
					havesImgs: {
						have,
						want
					}
				}, () => console.log('Customer fetched...', this.state.havesImgs.have));
			});
    }

    getFirstImage() {
        let firstImg = this.state.galleryItem.images[0];
        
        return firstImg;
	}
	
	getWantHave() {
		let haveWant = this.state.galleryItem.have_it;
		if(haveWant == true) {
			return this.state.havesImgs.have;
		} else {
			return this.state.havesImgs.want;
		}
	}
    
    render() {
        return (
            <div>
                <h1 className="header">Welcome to My Small Pop! Collection</h1>
		        <div className="profile_area">
					<div className="profile profile_img">
						<img src={ this.getFirstImage() } />
					</div>
					<div className="profile profile_text">
						<p><span className="text_label">Name: </span>{ this.state.galleryItem.item_name }</p>
						<p><span className="text_label">Have it: </span><img className="have-want-icon" src={ this.getWantHave() } /></p>
						<p><span className="text_label">Item model #: </span>{ this.state.galleryItem.id }</p>
						<p><span className="text_label">Description: </span>{ this.state.galleryItem.description }</p>
					</div>
				</div>
			</div>
        );
    }
}

// const Item = (props) => {
//     const galleryItem = fetch('/api/gallery')
//         .then(res => res.json())
//         .then(gallery => {
//             const galleryItem = gallery.find(item => (item.item_name == props.name));
//             //this.setState({galleryItem}, () => console.log('Customer fetched...', galleryItem));
//     });

//     return (
//         <div className="container">
//                 <h2>Gallery Item</h2>
//                 { console.log(this.state.galleryItem.id) }
//                 <h2>{ this.state.galleryItem.item_name }</h2>
//         </div>
//     )
// }

export default Item;