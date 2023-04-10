import { Route, Routes, useLocation } from 'react-router-dom'
import React from 'react'
import * as api from './Api'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from './pages/main'
import Equipment from './pages/equipment'
import MainNavigation from './components/Navigation/MainNavigation'
import PopupBag from './components/PopupBag/PopupBag'
import Services from './pages/services'
import IndividualPageOfEquipment from './pages/individualPageOfEquipment'
import Information from './pages/Information'
import PopapLuckySendForm from './components/PopapLuckySendForm/PopapLuckySendForm'

function App() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isBagOpen, setIsBagOpen] = React.useState(false)
  const [isLuckyFormPopapOpen, setLuckyFormPopapOpen] = React.useState(false)
  const [popular, setPopular] = React.useState({})
  const [complects, setComplects] = React.useState({})
  const [allProducts, setAllProducts] = React.useState({})
  const [selectedCard, setSelectedCard] = React.useState({})
  const [savedGoods, setSavedGoods] = React.useState([])
  const [promo, setPromo] = React.useState({})
  const [isPromoOk, setIsPromoOk] = React.useState(false)
  const [discount, setDiscount] = React.useState(1)
  const [error, setError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [finalPrice, setFinalPrice] = React.useState()
  const [afterPromo, setAfterPromo] = React.useState()
  const [isAdded, setIsAdded] = React.useState(false)
  /*const [value, setValue] = React.useState("Выбрать")*/
  const [isButtonChanged, setIsButtonChanged] = React.useState(false)
  
/*
  function ScrollToTop() {
    const { pathname } = useLocation();
  
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }*/
/*
    const changeButton = (good) => {
    if(savedGoods.some(item => item.id === good.id)) {
       console.log("Товар был добавлен в корзину")
       setIsButtonChanged(true)
    }else{
      setIsButtonChanged(false)
    }
  }*/
  
/*
  const handleSaveGood = (good) => {
    if(savedGoods.some(item => item.id === good.id)) {
       //console.log("Товар уже был добавлен в корзину")
    }else{
      setSavedGoods([good, ...savedGoods])
      setIsButtonChanged(true)
      console.log(isButtonChanged + "успех")
    }
  } */

  const handleSaveGood = (good) => {
    if(!(savedGoods.some(item => item.id === good.id))) {
      setSavedGoods([good, ...savedGoods])
    }else{
      return
    }
  }

  function handleChangeButton(data) {
    if(data.id === data.id) {
      data.is_in_bag = 2
    }
  }

  function handleChangeButtonAfterDeletefromBag(data) {
    if(data.id === data.id) {
      data.is_in_bag = 1
    }
  }

  const handleDeleteGood = (good) => {
    setSavedGoods((goods) =>
      goods.filter((g) => g.id !== good.id)
    )
  }

  function increment(id) {
    setSavedGoods((good) => {
      return good.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: ++product.quantity,
            total_price: product.quantity * product.price,
          }
        }
        return product
      })
    })
  }

  function decrement(id) {
    setSavedGoods((good) => {
      return good.map((product) => {
        if (product.id === id) {

         const newQuantity = product.quantity - 1 > 1 ? product.quantity - 1 : 1

          return {
            ...product,
            quantity: newQuantity,
            total_price: newQuantity * product.price,
          }
        }
        return product
      })
    })
  }


  let total = {
    price: savedGoods.reduce((prev, curr) => { return prev + curr.total_price }, 0),
    count: savedGoods.reduce((prev, curr) => { return prev + curr.quantity }, 0),
  } 

  const checkPromo = (promoInput) => {
    api.checkPromo(promoInput)
      .then(res => {
        setPromo(res)
        setDiscount(res.discount)
        console.log(res)
        setIsPromoOk(true)
        getPriceAfterPromoCode()
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        if (err.status === 400 || 404 ) {
          setErrorMessage('Такого купона не существует или истек срок его действия.')
          setTimeout(function(){
            setErrorMessage('');
          }, 5000)
        }else{
          setErrorMessage('На сервере произошла ошибка.')
        }
      })
  }

  function postUserDataAndOrder(userData){
    api.postUserDataAndOrder({
      phone_order:userData.nameTel,
      first_name:userData.nameInput,
      order_price: finalPrice,
      email:userData.nameEmail,
      cupon: promo.id,
    }) 
    .then((res) => {
      savedGoods.forEach((item) => {
        item.order = res.id
        item.product = item.id
      })
    })
    .then((res) => {
      api.postOrderItems(
        savedGoods
      )
    })
    .then((res) => {
      console.log(res)
      setError(false)
      setLuckyFormPopapOpen(true)
      setDiscount(1)
      setSavedGoods([])
      setAfterPromo()
      setFinalPrice()
      setIsPromoOk(false)
      setPromo({})
      setIsAdded(false)
    })
    .catch((err) => {
      console.log(err)
      setError(true)
      if (err.status === 400 || 402) {
        setErrorMessage('Ошибка с запросом');
        setTimeout(function(){
          setErrorMessage('');
        }, 3000)
      } else {
        setErrorMessage('На сервере произошла ошибка.')
        setTimeout(function(){
          setErrorMessage('');
        }, 5000)
      }
    })
  }

  function getPriceAfterPromoCode() { 
    if((promo.discount !== undefined) && (promo.discount >= 0.1)){
      setAfterPromo (total.price * promo.discount)
    }else{
      return
    }
  }

  React.useEffect(() => {
    getPriceAfterPromoCode()
  }, [promo.discount !== undefined])

