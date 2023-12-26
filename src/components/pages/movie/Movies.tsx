import instance from "../../api/fetcher";
import { useEffect, useState } from "react";
import { EditMovieForm } from "./EditMovieForm";
import { AddMovieForm } from "./AddMovieForm";

export interface Movie {
    id: string;
    title: string;
    cost: number;
}



export const Movies = () => {
    const [movies, setMovie] = useState<Movie[]>([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleDelete = (id: string) => {
        instance.delete(`/movies/${id}`).then((response) => {
            console.log(response);
            fetchMovies();
        }, (error) => {
            alert(error.response.data.message)
            console.log(error);
        }
        );
    }

    const fetchMovies = () => {
        instance.get("/movies").then((response) => {
            setMovie(response.data);
        }, (error) => {
            console.log(error);
        }
        );
    }

    return (
        <>
            <div className="flex justify-center items-center bg-gray-200 p-4 rounded-lg flex-col">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Cost</th>
                            <th>Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.sort((a, b) => { return a.title < b.title ? -1 : 1 }).map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.title}</td>
                                <td>{movie.cost}</td>
                                <td>{movie.id}</td>
                                <td><button onClick={() => handleDelete(movie.id)} className="col-span-2 bg-blue-500 text-white rounded p-2 w-32">Delete</button></td>
                                <td><EditMovieForm {...movie} fetchMovies={() => fetchMovies()} /></td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>
            <div className="flex justify-end">
                <AddMovieForm fetchMovies={() => fetchMovies()} />
            </div>
        </>
    )
}