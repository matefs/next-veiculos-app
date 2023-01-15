import Head from 'next/head' 
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState, useRef} from 'react' 


export default function Home() {
  
  
  const [data, setData] = useState([])
  const FormRef = useRef()
  const [ atualizaGrid, setAtualizaGrid  ] = useState(false)
  const url = 'http://localhost:3001/'
  var UltimoIdCadastrado: number;

 
  async function CarregaDados() {
 
    await axios.get(url+'veiculos').then(response => setData(response.data))
    data.id ? UltimoIdCadastrado = data.at(-1).id : ''
  
  }


  async function inputaDados(e: Event) {
    e.preventDefault(); 
    const {inputDesc , inputCard, inputPlaca, inputVinculo , inputTerminal} = FormRef.current; 
    const dados = {
      "id" : UltimoIdCadastrado+1,
      "placa": inputPlaca.value,
      "card": inputCard.value,
      "descricao" : inputDesc.value,
      "vinculo" : inputVinculo.value, 
      "terminalTecnologia" : inputTerminal.value
    }

    await axios.post(url+'veiculos',dados)
    setAtualizaGrid(!atualizaGrid)
  }

  async function Deletar(id: number) {
    await axios.delete(url+`veiculos/${id}`)
    setAtualizaGrid(!atualizaGrid)
  }
 
  useEffect(() => {
    CarregaDados(); 
    console.log( 'Consultou dados novamente e atualizaou conforme a mudança state atualizaGrid: '+ atualizaGrid)

  },[atualizaGrid])

 




  
  return (
    <>
      <Head>
        <title>Veiculos  Next App</title> 
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
         

      <h1>Visualizador de placas já Utilizadas</h1>


      <form onSubmit={inputaDados} ref={FormRef}  >
        <input type="text" id="inputPlaca" placeholder='Informe uma placa' />
        <input type="text" id="inputCard" placeholder='Informe o card' />
        <input type="text" id="inputDesc" placeholder='Informe uma descricao' />
        <input type="text" id="inputVinculo" placeholder='Informe um vínculo' />
        <input type="number" id="inputTerminal" placeholder='Informe um terminal da tecnologia' />
        <button type="submit" >Salvar 💾</button>
        <button type="reset" onClick={ () => { setAtualizaGrid(!atualizaGrid)}}>Limpar 🧹</button>
        
      </form>
      <button onClick={ () => { setAtualizaGrid(!atualizaGrid)}}> Atualizar ♻️</button>

 
   

      {data.map((data) => {
        return(
          <ul key={data.id} >
          
          <li>Id: {data.id}</li> 
          <li>Placa: {data.placa}</li>
          <li>Card Vínculado: {data.card}</li>
          <li>Vínculo: {data.vinculo} </li>
          <li>Terminal Tec.: {data.terminalTecnologia} </li>
          <li>Descrição: {data.descricao} </li>
 
          <button onClick={() => Deletar(data.id)}>Deletar</button>
          </ul>
        )
      })}
     
   
      </main>
    </>
  )
}
