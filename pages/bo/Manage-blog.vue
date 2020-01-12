<template>
  <v-container fluid grid-list-xl px-3>
    <v-layout row wrap>
      <v-flex offset-xs3 xs6>
        <v-text-field
          placeholder="replace me by the autocomplete"
          box
        ></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-btn fab outline color="blue" @click="showDialog = true">
          <v-icon>fas fa-plus</v-icon>
        </v-btn>
      </v-flex>

      <v-spacer></v-spacer>
      <v-flex v-for="article in articles" xs4 :key="article.id"></v-flex>
    </v-layout>
    <article-handler v-model="showDialog" @articleHandler::save="handleSave" />
  </v-container>
</template>

<script>
import ArticlePreview from "../../components/blog/ArticlePreview";
import ArticleHandler from "../../components/blog/ArticleHandler";

export default {
  name: "Manage-blog",
  components: {
    ArticleHandler,
    ArticlePreview
  },

  data() {
    return {
      showDialog: false,
      selectedArticle: null
    };
  },

  methods: {
    handleSave() {}
  },

  asyncData() {
    const articles = [];
    return {
      articles
    };
  }

  //layout: "admin"
};
</script>
