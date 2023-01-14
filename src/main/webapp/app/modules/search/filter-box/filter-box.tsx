import React, { useEffect, useState } from 'react';
import './filter-box.scss';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { IHorse } from 'app/shared/model/horse.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getAllHorses } from 'app/entities/horse/horse.reducer';

interface FilterBoxI {
  setFilteredHorseList: (value: IHorse[]) => void;
}

const FilterBox = (props: FilterBoxI) => {
  const horseList = useAppSelector(state => state.horse.allHorses);
  const dispatch = useAppDispatch();
  const [insurance, setInsurance] = useState(false);
  const [ridingEquipment, setRidingEquipment] = useState(false);
  const [clearButtonDisabled, setClearButtonDisabled] = useState(true);

  const [normal, setNormal] = useState(false);
  const [calm, setCalm] = useState(false);
  const [spirited, setSpirited] = useState(false);
  const [wild, setWild] = useState(false);

  const [cityDropDownIsOpen, setCityDropDownIsOpen] = useState(false);
  const [lanDropDownIsOpen, setLanCityDropDownIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllHorses());
  }, []);

  useEffect(() => {
    filterData();
  }, [horseList, insurance, ridingEquipment, calm, normal, spirited, wild, clearButtonDisabled]);

/*  const toggleCityDropDown = () => {
    setCityDropDownIsOpen(!cityDropDownIsOpen);
  };

  const toggleLanDropDown = () => {
    setLanCityDropDownIsOpen(!lanDropDownIsOpen);
  };*/

  const filterData = () => {
    let filteredList = horseList;

    if (insurance) {
      filteredList = filterInsurance(filteredList);
    }

    if (ridingEquipment) {
      filteredList = filterRidingEquipment(filteredList);
    }

    if (calm || normal || spirited || wild) {
      filteredList = filterTemperament(filteredList);
    }

    resetClearButton();
    props.setFilteredHorseList(filteredList);
  };

  const filterInsurance = (filteredList: IHorse[]) => {
    const updatedData = filteredList.filter(horse => {
      return horse.insurance === true;
    });
    return updatedData;
  };

  const filterRidingEquipment = (filteredList: IHorse[]) => {
    const updatedData = filteredList.filter(horse => {
      return horse.ridingEquipmentIncluded === true;
    });
    return updatedData;
  };

  const filterTemperament = (filteredList: IHorse[]) => {
    const updatedData = filteredList.filter(horse => {
      return (
        (horse.temperament === 'CALM' && calm) ||
        (horse.temperament === 'NORMAL' && normal) ||
        (horse.temperament === 'SPIRITED' && spirited) ||
        (horse.temperament === 'WILD' && wild)
      );
    });
    return updatedData;
  };

  const clearAllFilters = () => {
    setInsurance(false);
    setRidingEquipment(false);
    setNormal(false);
    setCalm(false);
    setSpirited(false);
    setWild(false);
    setClearButtonDisabled(true);
  };

  const resetClearButton = () => {
    if (!insurance && !ridingEquipment && !calm && !normal && !spirited && !wild) {
      setClearButtonDisabled(true);
    }
  };

  return (
    <div className="filterBox">
      <div className="leftFilter">
        <Dropdown
          className="cityDropDown"
          onClick={() => null}
          isOpen={cityDropDownIsOpen}
          toggle={function noRefCheck() {}}
        >
          <DropdownToggle className="cityDropDown" caret>
            City
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem>Action</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown className="lanDropDown" onClick={() => null} isOpen={lanDropDownIsOpen} toggle={function noRefCheck() {}}>
          <DropdownToggle className="lanDropDown" caret>
            Region
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem>Action</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="rightFilter">
        <div className="rightTop">
          <Button
            className="clearFilter"
            data-cy="entityConfirmDeleteButton"
            color={clearButtonDisabled ? 'secondary' : 'danger'}
            onClick={() => clearAllFilters()}
          >
            <FontAwesomeIcon icon="trash" />
            &nbsp; CLEAR
          </Button>
        </div>
        <div className="rightBottom">
          <div
            className={`${insurance ? 'filterButtonActive' : 'filterButtonUnActive'}`}
            onClick={() => {
              setInsurance(!insurance);
              setClearButtonDisabled(false);
            }}
          >
            Insurance
          </div>
          <div
            style={{ width: '120px' }}
            className={`${ridingEquipment ? 'filterButtonActive' : 'filterButtonUnActive'}`}
            onClick={() => {
              setRidingEquipment(!ridingEquipment);
              setClearButtonDisabled(false);
            }}
          >
            Riding equipment
          </div>
          <div className="temperamentContainer">
            <div
              className={`${calm ? 'filterButtonActive' : 'filterButtonUnActive'}`}
              onClick={() => {
                setCalm(!calm);
                setClearButtonDisabled(false);
              }}
            >
              Calm
            </div>
            <div
              className={`${normal ? 'filterButtonActive' : 'filterButtonUnActive'}`}
              onClick={() => {
                setNormal(!normal);
                setClearButtonDisabled(false);
              }}
            >
              Normal
            </div>
            <div
              className={`${spirited ? 'filterButtonActive' : 'filterButtonUnActive'}`}
              onClick={() => {
                setSpirited(!spirited);
                setClearButtonDisabled(false);
              }}
            >
              Spirited
            </div>
            <div
              className={`${wild ? 'filterButtonActive' : 'filterButtonUnActive'}`}
              onClick={() => {
                setWild(!wild);
                setClearButtonDisabled(false);
              }}
            >
              Wild
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
