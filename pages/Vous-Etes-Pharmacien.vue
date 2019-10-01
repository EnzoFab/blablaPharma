<template>
  <div>
    <v-img
      src="/images/pharma.jpg"
      aspect-ratio="2.35"
      gradient="to top right, rgba(150,150,150,0.12), rgba(220,230,130,.14)"
      alt="Foire aux questions"
    >
      <v-container bg fluid fill-height>
        <v-layout row wrap align-center>
          <div class="content-center title-main">
            <span class="title-section-huge blue-grey--text text--darken-4"
              >Vous êtes pharmacien ?</span
            >
            <hr class="divider divider-large mt-3 blue-grey darken-4" />
          </div>
        </v-layout>
      </v-container>
    </v-img>
    <div class="container">
      <v-card flat class="text--baseColor">
        <h2 class="title-section text--baseColor pb-3">
          Vous êtes pharmaciens et vous exercez en officine ?
        </h2>
        <v-card-text class="text--section">
          <p>
            Parce qu’être pharmacien c’est bien plus que vendre des boites !
          </p>
          <p>
            En vous inscrivant sur blablapharma, vous permettez à des millier de
            patients d’avoir accès à des informations fiables et d’éviter les
            erreurs médicamenteuses.
          </p>
          <p>
            La prévention et l’éducation thérapeutique sont des activités à
            forte valeur ajoutée de notre profession. BlaBlaPHARMA vous permet
            d’en faire davantage pour votre patient.
          </p>
          <p>
            Etre disponible à distance renforce la relation de confiance que
            nous construisons au jour le jour et permet d’avoir un suivi optimal
            de l’état de santé de nos patients.
          </p>
        </v-card-text>

        <h2 class="title-section text--baseColor">
          Vous êtes pharmaciens et vous recherchez un poste ?
        </h2>
        <v-card-text class="text--section">
          <p>
            Rejoignez-nous ! Nous recrutons en interne pour assurer la
            continuité des réponses lorsque nos confrères pharmaciens ne sont
            pas disponibles !
          </p>
          <p>
            Vous pourrez travailler de chez vous ou depuis nos locaux dans une
            ambiance de partage et de convivialité.
          </p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Vous-Etes-Pharmacien",
  head() {
    return {
      title: "vous êtes pharmacien",
      meta: [
        {
          hid: "are-you-pharmacist",
          name: "description",
          content: "Informations les pharmaciens"
        }
      ]
    };
  }
};
</script>
