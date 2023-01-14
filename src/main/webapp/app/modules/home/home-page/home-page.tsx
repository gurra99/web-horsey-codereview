import React from 'react';
import { Link } from 'react-router-dom';
import './home-page.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomePage = () => {

  return (
    <div className="homePageContainer">
      <div className="container">
        <div className="left">
          <div className="textContainer">
            <span className="s1">Letar du efter en häst att hyra eller lediga stallplatser</span>
            <div className="btnContainer">
              <Link to="/login">
                <button className="buttonDefault btnRider">Hitta en häst</button>
              </Link>
              <Link to="/login">
                <button className="buttonDefault btnHorseOwner">Hitta stallplats</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          <img className="heroImage" src="../../../../content/images/screenhorse.png" />
        </div>
      </div>
      <div className="contentContainer">
        <p className="mobileHeader">Appen för ryttare och hästägare</p>
        <div className="mobileImageContainer">
          <div className="mobileScreen1">
            <img className="mobileImage" src="../../../../content/images/mobile1.png" />
            <p className="mobileScreenHeader">Sök igenom vår hästbank</p>
            <p className="mobileScreenText">
              Med hjälp av våra smarta funktioner kan du enkelt filtrera och optimera dina sök for att hitta en häst som passar dig.
            </p>
          </div>
          <div className="mobileScreen2">
            <img className="mobileImage" src="../../../../content/images/mobile2.png" />
            <p className="mobileScreenHeader">Registrera dig</p>
            <p className="mobileScreenText">Skapa en profil så hjälper vi dig att matcha med en häst som passar dig.</p>
          </div>
          <div className="mobileScreen3">
            <img className="mobileImage" src="../../../../content/images/mobile3.png" />
            <p className="mobileScreenHeader">Ta kontakt med hästägare</p>
            <p className="mobileScreenText">När du hittat en häst som passar dig kan du ta kontakt med hästägare och göra en bokning.</p>
          </div>
        </div>
      </div>
      <div className="statisticsContainer">
        <div className="innerSpace">
          <div className="tag">2000 hästar </div>
          <div className="tag">800 stallplatser</div>
        </div>
      </div>
      <div className="riderContainer">
        <p className="riderHeader">Ryttare</p>
        <img className="riderImage" src="../../../../content/images/riding.jpg" />
        <div className="riderTextContainer">
          <div className="textItem">
            <FontAwesomeIcon size="lg" style={{ margin: '5px 20px 0 0' }} color="#eb58f7" icon="square-check" />
            <p className="riderText">
              Horsey hjälper dig hitta hästen som kan ta dig till nästa nivå vare sig du aldrig har ridit förut eller är ett proffs.
            </p>
          </div>
          <div className="textItem">
            <FontAwesomeIcon size="lg" style={{ margin: '5px 20px 0 0' }} color="#eb58f7" icon="square-check" />
            <p className="riderText">När du hittat din favorit häst, ta kontakt med häst ägare och boka tid.</p>
          </div>
          <div className="textItem">
            <FontAwesomeIcon size="lg" style={{ margin: '5px 20px 0 0' }} color="#eb58f7" icon="square-check" />
            <p className="riderText">Bli medryttare och hjälp hästägare som har begränsat med tid att själv rida.</p>
          </div>
          <div className="textItem">
            <FontAwesomeIcon size="lg" style={{ margin: '5px 20px 0 0' }} color="#eb58f7" icon="square-check" />
            <p className="riderText">
              Har du en häst men saknar stall plats? Eller är du på resande fot och behöver hyra en plats? Med hjälp av appen kan du hitta
              lediga platser.
            </p>
          </div>
        </div>
      </div>

      <div className="ownerContainer">
        <p className="ownerHeader">Hästägare</p>
        <div className="ownerTextContainer">
          <div className="textItem">
            <FontAwesomeIcon size="lg" style={{ margin: '5px 20px 0 0' }} color="#eb58f7" icon="square-check" />
            <p className="ownerText">
              Horsey gör din verksamhet synlig för fler ryttare i ditt närområde och hjälper dig att locka ryttare till din verksamhet.
            </p>
          </div>
          <div className="textItem">
            <FontAwesomeIcon size="lg" style={{ margin: '5px 20px 0 0' }} color="#eb58f7" icon="square-check" />
            <p className="ownerText">
              Vi hjälper till att matcha hästägare med ryttare. Ryttare kommer endast att matcha med dom kriterier som du väljer i din
              bokning.
            </p>
          </div>
          <div className="textItem">
            <FontAwesomeIcon size="lg" style={{ margin: '5px 20px 0 0' }} color="#eb58f7" icon="square-check" />
            <p className="ownerText">Har du en ledig stallplats som inte används? Med hjälp av appen kan du lägga ut den för uthyrning.</p>
          </div>
        </div>
        <img className="ownerImage" src="../../../../content/images/stable.jpg" />
      </div>

      <div className="downloadApp">
        <p className="downloadHeader">Ladda ner appen</p>
        <div className="appImageContainer">
          <img className="appImage" src="../../../../content/images/app-store.svg" />
          <img className="appImage" src="../../../../content/images/google-play.svg" />
        </div>
      </div>
      <footer className="footer">
        <p className="copyWriteText">© Horsey™ 2022, All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
