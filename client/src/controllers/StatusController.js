
import TemperatureHelper from "../helpers/TemperatureHelper";
export default

    class StatusController {
    constructor(resource) {
        this._resource = resource
    }

    async getStatus() {
        try {
            let result;
            try {
                let response = await this._resource(`devices/temperatures`).get()
                
                if (response.ok) {
                    result = {
                        ok: response.ok,
                        data: response.body
                    }
                }
            } catch (error) {

                result = {
                    ok: false,
                    message: error.body.message
                }
            }
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async getStatusDevice() {

        let result;
        try {
            let response = await this._resource(`devices/SALA_CODE_123/temperatures`).get()

            let arrTemperature = response.body.temperatures.reduce(function (result, item) {

                var key = item.date_received;
                var value = item.value;

                var obj = {};
                obj[key] = TemperatureHelper.formatterData(value);;
                result.push(obj);
                return result;
            }, []);

            let data = arrTemperature.reduce(function (result, item) {
                var key = Object.keys(item)[0];
                result[key] = item[key];
                return result;
            }, {});

            if (response.ok) {
                result = {
                    ok: response.ok,
                    data: data
                }
            }
        } catch (error) {

            result = {
                ok: false,
                message: error.body.message
            }
        }
        return result;
    }

    async turnOnOff(state) {

        let result;
        try {
            let response = await this._resource(`devices/turn-on-off/${state}`).save()
            if (response.ok) {
                result = {
                    ok: response.ok,
                    data: data
                }
            }
        } catch (error) {
            console.log(error)
            result = {
                ok: false,
                message: error.body.message
            }
        }
        return result;
    }

    async setPWMLed(value) {

        let result;
        try {
            let response = await this._resource(`devices/pwm/${value}`).save()
            if (response.ok) {
                result = {
                    ok: response.ok,
                    data: data
                }
            }
        } catch (error) {
            console.log(error)
            result = {
                ok: false,
                message: error.body.message
            }
        }
        return result;
    }

    async getCarPosition() {

        let result;
        try {
            let response = await this._resource(`vehicle/direction`).get()
            
            if (response.ok) {
                result = {
                    ok: response.ok,
                    data: response.body.message
                }
            }
        } catch (error) {
            console.log(error)
            result = {
                ok: false,
                message: error.body.message
            }
        }
        return result;
    }
}