import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import database from "../firebase"
import { doc, getDoc, onSnapshot, collection, query, where } from "firebase/firestore";


function Detail() {

const {id} = useParams();
const [detailData, setDetailData] = useState({});



  // useEffect(()=>{
  //   (collection(database,"movies")).doc(id).get()
  //   .then((doc)=>{
  //     if(doc.exists) {
  //       setDetailData(doc.data());
  //     } else {
  //       console.log("no such document in firebase");
  //     }
  //   })
  //   .catch((error)=>{
  //     console.log("error getting document", error);
  //   });
  // }, [id]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(database, "movies", id);
        const docSnap = await getDoc(docRef);
        console.log("Document data:", docSnap.data()); // Log the fetched data

        if (docSnap.exists()) {
          setDetailData(docSnap.data());
        } else {
          console.log("No such document in Firebase");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    fetchData(); // Call the fetchData function

    return () => {
      // Cleanup function
    };
  }, [id]);


  return (
    <Container>
        <Background>
            <img src={detailData.backgroundImg} alt={detailData.title} />
        </Background>
        <ImageTitle>
            <img src={detailData.titleImg} alt={detailData.title} />
        </ImageTitle>
        <Controls>
          <PlayButton>
              <img src='/images/play-icon-black.png' />
              <span>PLAY</span>
          </PlayButton>
          <TrailerButton>
              <img src='/images/play-icon-white.png' />
              <span>TRAILER</span>
          </TrailerButton>
          <AddButton>
              <span>+</span>
          </AddButton>
          <GroupWatchButton>
              <img src='/images/group-icon.png' />
          </GroupWatchButton>
        </Controls>
        <SubTitle>
        {detailData.subTitle}
        </SubTitle>
        <Description>
          {detailData.description}
        </Description>
    </Container>
  )
}

export default Detail

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
`

const Background = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.8;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;

      @media (max-width: 768px){
        width: initial;
      }
    }
`

const ImageTitle = styled.div`
    height: 30vh;
    min-height: 170px;
    width: 35vw;
    min-width: 200px;
    margin-top: 60px;
    padding-bottom: 24px;
    display: flex; 
    align-items: center; 

    img {
        width: auto;
        height: 100%; 
        object-fit: contain; 
        margin-right: auto; 
    } 
`

const Controls = styled.div`
    display: flex;
    align-items: center;
`
const PlayButton = styled.button`
    border-radius: 4px;
    font-size: 15px;
    padding: 0px 24px;
    margin-right: 22px;
    display: flex;
    align-items:center;
    height: 56px;
    background: rgb(249, 249, 249);
    border: none;
    letter-spacing: 1.8px;
    cursor: pointer;

    &:hover {
      background: rgb(198, 198, 198);
    }

    @media (max-width: 768px){
      height: 45px;
      padding: 0px 12px;
      font-size: 12px;
      margin: 0px 10px 0px 0px;

      img{
        width: 25px;
      }
    }
`
const TrailerButton = styled(PlayButton)`
    background: rgba(0,0,0,0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249)
`
const AddButton = styled.button`
    margin-right: 16px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid white;
    background-color: rgba(0,0,0,0.6);
    cursor: pointer;

    span {
      font-size: 30px;
      color: white;
    }
`
const GroupWatchButton = styled(AddButton)`
    background: rgb(0,0,0);
`

const SubTitle = styled.div`
    color: rgb(249,249,249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;

    @media (max-width: 768px){
      font-size: 12px;
    }
`
const Description = styled.div`
    line-height: 1.4;
    max-width: 760px;
    font-size: 20px;
    margin-top: 16px;
    color: rgb(249, 249, 249);

    @media (max-width: 768px){
      font-size: 14px;
    }
`