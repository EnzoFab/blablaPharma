<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap pb-3>
      <v-flex xs12 class="content-center text--baseColor" pb-4>
        <h1 class="title-main">BLOG</h1>
        <span class="text-content"
          >bien s'informer grâce à un contenu claire et ludique</span
        >
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex v-for="post in posts" :key="post.title" xs3>
        <v-card
          flat
          :href="post.href"
          raised
          style="border: solid 1px whitesmoke"
        >
          <v-img :src="post.image">
            <v-container fluid fill-height>
              <v-layout row wrap align-center>
                <v-flex xs12 class="content-center">
                  <v-avatar color="default-green" tile size="60">
                    <v-icon color="white" size="40">fas fa-play</v-icon>
                  </v-avatar>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <h3 class="px-3 pt-4 text-truncate">{{ post.title }}</h3>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "BlogHomeSection",
  data() {
    return {
      posts: [
        {
          image:
            "https://i.ytimg.com/an_webp/0NwDgxSlxnY/mqdefault_6s.webp?du=3000&sqp=CKikyOwF&rs=AOn4CLCHG6iCk79mA9Cj6X21ZO8hHaxMlQ",
          title:
            "Différents mode d'injection de l'insuline et les endroits où se piquer",
          href:
            "https://blablapharma.wixsite.com/blablapharma/post/diff%C3%A9rents-mode-d-injection-de-l-insuline-et-les-endroits-o%C3%B9-se-piquer"
        },
        {
          image:
            "https://i.ytimg.com/an_webp/u_caLAieMsE/mqdefault_6s.webp?du=3000&sqp=CL6kyOwF&rs=AOn4CLDoy4q8X2NHY8sY61VLFK0BeJOgRw",
          title: "Comment bien se laver les dents ?",
          href:
            "https://blablapharma.wixsite.com/blablapharma/post/comment-bien-se-laver-les-dents"
        },
        {
          image:
            "https://i.ytimg.com/an_webp/YmID7CiLLs4/mqdefault_6s.webp?du=3000&sqp=CLTiyOwF&rs=AOn4CLBWpBT68w_LAzU-xgBd03ntX8tsMw",
          title: "Comment nettoyer une petite plaie ?",
          href:
            "https://blablapharma.wixsite.com/blablapharma/post/comment-nettoyer-une-petite-plaie"
        }
      ]
    };
  }
};
</script>

<style scoped></style>
