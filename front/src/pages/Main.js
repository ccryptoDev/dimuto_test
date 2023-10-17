import { useState } from 'react'
import Header from '../components/header';
import Landing from '../components/landing'
import Footer from '../components/footer';
import ConnectModal from '../components/modal/connectmodal';
import '../style.scss';

function Main() {
  const [connectModal, setConnectModal] = useState(false)
  return (
    <div className="App">
      <Header openConnectModal={() => setConnectModal(true)} />
      <Landing />
      <Footer />
      <ConnectModal isOpen={connectModal} closeModal={() => setConnectModal(false)} />
    </div>
  );
}

export default Main;
