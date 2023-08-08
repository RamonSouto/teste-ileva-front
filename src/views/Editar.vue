<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Editar pessoa</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-divider class="border-opacity-50" color="success"></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn class="p-a-2 m-a-2" elevation="2" rounded="0" color="teal" prepend-icon="mdi-home" variant="elevated" @click="this.$router.push('/')">HOME</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-form ref="form" @submit.prevent="submit">
            <v-text-field v-model="nome" label="Nome"></v-text-field>
            <v-select v-model="sexoSelecionado" :items="sexo" label="Sexo"></v-select>
            <v-btn class="me-4" prepend-icon="mdi-content-save-check"  color="green" type="submit">Salvar</v-btn>
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
    mounted(){
      fetch('http://localhost:8000/api/pessoa/'+this.$route.params.id, {method: 'GET', headers:{'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(data =>{
          this.nome = data.data.Nome
          this.sexoSelecionado = data.data.Sexo === "M" ? 'Masculino' : 'Feminino'
        })
    },
    methods:{
      async submit(){

        const data = {"nome": this.nome,"sexo": this.sexoSelecionado==="Masculino" ? "M" : "F"}

        const dataJson = JSON.stringify(data);
        console.log(dataJson);

        const req = await fetch('http://localhost:8000/api/pessoa/'+this.$route.params.id, {method: 'PUT', headers:{'Content-Type': 'application/json'}, body: dataJson})
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
