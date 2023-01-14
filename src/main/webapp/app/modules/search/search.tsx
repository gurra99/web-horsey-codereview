import React, { useState } from 'react';
import './search.scss';
import { IHorse } from 'app/shared/model/horse.model';
import HorseItem from 'app/modules/search/horse-item/horse-item';
import FilterBox from 'app/modules/search/filter-box/filter-box';
import { useAppSelector } from 'app/config/store';

const Search = () => {
  const horseList = useAppSelector(state => state.horse.allHorses);
  const [filteredHorseList, setFilteredHorseList] = useState([] as IHorse[]);

  return (
    <div className="search">
      <FilterBox setFilteredHorseList={setFilteredHorseList} />
        <h1 className="fsPrimaryHeading">Horses</h1>
      <h3 className="numberOfHorses">{filteredHorseList.length + ' of ' + horseList.length}</h3>
      <div className="searchBox">
        <div className="searchContainer">
          {filteredHorseList.map((horse, index) => {
            return <HorseItem horse={horse} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
