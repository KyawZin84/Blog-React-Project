import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

function Header(){
  const [user,setuser] = useState({});
  const Logout = ()=> {
    localStorage.removeItem('token')
  }

  const [search,setsearch] = useState("")
  const SearchCh = (e)=> {
      setsearch(e.target.value)
  }

  const SearchClick = () => {
    localStorage.setItem("search",search)
  }

  useEffect(()=>{
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/user/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(re => re.json())
        .then(r => setuser(r))
        .catch(error => console.log(error))
  },[])

    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Blog Web</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/" onClick={()=>{localStorage.removeItem('search')}}>Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/form">ADD Post</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login" onClick={Logout}>Log Out</a>
        </li>
      </ul>
      <form class="d-flex">
        <a href="user" style={{"textDecoration":"none"}}><h4 style={{color:"blue",marginRight:30,cursor:"pointer"}}>{user.username}</h4></a>
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={SearchCh}/>
        <button class="btn btn-outline-success" onClick={SearchClick}>Search</button>
      </form>
    </div>
  </div>
</nav>
        </>
    )
}

export default Header;