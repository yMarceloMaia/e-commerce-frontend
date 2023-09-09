import { useEffect, useState } from 'react'
import FileUpload from './components/FileUpload'
import './app.css'
import { BASE_URL } from './constants/BASE_URL'
import axios from 'axios'
import CardProduct from './components/CardProduct'

function App() {
  const [file, setFile] = useState(null)
  const [fileToApi, setFileToApi] = useState(null)
  const [error, setError] = useState(null)
  const [dataFile, setDataFile] = useState([])
  const [products, setProducts] = useState([])
  const [productsFind, setProductsFind] = useState([])

  useEffect(() => {
    getProducts()
    getProductsByDataFile()
  }, [dataFile])

  function validateDoc(arr) {
    if (arr[0] !== 'product_code,new_price') {
      setError('Erro: A primeiro linha do documento deve ser "product_code,new_price" ou "pack_code,new_price"')
      return
    }

    const infoProducts = []
    for (let i = 1; i < arr.length; i++) {
      const elementos = arr[i].split(',')

      const [codigo, preco] = elementos;

      if (isNaN(codigo) || isNaN(preco)) {
        setError('Erro: A primeiro linha do documento deve ser "product_code,new_price" ou "pack_code,new_price"')
        return
      }

      infoProducts.push(elementos)
    }
    setDataFile(infoProducts)
  }

  const getProductsByDataFile = () => {
    const productsExist = []
    for (let data of dataFile) {
      const productExist = products.find(prod => prod.code === Number(data[0]))
      console.log({productsExist})
      if (!productExist) {
        setError(`Erro: O código ${data[0]} não corresponde a nenhum produto cadastrado`)
      }
      productsExist.push(productExist)
    }
    setProductsFind(productsExist)
  }

  const clearInput = () => {
    document.getElementById('sendFile').value = null;
  }

  const getProducts = () => {
    axios.get(`${BASE_URL}/products`)
      .then(res => {
        setProducts(res.data)
      }).catch(err => {
        console.log(err)
      })
  }

  const updatePriceProducts = () => {
    const formData = new FormData();
    formData.append('file', fileToApi);

    axios.post(`${BASE_URL}/products`, formData)
      .then(res => {
        alert(res.data.message)
        setProductsFind([])
        setFile(null)
        setFileToApi(null)
        clearInput()
      }).catch(err => console.log(err))
  }

  return (
    <>
      {error !== null && typeof error === "string" && alert(error)}
      <h1>SHOPPER</h1>
      <FileUpload setFile={setFile} setError={setError} setFileToApi={setFileToApi} />
      <section className='section-buttons'>
        {file && error == null && <button onClick={() => validateDoc(file)}>Validar</button>}
        {productsFind.length > 0 && <button onClick={updatePriceProducts}>Atualizar</button>}
      </section>
      {productsFind.length > 0 && productsFind.map((product) => {
        return <CardProduct key={product.code} product={product} />
      })}
    </>
  )
}

export default App