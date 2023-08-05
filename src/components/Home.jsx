import React from 'react'
import hero from '../assets/hero.jpg'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <section className="max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:flex lg:items-center">
        <div className="lg:mr-auto lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-gray-900">
          Bienvenido a SportFit - Tu Tienda de Accesorios Deportivos
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Desde ropa de entrenamiento hasta equipos de gimnasia y accesorios deportivos, SportFit tiene todo lo que necesitas para un estilo de vida activo.
          </p>

          <button className="inline-flex items-center justify-center px-5 py-3 mt-4 text-base font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
            Registrar Producto
          </button>
        </div>
        <div className="lg:mt-0 lg:col-span-5 lg:flex lg:justify-end">
          <img className="max-w-full" src={hero} alt="SportFit Store" />
        </div>
      </section>
    </div>


  )
}

export default Home