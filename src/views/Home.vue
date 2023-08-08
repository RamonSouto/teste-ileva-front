<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Lista de pessoa</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-divider class="border-opacity-50" color="success"></v-divider>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-col cols="2">
          <v-btn elevation="2" rounded="0" prepend-icon="mdi-plus" color="teal" variant="elevated" @click="this.$router.push('/incluir')">Incluir</v-btn>
        </v-col>
      </v-row>
      <v-layout>
        <v-col>
          <v-table fixed-header density="compact">
            <thead>
              <tr>
                <th class="text-center">Nome</th>
                <th class="text-center">Sexo</th>
                <th class="text-center">Editar</th>
                <th class="text-center">Excluir</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pessoa in pessoas" :key="pessoa.ID">
                <td>{{ pessoa.Nome }}</td>
                <td>{{ pessoa.Sexo }}</td>
                <td class="text-center"><v-btn class="p-a-2 m-a-2" elevation="2" rounded="0" color="teal" icon="mdi-pen" size="x-small" variant="elevated" @click="editarPessoa(pessoa.ID)"></v-btn></td>
                <td class="text-center"><v-btn class="p-a-2 m-a-2" elevation="2" rounded="0" color="red" icon="mdi-delete" size="x-small" variant="elevated" @click="excluirPessoa(pessoa.ID)" ></v-btn></td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-layout>

    </v-container>
  </v-app>
</template>

<script>
  export default{
    data(){
      return{
        pessoas: [],
      }
    },

    mounted() {
      fetch('http://localhost:8000/api/pessoa')
        .then(res => res.json())
        .then(data => {
          let pessoas1 = data.data;
          pessoas1.forEach(pessoas1 => {
            if(pessoas1.Sexo === 'M'){
              pessoas1.Sexo = "Masculino"
            } else {
              pessoas1.Sexo = "Feminino"
            }
          });
          console.log(pessoas1);
          this.pessoas = data.data;
        })
    },
    methods:{
      excluirPessoa($id){
        fetch('http://localhost:8000/api/pessoa/'+$id,{method: 'DELETE', headers: {
          'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(()=> { let indice = this.pessoas.findIndex(data => data.ID == $id)
        this.pessoas.splice(indice,1)})
      },
      editarPessoa($id){
        this.$router.push('/editar/'+$id)
      }
    }
  }
</script>
