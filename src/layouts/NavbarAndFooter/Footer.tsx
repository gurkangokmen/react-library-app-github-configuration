// If no return type is defined, 
// TypeScript will attempt to infer it through the types of the variables or expressions returned.

import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className='main-color'>
            <footer className='container d-flex flex-wrap 
                justify-content-between align-items-center py-5 main-color'>
                <p className='col-md-4 mb-0 text-white'>© Example Library App, Inc</p>
                <ul className='nav navbar-dark col-md-4 justify-content-end'>
                    <li className='nav-item'>
                        <Link to='/home' className='nav-link px-2 text-white'>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        {/* Here we do not necessarily want to use nav link in our footer.
                        We want to keep the nav link only to our header. */}
                        <Link to='/search' className='nav-link px-2 text-white'>
                            Search Books
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
    );
}