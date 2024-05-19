
import React from 'react'


const ModalDetails = ({ data }) => {
   
    return (
        <div className='withdraw__container'>
            {data.map((item, index) => (
                <div className='withdraw__details' key={index}>
                    <p>{item?.label}</p>
                    <span>{item?.value}</span>
                </div>
            ))}     
        </div>
    )
}

export default ModalDetails