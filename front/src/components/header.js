import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import logo from '../assets/logo.svg';

function Header(props) {
  const { openConnectModal } = props
  const [address, setAddress] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { userAddress } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if(userAddress) {
      setIsLoggedIn(true)
      setAddress(userAddress)
    } else{
      setIsLoggedIn(false)
    }
  }, [userAddress])

  return (
    <div className="header">
      <div className="logo">    
          {/* <img src={logo} alt='' /> */}
      </div>
      <div className="wallet">
        <button className="connect-btn" onClick={() => openConnectModal()}>
          {userAddress ? address.replace(userAddress.substring(6, 38), "...") : 'Connect wallet'}
        </button>
      </div>
    </div>
  );
}

export default Header;