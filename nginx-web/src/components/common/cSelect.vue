<template>
  <v-select
  v-model="p_fieldtab.value"
    :items="selectItem"
    :menu-props="s_menuProps"
    item-text="text"
    item-value="value"
    hide-details
    :label="p_fieldtab.name"
    outlined
  ></v-select>
</template>
<script>
export default {
  name: "c-select",
  props: {
    p_fieldtab: {
      type: Object,
    },
  },
  data() {
    return {
      selectItem:'',
      s_menuProps: { bottom: true, offsetY: true },

    };
  },
  created() {
     this.selectItem = require (`../common/${this.$props.p_fieldtab.options}.json`)
  },
};
</script>
<style></style>
