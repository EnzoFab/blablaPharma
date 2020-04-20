<template>
  <v-container grid-list-xs fluid fill-height>
    <v-layout row wrap align-top>
      <v-flex xs9>
        <v-autocomplete
          clearable
          dense
          flat
          hide-no-data
          return-object
          solo-inverted
          append-icon="search"
          hint="ex: Marie Dupont Montpellier"
          item-text="searchWord"
          label="Rechercher des pharmaciens proche de chez vous"
          :filter="filterItems"
          :items="filteredItems"
          :loading="isLoading"
          :search-input.sync="search"
          @click:append="searchPharmacists"
          @keyup.enter.native="searchPharmacists"
          @change="handleChange"
        >
          <template v-slot:item="{ item }">
            <v-list-tile-avatar color="green">
              <v-img
                v-if="item.picture"
                :src="item.picture"
                alt="thumbnail"
              ></v-img>
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
      </v-flex>
      <v-flex xs3 class="text-xs-left">
        <v-btn color="blue" flat small @click="showFilters = !showFilters">
          {{ showFilters ? "-" : "+" }} filtres</v-btn
        >
      </v-flex>
      <v-flex xs9>
        <v-slide-y-transition>
          <v-container
            v-show="showFilters"
            ma-0
            pa-0
            grid-list-xs
            fluid
            style="border: solid 1px grey"
          >
            <v-layout row wrap>
              <v-flex xs6>
                <v-select
                  v-model="filters.gender"
                  solo
                  flat
                  clearable
                  hide-details
                  :items="genders"
                  item-text="name"
                  item-value="value"
                  label="Sexe"
                ></v-select>
              </v-flex>
              <v-flex xs6>
                <v-select
                  v-model="filters.professionLabel"
                  clearable
                  flat
                  hide-details
                  solo
                  :items="pharmacistLabels"
                  item-text="name"
                  item-value="value"
                  label="Statut"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-slide-y-transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import to from "await-to-js";
import words from "lodash.words";
import uniqueBy from "lodash.uniqby";
import get from "lodash.get";
export default {
  name: "PharmacistAutocompleteField",
  props: {
    activated: { type: Boolean, default: true },
    // whether to display non-verified account or not
    verified: { type: Boolean, default: true },
    withStudent: { type: Boolean, default: false }
  },
  data() {
    return {
      filters: {
        gender: null,
        limit: 100,
        q: "",
        page: 0,
        professionLabel: null
      },
      genders: [
        { name: "Homme", value: "male" },
        { name: "Femme", value: "female" },
        { name: "Non précisé", value: "another" }
      ],
      items: [],
      isLoading: false,
      labels: [
        { name: "Pharmacien", value: "pharmacist" },
        { name: "Etudiant", value: "student" },
        { name: "Pharmacien blablaPharma", value: "pharmacistBlablapharma" }
      ],
      showFilters: false
    };
  },

  asyncComputed: {
    async autoCompleteItems() {
      const professionLabel = get(this.filter, "professionLabel", [
        "pharmacist",
        "student"
      ]);
      const [e, result] = await to(
        this.$pharmacist.search({
          ...this.filters,
          professionLabel,
          verified: this.verified,
          activated: this.activated
        })
      );

      return !e && result ? result : this.items;
    }
  },
  computed: {
    pharmacistLabels() {
      return this.withStudent
        ? this.labels
        : this.labels.filter(label => label.value !== "student");
    },
    search: {
      get() {
        return this.filters.q;
      },
      set(value) {
        if (!value || value.trim().length < 1) {
          return;
        }

        this.filters.q = words(value).join(" ");

        // first we look into items to see if there is an item that match the filters.q
        const el = this.items.find(item =>
          words(this.filters.q.trim()).some(word =>
            item.searchWord.includes(word)
          )
        );

        if (el) {
          // we don't need to do a api call if the element exist in the item list
          return;
        }

        this.isLoading = true;

        const formatPharmacist = pharmacist => {
          const completeAddress = `${pharmacist.institutionName} ${pharmacist.address}, ${pharmacist.postalCode} ${pharmacist.city}`;
          const fullName = `${pharmacist.firstName} ${pharmacist.lastName}`;
          const searchWord = `${fullName}. ${completeAddress}`;
          return { ...pharmacist, completeAddress, fullName, searchWord };
        };

        this.items = uniqueBy(
          this.items.concat(this.autoCompleteItems.map(formatPharmacist)),
          "id"
        );

        setTimeout(() => {
          this.isLoading = false;
        }, 250);
      }
    },
    filteredItems() {
      return this.items.filter(item => {
        const matchGender =
          !this.filters.gender || item.gender === this.filters.gender;

        const matchStatus =
          !this.filters.professionLabel ||
          item.professionLabel === this.filters.professionLabel;

        return matchGender && matchStatus;
      });
    }
  },
  methods: {
    async searchPharmacists() {
      const [e, result] = await to(
        this.$pharmacist.search({
          ...this.filters,
          verified: this.verified,
          activated: this.activated
        })
      );

      const pharmacists = result ? result : [];
      this.$emit("pharmacistautocompletefield::search", {
        pharmacists,
        filters: { ...this.filters }
      });
      this.filters.q = "";
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
        const filters = this.$emit("pharmacistautocompletefield::search", {
          pharmacists: [data],
          filters: { ...this.filters }
        });
      }
    }
  }
};
</script>
