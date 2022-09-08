import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

function SearchBar({ list = [], className = '' }) {
  const [selection, setSelection] = useState(null);
  const navigate = useNavigate();
  const options = list.map(i => {
    return {
      label: i.neighborhood,
      value: i.slug,
    }
  });

  const handleSelection = (selected) => {
    navigate(`profiles/${selected.value}`);

    setSelection(selected);
  };

  return <Select
    className={className ? className : `m-10 max-w-full box-border`}
    onChange={handleSelection}
    options={options} 
    placeholder='Click here to type or select your neighborhood...'
    isSearchable={true}
    value={selection}
  />
}

export default SearchBar;
