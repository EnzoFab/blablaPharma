<template>
  <v-autocomplete
    v-model="selectedValue"
    cache-items
    clearable
    dense
    flat
    hide-no-data
    solo-inverted
    return-object
    append-icon="search"
    hint="Rechercher par adresse et/ou nom"
    item-text="searchWord"
    label="Rechercher des pharmaciens proche de chez vous"
    :filter="filterItems"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    @click:append="searchPharmacists"
    @keyup.enter.native="searchPharmacists"
    @change="handleChange"
  >
    <template v-slot:item="{ item }">
      <v-list-tile-avatar color="green">
        <v-img v-if="item.picture" :src="item.picture"></v-img>
        <v-icon v-else dark medium>person</v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-text="item.fullName"></v-list-tile-title>
        <v-list-tile-sub-title
          v-text="item.completeAddress"
        ></v-list-tile-sub-title>
      </v-list-tile-content>
    </template>
  </v-autocomplete>
</template>

<script>
import to from "await-to-js";
import words from "lodash.words";
export default {
  name: "PharmacistAutocompleteField",
  data() {
    return {
      searchWord: "",
      items: [],
      isLoading: false,
      selectedValue: null
    };
  },

  asyncComputed: {
    async autoCompleteItems() {
      const [e, result] = await to(
        this.$pharmacist.autocomplete({ q: this.searchWord.trim() || "" })
      );

      return result ? result : this.items;
    }
  },
  computed: {
    search: {
      get() {
        return this.searchWord;
      },
      set(value) {
        if (!value) {
          return;
        }

        if (this.isLoading) {
          // don't fetch new items if we are already fetching items
          return;
        }
        this.searchWord = value;

        // first we look into items to see if there is an item that match the searchWord
        const el = this.items.find(item =>
          words(this.searchWord.trim()).some(word =>
            item.searchWord.includes(word)
          )
        );

        if (el) {
          // we don't need to do a api call if the element exist in the item list
          return;
        }

        this.isLoading = true;

        const formatPharmacist = pharmacist => {
          const completeAddress = `${pharmacist.institutionName} ${
            pharmacist.address
          }, ${pharmacist.postalCode} ${pharmacist.city}`;
          const fullName = `${pharmacist.firstName} ${pharmacist.lastName}`;
          const searchWord = `${fullName}. ${completeAddress}`;
          return { ...pharmacist, completeAddress, fullName, searchWord };
        };

        this.items = this.items.concat(
          this.autoCompleteItems.map(formatPharmacist)
        );

        setTimeout(() => {
          this.isLoading = false;
        }, 250);
      }
    }
  },
  methods: {
    async searchPharmacists() {
      if (this.searchWord && this.searchWord.trim().length > 0) {
        const [e, result] = await to(
          this.$pharmacist.autocomplete({ q: this.searchWord.trim() || "" })
        );

        const data = result ? result : [];
        this.$emit("pharmacistautocompletefield::search", data);
      }
    },
    filterItems(item, queryText, itemText) {
      // override the filter method
      const lowerQueryWords = words(queryText.trim().toLocaleLowerCase());
      const lowerItemText = words(itemText.trim().toLocaleLowerCase());

      return lowerQueryWords.every(query =>
        lowerItemText.some(item => item.includes(query))
      );
    },
    handleChange(data) {
      if (data) {
        this.$emit("pharmacistautocompletefield::search", [data]);
      }
    }
  }
};
</script>
