import  { useEffect, useState} from 'react'
import { Modal, ModalBody, Row } from "reactstrap"
// import heroImg from '../../assets/hero-img.png'
import './Hero.css'

const Hero = ({state}) => {
    const [modal, setModal] = useState(false);
    const [details,setDetails]=useState("");
    const [image,setImage]=useState("");

    useEffect(()=>{
        const {contract}=state;
        const Description=async()=>{
            const detail=await contract.methods.description().call();
            setDetails(detail);
        }
        contract && Description();
    },[state])

    useEffect(()=>{
        const {contract}=state;
        const Image=async()=>{
            const img=await contract.methods.imageLink().call();
            setImage(img);
        }
        contract && Image();
    },[state])

    return (
        <section className="hero">
        <div className="container">
            <div className="hero-text">
                <p><span>Shubham </span>
                    is a Full-Stack Blockchain Developer From India.</p>
                <h1>I develop decentralised apps in web3 space.</h1>
                <h3>{details}</h3>
                {/*  =========popup bootstrap==========  */}

                <Modal size='md' isOpen={modal} toggle={() => setModal(!modal)}>
                    <ModalBody>
                            <Row className="text-align">
                                <label htmlFor="" toggle={() => setModal(!modal)}>
                                    Mail Id - shubhamsingh.ss.1407@gmail.com
                                </label>

                            </Row>
                    </ModalBody>
                </Modal>

                <button className="msg-btn" onClick={() => setModal(true)}>Get in Touch</button>
                {/*  =========popup bootstrap end==========  */}

            </div>
            <div className="hero-img">

                <div className="img-container">
                    <img src={`https://gateway.pinata.cloud/ipfs/${image}`} alt="profilePhoto" />
                </div>
            </div>
        </div>
    </section>
    )
}

export default Hero
