import axios from 'axios';
import {createStore} from 'vuex';
import axiosClient from '../axios';

const tmpSurveys = [
  {
    id: 100,
    title: "The Survey with id 100 is this one",
    slug: "the-survey-with-id-100-is-this-one",
    status: "draft",
    image: "https://picsum.photos/400/400?random=1",
    description: "My name is Sebastian. This is my question",
    created_at: "2022-03-25 18:00:00",
    updated_at: "2022-03-25 18:00:00",
    expire_date: "2023-03-25 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you?",
        description: null,
        data: {
          options: [
            {
              uuid: "14b08389-a3ec-4e38-a575-e9ef234659fb",
              text: "USA"
            },
            {
              uuid: "e28512a1-de75-4f48-a9a6-b99c17292761",
              text: "Finland"
            },
            {
              uuid: "f0e36148-47b9-4150-b986-4f0de2af29a0",
              text: "Germany"
            },
            {
              uuid: "2f7b3022-86fc-469b-8d63-88ec4dc7b252",
              text: "France"
            },
          ]
        },
      }, //end q1
      {
        id: 1,
        type: "checkbox",
        question: "What do you want to learn? ",
        description: "You cand select your preference here",
        data: {
          options: [
            {
              uuid: "b1ba1d41-5129-41a1-9892-0df4be0246a4",
              text: "Javascript"
            },
            {
              uuid: "211a441c-07f3-45ef-af79-d31bba573ee6",
              text: "PHP"
            },
            {
              uuid: "00c17fe5-52d4-4b4b-81bf-38776215707e",
              text: "Dart"
            },
            {
              uuid: "2f7b3022-86fc-469b-8d63-88ec4dc7b252",
              text: "France"
            },
          ]
        },
      }, //end q2
      {
        id: 3,
        type: "checkbox",
        question: "Which framework do you like? ",
        description: "Tell be about your preferances",
        data: {
          options: [
            {
              uuid: "104fd882-182e-47e1-bddf-7e972c7c7d44",
              text: "Laravel"
            },
            {
              uuid: "9737cf08-0d4d-49e5-ac68-50cd40e9a913",
              text: "Next.js"
            },
            {
              uuid: "3ac9b080-33c1-49a3-aec4-a13270dbc0c9",
              text: "Spring Boot"
            },
          ]
        },
      }, //end q3
      {
        id: 4,
        type: "radio",
        question: "Which laravel version do you use? ",
        description: "Select a version",
        data: {
          options: [
            {
              uuid: "f1bd6a13-328b-470a-89f3-77054804f683",
              text: "Laravel 6"
            },
            {
              uuid: "8eaac1f2-8fff-4587-8e5f-cc9eff97d323",
              text: "Laravel 7"
            },
            {
              uuid: "9522a4f7-019f-4c14-86c1-653c705354a0",
              text: "Laravel 8"
            },
            {
              uuid: "9522a4f7-019f-4c14-86c1-653c705354a0",
              text: "Laravel 9"
            },
          ]
        },
      }, //end q4
      {
        id: 5,
        type: "checkbox",
        question: "What is your business",
        description: "Select your main activity",
        data: {
          options: [
            {
              uuid: "e2d320ac-0d1f-458e-878f-da495c81f812",
              text: "Coding"
            },
            {
              uuid: "52c35d08-66aa-4e40-bc63-792354dd2af8",
              text: "Transportation"
            },
            {
              uuid: "600767d6-7092-4146-8483-196ab07a7d31",
              text: "Laravel Real estate"
            },
            {
              uuid: "4f71452e-2c96-414d-93a9-54736fe7fa0d",
              text: "Other business"
            },
          ]
        },
      }, //end q5
      {
        id: 6,
        type: "checkbox",
        question: "Tell us about yourself",
        description: "What does characterise you?",
        data: {},
      }, //end q6
      {
        id: 7,
        type: "textarea",
        question: "Here you can write more",
        description: "There are several lines of text available to fill out.",
        data: {},
      }, //end q7
    ],
  }, // end survey 01
  {
    id: 200,
    title: "The Survey about laravel 8",
    slug: "the-survey-about-laravel-8",
    status: "active",
    image: "https://picsum.photos/400/400?random=2",
    description: "This is the second sourvey, and it's about Laravel 8",
    created_at: "2022-03-26 18:00:00",
    updated_at: "2022-03-26 18:00:00",
    expire_date: "2023-03-26 18:00:00",
    questions: [],
  }, //end survey 2
  {
    id: 300,
    title: "The Survey about Vuejs",
    slug: "the-survey-about-vuejs",
    status: "active",
    image: "https://picsum.photos/400/400?random=3",
    description: "This is the second sourvey, and it's about Vuejs",
    created_at: "2022-03-26 18:00:00",
    updated_at: "2022-03-26 18:00:00",
    expire_date: "2023-03-26 18:00:00",
    questions: [],
  }, //end survey 3
  {
    id: 400,
    title: "The Survey about Tailwind",
    slug: "the-survey-about-tailwind",
    status: "active",
    image: "https://picsum.photos/400/400?random=5",
    description: "This is the second sourvey, and it's about tailwind",
    created_at: "2022-03-27 18:00:00",
    updated_at: "2022-03-27 18:00:00",
    expire_date: "2023-03-27 18:00:00",
    questions: [],
  }, //end survey 4
];

