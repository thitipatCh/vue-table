<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="btnswitch">
      <vs-tabs>
        <vs-tab label="List" icon="list">
          <vs-table
            v-if="sensorData"
            max-items="10"
            pagination
            :data="sensorData"
          >
            <template slot="header">
              <h3 class="list-title">SensorData</h3>
            </template>
            <template slot="thead">
              <vs-th> ID </vs-th>
              <vs-th> Data </vs-th>
              <vs-th> Time </vs-th>
              <vs-th> Data2 </vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].id }}
                </vs-td>

                <vs-td :data="data[indextr].data">
                  {{ data[indextr].data }}
                </vs-td>

                <vs-td :data="data[indextr].timestamp">
                  {{ data[indextr].timestamp }}
                </vs-td>

                <vs-td :data="data[indextr].data2">
                  {{ data[indextr].data2 }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </vs-tab>
        <vs-tab label="Calendar" icon="date_range">
          <div class="calendar">
            <FullCalendar :options="calendarOptions" />
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
    <div class="centerx popup">
      <vs-button @click="popupActivo = true" color="primary" type="border"
        >Open Default popup</vs-button
      >
      <vs-popup class="holamundo" title="Chart Data" :active.sync="popupActivo">
        <div class="small">
          <bar-chart
            v-if="chartData.datasets[0].data.length > 0"
            :data="chartData"
            :options="chartOptions"
          ></bar-chart>
        </div>
      </vs-popup>
    </div>
  </div>
</template>

<script>
// const axios = require("axios");
import BarChart from "../BarChart.js";

import store from "../store";
import storeModule from "../store/sensor";
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar,
    BarChart,
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      chartOptions: {
        hoverBorderWidth: 20,
      },
       popupActivo:false,
    };
  },
  created() {
    if (!store.hasModule("sensor")) store.registerModule("sensor", storeModule);
    store.dispatch("sensor/get");
  },
  computed: {
    sensorData() {
      return store.state.sensor.sensorData;
    },
    calendarData() {
      return store.state.sensor.calendarData;
    },
    calendarOptions() {
      return {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        height: 650,
        events: this.calendarData,
        initialDate: "2020-07-08",
      };
    },
    chartData() {
      return {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 6000,
        labels:
          this.calendarData.length > 0
            ? this.calendarData.map((e) => e.start)
            : [],
        datasets: [
          {
            label: "Chart Data",
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#41B883",
              "#E46651",
              "#00D8FF",
            ],
            data:
              this.calendarData.length > 0
                ? this.calendarData.map((e) => e.title)
                : [],
          },
        ],
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.calendar {
  width: 75%;
}
.btnswitch {
  /* display: inline-block; */
  min-width: 100%;
  margin-top: 10px;
}
.list-title {
  margin-bottom: 10px;
}
.small {
  max-width: 600px;
  margin: 40px auto;
}
.popup {
  margin: 20px;
}
</style>
