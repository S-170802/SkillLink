import React from 'react';
import "./Pay.scss"
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest"
import {useParams} from "react-router-dom"
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";


const stripePromise = loadStripe("pk_test_51ND5GMSHkMNdLVR6xiUoXWfHAoScClbZI9wkLUVIt6v5DJ8Y77JHNHgt4KCeVbaqQ7Imy4a64wSpkEOHECpF2qUe00apHG5Efy");
const Pay = ()=>{

    const [clientSecret, setClientSecret] = useState("");

    const {id}=useParams()

    useEffect(()=>{
        const makeRequest = async()=>{
            try{
                const res= await newRequest.post(`/orders/create-payment-intent/${id}`)
                setClientSecret(res.data.clientSecret)
              
            }  catch(err){
                console.log(err)
            }
        };
        makeRequest();

    },[]);

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

    return (
        <div className="pay">
            { clientSecret &&
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>}
        </div>
    )
}
export default Pay;