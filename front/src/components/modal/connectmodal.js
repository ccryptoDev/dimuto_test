import wallet from "../../utils/wallet";
import MetamaskIcon from "../../assets/images/Metamask.png";
import { generateEncryptionKey } from "../../utils/utils";
import './style.scss'; 

function ConnectModal(props) {
  const { isOpen, closeModal } = props

  const handleConnect = async (walletType) => {
    try {
      await wallet.setProvider(walletType);
      const walletAddr = await wallet.login(walletType);
      if(walletAddr) {
        if(localStorage.getItem("encryption_key") === null) {
          localStorage.setItem("encryption_key", await generateEncryptionKey(walletAddr));
        }
      }
    } catch (e) {
      console.log("error in connect ", e);
    }
    closeModal()
  }

  return (
    isOpen ? <div className="overlay">
      <div className="connect-modal">
        <div className="modal-header">
          <div className="title">
            Connect your wallet
          </div>
          <div className="description">
            Please connect your wallet with <a href="https://chainlist.org" target="_blank">Polygon network</a>
          </div>
          <div className="close-btn" onClick={() => closeModal()}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 5.91016L6 18.0901" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 5.91016L18 18.0901" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="modal-body">
          <button onClick={() => handleConnect('metamask')}>
            <img src={MetamaskIcon} alt="Metamask" />
            Metamask
          </button>
        </div>
      </div>
    </div>
    : <></>
  );
}

export default ConnectModal;