import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className="flex flex-col items-center sm:pt-20 mt-6 pb-6">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {[assets.hero_img1, assets.hero_img2, assets.hero_img3].map((imgSrc, index) => (
          <div
            key={index}
            className="border border-gray-300 p-2 sm:p-4 rounded-md w-[90%] xs:w-[80%] sm:w-[45%] lg:w-1/4"
          >
            <img
              className="mx-auto pt-2 sm:pt-4 w-1/2 sm:w-2/3 h-auto"
              src={imgSrc}
              alt=""
            />
            <figcaption className="text-left mt-2 sm:mt-4 text-[0.7rem] sm:text-xs text-gray-600 leading-snug">
              <span className="font-bold">{`Figure 1-1${0 + index}:`}</span>{' '}
              {index === 0 && 'Imaginary map of all the physics formulas.'}
              {index === 1 && 'Forgotten facts can be recreated by triangulating from known facts.'}
              {index === 2 && 'New discoveries are made by physicists triangulating from the known to the previously unknown.'}
            </figcaption>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero