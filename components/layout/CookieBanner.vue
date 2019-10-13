<template>
  <client-only>
    <cookie-law class="cookie-banner">
      <v-container py-0 my-0 grid-list-xl slot-scope="props">
        <v-layout row wrap>
          <v-flex sm12 md10>
            <span class="caption">
              Ce site utilise des cookies sur votre ordinateur pour garantir la
              meilleure expérience possible. Ces cookies sont utilisés pour
              collecter des informations à propos de votre utilisation de notre
              site et nous permettent également de vous reconnaitre. Pour en
              savoir plus à propos des cookies que nous utilisons, veuillez
              regarder notre police de confidentialité. Si vous refusez
              l'utilisation de ces cookies vos informations ne seront pas
              suivies. Cependant, deux cookies seront utilisés pour nous
              permettre de vous connecter.
            </span>
          </v-flex>
          <v-flex
            md1
            :offset-sm5="$vuetify.breakpoint.smAndDown"
            sm3
            class="px-1"
          >
            <v-btn
              color="default-grey"
              block
              depressed
              dark
              @click="props.accept"
              >Accepter</v-btn
            >
          </v-flex>
          <v-flex md1 sm3>
            <v-btn color="default-grey" outline block @click="props.close"
              >Refuser</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
    </cookie-law>
  </client-only>
</template>

<script>
export default {
  name: "CookieBanner"
};
</script>

<style scoped></style>
