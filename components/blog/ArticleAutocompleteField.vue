<template>
  <v-autocomplete
    clearable
    dense
    flat
    no-filter
    return-object
    solo-inverted
    append-icon="search"
    hint="par mots clés: 'Pharmaceutique' ou phrase: 'Comment prendre un médicament' "
    item-text="title"
    label="Rechercher votre article"
    :hide-no-data="!this.search || this.search.length === 0"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    @click:append="searchArticle"
    @keyup.enter.native="searchArticle"
    @change="handleChange"
  >
    <template v-slot:no-data>
      <v-list-tile>
        <v-list-tile-title>
          Cherchez l'article que vous souhaitez a l'aide de
          <strong>Titre </strong> ou de <strong>Mots clés</strong>
        </v-list-tile-title>
      </v-list-tile>
    </template>
    <template v-slot:item="{ item }">
      <v-list-tile-avatar color="defaut-green">
        <v-img v-if="item.picture" :src="item.picture" alt="thumbnail"></v-img>
        <v-icon v-else dark medium>person</v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-text="item.title"></v-list-tile-title>
        <v-list-tile-sub-title
          v-text="item.creationDate"
        ></v-list-tile-sub-title>
      </v-list-tile-content>
    </template>
  </v-autocomplete>
</template>

<script>
import to from "await-to-js";
export default {
  name: "ArticleAutocompleteField",
  data: () => ({
    isLoading: false,
    items: [],
    searchWord: ""
  }),
  /*asyncComputed: {
    async autoCompleteItems() {
      const [e, articles] = await to(
        this.$blog.search({ q: this.searchWord, limit: 5 })
      );
      return articles ? articles : [];
    }
  }, */

  computed: {
    search: {
      get() {
        return this.searchWord;
      },
      async set(value) {
        if (this.searchWord === value) {
          return;
        }

        this.searchWord = value;
        this.isLoading = true;

        const [e, articles] = await to(
          this.$blog.search({ q: this.searchWord, limit: 5 })
        );

        this.items =
          this.searchWord && this.searchWord.length > 0 && articles
            ? articles.map(article => ({
                ...article,
                creationDate: this.formatDate(article)
              }))
            : [];

        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    }
  },
  methods: {
    formatDate(article) {
      if (article.createdAt) {
        return "";
      }

      const date =
        typeof article.createdAt === "string"
          ? parseInt(article.createdAt)
          : article.createdAt;

      return this.$moment(new Date(date)).format("Do MMMM YYYY");
    },
    async searchArticle() {
      const [e, res] = await to(
        this.$blog.search({ q: this.searchWord, limit: 5 })
      );

      const articles = res ? res : [];
      this.$emit("articleAutocompletefield::search", {
        articles,
        q: this.searchWord
      });
    },

    handleChange(element) {
      const articles = element ? [element] : this.items;
      const title = get(element, "title", "");
      this.$emit("articleAutocompletefield::search", { articles, q: title });
    }
  }
};
</script>
