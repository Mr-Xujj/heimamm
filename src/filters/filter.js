import Vue from "vue"

import moment from 'moment'

Vue.filter("formatTime",function(time){
    return moment(time).format("YYYY-MM-DD")
})