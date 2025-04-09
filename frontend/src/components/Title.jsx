import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-2 font-thin items-center mb-3'>
        <p className='text-gray-500 text-[1.05rem] sm:text-lg'>{text1} <span className='text-gray-800 '>{text2}</span></p>
        <p className='w-8 sm:w-7 h-[1px] sm:h-[1px] bg-gray-700'></p>
    </div>
  )
}

export default Title