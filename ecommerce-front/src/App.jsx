import { useState } from 'react'
import FileUpload from './components/FileUpload'
import './app.css'

function App() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)

  function validateDoc(arr) {
    // Verificar se a primeiro linha do arquivo recebido é válido
    if (arr[0] !== 'product_code,new_price' && arr[0] !== 'pack_code,new_price') {
      // alert('Erro: A primeiro linha do documento deve ser "product_code,new_price" ou "pack_code,new_price"')
      setError('Erro: A primeiro linha do documento deve ser "product_code,new_price" ou "pack_code,new_price"')
    }
  
    // Iterar pelos elementos restantes para validar o formato
    for (let i = 1; i < arr.length; i++) {
      const elementos = arr[i].split(',')
  
      const [codigo, preco] = elementos;
  
      // Verificar se o código e o preço são numéricos
      if (isNaN(codigo) || isNaN(preco)) {
        // alert(`Erro: Valores não numéricos no elemento ${isNaN(codigo) && codigo || isNaN(preco) && preco} - Deve ser "valor_numerico,valor_numerico"`)
        setError('Erro: A primeiro linha do documento deve ser "product_code,new_price" ou "pack_code,new_price"')
      }

      console.log(elementos)
    }
  }

  // const infoFile = {}

  // if (file) infoFile.indentifyCode = file[0]
  // console.log(infoFile)


  return (
    <>
      {error !== null && typeof error === "string"  && alert(error)}
      <h1>teste</h1>
      <FileUpload file={file} setFile={setFile} setError={setError} />
      {file && error == null && <button onClick={() => validateDoc(file)}>Validar</button>}

    </>
  )
}

export default App





