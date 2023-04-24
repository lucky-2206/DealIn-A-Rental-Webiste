import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main'
import PopularProducts from './components/popularProducts/PopularProducts'
import FeaturedProducts from './components/featuredProducts/FeaturedProducts'
import Newsletter from './components/newsletter/Newsletter'
import Footer from './components/footer/Footer'
import ProductDetail from './components/productDetail/ProductDetail'
import Products from './components/products/Products'
import Signin from './components/signin/Signin'
import Signup from './components/signup/Signup'
function App() {
  return (
    <div >
    <Routes>
      <Route path='/' element={
        <>
          <Navbar/>
          <Main/>
          <PopularProducts/>
          <FeaturedProducts/>
          <Newsletter/>
          <Footer/>
        </>
      }/>
      
      <Route path='/products' element={<>
        <Navbar/>
        <Products/>
        <Footer/>
      </>
      }/>

      <Route path='/productDetail/:id' element={<>
        <Navbar/>
        <ProductDetail/>
        <Footer/>
      </>
      }/>

      <Route path='/signUp' element={<Signup/>}/>
      <Route path='/signIn' element={<Signin/>}/>
    </Routes>
    </div>
  );
}

export default App;
