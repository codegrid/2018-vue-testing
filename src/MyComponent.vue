<template>
  <div>
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    text: String,
  },
}
</script>