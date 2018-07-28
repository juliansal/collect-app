import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashboardEdit extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        galleryItem: {
            id: '',
            images: ['']
		},
		havesImgs: {
			have: '',
			want: ''
		}
            
	};

    componentWillMount() {
        const { match: { params } } = this.props;
        console.log(params);
		fetch('/api/gallery')
			.then(res => res.json())
            .then(gallery => {
                const galleryItem = gallery.find(item => (item.id == params.id));
                this.setState({galleryItem}, () => console.log('Customer fetched...', galleryItem));

                this.defaultValues(this.state);
			});
    }

    defaultValues(val) {
        document.getElementById('idField').value = val.galleryItem.id;
        document.getElementById('nameField').value = val.galleryItem.item_name;
        document.getElementById('descField').value = val.galleryItem.description;
    }

    handleSubmit(e) {
        e.preventDefault();

        let allImages = this.state.galleryItem.images;

        let fields = {
            idField: document.getElementById('idField').value,
            nameField: document.getElementById('nameField').value,
            descField: document.getElementById('descField').value,
            imageField: allImages.concat(document.getElementById('imageField').value),
            haveItBox: document.getElementById('haveItBox').checked
        }

        if(fields.idField < 0 || fields.idField == "") {
            console.log("break");
            return ;
        }

        if(fields.nameField == "" || fields.descField == "") {
            console.log("break");
            return ;
        }

        fetch('/api/gallery/' + this.state.galleryItem.id, {
            method: 'put', 
            body: JSON.stringify(fields),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(JSON.stringify(fields));
        });

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label htmlFor="idField">Id</label>
                        <input type="text" placeholder="id" id="idField" />

                        <label htmlFor="nameField">Name</label>
                        <input type="text" placeholder="Name" id="nameField" />

                        <label htmlFor="descField">Description</label>
                        <textarea type="text" placeholder="Description" id="descField" />

                        <label htmlFor="imageField">Image</label>
                        <input type="file" ref={input => this.fileInput = input} id="imageField" />

                        <div className="float-left">
                            <input type="checkbox" id="haveItBox" />
                            <label className="label-inline" htmlFor="haveItBox">Do I Have It?</label>
                        </div>

                        <div className="float-right">
                            <input className="button-primary" type="submit" value="Save" />
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default DashboardEdit;