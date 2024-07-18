import React, { useRef } from 'react';

const SearchByAmount = ({ onSearch }) => {
  const searchInput = useRef('');

  return (
    <div className="input-group mb-3">
      <div className="form-floating">
        <input
          type="number"
          className="form-control"
          id="floatingInputGroup1"
          placeholder="Transaction Amount"
          ref={searchInput}
          onChange={(e) => {
            if ( e.target.value =='' ) onSearch(-1);
          }}
        />
        <label htmlFor="floatingInputGroup1">Transaction Amount</label>
      </div>
      <button className="btn btn-dark" onClick={() => onSearch(searchInput.current.value)}>
        Search
      </button>
    </div>
  );
};

export default SearchByAmount;