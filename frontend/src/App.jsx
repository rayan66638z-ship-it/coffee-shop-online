import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products')
      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  return (
    <div className="container mt-4">
      <header className="text-center mb-5">
        <h1 className="text-success">☕ متجر القهوة</h1>
        <p className="lead">استمتع بأفضل أنواع القهوة من حول العالم</p>
      </header>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">جاري التحميل...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img 
                  src={product.imageUrl || '/images/coffee-placeholder.jpg'} 
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-dark">{product.name}</h5>
                  <p className="card-text text-muted">{product.description}</p>
                  <div className="mb-2">
                    <span className="badge bg-primary">{product.category}</span>
                    <span className="badge bg-secondary mx-1">{product.roastLevel}</span>
                    <span className="badge bg-info">{product.origin}</span>
                  </div>
                  <h6 className="text-success">{product.price} $</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
