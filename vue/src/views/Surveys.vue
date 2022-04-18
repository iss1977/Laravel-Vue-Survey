<template>
  <PageComponentVue>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-grey-900">Sourveys</h1>
        <router-link
          :to="{ name: 'SurveyCreate' }"
          class="py-2 px-3 text-white bg-emerald-500 rounded-md hover: gb-emerald-600"
        >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
          Add new Sourvey
        </router-link>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <SurveyListItem
        v-for="survey in surveys"
        :key="survey.id"
        :survey="survey"
        @delete="deleteSurvey(survey)"
      />
    </div>
  </PageComponentVue>
</template>

<script setup>
import store from './../store';
import { computed } from 'vue';
import PageComponentVue from "../components/PageComponent.vue"
import SurveyListItem from "../components/SurveyListItem.vue"

const surveys = computed(()=> store.state.surveys.data);
store.dispatch('getSurveys');

function deleteSurvey(survey){
  if( confirm('Are you sure? Can not be undone.') ){
    store.dispatch('deleteSurvey', survey.id)
      .then( ()=>{
        store.dispatch('getSurveys')
      })
  }
}

</script>

<style>
</style>
