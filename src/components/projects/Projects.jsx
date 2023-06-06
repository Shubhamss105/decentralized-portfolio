import { useEffect, useState } from "react";
import { FaDonate } from "react-icons/fa";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
} from "reactstrap";
// import img from "../../assets/img1.png";
import "./Projects.css";

const Projects = ({state}) => {
  const [modal, setModal] = useState(false);
  const [projects,setProjects]=useState("");

  useEffect(() => {
    const { contract } = state;
    const projectDetails = async () => {
      try {
        const proj = await contract.methods.allProjects().call();
        if (Array.isArray(proj)) {
          const validProjects = proj.filter((project) => {
            // Check if project has required properties
            return (
              project &&
              project.name &&
              project.description &&
              project.githubLink &&
              project.image
            );
          });
          setProjects(validProjects);
        } else {
          console.log("Invalid projects data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    contract && projectDetails();
  }, [state]);
  
  const donateEth=async(e)=>{
    e.preventDefault();
    try {
      const {contract,web3}=state;
    const eth=document.querySelector("#eth").value;
    const weiValue=web3.utils.toWei(eth,"ether");
    const accounts=await web3.eth.getAccounts();
    await contract.methods.donate().send({from:accounts[0],value:weiValue});
    alert("Transaction Successful");
    } catch (error) {
      alert("Transaction Failed");
    }
  }
  
  return (
    <section className="project-section">
      <h1 className="title">Projects </h1>
      <div className="card-wrapper">
        {/* {[1,2,3].map((dummyValue)=>{
                    return ( <a href= "#" className="project-card" target='_blank' rel="noopener noreferrer" >
                    <div className="card-img">
                        <img src={img} alt="" /></div>
                    <div className="card-text">
                        <h3>Dapp Name</h3>
                        <p>Dapp Description</p>
                        <div className="btn-wrapper">Github</div>
                    </div>
                </a>)
                })}  */}
        {projects!=="" && projects.map((project) => {
          const githubLink=`https://github.com/Shubhamss105/${project.githubLink}`
          return (
            <Card
              style={{
                width: "18rem",
                borderColor: "rgb(86, 88, 226)",
                borderRadius:'50px'
              }}
              key={project.id}
            >
              <img alt="Sample" src={`https://gateway.pinata.cloud/ipfs/${project.image}`} />
              <CardBody style={{ backgroundColor: "#0E111B" }}>
                <CardTitle tag="h5">{project.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Ethereum
                </CardSubtitle>
                <CardText>
                 {project.description}
                </CardText>
                <div className="flex content-end">
                  <Button style={{ backgroundColor: "#243056" }}><a href={githubLink} target="blank">Button</a></Button>
                  <Button
                    className="relative float-end"
                    style={{ backgroundColor: "#243056" }}
                  >
                    Button
                  </Button>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
      {/*  =========popup bootstrap==========  */}

      <Modal size="md" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Enter the ETH you want to donate!
        </ModalHeader>
        <ModalBody>
          <form onSubmit={donateEth}>
            <Row>
              <input id="eth" type="text" />
              <Button className="mt-4">Send</Button>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      {/*  =========popup bootstrap end==========  */}
      <p className="donate" onClick={() => setModal(true)}>
        Liked the Project ? Consider donating Eth{" "}
        <FaDonate className="icon" />
      </p>
    </section>
  );
};

export default Projects;
