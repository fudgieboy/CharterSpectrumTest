// @ts-nocheck

import { useState, useRef, useEffect } from 'react'
// import {getVideoData} from './API/GlobalAPI'
import {ReactElement} from 'react'
import './App.scss'
import { v4 as uuidv4 } from "uuid"
import {getAllMovies, getMovieData} from './API/GlobalAPI'

// import testData from "./API/testData.ts"
// import testData2 from "./API/testData2.ts"
import {Modal} from './Modal.tsx'
import { Checkboxes } from './Checkboxes.tsx'
import { Searchbox } from './Searchbox.tsx'
import { Gallery } from './Gallery.tsx'

const App:React.FC = () : ReactElement => {
  const data = useRef(null);
  const data2 = useRef(null);
  const [modalActive, toggleModalActive] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
  const [searchVal, setSearchVal] = useState<string>(""); 
  const [isTransitioning, setIsTransitioning] = useState<boolean >(false);
  const modal = useRef(null);
  const modalInner = useRef(null);
  const genres = useRef(null); 
  const possibleGenres = useRef(null);
  const uniqueGenres = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    getAllMovies((res)=>{
      data.current = res;
      data2.current = [];

      const temp = JSON.parse(localStorage.getItem("movieDetailInfo"));

        if(temp!=null && temp != undefined){
          data2.current = temp.current;
                    
          possibleGenres.current = data.current.map((subData)=>{
            return subData.genres;
          })

          uniqueGenres.current = possibleGenres.current.reduce((genre1, genre2)=>{
            const cat = genre1.concat(genre2.filter((genre)=>{
              return genre1.indexOf(genre) == -1;
            }));
            return cat;

          })
          
          genres.current = uniqueGenres.current

          setSelectedMovie(data.current[0])
          setLoading(false);
        } else {
          for(let i = 0; i < data.current.length; i++){
            getMovieData(data.current[i].id, (res)=>{  
              data2.current.push(res);

                if(i == data.current.length - 1){
                  if(data2.current.length == data.current.length){

                    if(data2.current.length!=0){
                      localStorage.setItem("movieDetailInfo", JSON.stringify(data2));
                    } 
                    
                    possibleGenres.current = data.current.map((subData)=>{
                      return subData.genres;
                    })
          
                    uniqueGenres.current = possibleGenres.current.reduce((genre1, genre2)=>{
                      const cat = genre1.concat(genre2.filter((genre)=>{
                        return genre1.indexOf(genre) == -1;
                      }));
                      return cat;
          
                    })
                    genres.current = uniqueGenres.current;
                    setSelectedMovie(data[0])
                    setLoading(false);
                }
              }
          });
        }
      }
    });
  }, []) 

  const toggleModal = (isModalActive, movieID):void => {

    const time = new Date();
    if(isTransitioning == false){
      const interval = setInterval(() => {
        const time2 = (new Date().getTime() - time.getTime());
        
        if(isModalActive == true){
          modal.current.style.display = 'block';
          modal.current.style.backdropFilter = 'blur(' + (time2 / 100) + 'px)';
          modalInner.current.style.opacity = (time2 / 1000).toString();
          setSelectedMovie(movieID);
        } else if (isModalActive == false){
          modal.current.style.backdropFilter = 'blur(' + (5-(time2 / 100)) + 'px)';
          modalInner.current.style.opacity = (1- (time2 / 1000)).toString();
        }

        setIsTransitioning(true);
        if(time2 > 1000){
          if (isModalActive == false){
            modal.current.style.display = 'none';
          }
          setIsTransitioning(false);
          clearInterval(interval);
        }
      }, 50);
    toggleModalActive(isModalActive);
    }
  };

  const getModal = ():ReactElement => { 
    for(let i = 0; i < data.current.length; i++){
      if(data2.current[i].id == selectedMovie.id){
        return <div id = "modalInner" ref={modalInner} className = "anim">
                  <Modal detailedInfo = {data2.current[i]} />
                </div>
      }
    }
  }

  const updateOption = (ev, genre:string):void => {
    if(ev.target.checked){
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      const newSelectedToppings = selectedGenres.filter((item) => item !== genre);
      setSelectedGenres(newSelectedToppings);
    }
  };

  const updateSearchText = (newVal) => {
    setSearchVal(newVal);
  }


  const getMovieList = ():ReactElement[] => {
    return <Gallery
              activateModal = {toggleModal}
              availableGenres = {genres.current} 
              selectedGenres = {selectedGenres}
              searchVal = {searchVal}
              movies={data.current}/>
  }

  if (isLoading) {
    return <div className="App">Loading...</div>;
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
        <Searchbox currentSearchText = {searchVal} updateSearchText = {updateSearchText}/>
        <div id = "checkboxContainer" className = "container">
        <Checkboxes availableGenres = {genres.current} selectedGenres = {selectedGenres } updateOption = {updateOption} />
        </div>
      </div>
      <div >
        {getMovieList()}
      </div>
    </>
  )
}

export default App
