import React, { Component } from 'react';
import Swal from 'sweetalert2';
import DB from '../../Firestore';
import ShowUsers from '../../components/users/Show';

export default class Show extends Component {

    state = {
        users: [],
        userEdit: {}
    }

    componentDidMount() {
        DB.collection('users').onSnapshot((querySnapshot) => {
            this.setState({
                users: querySnapshot.docs.map(doc => {
                    return { id: doc.id, data: doc.data() }
                })
            })
        })
    }

    async editUser(id) {
        const user = this.state.users.filter(user => {
            return user.id === id
        })

        const { value: formValues } = await Swal.fire({
            title: 'Edit',
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
            }
        })

        if (formValues) {
            let data = Object.assign({}, formValues);
            
            this.setState({
                userEdit: {
                    nombre: data[0] ? data[0] : user[0].data.nombre,
                    apellido: data[1] ? data[1] : user[0].data.apellido,
                    edad: data[2] ? data[2] : user[0].data.edad,
                    email: data[3] ? data[3] : user[0].data.email,
                    telefono: data[4] ? data[4] : user[0].data.telefono,
                }
            })

            const { userEdit } = this.state;
            DB.collection('users').doc(id).update(userEdit)
                .then(function () {
                    console.log("Document successfully updated!");
                })
                .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });

        }
    }

    deleteUser(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Once deleted, your data cannot be recovered",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete this user!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.value) {
                DB.collection('users').doc(id).delete().then(function () {
                    Swal.fire(
                        'Borrado!',
                        'This user has deleted.',
                        'success'
                    )
                    console.log("Document successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });

            }
        })
    }

    render() {
        const { users } = this.state;
        return (
            <>
                <ShowUsers
                    users={users}
                    editUser={this.editUser.bind(this)}
                    deleteUser={this.deleteUser.bind(this)}
                />
            </>
        )
    }
}