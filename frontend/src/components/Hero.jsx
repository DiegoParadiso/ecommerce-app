import React from 'react'
import {assets} from '../assets/assets'
const Hero = () => {
  return (
<div className="flex flex-col items-center mt-9 pb-8">
  <div className="flex flex-wrap justify-center gap-4">
    {/* Primer cuadro */}
    <div className="border border-gray-400 p-2 rounded-lg w-full sm:w-1/2 lg:w-1/3">
      <img className="block pt-4 w-2/3 h-auto" src={assets.hero_img1} alt="" />
      <figcaption className="text-left mt-4 text-xs text-gray-600">
        <span className="font-bold">Figure 1-19:</span> Imaginary map of all the physics formulas.
      </figcaption>
    </div>
    {/* Segundo cuadro */}
    <div className="border border-gray-400 p-2 rounded-lg w-full sm:w-1/2 lg:w-1/3">
      <img className="block pt-4 w-2/3 h-auto" src={assets.hero_img2} alt="" />
      <figcaption className="text-left mt-4 text-xs text-gray-600">
        <span className="font-bold">Figure 1-20:</span> Forgotten facts can be recreated by triangulating from known facts.
      </figcaption>
    </div>
    {/* Tercer cuadro */}
    <div className="border border-gray-400 p-2 rounded-lg w-full sm:w-1/2 lg:w-1/3">
      <img className="block pt-4 w-2/3 h-auto" src={assets.hero_img3} alt="" />
      <figcaption className="text-left mt-4 text-xs text-gray-600">
        <span className="font-bold">Figure 1-21:</span> New discoveries are made by physicists triangulating from the known to the previously unknown.
      </figcaption>
    </div>
  </div>
</div>
  );
}

export default Hero