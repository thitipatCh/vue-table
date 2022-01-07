const axios = require("axios");

export default {
    namespaced: true,
    state: {
        sensorData: null,
        calendarData: []
    },
    getters: {

    },
    mutations: {
        GET(state, payload) {
            state.sensorData = payload
            var arr = payload, // fill it with array with your data
                results = {}, rarr = [], i, date;

            for (i = 0; i < arr.length; i++) {
                // get the date
                date = [new Date(arr[i]['timestamp']).getFullYear()
                , (new Date(arr[i]['timestamp']).getMonth() + 1).toString().length == 1 ? '0' + (new Date(arr[i]['timestamp']).getMonth() + 1).toString() : (new Date(arr[i]['timestamp']).getMonth() + 1).toString()
                , (new Date(arr[i]['timestamp']).getDate()).toString().length == 1 ? '0' + (new Date(arr[i]['timestamp']).getDate()).toString() : (new Date(arr[i]['timestamp']).getDate()).toString()
                ].join("-");
                results[date] = results[date] || 0;
                results[date]++;
            }
            // you can always convert it into an array of objects, if you must
            for (i in results) {
                // if (results.hasOwnProperty(i)) {
                rarr.push({ start: i, title: results[i] });
                // }
            }
            state.calendarData = rarr
        }
    },
    actions: {
        get({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get("https://swdapi.ddns.net:8090/data/ttntest")
                    .then(response => {
                        commit('GET', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
    },
}