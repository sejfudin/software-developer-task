import React from 'react'

const Search = () => {
    return (
        <div className='float-right w-25 me-4'>
            <div className="input-group float-end my-3" >
                <input
                    type="search"
                    id="form1"
                    className="form-control float-end"
                    placeholder='Search'
                // onChange={(e) => setFilter(e.target.value)} 
                />
            </div>
        </div>
    )
}
export default Search;