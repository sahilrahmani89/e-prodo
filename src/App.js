import React from 'react';
import './App.css';
import Home from './components/Home';
import { Route, Routes} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Product from './components/products/Product';
import ProductDetails from './components/products/ProductDetails';

//containing All Routes 


function App() {
  return (
    <>
    <Container >
      <Routes> 
            <Route exact path="/" element={<Home />} /> 
            <Route exact path='/product/:id' element={<Product/>} /> 
            <Route exact path='/productdetails/:id' element={<ProductDetails/>} />
      </Routes>
     </Container>
    </>
  );
}

export default App;
