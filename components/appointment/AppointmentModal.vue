<template>
  <ValidationObserver class="modal-card">
    <!-- <div class="modal-card" style="width: auto"> -->
    <header class="modal-card-head">
      <p class="modal-card-title">Novo Agendamento</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Nome" expanded>
        <b-input expanded :value="data.personal.name" disabled icon="user" />
      </b-field>
      <b-field grouped group-multiline>
        <p class="control"></p>
      </b-field>
      <hr />
      <b-field grouped group-multiline>
        <p class="control">
          <InputWithValidation
            v-model="data.personal.weight"
            rules="required|min_value:1|max_value:250"
            type="number"
            label="Peso"
            vid="weight"
            icon="weight"
            field-expanded
          >
            <template slot="addon">
              <p class="control">
                <button class="button is-static">Kg</button>
              </p>
            </template>
          </InputWithValidation>
        </p>
        <p class="control">
          <InputWithValidation
            v-model="data.personal.height"
            rules="required|min_value:1|max_value:3"
            type="number"
            label="Altura"
            vid="height"
            icon="ruler"
            field-expanded
          >
            <template slot="addon">
              <p class="control">
                <button class="button is-static">m</button>
              </p>
            </template>
          </InputWithValidation>
        </p>
        <p class="control">
          <b-field label="Idade" expanded>
            <b-input
              type="number"
              field-expanded
              :value="data.personal.age"
              disabled
              icon="birthday-cake"
            />
          </b-field>
        </p>
        <p class="control">
          <InputWithValidation
            v-model="data.medical.pulse"
            rules="required"
            type="text"
            label="Pulso"
            vid="pulse"
            icon="heartbeat"
            field-expanded
          >
          </InputWithValidation>
        </p>
      </b-field>
      <hr />

      <hr />
      <InputWithValidation
        v-model="data.complaint.text"
        rules="required|min:25|max:2500"
        type="textarea"
        label="Problemas Atuais"
        vid="complaint"
        label-position="on-border"
        field-expanded
        maxlength="2500"
        placeholder="Principais problemas que se apresentam no momento (o que o motivou a procurar ajuda)"
      >
      </InputWithValidation>
      <SelectWithValidation
        v-model="data.complaint.problemType"
        rules="required"
        label="Estado dos Problemas"
      >
        <option value="1">Estáveis</option>
        <option value="2">Flutuantes</option>
        <option value="3">Gradualmente Melhorando</option>
        <option value="4">Gradualmente Piorando</option>
        <option value="5">Rapidamente Melhorando</option>
        <option value="6">Rapidamente Piorando</option>
      </SelectWithValidation>
    </section>
    <footer class="modal-card-foot">
      <b-button>Criar</b-button>
      <b-button type="is-danger" @click="$emit('close')">Cancelar</b-button>
    </footer>
    <!-- </div> -->
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ValidationObserver } from 'vee-validate'
import InputWithValidation from '@/components/inputs/InputWithValidation.vue'
import SelectWithValidation from '@/components/inputs/SelectWithValidation.vue'

@Component({
  components: {
    ValidationObserver,
    InputWithValidation,
    SelectWithValidation,
  },
})
export default class NewAppointmentModalComponent extends Vue {
  public data = {
    personal: {
      name: '',
      weight: '',
      height: '',
      age: '',
      email: '',
      address: '',
      telephones: {
        household: '',
        mobile: '',
      },
    },
    complaint: {
      text: '',
      problemType: '',
    },
    medical: {
      pulse: '',
      language: '',
      dosha: [],
    },
  }
}
</script>
