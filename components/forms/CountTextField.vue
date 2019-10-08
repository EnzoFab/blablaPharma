<template>
  <v-text-field
    outline
    v-model="fieldValue"
    color="default-grey"
    :counter="maxLength"
    :hint="hint"
    :label="label"
    :placeholder="placeholder"
    :rules="fieldRules"
  ></v-text-field>
</template>

<script>
export default {
  name: "CountTextField",
  props: {
    maxLength: { type: Number, default: 20 },
    // add required rule
    required: Boolean,
    rules: { type: Array, default: () => [] },
    value: String | Number,
    hint: String,
    label: String,
    trim: { type: Boolean, default: false },
    placeholder: String
  },
  computed: {
    fieldRules() {
      const rules = [
        ...this.$constraints.maxLength(this.maxLength),
        ...this.rules
      ];

      return this.required ? [...rules, ...this.$constraints.required] : rules;
    },
    fieldValue: {
      get() {
        return this.value;
      },
      set(newVal) {
        if (typeof newVal === "string" && this.trim) {
          this.$emit("input", newVal.trim());
          return;
        }
        this.$emit("input", newVal);
      }
    }
  }
};
</script>
