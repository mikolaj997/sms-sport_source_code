import React, { useState } from "react";

const Navbar = ({children, setPlanned, setPast, toggleHistory, isHistoryVisible, togglePlanned, isPlannedVisible, togglePast, isPastVisible, toggleProfile, toggleChat, setUsername, setPassword, setIsLoggedIn}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">sms-sport</a>
      <button className="navbar-toggler" type="button" onClick={handleToggle}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse show`} id="navbarScroll">
        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" onClick={(e) => {e.preventDefault()}} data-bs-toggle="dropdown" aria-expanded="false">
            <span onClick={toggleHistory}>
          {isHistoryVisible ? "Ukryj Aktywności" : "Pokarz Aktywności"}
        </span>   
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item"  onClick={()=>{
                setPlanned(true)
                // setPast(false)
                return togglePlanned()
              }}>
          {isPlannedVisible ? "Ukryj Aktywności" : "przyszłe aktywności"}
        </a></li>
              <li><a className="dropdown-item" onClick={togglePast}>
          {isPastVisible ? "Ukryj Aktywności" : "przeszłe aktywności"}
        </a></li>
              <li><hr className="dropdown-divider"></hr></li>
              <li><a className="dropdown-item" href="#">wszystkie</a></li>
            </ul>
          </li>
         
          
         
          <li className="nav-item">
          <span className="nav-link" onClick={toggleProfile}>profil </span>
          </li>
          <li className="nav-item">
            <a className="nav-link " onClick={toggleChat} >chat</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" >kalendarz</a>
          </li>
        </ul>
        <form className="d-flex" role="search">
          {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input> */}
          <button className="btn btn-outline-success" type="submit"  onClick={()=>{setIsLoggedIn(false)
          setPassword(' ')
          setUsername(' ')}}>wyloguj</button>
        </form>
      </div>
    </div>
  </nav>

  );
};

export default Navbar;


    {/* <nav 
    //   style={{
    //     width: "100%",
    //     height: "50px",
    //     backgroundColor: "black",
    //     color: "white",
    //   }}
    // >
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //       padding: "0 20px",
    //     }}
    //   >
    //     <div>Logo</div>
    //     <div>
    //       <button onClick={handleToggle}>Menu</button>
    //     </div>
    //   </div>
    //   {isOpen && (
    //     <div
    //       style={{
    //         backgroundColor: "white",
    //         color: "black",
    //         padding: "10px",
    //         width: "100%",
    //         boxSizing: "border-box",
    //         zIndex: "auto"
    //       }}
    //     >
    //       <ul style={{ listStyleType: "none", padding: 0 }}>
    //         <li>Option 1</li>
    //         <li>Option 2</li>
    //         <li>Option 3</li>
    //         {/* Dodaj więcej opcji 
    //       </ul>
    //     </div>
    //   )}
    // </nav>*/}

//z  bootatrup
{/* <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar scroll</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Link
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Link</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav> */}