const store = createStore({ //options
  state: {
    user: {
      data:{}, // will contain name, email ...etc
      token: sessionStorage.getItem('TOKEN'),
    },
    currentSurvey: {
      loading: false,
      data: {}
    },
    surveys: {
      loading: false,
      data: []
    },
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },

  getters: {},
  actions: {

    /** get the current survey data */
    getSurvey( {commit}, id ){
      commit("setCurrentSurveyLoading", true)
      return axiosClient
        .get(`/survey/${id}`)
        .then( (res)=>{
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false)
          return res;
        })
        .catch( (err)=>{
          commit("setCurrentSurveyLoading", false);
          console.error("Error loading survey data, id:"+id)
          throw err;
        });
    },

    /** Create or update a survey in backend */
    saveSurvey( {commit}, survey ){
      let response;
      if (survey.id) { // if survey has id, we are updateing, else creating
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then( (res) => {
            commit("setCurrentSurvey", res.data);
            return res;
          })
          return response;
      } else {
        response = axiosClient.post("/survey", survey)
          .then((res) => {
            commit("setCurrentSurvey",res.data);
            return res
          })
          return response
      }
    },

    /** Delete a survey */
    deleteSurvey( {}, surveyId ){
      return axiosClient.delete(`/survey/${surveyId}`);
    },

    /** Get all surveys */
    getSurveys( {commit} ){
      commit('setSurveysLoading', true)
      return axiosClient.get('/survey')
        .then( (res)=>{
          commit('setSurveysLoading', false)
          commit('setSurveys', res.data)
          return res
        })
    },
    /** Registration for Register.vue component */
    register( { commit }, user ){
      return axiosClient.post('/register', user)
        .then( ({data})=>{
          commit('setUser', data);
          return data;
        } )
    },

    /** Login for Login.vue component */
    login( { commit }, user ){
      return axiosClient.post('/login', user)
        .then( ({data})=>{
          commit('setUser', data);
          return data;
        } )
    },

    /** Logout user */
    logout( { commit } ){
      return axiosClient
              .post('/logout')
              .then( (response)=> {
                  commit('logout')
                  return response
              })
              .catch((er)=> {
                console.log('Logout on backend failed. Already logged out?');
                commit('logout')
                return er
              })

    }
  },
  mutations: {
    setCurrentSurveyLoading: (state, loading)=>{
      state.currentSurvey.loading = loading
    },
    setSurveysLoading: (state, loading)=>{
      state.surveys.loading = loading
    },

    setCurrentSurvey: (state, survey)=>{
      state.currentSurvey.data = survey.data;
    },

    setSurveys: (state, surveysData)=>{
      state.surveys.data = surveysData.data
    },

    logout: state => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => { // first argument is always state, second is "res" from backend via "actions: register()"
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    },
  },
  modules: {}
})

export default store;
