import Image from "next/image";
"use client";
import { useState } from "react";
import {jsPDF} from 'jspdf'
import { read } from "fs";
import next from "next/types";




export default function MultiStepForm() {
   const [step, setStep] = useState(1);
   const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    phoneNumber:"",
    image: "",
    selectQualifi: "",
    schoolName: "",
    selectDegree: "",
    jobTitle: "",
    employer: "",
    jobLocation: "",
    startDate: "",
    endDate: "",
    isCurrentlyWorking: false,
    skills: ""
  });

   const nextStep = () => setStep(step + 1);
   const prevStep = () => setStep(step - 1);

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, type, value, checked} = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  
    if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        [id]: checked
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [id]: value
      }));
    }
  };
  
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]?.name || '';
  //   setFormData(prevData => ({
  //     ...prevData,
  //     image: file
  //   }));
  // };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    nextStep();
  };


    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>)=> {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          image: reader.result as string 
        }));
      } 
      reader.readAsDataURL(file);
    }
   }

   function handleDownload() {
    const doc = new jsPDF();
    const marginX = 10;
    let currentY = 10;
  
// Add Name and Contact information 
doc.setFontSize(18);
doc.text(`${formData.firstName}${formData.lastName}`,marginX,currentY);
currentY += 10;
doc.setFontSize(12);
doc.text(`${formData.city}|${formData.email}|${formData.phoneNumber}`,marginX, currentY);
currentY += 20;


doc.setFontSize(14);
doc.text("Education",marginX,currentY);
currentY += 10;
doc.setFontSize(12);
doc.text(`Degree:${formData.selectDegree}`, marginX, currentY);
currentY += 10;
doc.text(`institute:${formData.schoolName}`,marginX, currentY);
currentY += 20;


doc.setFontSize(14);
doc.text("experience",marginX, currentY);;
currentY += 10;
doc.setFontSize(12);
doc.text(`Job Title : ${formData.jobTitle}`, marginX , currentY);
currentY += 10;
doc.text(`Employer: ${formData.employer}`, marginX, currentY);
currentY += 10;
doc.text(`Location: ${formData.jobLocation}`, marginX , currentY);
currentY += 10;
doc.text(`Duration:${formData.startDate} to ${formData.endDate} ${formData.isCurrentlyWorking ?"(Currently Working)": ""}`, marginX, currentY);
currentY += 20;


doc.setFontSize(14);
doc.text("Skills", marginX, currentY);
currentY += 10;
doc.setFontSize(12);
doc.text(`${formData.skills}`, marginX , currentY);
currentY += 20;


doc.setFontSize(14);
doc.text("Bio" , marginX, currentY);
currentY += 20;
doc.setFontSize(12);
doc.text("I am a motivated and detail-oriented professional with a solid background in my field.", marginX , currentY);
currentY += 10;
doc.text("With a strong passion for continuous growth and development, I bring valuable skills to any role.", marginX, currentY);
currentY += 10;
doc.text("My focus is on leveraging my expertise to contribute effectively to team goals and drive positive results.",marginX , currentY);
doc.save("cv.pdf");

   }
    


  


  return (
  <>
    {/* Form 1 = Personal Information */}



    <form>
      {step === 1 && (
        <div className="center-text">
          <h1>Personal Information</h1>
          <br />
          <h4>First Name</h4>
          <input required type="text" id="firstName" value={formData.firstName} onChange={handleInputChange}  placeholder="e.g John" />
          <br />
          <h4>Last Name</h4>
          <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder="e.g Berk" />
          <br />
          <h4>City</h4>
          <input type="text" id="city" value={formData.city} onChange={handleInputChange} required placeholder="e.g Karachi"/>
          <br />
          <h4>Enter Your Email</h4>
          <input type="email" id="email" value={formData.email} onChange={handleInputChange} required placeholder="e.g JohnBerk@gmail.com"/>
          <br />
          <br />
          <h4>Enter Your Contact Number</h4>
          <input type="number" id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}  required placeholder="e.g +923323847854"/>
          <br />
          <div className="file-upload-container">
          <h4>Upload Your Profile Picture here.</h4>
          <input type="file" accept="image/*" onChange={handleFileChange} />
           </div>
          <br />
          <br />
          <button type="button" onClick={nextStep}>Next</button>
        </div>
      )}
    </form>

    {/* Form 2 = Education */}
    {step === 2 && (
      <form className="center-text">
        <h1>Education</h1>
         <h4>Select Your Degree</h4>
        <select id="selectQualifi" value={formData.selectQualifi} onChange={handleInputChange} required>
          <option value="Marticulation">Marticulation</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Bachelors">Bachelors</option>
          <option value="Masters or Higher">Masters or Higher</option>
          <option value="Vocational">Vocational</option>
        </select>
        <br />
        <br />
       <h4>Institute Name</h4>
       <input id="schoolName" type="text" value={formData.schoolName} onChange={handleInputChange} placeholder="e.g {School or College Name}" />
       <br />
       <br />
       <h4>Your Degree</h4>
       <select name="" id="selectDegree" value={formData.selectDegree} onChange={handleInputChange}>
       <option value="High School Diploma">High School Diploma</option>
       <option value="GED">GED</option>
       <option value="Associates of Arts">Associates of Arts</option>
       <option value="Associates of Science">Associates of Science</option>
       <option value="Masters of Arts">Masters of Arts</option>
       <option value="Masters of Science">Masters of Science</option>
       <option value="Ph.D">Ph.D</option>
       <option value="MBA">MBA</option>
       <option value="J.D">J.D</option>
       <option value="M.D">M.D</option>
       <option value="NO DEGREE">NO DEGREE</option>
       </select>
       <br />
       <br />
       <button type="button" onClick={prevStep}>Previous</button>
       <button type="button" onClick={nextStep}></button>
       <br />
       </form>
    )}




    {/* Form 3 = Experience */}
  {step === 5 && (
    <div className="center-text">
      <h1>Curriculum Vitae</h1>
      <div className="cv-header">
        {formData.image && (
          <div>
            <h4>Profile Picture:</h4>
            <img src={formData.image} alt="Profile Picture" style={{width: "110px", borderRadius:"50%"}} />

          </div>
        )}
        <div>
          <h2>{formData.firstName}|{formData.lastName}</h2>
          <p>{formData.city}|{formData.email}|{formData.phoneNumber}</p>

        </div>
      </div>

      <section>
        <h3>Education</h3>
        <p><strong>Degree:</strong> {formData.selectDegree}</p>
        <p><strong>Institute:</strong> {formData.schoolName}</p>
      </section>
      <section>
        <h3>Experience</h3>
        <p><strong>Job Title:</strong> {formData.selectDegree}</p>
        <p><strong>Employer:</strong> {formData.employer}</p>
        <p><strong>Location:</strong> {formData.jobLocation}</p>
        <p><strong>Duration:</strong> {formData.startDate} to {formData.endDate}{formData.isCurrentlyWorking ? "(Currently Working)": ""}</p>   
      </section>
      <section>
        <h3>Skills</h3>
        <p>{formData.skills}</p>
      </section>
      <section>
        <h3>Bio</h3>
        <p>
        I am a motivated and detail-oriented professional with a solid background in my field. With a strong passion for continuous growth and development, I bring valuable skills and experience to any role. My focus is on leveraging my expertise to contribute effectively to team goals and drive positive results.
        </p>
      </section>
      <br />
      <br />

      <button onClick={prevStep}>Edit Details</button>
      <button onClick={handleDownload}>Download CV</button>
    </div>
  )}

  </>
  );
}






// tsx = typescript exenel 