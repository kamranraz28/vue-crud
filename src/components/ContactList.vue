<template>
    <div class="container">

        <div v-if="successMessage" class="alert alert-success">
            {{ successMessage }}
        </div>

        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody v-for="(contact, index) in contacts" :key="contact.id">
                <tr class="table-secondary">
                    <th scope="row">{{ index + 1 }}</th>
                    <th scope="row">{{ contact.name }}</th>
                    <th scope="row">{{ contact.email }}</th>
                    <th scope="row">{{ contact.contact }}</th>
                    <th scope="row">
                        <button class="btn btn-danger" @click="deleteContact(contact.id)">Delete</button>
                        <router-link :to="{ name: 'EditContact', params: { id: contact.id } }" class="btn btn-warning ml-2">
                            Edit
                        </router-link>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ContactList',
    data() {
        return {
            contacts: [],
            successMessage: '',
        };
    },
    created() {
        this.getContacts();
    },
    methods: {
        async getContacts() {
            let url = 'http://192.168.0.131:8000/api/users';
            const response = await axios.get(url);
            this.contacts = response.data.contacts; // Assign response data to contacts
        },
        async deleteContact(contactId) {
            const response = await axios.delete(`http://192.168.0.131:8000/api/users/delete/${contactId}`);
            if (response.status === 200) {
                this.contacts = this.contacts.filter(contact => contact.id !== contactId);
                this.successMessage = 'Contact deleted successfully!';
            }
        }
    },
    mounted() {
        console.log('Contact List Component Mounted');
    }
};
</script>
