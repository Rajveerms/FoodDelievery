import React from 'react';


function Footer(props) {
    return (  <div className="container">
    <footer className="row sticky-bottom bg-light">
      <ul className="nav justify-content-center border-bottom pb-2 mb-1">
        <li className="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
        <li className="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
        <li className="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
      </ul>
      <div className='row d-flex justify-content-center'>
      <h4 className='flex col-1'><i class="bi bi-facebook "></i></h4>
      <h4  className='flex col-1' ><i class="bi bi-linkedin"></i></h4>
      <h4  className='flex col-1'> <i class="bi bi-instagram"></i></h4>  
      </div>
     
    </footer>
  </div>);
}

export default Footer;