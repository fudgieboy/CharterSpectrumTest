import { useState, useRef } from 'react'
import {getVideoData} from './API/GlobalAPI'
import {ReactElement} from 'react'
import './App.scss'
import { v4 as uuidv4 } from "uuid"
import testData from "./API/testData.ts"
import testData2 from "./API/testData2.ts"

const App:React.FC = () : ReactElement => {
  const data = useRef(testData);
  const data2 = useRef(testData2);
  const [modalActive, toggleModalActive] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
  const [searchVal, setSearchVal] = useState<string>(""); 
  const [isTransitioning, setIsTransitioning] = useState<boolean >(false);
  const [enlargedHero, setEnlargedHero] = useState<boolean>(false);
  const modal = useRef(null);
  const modalInner = useRef(null);
  const genres = useRef(null); 
  
  let sum = data.current.map((subData)=>{
    return subData.genres;
  })

  sum = sum.reduce((genre1, genre2)=>{
    let cat = genre1.concat(genre2.filter((genre)=>{
      return genre1.indexOf(genre) == -1;
    }));
    return cat;

  })

  genres.current = sum

  const toggleModal = (isModalActive):void => {
    const time = new Date();

    if(isTransitioning == false){
      const interval = setInterval(() => {
        let time2 = (new Date() - time.getTime());

        if(isModalActive == true){
          modal.current.style.display = 'block';
          modal.current.style.backdropFilter = 'blur(' + (time2 / 100) + 'px)';
          modalInner.current.style.opacity = (time2 / 1000).toString();
        } else if (isModalActive == false){
          modal.current.style.backdropFilter = 'blur(' + (5-(time2 / 100)) + 'px)';
          modalInner.current.style.opacity = (1- (time2 / 1000)).toString();
        }

            setIsTransitioning(true);
        if(time2 > 1000){
          if (isModalActive == false){
            modal.current.style.display = 'none';
            setEnlargedHero(false);
          }
          setIsTransitioning(false);
          clearInterval(interval);
        }
      }, 50);
    toggleModalActive(isModalActive);
    }
  };

  const updateOption = (ev, genre:string):void => {
    if(ev.target.checked){
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      const newSelectedToppings = selectedGenres.filter((item) => item !== genre);
      setSelectedGenres(newSelectedToppings);
    }
  };

  const getGenreCheckboxes = (): ReactElement[]=> {
    const constructedGenreCheckboxes = [];
    for(const i in genres.current){
      constructedGenreCheckboxes.push(
        <div key = {"checkBox" + i}  className = {genres.current[i] + " " + "checkBox"}><input  key={i} type = "checkbox" onChange={(ev)=>{updateOption(ev, genres.current[i]);}}/><li>{genres.current[i]}</li></div>
      );
    }
    return constructedGenreCheckboxes;
  };

  const getMovieList = ():ReactElement [] => {

    let count = 0;

    const movieList = data.current.map((subData)=>{
      if(subData.title.toLowerCase().indexOf(searchVal.toLowerCase()) == -1){
        return null;
      }

      for(let i = 0; i < selectedGenres.length; i++){
        if(subData.genres.indexOf(selectedGenres[i]) == -1){
          return null;
        }
      }

      count = count+ 1;

      return <div key = {uuidv4()} className = "movieCard anim" onClick = {()=>{toggleModal(true)}}>
        <div className = "cardInnerContainer">
          <img id="posterImg" className = "anim" src = {"../moviePosterImages/" + subData.id + ".jpeg" } 
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="../moviePosterImages/defaultImage.jpeg";
            }}
            alt = {subData.title + " poster"}></img>

          <div className = "movieInfo">
            <h1>{subData.title}</h1>
            {/* <h2>Rating: {subData.vote_average}</h2>
            <h2>Release Date: {subData.release_date}</h2> */}
          </div>
        </div>
      </div>
    })

    console.log(count);

    if(count == 0){
      return <div className = "noResults"><h1>No Results</h1></div>
    } else {
      return movieList;
    }
  }

  const getModal = ():ReactElement[] => { 
    return <div id = "modalInner" ref={modalInner} className = "anim">
              <img id = "heroImg" className = {"anim enlarged" + enlargedHero} src = {"../movieHeroImages/" + data2.current[0].id + ".jpeg" } 
                onClick = {(ev)=>{ev.stopPropagation(); setEnlargedHero(!enlargedHero)}}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="../movieHeroImages/defaultImage.jpeg";
                }}
                alt = {data2.current[0].title + " poster"}></img>
                
                <div id = "movieData">
                  <h1>{data2.current[0].title}</h1>
                  <h3>{data2.current[0].duration}</h3>
                  <h3>{data2.current[0].releaseDate}</h3>
                  <h3>{data2.current[0].releaseYear}</h3>
                  <h3>{data2.current[0].genres}</h3>
                  <h1>{data2.current[0].moods}</h1>
                  <h2>{data2.current[0].description}</h2>

                  {data2.current[0].topCast.map((castMember)=>{
                    return <div><h3>{castMember.name}</h3><h3>{castMember.characterName}</h3></div>
                  })}
                </div>
            </div>
  }

  return (
    <> 
      <div id = "modal" 
        onClick = {()=>{toggleModal(false)}}
        ref={modal}
        style = {{display: "none"}}
        className = {"modal anim modal" + modalActive}>
          {getModal()}
      </div>
      <div id = "outerFilterContainer" className = "container">
        <input type="text" placeholder="Search" onChange = {(ev)=>{setSearchVal(ev.target.value)}}/>
        <div id = "checkboxContainer" className = "container">
          {getGenreCheckboxes()}
        </div>
      </div>
      <div id = "movieList">
        {getMovieList()}
      </div>
    </>
  )
}

export default App
