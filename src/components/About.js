import React from 'react';

const About = () => {
  return (
    <div>
      <main>
        <section className="py-1 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">About this project</h1>
              <p className="lead text-body-secondary">
                This is the first project in which i have used the MERN stack concepts . In this project i have learned how to connect frontend with backend . In frontend i have used React while for backend i have used node.js and express.js and to store the data i have use mongodb compass
              </p>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-body-tertiary ">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{justifyContent:'center'}}>
              <div className="col">
                <div className="card shadow-sm" style={{borderRadius:'20px' , background:'#e134de'}}>
                  <div className="container " style={{display: 'flex' ,justifyContent: 'center' ,}}><h3>About us</h3></div>
                    <rect width="100%" height="100%" fill="#55595c"></rect>
      
                  <div className="card-body" style={{justifyContent:'center',alignItems:'center'}}>
                    <p className="card-text">
                    As a dedicated student, I am enthusiastically immersing myself in the dynamic world of web development. My focus is on mastering the intricacies of React and Node.js, two foundational technologies that power modern web applications. Additionally, I'm excitedly delving into MERN stack development, a comprehensive approach that combines MongoDB, Express, React, and Node.js to create seamless and robust full-stack solutions. Through this journey, I am gaining valuable insights into building responsive user interfaces, crafting efficient server-side logic, and creating database-driven applications. With each concept I grasp, I'm one step closer to realizing my goal of becoming a proficient and innovative web developer.                </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
