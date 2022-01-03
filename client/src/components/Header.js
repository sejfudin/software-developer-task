import React from 'react';
import Login from './Login';
import Search from './Search';

const Header = () => {
    return (
        <div className='container my-3' >
            <nav className=' navbar navbar-light' style={{ backgroundColor: '#e3f2fd' }}>
                <div
                    className='navbar-brand  d-md-block mx-2'
                    style={{ height: '50px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                    </svg>
                </div>
                <div >
                <div className='row'>
                    
                      <div className='col-8 '><Search /></div> 
                <div className='col-3 my-3 me-4 float-end'><Login /></div>  
                    </div>
                   
                </div>
            </nav>
        </div>
    )
}
export default Header;