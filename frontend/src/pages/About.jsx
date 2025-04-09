import React from 'react';
import Title from '../components/Title';

const About = () => {
  return (
    <div className='my-5 md:my-8 px-4 max-w-3xl mx-auto text-center text-gray-700'>
      <div className='mb-4 sm:mb-10'>
      <Title text1={'ACERCA DE'} text2={'NOSOTROS'} />
      </div>

      <div className='space-y-10 sm:space-y-16 text-sm leading-relaxed'>
        <p className='sm:leading-[2.5]'>
        Nos especializamos en la pesca de prendas únicas en tiendas vintage, mercados de pulgas y tiendas de segunda mano de todo el país que llegan de cualquier parte del mundo, rescatando piezas con historia, carácter y autenticidad.
        </p>
        <p className='sm:leading-[2.5]'>
        Cada artículo es cuidadosamente seleccionado para garantizar su calidad, asi como también su curado e intervención si es necesario.
        </p>
        <p className='sm:leading-[2.5]'>
        Nos esforzamos por crear una experiencia de compra única y personalizada. Nuestro equipo está apasionado por esta corriente y está siempre dispuesto a asesorarte para que encuentres las prendas que mejor se adapten a tu personalidad y estilo.
        </p>
        <p className='sm:leading-[2.5]'>
          Gracias por formar parte de esta comunidad.
        </p>
      </div>
    </div>
  );
};

export default About;