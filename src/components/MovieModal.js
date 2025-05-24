import React from 'react';

const MovieModal = ({ movie, onClose }) => {

    const {
        title,
        poster_path,
        release_date,
        runtime,
        genres,
        overview,
        credits,
    } = movie;

    const starcast = credits?.cast?.slice(0, 5)?.map(c => c.name).join(", ");
    const directors = credits?.crew?.filter(c => c.job === "Director") || [];
    const writers = credits?.crew?.filter(c => c.department === "Writing") || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 overflow-auto">
            <div className="bg-[#0f172a] text-white rounded-xl w-full max-w-5xl flex flex-col md:flex-row p-6 relative">

                <button
                    className="absolute top-4 right-4 text-3xl text-white hover:text-red-500"
                    onClick={onClose}
                >
                    &times;
                </button>

                <div className="md:w-1/3 w-full flex justify-center mb-6 md:mb-0">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        alt={title}
                        className="rounded-xl w-full max-w-[300px]"
                    />
                </div>

                <div className="md:w-2/3 md:pl-6">

                    <h2 className="text-3xl font-bold text-white mt-3">
                        {title} <span className="text-gray-400 font-normal">(2021)</span>
                    </h2>

                    <p className="text-sm text-white mt-1 mb-4">
                        {release_date} • {genres?.map(g => g.name).join(", ")} • {runtime} mins
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Overview</h3>
                    <p className="text-gray-200 text-sm mb-4">{overview}</p>

                    <h3 className="text-xl font-semibold mb-2">Star Cast</h3>
                    <p className="text-gray-200 text-sm mb-4">{starcast}
                    </p>

                    <div className="text-sm text-white flex flex-col sm:flex-row gap-6 sm:gap-24 mt-5">
                        {<div>
                            <p className="font-bold">{directors.map(d => d.name).join(", ")}</p>
                            <p>Director</p>
                        </div>}
                        <div>
                            <p className="font-bold">{writers.map(w => w.name).join(", ")}</p>
                            <p>Writer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;