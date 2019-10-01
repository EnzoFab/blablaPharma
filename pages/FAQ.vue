<template>
  <div>
    <v-img
      src="/images/faq.jpg"
      aspect-ratio="2.35"
      gradient="to top right, rgba(150,150,150,0.12), rgba(220,230,130,.14)"
      alt="Foire aux questions"
    >
      <v-container bg fluid fill-height>
        <v-layout row wrap align-center>
          <div class="content-center title-main">
            <span class="title-section-huge blue-grey--text text--darken-4"
              >Foire aux questions</span
            >
            <hr class="divider divider-large mt-3 blue-grey darken-4" />
          </div>
        </v-layout>
      </v-container>
    </v-img>
    <div class="container">
      <v-card flat>
        <h2 class="text--baseColor title-section">
          Comment un patient peut contacter un pharmacien ?
        </h2>
        <v-card-text class="text--section">
          <p>
            Lorsque vous souhaitez contacter un pharmacien, aller dans l’onglet
            « pharmaciens » et inscrivez son nom, le nom de la pharmacie ou le
            nom de la ville où il exerce et retrouvez-le dans la liste des
            pharmaciens inscrits dans la liste.
          </p>
          <p>Cliquez sur le bouton « Contacter ».</p>
          <p>
            Le pharmacien n’a pas accès à la liste des patients inscrit sur le
            site. C’est donc au patient de faire le premier pas ;)
          </p>
        </v-card-text>

        <h2 class="text--baseColor title-section">
          Un pharmacien peut-il contacter un patient ?
        </h2>
        <v-card-text class="text--section">
          <p>
            Non, malheureusement la liste des patients n’est pas disponible sur
            le site. C’est donc au patient de faire le premier pas.
          </p>
          <p>Dès lors, le pharmacien aura accès à</p>
        </v-card-text>

        <h2 class="title-section text--baseColor">
          Pourquoi contacter un pharmacien sur blablapharma ?
        </h2>
        <v-card-text class="text--section">
          <p>
            Le pharmacien est un professionnel de santé formé pour vous donner
            les premiers conseils et ce, sur des centaines de sujets différents
            !
          </p>
          <ul style="list-style-type: circle;">
            <li>
              Vous ne savez pas si ce médicament est indiqué pour votre problème
              ?
            </li>
            <li>Vous cherchez une alternative aux médicaments ?</li>
            <li>Vous ne savez plus quel dosage prendre ?</li>
          </ul>
          <br />
          <p>
            <span class="font-weight-bold">BlaBlaPHARMA</span> vous permet de
            trouver la réponse rapidement, sans avoir à faire la queue à la
            pharmacie !
          </p>
        </v-card-text>

        <h2 class="title-section text--baseColor">
          Que faire si mon pharmacien n’est pas connecté ?
        </h2>
        <v-card-text class="text--section">
          <p>
            Pas d’inquiétude ! Les pharmaciens salariés de blablapharma sont là
            pour vous répondre <span class="font-weight-bold">24/24H</span> et
            <span class="font-weight-bold">7/7j</span>. Leurs profils
            s’affichent en haut de la liste des pharmaciens inscrits sur le
            site.
          </p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "FAQ",
  head() {
    return {
      title: "F.A.Q",
      meta: [
        {
          hid: "FAQ",
          name: "description",
          content: "FAQ"
        }
      ]
    };
  }
};
</script>
