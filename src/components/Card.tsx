import React from 'react'
import { Movie } from '../models/Movie';

const Card: React.FC<Movie> = ({ _id, title, publishing_year, image }) => {
    return (
        <React.Fragment>
            <div key={_id} className='bg-cardColor hover:bg-inputColor cursor-pointer rounded-lg p-1'>
                <img src={image} alt={title + '_image'} className='w-full h-[250px] rounded-md' />
                <div className='my-4'>
                    <p className='text-sm m-2 font-semibold'>{title}</p>
                    <p className='text-xs m-2'>{publishing_year}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Card