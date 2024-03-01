import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from "@coreui/react";
import { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';


function Userdetail() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); 
    const [user,setuser] = useState({});
    const [Posts,setPosts] = useState([]);
    useEffect(()=>{
        if(!token){
            navigate("/login")
        }

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

        fetch('http://localhost:8000/api/blog/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(re => re.json())
        .then(r => setPosts(r))
        .catch(error => alert(error))
    },[])

    let postlist = Posts.filter((post)=>{
        return post.author == user.id
    })
    console.log(postlist);

    const postdetail = (p)=> {
        localStorage.setItem('post',JSON.stringify(p))
    }
    const bodytext = (bd) => {
        if(bd.length >= 40){
            let selectedb = bd.slice(0,40)
            return(<p>{selectedb} <a style={{color:"blue"}}> &nbsp;&nbsp;see more</a></p> )
        }else{
            return bd;
        }
    }
    return(
        <>
        <CRow>
            <CCol lg="3"></CCol>
            <CCol lg="6">
            <div style={{marginTop:20}}>
                <CRow>
                    <CCol lg="5">
                    <button className="btn" style={{backgroundColor:"gray",color:"white",marginRight:500}}
                    onClick={()=> {window.history.back()}}>Back</button>
                    </CCol>
                    <CCol lg="4">
                        <h3>User Detail</h3>
                    </CCol>
                    <CCol lg="3"></CCol>
                </CRow>
            </div>
            <div style={{justifyContent:"center",marginTop:"50px"}}>
                <table>
                    <tr>
                        <td width="200px"></td>
                        <td width="300px"></td>
                    </tr>
                    <tr>
                        <td><h3>Username : </h3></td>
                        <td><input value={user.username} className="form-control" readonly/></td>
                    </tr>
                    <tr>
                        <td><h3>Email : </h3></td>
                        <td><input value={user.email} className="form-control" readonly/></td>
                    </tr>
                </table>

            </div>
            </CCol> 
            <CCol lg="3"></CCol>
        </CRow>
        <div style={{backgroundColor:"red",width:"100%",height:"10px",marginTop:"50px"}}></div>
        <div style={{backgroundColor:"lightblue",paddingTop:"50px"}} className="row">
            {postlist.map((post)=>{
                return(
                    <div className="card" style={{width: "18rem"}}>
                    <img src={post.image} className="card-img-top" height={150}/>
                    <div className="card-body">
                        <h5 className="card-title">{post.header}</h5>
                        <p className="card-text">{bodytext(post.body)}</p>
                        <a href="detail" className="btn btn-primary" 
                        onClick={()=>postdetail(post)}>Go to Post</a>
                    </div>
                    </div>
                )
            })}
                </div>
        </>
    )
}

export default Userdetail;
