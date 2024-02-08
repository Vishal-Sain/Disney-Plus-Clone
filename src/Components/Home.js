import React from 'react'
import styled from 'styled-components'
import ImageSlider from './ImageSlider'
import Viewers from './Viewers'
import Recommends from './Recommends'
import NewDisney from './NewDisney'
import Originals from './Originals'
import Trending from './Trending'
import { useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux'
import database from '../firebase'
import { setMovies} from '../features/movie/movieSlice'
import { selectUserName } from '../features/user/userSlice'
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";


export default function Home() {

  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisney = [];
  let originals = [];
  let trending = [];

  useEffect(()=>{
    console.log("Hello");
    const q = query(collection(database,"movies"))
    const unsub = onSnapshot(q,(querySnapshot)=>{
      querySnapshot.docs.map((doc)=>{
        console.log(recommends);
        switch(doc.data().type){
          case "recommend":
            recommends = [...recommends, { id: doc.id , ...doc.data()}];
            break;
          case "new":
            newDisney = [...newDisney, { id: doc.id , ...doc.data()}];
            break;
          case "original":
            originals = [...originals, { id: doc.id , ...doc.data()}];
            break;
          case "trending":
            trending = [...trending, { id: doc.id , ...doc.data()}];
            break;
          }
      });
    

    dispatch(
      setMovies({
        recommend: recommends,
        newDisney: newDisney,
        original: originals,
        trending: trending,
      })
    )
  });
  return () => unsub();
  }, [userName])

  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  )
}

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow: hidden;

  &:before {
    position: absolute;
    content:"";
    background: url("/images/home-background.png") center center/cover no-repeat fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: -1;
  }
`
