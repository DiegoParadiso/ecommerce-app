import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='font-titles inline-flex gap-2 items-center mb-3'>
        <p className='text-gray-500'>{text1} <span className='text-gray-800 font-medium'>{text2}</span></p>
        <p className='w-8 sm:w-7 h-[1px] sm:h-[1px] bg-gray-700'></p>
    </div>
  )
}

export default Title