<template>
  <!-- <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <IEcharts ref="guage_room1" :option="gauge" style="width: 450px; height: 300px;"></IEcharts>
          <div class="offset-md-4">
            <strong>Maquina 01</strong>
          </div>
        </div>
        <div class="col">
          <IEcharts ref="guage_room2" :option="gauge1" style="width: 450px; height: 300px;"></IEcharts>
          <div class="offset-md-4">
            <strong>Maquina 02</strong>
          </div>
        </div>
        <div class="col p-3">
          <button
            type="button"
            :class="this.blnState ? 'btn btn-success' : 'btn btn-danger'"
            @click="turnOnOff()"
          >{{this.blnState ? 'LIGADO' : 'DESLIGADO'}}</button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <line-chart class="mt-4" :data="this.temperatures"></line-chart>
        </div>
      </div>
    </div>
  </div>-->

  <div class="container-fluid">
    <div class="row content">
      <div class="col-sm-4 text-center">
        <h4 class="p-3">Medidores de Temperatura</h4>


        <div class="box alignment">
          <IEcharts ref="guage_room1" :option="gauge" style="height: 220px;"></IEcharts>
          <div class="gouge-detail">
            <strong>ROOM 01</strong>
          </div>
        </div>

        <div class="box alignment">
          <IEcharts ref="guage_room2" :option="gauge1" style="height: 220px;"></IEcharts>
          <div class="gouge-detail">
            <strong>ROOM 02</strong>
          </div>
        </div>

        <div class="col">
          <img
            id="car"
            ref="car"
            width="90"
            height="90"
            style="position: absolute"
            src="../../static/images/car_left.png"
          >
        </div>
      </div>

      <div class="col-sm-8" style="">
        <div class="box alignment mt-3">
          <h4 class="">Gráfico - Temperatura</h4>
          <div class="row">
            <div class="mt-2 mr-4 col">
              <line-chart class="mt-4" :data="this.temperatures"></line-chart>
            </div>
          </div>
        </div>
        <div class="box alignment pb-5">
          <div class="col">
            <button
              type="button"
              :class="this.blnState ? 'btn btn-success' : 'btn btn-danger'"
              @click="turnOnOff()"
            >{{this.blnState ? 'LED 1 - LIGADO' : 'LED 1 -  DESLIGADO'}}</button>
            <veeno
              pipsy
              class="mt-5"
              v-model="sliderValue"
              :handles="30"
              @change="sliderPwmChanged(sliderValue)"
              :range="{'min': 0,'max': 100}"
            >{{ this.sliderValue }}</veeno>
          </div>
        </div>
        <div class="col text-right pt-4">
          <img
            class="rotate-img"
            width="180"
            height="120"
            src="../../static/images/parking.png"
          >
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import IEcharts from "vue-echarts-v3/src/full.js";
import StatusController from "../controllers/StatusController";
import TemperatureHelper from "../helpers/TemperatureHelper";
import veeno from "veeno";
// for default styles
import "nouislider/distribute/nouislider.min.css";
export default {
  components: {
    IEcharts,
    veeno
  },
  created() {
    this.init();
  },
  data() {
    return {
      sliderValue: 0,
      blnState: false,
      statusController: new StatusController(this.$resource),
      temperatures: {},
      direction_top: 0,
      direction_bottom: 0,
      direction_rigth: 0,
      direction_left: 0,
      gauge: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}°C"
        },
        series: [
          {
            name: "Temperatura",
            type: "gauge",
            detail: { formatter: "{value}°C" },
            data: [{ value: 0, name: "" }]
          }
        ]
      },
      gauge1: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}°C"
        },
        series: [
          {
            name: "Temperatura",
            type: "gauge",
            detail: { formatter: "{value}°C" },
            data: [{ value: 0, name: "" }]
          }
        ]
      }
    };
  },

  methods: {
    async sliderPwmChanged(value) {
      let response = await this.statusController.setPWMLed(value);
    },
    async turnOnOff() {
      this.blnState = !this.blnState;
      let response = await this.statusController.turnOnOff(this.blnState);
      console.log(response);
    },
    async getCarPosition() {
      let response = await this.statusController.getCarPosition();

      if(response.ok){
        let direction = response.data.trim();

        if (direction.indexOf("FRENTE") >= 0) {
          this.direction_top -= 10;
          if(direction.indexOf("LED_ON") >= 0){
            document.getElementById("car").src = "../../static/images/car_front_light.png";
          } else {
            document.getElementById("car").src = "../../static/images/car_front.png";
          }
          document.getElementById("car").style.top = this.direction_top + "px";
        } else if (direction.indexOf("ESQUERDA") >= 0) {
          this.direction_left -= 10;
          if(direction.indexOf("LED_ON") >= 0){
            document.getElementById("car").src = "../../static/images/car_left_light.png";
          } else {
            document.getElementById("car").src = "../../static/images/car_left.png";
          }
          document.getElementById("car").style.left = this.direction_left + "px";
        } else if (direction.indexOf("DIREITA") >= 0) {
          this.direction_left += 10;
          if(direction.indexOf("LED_ON") >= 0){
            document.getElementById("car").src = "../../static/images/car_rigth_light.png";
          } else {
            document.getElementById("car").src = "../../static/images/car_rigth.png";
          }
          document.getElementById("car").style.left = this.direction_left + "px";
        } else if (direction.indexOf("TRAS") >= 0) {
          this.direction_top += 10;
          if(direction.indexOf("LED_ON") >= 0){
            document.getElementById("car").src = "../../static/images/car_back_light.png";
          } else {
            document.getElementById("car").src = "../../static/images/car_back.png";
          }
          document.getElementById("car").style.top = this.direction_top + "px";
        }
      }
    },
    init() {
      setInterval(() => {
        this.getStatus();
      }, 3000);
      setInterval(() => {
        this.getStatusDevice();
      }, 2000);
      setInterval(() => {
        this.getCarPosition();
      }, 500);
    },
    async getStatus() {
      try {
        this.devices = await this.statusController.getStatus();

        this.devices.data.forEach(element => {
          if (element.code == "SALA_CODE_123")
            this.gauge1.series[0].data[0].value = TemperatureHelper.formatterData(
              element.temperatures[0].value
            );
          if (element.code == "SALA_CODE_456")
            this.gauge.series[0].data[0].value = TemperatureHelper.formatterData(
              element.temperatures[0].value
            );
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getStatusDevice() {
      try {
        let deviceTemperatures = await this.statusController.getStatusDevice();
        this.temperatures = deviceTemperatures.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
  body {
    font-family: 'Montserrat', sans-serif;
    background: #ebebeb !important;  
    padding-top: 20px;
  }

  .box {
    background: #f9f9f9;
    box-shadow: 0 0 1px rgba(0,0,0,.2), 0 2px 4px rgba(0,0,0,.1);
    border-radius: 5px;
    margin-bottom: 20px;
    margin-left: 50px;
    margin-right: 50px;
    text-shadow: 1px 1px 1px rgba(0,0,0,.1);
  }

  .alignment {
    padding: 30px;  
    text-align: -webkit-center;
  }

  .gouge-detail {
    color: darkslategrey;
  }

  .rotate-img {
    transform: rotate(90deg);
  }

</style>
