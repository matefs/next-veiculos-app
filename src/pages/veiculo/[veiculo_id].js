import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState, useRef} from 'react' 

 

const Veiculo_individual = () => {
  
  const router = useRouter()
  const { veiculo_id } = router.query
  console.log(veiculo_id)
  const url = 'http://localhost:3001/'
  const [data, setData] = useState([]) 

async function CarregaDados() {

  await axios.get(`${url}veiculos/${veiculo_id}`)
  .then(response => {
    setData(response.data);
    console.log(response.data) 
  })
  .catch(e => console.log(e))


}

  
  useEffect(()=>{
    CarregaDados()
  
  },[veiculo_id])


  return (
    <div className='main'>


    <div className='card'>
    <h1>Tela do Veiculo individual: {veiculo_id}</h1>
    <div>

          <li>Id: {data.id} - Placa: {data.placa}</li> 
          <li>Card Vínculado: {data.card}</li>
          <li>Vínculo: {data.vinculo} </li>
          <li>Terminal Tec.: {data.terminalTecnologia} </li>
          <li>Descrição: {data.descricao} </li>  
     
    </div>
    </div>


    </div>    
  )
}

export default Veiculo_individual