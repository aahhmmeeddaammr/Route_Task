import React, { useRef } from 'react';

const SearchByName = ({ onSearch }) => {
  const searchInput = useRef('');

  return (
    <div className="input-group mb-3">
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInputGroup1"
          placeholder="Username"
          ref={searchInput}
          onKeyUp={(e) => {
            if (e.target.value === '') onSearch('');
          }}
        />
        <label htmlFor="floatingInputGroup1">Customer Name</label>
      </div>
      <button className="btn btn-dark" onClick={() => onSearch(searchInput.current.value)}>
        Search
      </button>
    </div>
  );
};

export default SearchByName;


