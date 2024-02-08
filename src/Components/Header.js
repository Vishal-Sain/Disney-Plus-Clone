import React, { useEffect } from 'react'
import styled from 'styled-components'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetails } from '../features/user/userSlice';

const provider = new GoogleAuthProvider();

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUser(user);
            navigate('/home');
          }
        });
    
        return () => {
          unsubscribe();
        };
      }, [history]);


    const handleAuth = ()=>{
        if(!userName){
        signInWithPopup(auth,provider)
        .then((result) =>{
            setUser(result.user);
        })
        .catch((error) =>{
            alert(error.message);
        });
    }else if(userName){
        signOut(auth)
        .then(()=>{
            dispatch(setSignOutState());
            navigate("/login");
        })
        .catch((err)=> alert(err.message));
    }
};

    const setUser = (user) =>{
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            })
        );
    };
    
    return (
        <Nav>
      <Logo src="/images/logo.svg" />

        { !userName ? (<Login onClick={handleAuth}>Login</Login>) : 
        
        (
            <>

      <NavMenu>
            <a>
                <img src="/images/home-icon.svg" />
                <span>HOME</span>
            </a>
            <a>
                <img src="/images/search-icon.svg" />
                <span>SEARCH</span>
            </a>
            <a>
                <img src="/images/watchlist-icon.svg" />
                <span>WATCHLIST</span>
            </a>
            <a>
                <img src="/images/original-icon.svg" />
                <span>ORIGINALS</span>
            </a>
            <a>
                <img src="/images/movie-icon.svg" />
                <span>MOVIES</span>
            </a>
            <a>
                <img src="/images/series-icon.svg" />
                <span>SERIES</span>
            </a>
      </NavMenu>
      <SignOut>
      <UserImg src={userPhoto} alt={userName} onClick={handleAuth} />
      <DropDown>
        <span onClick={handleAuth}>Sign Out</span>
      </DropDown>
      </SignOut>
      </>
        )}
    </Nav>
  )
}

export default Header


const Nav= styled.nav`
    height: 70px;
    background: #090b13;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 36px;
    
`

const Logo = styled.img`
    width: 80px;
    
`

const NavMenu= styled.div`
    display:flex;
    flex: 1;
    margin-left: 25px;

    a{
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
    
         img{
            height: 20px;
         }
         span{
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:before {
                content:"";
                height: 2px;
                background: white;
                position: absolute;
                left: 0px;
                right: 0px;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                width: auto;
            }
         }

         &:hover {
            span:before {
                transform: scaleX(1);
                opacity: 1 !important;
            }
         }
        }

        @media (max-width: 768px){
            display: none;
        }
`

const UserImg = styled.img`
         height: 48px;
         width: 48px;
         border-radius: 50%;
         cursor: pointer;

`
const Login = styled.a`
        background-color: rgba(0,0,0,0.6);
        padding: 8px 16px;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        border: 1px solid #f9f9f9;
        border-radius: 4px;
        transition: all 0.2s ease 0s;
        cursor: pointer;

        &:hover{
            background-color: #f9f9f9;
            color: #000;
            border-color: transparent;
        }
`



const DropDown = styled.div`
        position: absolute;
        top: 48px;
        right: 0px;
        background: rgb(19, 19, 19);
        border: 1px solid rgba(151, 151, 151, 0.34);
        border-radius: 4px;
        box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
        padding: 10px;
        font-size: 14px;
        letter-spacing: 3px;
        width: 100px;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        z-index: 1;

        span {
            white-space: nowrap;
          }
`

const SignOut = styled.div`
        height: 48px;
        width: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;

        
        &:hover ${DropDown} {
            opacity: 1;
          }
`