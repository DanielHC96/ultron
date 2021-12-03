import CryptoJS from "crypto-js";
import axios from "axios";
import { response } from "express";
import FlowApi from "flowcl-node-api-client";
import config from "./config.json"

// function signature (currency: string, amount: Number, apiKey: string, secretKey: string){
//     var stringToSign: string = 'amount'  + String(amount) + 'apiKey'+ apiKey + 'currency' + currency;
//     console.log (stringToSign)
//     return String(CryptoJS.HmacSHA256(stringToSign, secretKey));
// };

const paramsPost = {
    "commerceOrder": String(Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100),
    "subject": "Pago de prueba",
    "currency": "CLP",
    "amount": 5000,
    "email": "danielhc96@gmail.com",
    "paymentMethod": 9,
    "urlConfirmation": config.baseURL + "/payment_confirm",
    "urlReturn": config.baseURL + "/result",
};

async function generatePaymentOrder(){
    var serviceName = "payment/create";
    try {
        const flowApi = new FlowApi(config);
        let response: any = await flowApi.send(serviceName,paramsPost, 'POST')
        console.log(response)
        let redirect = response.url + '?token=' + response.token;
        console.log(`location: ${redirect}`)
        console.log(response)
        return response
    } catch(err) {
        console.log(err)
        return 'internal error'
    }
};

async function generatePaymentEmail(){
    var serviceName = "payment/createEmail";
    try {
        const flowApi = new FlowApi(config);
        let response: any = await flowApi.send(serviceName,paramsPost, 'POST')
        console.log(response)
        let redirect = response.url + '?token=' + response.token;
        console.log(`location: ${redirect}`)
        return response
    } catch(err) {
        console.log(err)
        return 'internal error'
    }
}




async function getStatus(token: string) {
    try {
        let params = {
          token: token
        };
        let serviceName = "payment/getStatus";
        const flowApi = new FlowApi(config);
        let response = await flowApi.send(serviceName, params, "GET");
        //Actualiza los datos en su sistema
        return response
      } catch (error) {
        console.log(error);
        return 'Internal error'
      }
    
}

export default { generatePaymentOrder, generatePaymentEmail, getStatus }