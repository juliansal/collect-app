import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashboardAdd extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        gallery: [],
        value: ''
    };

    componentWillMount() {
    }

    handleSubmit(e) {
        e.preventDefault();

        let fields = {
            idField: document.getElementById('idField').value,
            nameField: document.getElementById('nameField').value,
            descField: document.getElementById('descField').value,
            imageField: document.getElementById('imageField').value,
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

        fetch('/api/gallery/', {
            method: 'post',
            body: JSON.stringify(fields),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res.status);
            console.log(fields);
            this.props.history.push('/dashboard');
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

export default DashboardAdd;