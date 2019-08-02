export default

class TemperatureHelper{
    static formatterData(value){
        return Math.floor((value * 100) / 1023);
    }
}