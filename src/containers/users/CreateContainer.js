import React, { Component } from 'react';
import DB from '../../Firestore';
import Swal from 'sweetalert2';
import CreateUser from '../../components/users/Create';

export default class CreateContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }

        this.createUser = this.createUser.bind(this);
    }

    async createUser() {

        const { value: formValues } = await Swal.fire({
            title: 'Create user',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Surname">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Age">' +
                '<input id="swal-input4" class="swal2-input" placeholder="Email">' +
                '<input id="swal-input5" class="swal2-input" placeholder="Phone">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value,
                    document.getElementById('swal-input4').value,
                    document.getElementById('swal-input5').value
                ]
            },
        })

        if (formValues) {
            console.log(formValues);
            let data = Object.assign({}, formValues);
            this.setState({
                user: {
                    nombre: data[0],
                    apellido: data[1],
                    edad: data[2],
                    email: data[3],
                    telefono: data[4],
                }
            })

            const { user } = this.state;
            DB.collection('users').add(user)
                .then(function (docRef) {
                    Swal.fire({
                        type: 'success',
                        title: 'User created succesfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    }

    render() {
        return (
            <div>
                <CreateUser createUser={this.createUser} />
            </div>
        )
    }
}
