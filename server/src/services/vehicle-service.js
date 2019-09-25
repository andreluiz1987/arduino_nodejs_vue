'use scrict'

let data = 0;
exports.getCarPosition = (req, res, next) => {
    try {
        res.status(200).json({
            message: data
        });
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Falha ao enviar o valor para o device."
        });
    }
}

exports.setDirectionCar = (value) => {
    data = value;
}