<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Cadastro de pessoa</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-divider class="border-opacity-50" color="success"></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn class="p-a-2 m-a-2" prepend-icon="mdi-home" elevation="2" rounded="0" color="teal" variant="elevated" @click="this.$router.push('/')">HOME</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-form ref="form" @submit.prevent="submit">
            <v-text-field v-model="nome" label="Nome"></v-text-field>
            <v-select v-model="sexoSelecionado" :items="sexo" label="Sexo"></v-select>
            <v-btn class="me-4" prepend-icon="mdi-check-bold" color="green" type="submit">Enviar</v-btn>
            <v-btn @click="reset" prepend-icon="mdi-broom" color="amber">Limpar</v-btn>
          </v-form>
        </v-col>
      </v-row>

    </v-container>
  </v-app>
</template>

<script>

  export default{
    data(){
      return{
        nome:null,
        sexoSelecionado : null,
        sexo:['Masculino','Feminino']
      }
    },

    methods:{
      reset(){
        this.$refs.form.reset()
      },
      async submit(){
        const data = new FormData();
        data.append("Nome", this.nome);
        data.append("Sexo", this.sexoSelecionado==="Masculino" ? "M" : "F");
        // const data = {
        //   Nome: this.nome,
        //   Sexo: this.sexoSelecionado==="Masculino" ? "M" : "F",
        // };

        // const dataJSON = JSON.stringify(data);


        const req = await fetch('http://localhost:8000/api/pessoa', {method: 'POST', body: data})
                            .then(res => res.json())
                            .then(result => {
                              console.log(result)
                              this.$router.push('/')
                            })
                            .catch(erro => console.error('error', erro));


      }
    }
  }
</script>
