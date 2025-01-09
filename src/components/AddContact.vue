<template>
    <div class="container mt-5">
        <h2>Add New Contact</h2>
        <form @submit.prevent="addContact">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="contact.name" required/>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="contact.email" required/>
            </div>
            <div class="mb-3">
                <label for="contact" class="form-label">Contact</label>
                <input type="text" class="form-control" id="contact" v-model="contact.contact" required/>
            </div>
            <button type="submit" class="btn btn-primary">Add Contact</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AddContact',
    data() {
        return {
            contact: {
                name: '',
                email: '',
                contact: ''
            }
        };
    },
    methods: {
        async addContact() {
            try {
                const response = await axios.post('http://192.168.0.131:8000/api/users/store', this.contact);
                this.$router.push('/');
                // Reset form fields
                this.contact.name = '';
                this.contact.email = '';
                this.contact.contact = '';
                console.log(response.data);
            } catch (error) {
                console.error('Error adding contact:', error);
                alert('Failed to add contact. Please try again.');
            }
        }
    }
};
</script>
