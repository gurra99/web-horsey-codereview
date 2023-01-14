import React, { useEffect, useState } from 'react';
import './horse-box.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getHorsesByOwnerId } from "app/entities/horse/horse.reducer";

interface TopBoxProfileI {
  horseOwnerId: string;
}

const HorseBox = (props: TopBoxProfileI) => {
  const allHorsesOwnedByOwner = useAppSelector(state => state.horse.allHorsesOwnedByOwner);
  const [boxOpen, setBoxOpen] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHorsesByOwnerId(props.horseOwnerId));
  }, []);

  return (
    <div className="horseBox" style={boxOpen ? null : { height: '72px' }}>
      <div className="headerContainer">
        <p className="title">Horses</p>
        <div className="circleContainer" onClick={() => setBoxOpen(!boxOpen)}>
          <div className="greyCircle" />
          <div className={boxOpen ? `upArrow` : `downArrow`} />
        </div>
      </div>
      <div className="horseCardContainer">
        {allHorsesOwnedByOwner.map((horseItem, horseIndex) => {
          return (
            <Link className={`horseCard ${boxOpen ? '' : 'closed'}`} to={`/home/horse/${horseItem?.id}`} color="link" key={horseIndex}>
              <p className="fullName">{horseItem?.fullName}</p>
              <div className="heightAndWeightContainer">
                <div className="blueBox">{horseItem?.height} cm</div>
                <div className="blueBox">{horseItem?.weight} kg</div>
              </div>
              <div className={horseItem?.insurance ? 'greenBox' : 'redBox'}>
                {' '}
                {horseItem?.insurance === true ? 'Insured' : 'Not insured'}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HorseBox;
