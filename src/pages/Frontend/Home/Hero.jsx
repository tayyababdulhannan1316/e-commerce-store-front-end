import React from 'react';
import { Button } from 'antd';
import heroimage from '../../../assets/images/hero.jpg';
import { useNavigate } from 'react-router-dom'; // 👈 import this

function Hero() {
  const navigate = useNavigate(); // 👈 initialize navigate

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${heroimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Optional overlay (dark gradient for text contrast) */}
      <div className="hero-overlay bg-black/40"></div>

      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">Style That Defines You</h1>
          <p className="mb-5 text-gray-200">
            Discover the latest trends in fashion — shop now and stand out every day.
          </p>
          <Button
            type="primary"
            size="large"
            className="bg-blue-600 hover:bg-blue-700 text-white border-none"
            onClick={() => navigate('/shop')} 
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Hero;



// import React from 'react' 
// import {Button} from 'antd'
// import heroimage from '../../../assets/images/hero.jpg'
// function Hero() {
//   return (
//    <div
//   className="hero min-h-screen"
//   style={{
//     backgroundImage:
//       `url(${heroimage})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       zIndex: 1,
//       //  backgroundAttachment: 'fixed',

//   }}
// >
//   <div className="hero-overlay"></div>
//   <div className="hero-content text-neutral-content text-center">
//     <div className="max-w-md">
//       <h1 className="mb-5 text-5xl font-bold">Style That Defines You</h1>
//       <p className="mb-5">
//         Discover the latest trends in fashion — shop now and stand out every day..
//       </p>
//       <Button type="primary">Get Started</Button>
//     </div>
//   </div>
// </div>
//   )
// }

// export default Hero
