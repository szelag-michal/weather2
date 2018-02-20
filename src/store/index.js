import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//api
import axios from 'axios'
export const API_URL = `https://www.metaweather.com/api/`

//chartist
import Chartist from 'chartist'
import moment from 'moment'

export const store = new Vuex.Store({
  state: {
    location: '',
    forecastData: '',
    forecastLabels: '',
    chartist: '',
    type: 'Line',
    chartist: undefined,
      data: {
          labels: [],
          series: []
      },
      options: {
          fullWidth: true,
          chartPadding: {
              right: 40
          }
      },
  },
  getters: {
    location: state => state.location,
    chartist: state => state.chartist
  },
  mutations: {
    setLocation (state, { locations, forecast }) {
      state.location = locations;
      state.forecastData = forecast.consolidated_weather.map(item => {
        return Number(Math.round(item['the_temp']))
      });

      state.forecastLabels = forecast.consolidated_weather.map(item => {
        return moment(String(item['applicable_date'])).format('ddd')
      });

      state.data.series.push(state.forecastData);
      state.data.labels.push(state.forecastLabels);

      
    },
    setChart(state, {context, payload}) {
      state.chartist = new Chartist['Line'](context, state.data, state.options, state.responsiveOptions)
      
    }
  },
  actions: {
    renderChart({commit}, context) {
      commit('setChart', {context})
    },
    getLocation ({ commit }) {
      const url = `${API_URL}location/560743/`    
      axios.get(url)
        .then(response => commit('setLocation', { 
          locations: response.data,
          forecast: response.data
         }))
        .catch(e => console.log(e))
    }
  }
    
})