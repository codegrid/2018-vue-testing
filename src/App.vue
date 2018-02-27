<template>
  <div id="app">
    <div v-if="selectedUser">
      selectedUser:
      {{selectedUser}}
    </div>
    <UsersList
      :users="users"
      @select="onSelect"
      @remove="onRemove"
    />
  </div>
</template>

<script>
import UsersList from './components/UsersList.vue'
import users from './users.json'
export default {
  name: 'app',
  data () {
    return {
      users: null,
      selectedUserId: null,
    }
  },
  created() {
    this.users = users
  },
  computed: {
    selectedUser() {
      return this.users.find(user => user.id === this.selectedUserId)
    },
  },
  methods: {
    onSelect({id}) {
      this.selectedUserId = id
    },
    onRemove({id}) {
      const index = this.users.findIndex((user) => user.id === id)
      this.users.splice(index, 1)
    },
  },
  components: {
    UsersList,
  },
}
</script>
