import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
function Veiculos() {
    const [totalRegistros, setTotalRegistros] = useState(null);
    const [data, setData] = useState(null);
    const [numeroMinimo, setNumeroMinimo] = useState(null);
    const [numeroMaximo, setNumeroMaximo] = useState(null);
 
    
    function puxarVeiculosMinMax(numeroMinimo,numeroMaximo){
        if(numeroMaximo && numeroMinimo) {
        
            axios.get(`http://localhost:3001/veiculos?_start=${numeroMinimo}&_end=${numeroMaximo}`)
            .then(response => {
              setData(response.data);
            }) 
        
        }else{
        axios.get('http://localhost:3001/veiculos?_start=0&_end=5')
        .then(response => {
          setData(response.data);
        }) 
        }
    
    }



  useEffect(() => {
    
    
    puxarVeiculosMinMax(numeroMinimo,numeroMaximo);
    
    
    axios.get('http://localhost:3000/api')
    .then(response => {
        setTotalRegistros(response.data);
        console.log('puxou o total de registros: ' + totalRegistros)
    }) 


  }, [numeroMinimo]);

  return (
    <div className='main'>
        <h1>Listagem de placas conforme paginação </h1>
      {data ? (
        <div>

            {data.map((data) => {
                    return(
                    <ul key={data.id} >
                    
                    <li>Id: {data.id}</li> 
                    <li>Placa: {data.placa}</li>
                    <li>Card Vínculado: {data.card}</li>
                    <li>Descrição: {data.descricao} </li>
             
                    </ul>
                    )
                })}

        </div>
      ) : (
        <p>Loading data...</p>
      )}


       {totalRegistros ? (
        <div>
            <p>Total de registros: {totalRegistros}</p> <br/> <br/>
        </div>
        
       ) : (
       <p>Carregando total registros... </p>
       )}

<button onClick={()=>{setNumeroMinimo(0) ; setNumeroMaximo(5)}}> 1 </button>
<button onClick={()=>{setNumeroMinimo(5) ; setNumeroMaximo(10)}}> 2 </button>


    </div>
  );
}

export default Veiculos;
