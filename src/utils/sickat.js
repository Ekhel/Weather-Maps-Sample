const request = require('request');

const sumberdana = (id, callback) => {
    const base_url = 'https://sickat.jayapurakab.go.id/api/distrik?id_pd='+id+'';
    //const key = 'api_sickat';
    //const token = '886b7981670d4301a8a8aaadb3709084';
    // const header({
    //     'api_sickat': '886b7981670d4301a8a8aaadb3709084'
    // })

    request({ url: base_url, json:true }, (error, response) => {
        if(error) {
            callback('Link Salah', undefined)
        } else if(response.body.pd === null){
            callback('Data Belum Tersedia', undefined)
        } else {
            callback(undefined, {
                pd: response.body.result.pd,
                pagu: response.body.result.pagu_keu,
                realisasi: response.body.result.rk,
                pk: response.body.result.pk,
                pf: response.body.result.pf
            })
        }
    })
}

module.exports = sumberdana