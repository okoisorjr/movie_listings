import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import PrimaryBtn from "../components/PrimaryBtn";
import CancelBtn from "../components/CancelBtn";
import axios from "axios";
import { base_url } from "../utils/baseUrl";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import LogoutBtn from "../components/LogoutBtn";

const EditMovie = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [publishingYear, setPublishingYear] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [preview, setPreview] = useState<string>("");

    const getMovie = async() => {
        setIsLoading(true);
        const response = await axios.get(`${base_url}/all/${id}`, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.access_token)}` }});
        const movie = response.data.movie;
        
        if(response.status == 200) {
            setTitle(movie.title);
            setPublishingYear(movie.publishing_year);
            setImage(movie.image);
            setPreview(movie.image);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getMovie();
    }, []);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPublishingYear(e.target.value);
    };

    const handleFileSelection = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const fileURL = URL.createObjectURL(file); // Generate preview URL
        setPreview(fileURL);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        // Create FormData object
        const formData = new FormData();
        if (!fileInputRef.current || !fileInputRef.current.files?.[0]) {
            formData.append('image', image);
        }else {
            formData.append("file", fileInputRef.current.files[0]);
        }
        formData.append("title", title);
        formData.append("publishing_year", publishingYear);

        try {
            
            const response = await axios.put(`${base_url}/all/${id}/update`, formData, { headers: { Authorization: `Bearer ${JSON.parse(localStorage.access_token)}` }});

            if (response.status == 200) {
                getMovie();
                //navigate('/movies');
            } else {
                return;
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while uploading.");
        }
    }

    const cancel = () => {
        navigate("/movies");
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <React.Fragment>
            <div className="">
                <div className='flex justify-between items-center'>
                    <p className='text-3xl font-semibold m-5 cursor-pointer'>Edit</p>
                    <LogoutBtn />
                </div>
                <form className="my-10 px-10">
                    <div className="grid grid-cols-12 gap-5 lg:gap-10">
                        <div className="order-2 md:order-1 lg:order-1 col-span-12 md:col-span-6 lg:col-span-6">
                            <input
                                type="file"
                                id="file"
                                className="bg-inputColor"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*" // Optional: restrict file types
                                required
                                hidden
                            />
                            <div onClick={handleFileSelection} className="bg-inputColor cursor-pointer flex justify-center w-100 h-[20vh] lg:h-[70vh] rounded-lg border-dashed border">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="rounded-lg"
                                        style={{ width: "100%", height: "inherit" }}
                                    />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <i className="ri-download-2-line text-2xl"></i>
                                            "Drop an image here"
                                        </div>
                                    )}
                            </div>
                        </div>

                        <div className="order-1 md:order-2 lg:order-2 col-span-12 md:col-span-6 lg:col-span-6">
                            <div className="grid grid-cols-12 gap-5">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    id="text"
                                    className="bg-inputColor p-3 rounded-md col-span-12 w-full"
                                    value={title}
                                    onChange={handleTitleChange}
                                    required
                                />

                                <input
                                    type="text"
                                    id="text"
                                    placeholder="Publishing year"
                                    className="bg-inputColor p-3 col-span-12 lg:col-span-7 rounded-md"
                                    value={publishingYear}
                                    onChange={handleTextChange}
                                    required
                                />
                            </div>

                            <div className="hidden md:block lg:block">
                                <div className="flex gap-5 my-5">
                                    <CancelBtn onClick={cancel}>Cancel</CancelBtn>
                                    <PrimaryBtn onClick={handleSubmit}>Update</PrimaryBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:hidden lg:hidden gap-5 my-5">
                        <CancelBtn onClick={cancel}>Cancel</CancelBtn>
                        <PrimaryBtn onClick={handleSubmit}>Update</PrimaryBtn>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default EditMovie
