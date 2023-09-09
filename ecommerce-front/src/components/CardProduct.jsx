import './CardProduct.css'
function CardProduct({product}) {

    return (
        <section className="section-card-product">
            <h4>Dados do produto</h4>
            <p>{product.code}</p>
            <p>{product.name}</p>
            <p>R${product.sales_price}</p>
        </section>
    )
}

export default CardProduct
