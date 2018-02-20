<template>
  <div id="app" class="container-fluid">

     <div class="row">
       <div class="col-12 py-3">
         <div class="location" v-for="(loc, i) in location.consolidated_weather" :key="loc.id" v-if="i < 1">
           <div class="location-weather-today">
             <div class="box box-main">
               <div class="box-title-1">Dublin</div>
               <div class="box-title-2">Ireland</div>
               <div class="box-title-3">Today</div>
                <div class="box-icon"><span class="icon icon-c"></span></div>
                <div class="box-value">{{Math.round(loc.the_temp)}} <sup>&deg; c</sup></div>
                <div class="box-label">clear</div>
              </div>
             <div class="d-flex flex-wrap boxes justify-content-center">
              <div class="box">
                <div class="box-icon"><span class="icon icon-wind-speed"></span></div>
                <div class="box-value">{{Math.round(loc.wind_speed)}} <small class="value-unit">km/h | {{Math.round(loc.wind_direction)}} {{loc.wind_direction_compass}}</small></div>
                <div class="box-label">wind speed</div>
              </div>
             <div class="box">
                <div class="box-icon"><span class="icon icon-humidity"></span></div>
                <div class="box-value">{{Math.round(loc.humidity)}} <small class="value-unit">%</small></div>
                <div class="box-label">humidity</div>
              </div>
              <div class="box">
                <div class="box-icon"><span class="icon icon-visibility"></span></div>
                <div class="box-value">{{Math.round(loc.visibility)}} <small class="value-unit">km</small></div>
                <div class="box-label">visibility</div>
              </div>
              <div class="box">
                <div class="box-icon"><span class="icon icon-predictability"></span></div>
                <div class="box-value">{{Math.round(loc.predictability)}} <small class="value-unit">%</small>    </div>
                <div class="box-label">predictability</div>
              </div>
              <div class="box">
                <div class="box-icon"><span class="icon icon-sunrise"></span></div>
                <div class="box-value">{{location.sun_rise | date}}AM <small class="value-unit">{{location.timezone_name}}</small>    </div>
                <div class="box-label">Sunrise</div>
              </div>
               <div class="box">
                <div class="box-icon"><span class="icon icon-sunset"></span></div>
                <div class="box-value">{{location.sun_set | date}}PM <small class="value-unit">{{location.timezone_name}}</small>    </div>
                <div class="box-label">Sunset</div>
              </div>
              
              
              </div>
           </div>
           <div class="text-center mt-3">
             <a @click="displayForecast" class="btn btn-primary btn-block">5 Days Forecast</a>
           </div>
           <div class="chart"></div>
         </div>
       </div>
     </div>
   </div>

</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import moment from 'moment'
import Chartist from 'chartist'
export default {
  methods: {
    displayForecast() {
      this.$store.dispatch('renderChart', this.$el);
    }
  },
  computed: {
    ...mapGetters([
      'location',
      'chartist'
     
    ])
  },
  created() {
    this.$store.dispatch('getLocation', this.$store.state.name)
  },
  mounted() { 
    
  },
  filters: {
    date: function(value) {
      if (value) {
        return moment(String(value)).format('hh:mm')
      }
    }
  }
}
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap';
@import './assets/chartist';

body {background: #2A343E;color: #eee;}
.box {text-align: center;padding: .5em;width: 100%}
.box-title-1 {margin-bottom: 0;line-height: 1em;}
.box-title-2 {font-size: .4em;font-weight: bold;}
.box-title-3 {font-size: .3em;margin-bottom: 1em;font-weight: bold;}
.box-main {font-size: 3em;width: 100%;}
.box-label {font-size: .6em;font-weight: bold;text-transform: uppercase;}
.box-value small {font-size: .7em;}
.boxes .box {background: darken(#2A343E,5);width: calc(33.3333% - 2px);margin-bottom: 1px; margin-left:1px}
.boxes .box:nth-child(3n-2) {}
    
    .icon {display: inline-block;;width: 2.5em;height: 2.5em;background-size:100%;background-repeat: no-repeat;background-position: center center;}
    .icon-sn {background-image: url('./assets/img/icon-sn.svg');}
    .icon-sl {background-image: url('./assets/img/icon-sl.svg');}
    .icon-h {background-image: url('./assets/img/icon-h.svg');}
    .icon-t {background-image: url('./assets/img/icon-t.svg');}
    .icon-hr {background-image: url('./assets/img/icon-hr.svg');}
    .icon-lr {background-image: url('./assets/img/icon-lr.svg');}
    .icon-s {background-image: url('./assets/img/icon-s.svg');}
    .icon-hc {background-image: url('./assets/img/icon-hc.svg');}
    .icon-lc {background-image: url('./assets/img/icon-lc.svg');}
    .icon-c {background-image: url('./assets/img/icon-c.svg');}
    
    .icon-humidity {background-image: url('./assets/img/icon-humidity.svg');}
    .icon-wind-speed {background-image: url('./assets/img/icon-wind-speed.svg');}
    .icon-wind-direction {background-image: url('./assets/img/icon-wind-direction.svg');}
    .icon-visibility {background-image: url('./assets/img/icon-visibility.svg');}
    .icon-predictability {background-image: url('./assets/img/icon-predictability.svg');}
    .icon-sunset {background-image: url('./assets/img/icon-sunset.svg');}
    .icon-sunrise {background-image: url('./assets/img/icon-sunrise.svg');}
    

    
</style>
