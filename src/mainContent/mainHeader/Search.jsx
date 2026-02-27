import SearchResult from './SearchResult.jsx';
import Searching from './Searching.jsx';
import React, { useState, useEffect, useContext, useRef } from 'react';
import SearchBtn from './Search-btn.jsx';
import SearchInput from './SearchInput.jsx';
import {useToggle} from '../../Store/toggleHook.jsx'

import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../Store/store.jsx';

const Search = () => {
  const inputRef = useRef(null);
  const resultRef = useRef(null);
  
  const [searchVal, setSearchVal] = useState("");
  const {location , setLocation ,Error, setError} = useContext(UserContext);
  
  const [searchOn, setSearchOn] = useToggle(resultRef);

  const { data, isPending, isError} = useQuery({
    queryKey: ['cities', searchVal], // Use an array for the key
    queryFn: () => 
      fetch(`https://photon.komoot.io/api/?q=${searchVal}&limit=50`)
        .then(res => res.json())
        .then(data => {
          if(!data || data.features.length === 0){
            console.log("there is no search results")
            throw new Error('no search results');
          }
          return data;
        }),
    enabled: !!searchVal, 
  });
  useEffect(() => {
    if(isError){
      
      setError(true)
      setSearchOn(false)
    }
  }, [data,isError]);
  
  function getCities(searchData) {
    const locType = ["city","county","district","state"]
    const cities = searchData.features.filter(item => locType.includes(item.properties.type))
    const cityWithFilter = cities.map(el => {
      const item = el.properties
      return {
        "city": item.name,
        "discription": [item.city, (item.county?.replace("District","").replace("County","").trim()), item.state].filter(Boolean).join(", "),
        "country": item.country,
        "lon": el.geometry.coordinates[0],
        "lat": el.geometry.coordinates[1]
      };
    });
    return cityWithFilter;
  }
  
  
  const searchedCities = data ? getCities(data): null
  
  function selectCity(city) {
    setSearchOn(false)
    setLocation(city)
    if(Error){
      setError(false)
    }
  }
  useEffect(() => {
    localStorage.setItem("location", JSON.stringify(location))
  }, [location]);

  async function getVal(formData) {
    if (formData.get("search")) {
    setSearchOn(true)
    if(searchVal !== formData.get("search")){
      inputRef.current.focus && inputRef.current.blur()
      setSearchVal(formData.get("search").replace(/\s*,\s*/g, ',').replace(/\s\s+/g, ' ').trim())
    }
    }
  }
  
  
  return(
    <form className="sm:mt-16 w-full md:w-[90%]" action={getVal}>
      <search>
        <div className="flex flex-col sm:flex-row items-start gap-4"
        >
          <div className="relative w-full mt-10 sm:mt-0">
            <SearchInput inputRef={inputRef}></SearchInput>
            {(searchOn && !isError) && (isPending ? <Searching></Searching>: <SearchResult cities={searchedCities} selectCity={selectCity} ref={resultRef}></SearchResult>)}
          </div>
          <SearchBtn></SearchBtn>
        </div>
      </search>
    </form>
  )
}

export default Search;