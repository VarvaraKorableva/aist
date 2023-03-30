import React from 'react'
import * as api from '../Api'
import Slider from '../components/Slider/Slider'
import ServicesList from '../components/Services/ServicesList'
import ServicesNav from '../components/Services/ServicesNav'
import './services.css'


function Services({}) {

    //onClick={isMenuCliked}
    //isMenuCliked, onCardClick

    const [isMobile, setIsMobile] = React.useState(false)
    const [services, setServices] = React.useState({})
    const [category, setCategory] = React.useState({})

    const handleResize = () => {
      if (window.innerWidth < 1100) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
  
    React.useEffect(() => {
      window.addEventListener("resize", handleResize)
    })

    React.useEffect(() => {
      getServices()
    }, [])
  
    const getServices = () => {
      api.getServices({
        })
        .then(res => {
          setServices(res)
        })
    }  

    React.useEffect(() => {
      getServicesCategory()
    }, [])
  
    const getServicesCategory = () => {
      api.getServicesCategory()
        .then(res => {
          setCategory(res)
        })
    }

    return (
      <>
        {isMobile?
          <>
            <div className='services__wrapper'>
                <h3 className='services__title'>Услуги</h3>
                <div className='services__menu'>
                    <p className='services__text'>Все товары</p>
                    <button className='services__menu-btn'></button>
                </div>
            </div>
              <Slider></Slider>
              <ServicesList
              data={services}
              />
          </>
          :
          <>
              <>
            <Slider></Slider>
            <h3 className='services__title-dop'>Услуги</h3>
            <div className='services__container'>
                <ServicesNav
                data={category}
                />
                <ServicesList
                data={services}
                />
            </div>
            </>
          </>
        }
        </>
    );
  }
  export default Services;