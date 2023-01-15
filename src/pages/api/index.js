import { useState, useEffect } from 'react';
import axios from 'axios';
var data;


export  default async function handler(req, res) {
     
    await axios.get('http://localhost:3001/veiculos')
    .then(response => {
      data = response.data
      console.log(data)
    })
    await res.status(200).json(data.length)
  } 



/*   export default function handler(req, res) {
    res.status(200).json({ name: 'John Doe' })
  } 
  
  */