import {ReactElement, useState} from 'react'
import './global.scss'

interface MovieDetailP{
    modalActive: boolean;
    detailedInfo: any;
}

export const Modal:React.FC = (props:MovieDetailP) : ReactElement => {
  const [enlargedHero, setEnlargedHero] = useState<boolean>(false);
 
    return (  <div>
                    <img id = "heroImg" className = {"anim enlarged" + enlargedHero} src = {"../movieHeroImages/" + props.detailedInfo.id + ".jpeg" } 
                    onClick = {(ev)=>{ev.stopPropagation(); setEnlargedHero(!enlargedHero)}}
                    onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    }}
                    alt = {props.detailedInfo.title + " poster"}></img>
                    
                    <div id = "movieData">
                      <h1>{props.detailedInfo.title}</h1>

                      {props.detailedInfo.topCast.map((castMember)=>{
                          return <ul className = "castList"><li>{castMember.name}</li><li>{castMember.characterName}</li></ul>
                      })}

                      <h3>{props.detailedInfo.duration}</h3>
                      <h3>{props.detailedInfo.releaseDate}</h3>
                      <h3>{props.detailedInfo.releaseYear}</h3>
                      <h3>{props.detailedInfo.genres}</h3>
                      <h1>{props.detailedInfo.moods}</h1>
                      <h2>{props.detailedInfo.description}</h2>

           
                    </div>
                </div>
    )
  }