///Формирование конечной/итоговой цены с промокодом или нет, та цена, которую я оправляю с пост запросом
function getFinalPrice() {
    setFinalPrice(total.price * discount) //умножаю цену (всех товаров и колличеств) на коэффицент (изначально истановлен 1, изменяю при запросе купона, устанавливаю значения дискаунта)
  }

  React.useEffect(() => {
    getFinalPrice()
  }, [total.price, afterPromo])
///

  React.useEffect(() => {
    getPopular()
  }, [])

  const getPopular = () => {
    api.getPopular()
      .then(res => {
        setPopular(res)
        console.log(res)
      })
  }

  React.useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = () => {
    api.getAllProducts()
      .then(res => {
        setAllProducts(res)
      })
  }

  React.useEffect(() => {
    getComplects()
  }, [])

  const getComplects = () => {
    api.getComplects()
      .then(res => {
        setComplects(res)
        console.log(res)
      })
  }

  const postBackCall = (userData) => {
    api.postBackCall({
      name:userData.name,
      phone_number:userData.tel,
    })
      .then(res => {
        console.log(res)
        setLuckyFormPopapOpen(true)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        setErrorMessage('Ошибка, проверьте номер телефона, он должен начинаться с +7 и содержать не менее 11 символов')
        setTimeout(function(){
          setErrorMessage('');
        }, 5000)
      })
  }

  function handleCardClick(card) {
    setSelectedCard(card.id);
  }

  function handleBurgerMenuClick() {
    setIsBurgerMenuOpen(true)
  }

  function handleMenuClick() {
    setIsMenuOpen(true)
  }

  function handleBagClick() {
    setIsBagOpen(true)
  }
  
  function closeAllPopups() {
    setIsBurgerMenuOpen(false)
    setIsMenuOpen(false)
    setIsBagOpen(false)
    setLuckyFormPopapOpen(false)
  }

  return (
    <div className="App">
      <Header
          isBurgerMenuCliked={handleBurgerMenuClick}
          isbagCliked={handleBagClick}
          total={total}    
      />

      <Routes>

          <Route
              exact path="/"
              element={
                <Main
                isAdded={isAdded}
                popular={popular}
                complects={complects}
                handleSaveGood={handleSaveGood}
                postBackCall={postBackCall}
                errorMessage={errorMessage}
                error={error}
                handleChangeButton={handleChangeButton}
                />
              }
          />

          <Route
              path="/equipment"
              element={
                <Equipment
                onCardClick={handleCardClick}
                isMenuCliked={handleMenuClick}
                handleSaveGood={handleSaveGood}
                isOpen={isMenuOpen}
                onClose={closeAllPopups} 
                increment={increment}
                decrement={decrement}
                handleChangeButton={handleChangeButton}
                />
              }
          />

          <Route
              path="/services"
              element={
                <Services
                handleSaveGood={handleSaveGood}
                isOpen={isMenuOpen}
                isMenuCliked={handleMenuClick}
                onClose={closeAllPopups} 
                handleChangeButton={handleChangeButton}
                />
              }
          />

          <Route 
              path='/equipment/:slug' 
              element={
                <IndividualPageOfEquipment
                handleSaveGood={handleSaveGood}
                allProducts={allProducts}
                postBackCall={postBackCall}
                errorMessage={errorMessage}
                error={error}
                handleChangeButton={handleChangeButton}
                />
              }
          />

          <Route 
              path='/services/:slug'
              element={
                <IndividualPageOfEquipment
                handleSaveGood={handleSaveGood}
                allProducts={allProducts}
                postBackCall={postBackCall}
                errorMessage={errorMessage}
                error={error}
                handleChangeButton={handleChangeButton}
                />
              }
          />

          <Route 
              path='/information'
              element={
                <Information
                />
              }
          />
        
      </Routes>
      <MainNavigation
          isOpen={isBurgerMenuOpen}
          onClose={closeAllPopups} 
          isbagCliked={handleBagClick}
          total={total}
      />

      <PopupBag
          onClose={closeAllPopups}
          isOpen={isBagOpen}
          savedGoods={savedGoods}
          handleDelete={handleDeleteGood}
          increment={increment}
          decrement={decrement}
          total={total}
          checkPromo={checkPromo}
          discount={discount}
          isPromoOk={isPromoOk} 
          promo={promo}
          errorMessage={errorMessage}
          error={error}
          postUserDataAndOrder={postUserDataAndOrder}
          finalPrice={finalPrice}
          handleChangeButtonAfterDeletefromBag={handleChangeButtonAfterDeletefromBag}
      />
      <PopapLuckySendForm
      onClose={closeAllPopups}
      isOpen={isLuckyFormPopapOpen}
      />
      
      <Footer></Footer>
    </div>
  );
}

export default App;