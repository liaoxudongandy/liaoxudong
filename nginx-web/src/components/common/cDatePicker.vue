<template>

    <v-menu
     
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="p_fieldtab.value"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="p_fieldtab.value"
          :label="p_fieldtab.name"
          v-bind="attrs"
          v-on="on"
          outlined
          hide-details
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="p_fieldtab.value"
        no-title
        scrollable
        @change="$refs.menu.save(p_fieldtab.value)"
      >
      </v-date-picker>
    </v-menu>

</template>
<script>
export default {
  name: "c-date-picker",
  props: {
    p_fieldtab: {
      type: Object,
    },
  },
  data() {
    return {
        menu:false
    };
  },
};
</script>
<style></style>
