import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import classNames from 'classnames';
import { Movie } from '../models/Movie';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryBtn from '../components/PrimaryBtn';
import axios from 'axios';
import { base_url } from '../utils/baseUrl';
import LogoutBtn from '../components/LogoutBtn';
import Pagination from '../components/Pagination';
//import Footer from '../components/Footer';

const Dashboard = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    //const [error, setError] = useState<Error>();

    const getMovies = async (page: number) => {
        const res = await axios.get(`${base_url}/all?page=${page}&limit=10`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.access_token)}` }});
        
        if(res.status == 200) {
            setMovies(res.data.movies)
            setTotalPages(res.data.totalPages);
        } else {
            //setError(await res.data.message);
            return;
        }
    }

    const add_movie = async () => {
        navigate('/movies/new');
    }

    useEffect(() => {
        getMovies(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <React.Fragment>    
            {movies && movies.length > 0 && <div>
                <div className='flex justify-between items-center'>
                    <p className='text-3xl m-5 cursor-pointer'>My movies 
                        <Link to="/movies/new"><i className='ri-add-circle-line cursor-pointer mx-3'></i></Link></p>
                    <LogoutBtn />
                </div>
                <div className='grid grid-cols-12 my-10 gap-5 px-5'>    
                    {movies.map((movie: Movie) => (<div key={movie._id} onClick={() => navigate(`/movies/${movie._id}/edit`)} className={classNames('col-span-6 lg:col-span-3')}>
                        <Card _id={movie._id} title={movie.title} publishing_year={movie.publishing_year} image={movie.image} />
                    </div>))}

                </div>
                <div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>}

            {movies && movies.length < 1 && <div className='flex flex-col items-center justify-center translate-y-3/4'>
                    <p className="text-4xl font-semibold">Your movie list is empty</p>
                    <div className='my-5'>
                        <PrimaryBtn onClick={add_movie}>Add a new movie</PrimaryBtn>
                    </div>
            </div>}

            {/* <Footer/> */}
        </React.Fragment>
    )
}

export default Dashboard