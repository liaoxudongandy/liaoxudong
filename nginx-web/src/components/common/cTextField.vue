<template>
  <v-text-field
   v-model="p_fieldtab.value"
    :label="p_fieldtab.name"
    outlined
    hide-details
  ></v-text-field>
</template>
<script>
export default {
  name: "c-text-filed",
  props: {
    p_fieldtab: {
      type: Object,
    },
  },
};
</script>
<style></style>
