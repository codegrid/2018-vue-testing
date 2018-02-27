<template>
  <div
    class="UsersListItem"
    @click="onClick"
    :class="{
      _male: isMale,
      _female: isFemale,
    }"
  >
    <button class="UsersListItem_RemoveButton"
      @click.stop="onClickRemove"
    >
      x
    </button>[
    <span class="UsersListItem_Id">
      {{id}}
    </span>]
    <span class="UsersListItem_Name">
      {{fullName}}
    </span>/
    <span class="UsersListItem_Gender">
      {{gender}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'UsersListItem',
  props: {
    id: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      default: '',
    },
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    },
    isMale() {
      return this.gender === 'male'
    },
    isFemale() {
      return this.gender === 'female'
    },
  },
  methods: {
    onClick() {
      this.$emit('select', {id: this.id})
    },
    onClickRemove() {
      this.$emit('remove', {id: this.id})
    },
  },
}
</script>
