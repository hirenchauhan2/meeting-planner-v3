<template>
  <div>
    <h1>{{user.profile.fname}}</h1>
  </div>
</template>

<script>
export default {
  middleware: 'autheticated',
  props: ['user']
}
</script>
