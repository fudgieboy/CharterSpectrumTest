import {ReactElement, useState} from 'react'
import './global.scss'

interface MovieDetailP{
    detailedInfo: Array;
}

export const Modal:React.FC = (props:MovieDetailP) : ReactElement => {
  const [enlargedHero, setEnlargedHero] = useState<boolean>(false);

    return (  <div>
                    <img id = "heroImg" className = {"anim enlarged" + enlargedHero} src = {"../movieHeroImages/" + props.detailedInfo[0].id + ".jpeg" } 
                    onClick = {(ev)=>{ev.stopPropagation(); setEnlargedHero(!enlargedHero)}}
                    onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="../movieHeroImages/defaultImage.jpeg";
                    }}
                    alt = {props.detailedInfo[0].title + " poster"}></img>
                    
                    <div id = "movieData">
                    <h1>{props.detailedInfo[0].title}</h1>
                    <h3>{props.detailedInfo[0].duration}</h3>
                    <h3>{props.detailedInfo[0].releaseDate}</h3>
                    <h3>{props.detailedInfo[0].releaseYear}</h3>
                    <h3>{props.detailedInfo[0].genres}</h3>
                    <h1>{props.detailedInfo[0].moods}</h1>
                    <h2>{props.detailedInfo[0].description}</h2>

                    {props.detailedInfo[0].topCast.map((castMember)=>{
                        return <div><h3>{castMember.name}</h3><h3>{castMember.characterName}</h3></div>
                    })}
                    </div>
                </div>
    )
  }