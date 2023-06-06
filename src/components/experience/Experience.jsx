import { useState,useEffect } from "react";
import { SlCalender } from "react-icons/sl"
import './Experience.css'

const Experience = ({state}) => {

    const [education,setEducation]=useState("");

    useEffect(() => {
        const { contract } = state;
        const educationDetails = async () => {
          try {
            const educations = await contract.methods.allEductationDetails().call();
            if (Array.isArray(educations)) {
              const validProjects = educations.filter((edu) => {
                // Check if project has required properties
                return (
                  edu &&
                  edu.date &&
                  edu.degree &&
                  edu.knowledgeAcquired &&
                  edu.instutionName
                );
              });
              setEducation(validProjects);
            } else {
              console.log("Invalid projects data");
            }
          } catch (error) {
            console.log(error);
          }
        };
        contract && educationDetails();
      }, [state]);
    //   console.log(education);

    return (
        <section className="exp-section">
            <h1 className="title">Experience & Education </h1>

            <div className="container">

                <div className="education">
                    <h1 className="edu-tittle">Education</h1>
                    {education!=="" && education.map((edu)=>{
                        return (   
                        <div className="edu-card" key={edu}>
                        <p className="card-text1">
                            <SlCalender className='icon' /> {edu.date}
                        </p>
                        <h3 className="card-text2">{edu.degree}</h3>
                        <p className="card-text3">{edu.knowledgeAcquired}</p>
                        <p className="card-text4">
                        {edu.instutionName}
                        </p>
                    </div>)
                    })}
                 
                   
                </div>
                {/* experience */}
                <div className="education">
                    <h1 className="edu-tittle">Experience</h1>
                    <div className="edu-card">
                        <p className="card-text1">
                            <SlCalender className='icon' /> June 2023 - Present
                        </p>
                        <h3 className="card-text2">Blockchain Developer Intern</h3>
                        <p className="card-text3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, beatae!.</p>
                        <p className="card-text4">
                            Ethereum
                        </p>
                    </div>


                    <div className="edu-card">
                        <p className="card-text1">
                            <SlCalender className='icon' /> June 2023 - Present
                        </p>
                        <h3 className="card-text2">Blockchain Developer Intern</h3>
                        <p className="card-text3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, beatae!.</p>
                        <p className="card-text4">
                            Ethereum
                        </p>
                    </div>


                    <div className="edu-card">
                        <p className="card-text1">
                            <SlCalender className='icon' /> June 2023 - Present
                        </p>
                        <h3 className="card-text2">Blockchain Developer Intern</h3>
                        <p className="card-text3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, beatae!.</p>
                        <p className="card-text4">
                            Ethereum
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience
