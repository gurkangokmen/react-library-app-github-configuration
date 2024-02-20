import { ReturnBook } from "./ReturnBook";
import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { Console } from "console";

// If no return type is defined, 
// TypeScript will attempt to infer it through the types of the variables or expressions returned.

export const Carousel = () => {
    /**
     * When useState value is changed, related part is render!
     */
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
 
    /** 
        React Hook that tells our
        React app that it needs to do something
        after render. In this case, fetch
        information for our carousel.
    */

    useEffect(() => {
        const fetchBooks = async () => {
            
            
            const baseUrl: string = `${process.env.REACT_APP_API}/books`;

            const url: string = `${baseUrl}?page=0&size=9`;
            
            const response = await fetch(url);
            
            /**
             * for example, if backend is run but database server is not work
             */
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            
            const responseJson = await response.json();
            
            const responseData = responseJson._embedded.books;

            
            const loadedBooks: BookModel[] = [];

            /**
             * for (const key in responseData) {console.log(key);}
             * 
             * Output: 0 1 2 3 4 5 6 7 8
             */
            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                });
            }

            /**
             * setBooks(responseData) will work fine. 
             * This was implemented to make sure no additional fields were being implemented within our BookModel.
             */

            setBooks(loadedBooks);
            setIsLoading(false);
        };

        // Because it's async (fetchBooks method), there can be an error.
        // So we catch any errors that can come back.

        /**
         * for example, if backend is not run, it says failed to fetch
         */
        fetchBooks().catch((error: any) => {            
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    // Runs on the first render
    // And any time any dependency value changes

    /** 
    
    useEffect(() => {
        //Runs on every render
      });

    useEffect(() => {
        //Runs only on the first render
    }, []);

    useEffect(() => {
        //Runs on the first render
        //And any time any dependency value changes
    }, [prop, state]);
    
    */

    // We're leaving our state change as empty, which means if anything changes within this application or
    // this component, this use effect will not get called again because we only want nine static items from    
    // the API.
    
    

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(0, 3).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>

                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(3, 6).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>

                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(6, 9).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>


                </div>

                <button className='carousel-control-prev' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                <ReturnBook book={books[7]} key={books[7].id}/>
                </div>

            </div>

            <div className='homepage-carousel-title mt-3'>
                <Link className='btn btn-outline-secondary btn-lg' to='/search'>View More</Link>
            </div>

        </div>
    );
}