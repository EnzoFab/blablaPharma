<template>
  <v-combobox
    v-model="model"
    :filter="filter"
    :hide-no-data="!search"
    :items="items"
    :search-input="search"
    hide-selected
    label="Chercher un mot clés"
    placeholder="liste des mots clés de l'article"
    multiple
    box
  >
    <template v-slot:no-data>
      <v-list-tile>
        <span class="subheading">Créer</span>
        <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
          {{ search }}
        </v-chip>
      </v-list-tile>
    </template>
    <template v-slot:selection="{ item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        :color="`${item.color} lighten-1`"
        :selected="selected"
        label
        dark
        small
      >
        <span class="pr-2">
          {{ item.text }}
        </span>
        <v-icon small @click="parent.selectItem(item)">close</v-icon>
      </v-chip>
    </template>
    <template v-slot:item="{ index, item }">
      <v-list-tile-content>
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          background-color="transparent"
          hide-details
          solo
          @keyup.enter="edit(index, item)"
        ></v-text-field>
        <v-chip v-else :color="`${item.color} lighten-1`" dark label small>
          {{ item.text }}
        </v-chip>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <v-list-tile-action @click.stop>
        <v-btn icon @click.stop.prevent="edit(index, item)">
          <v-icon>{{ editing !== item ? "edit" : "check" }}</v-icon>
        </v-btn>
      </v-list-tile-action>
    </template>
  </v-combobox>
</template>

<script>
import upperFirst from "lodash.upperfirst";
export default {
  name: "KeyWords",
  props: {
    value: { type: Array, default: () => [] }
  },
  data: () => ({
    activator: null,
    attach: null,
    colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
    editing: null,
    index: -1,
    items: [
      { header: "Choisir un mot clé ou en ajouter un " },
      {
        text: "Pharmacie",
        color: "default-green"
      },
      {
        text: "Tutoriel",
        color: "blue"
      },
      {
        text: "Video",
        color: "red"
      },
      {
        text: "Entretien",
        color: "purple"
      }
    ],
    nonce: 1,
    menu: false,
    x: 0,
    search: null,
    y: 0
  }),

  computed: {
    model: {
      get() {
        if (!this.value) {
          return [];
        }

        return this.value.map(keyword => {
          if (typeof keyword === "string") {
            return {
              text: upperFirst(keyword),
              color: "purple"
            };
          }

          return keyword;
        });
      },
      set(val) {
        if (val.length === this.value.length) {
          return;
        }

        const newVal = val.map(v => {
          if (typeof v === "string") {
            const item = {
              text: upperFirst(v),
              color: this.colors[this.nonce - 1]
            };

            this.items = [...this.items, item];

            this.nonce++;

            return item;
          }

          return v;
        });

        this.items = [...this.items, ...newVal];

        this.$emit("input", newVal);
      }
    }
  },

  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.index = index;
      } else {
        this.editing = null;
        this.index = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = val => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    }
  }
};
</script>
