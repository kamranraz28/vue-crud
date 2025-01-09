<template>
  <div class="container mt-5">
    <h2>Edit Contact</h2>

    <!-- Display error message if there is one -->
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <form @submit.prevent="updateContact">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="contact.name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="contact.email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="contact" class="form-label">Contact</label>
        <input
          type="text"
          class="form-control"
          id="contact"
          v-model="contact.contact"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Update Contact</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditContact",
  props: ["id"],  // Receive `id` as a prop from the route
  data() {
    return {
      contact: {
        name: "",
        email: "",
        contact: "",
      },
      errorMessage: "", // For displaying error messages
    };
  },
  created() {
    this.editContacts();  // Fetch contact data when the component is created
  },
  methods: {
    async editContacts() {
      const contactId = this.id;  // Access the `id` prop
      let url = `http://192.168.0.131:8000/api/users/edit/${contactId}`;
        const response = await axios.get(url);
        this.contact = response.data.contact;
    },
    async updateContact() {
      const contactId = this.id;  // Access the `id` prop
      let url = `http://192.168.0.131:8000/api/users/update/${contactId}`;

      try {
        const response = await axios.put(url, this.contact);
        if (response.status === 200) {
          this.$router.push({ path: "/", state: { successMessage: "Contact updated successfully!" } });
        } else {
          this.errorMessage = "Failed to update contact. Please try again later.";
        }
      } catch (error) {
        console.error("Error updating contact:", error);
        this.errorMessage = "Failed to update contact. Please try again later.";
      }
    },
  },
};
</script>
