import { CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from "@coreui/react";
import { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';


function Detail() {
    const detail = JSON.parse(localStorage.getItem('post'));
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); 
    const [userlist,setuserlist] = useState([]);
    const [user,setuser] = useState({});

    const updateClick = (id) => {
        localStorage.setItem('updateid',id);
        navigate("/form")
    }
    let u;
    let number = 0;
    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
        fetch('http://localhost:8000/userlist/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(re => re.json())
        .then(r => setuserlist(r))
        .catch(error => console.log(error))
        if(number == 0){
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
        number += 1;
        }
    },[])

    const deleteclick = (id) => {
        fetch(`http://localhost:8000/delete/${id}/`,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Token ${token}`
                },
            })
            .catch(error => console.log(error))
            fetch(`http://localhost:8000/api/blog/${id}/`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Token ${token}`
                },
            })
            .then(navigate('/'))
            .catch(error => console.log(error))
    }

    const User = (id) => {
        userlist.forEach((user)=>{
            if(user.id == id){
                u =  user.username
            }
     })
     return u;
    }

    const date = (date) => {
        let d = new Date(date)
     return d.toLocaleString('en-GB',{timeZone: "UTC"})
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
                        <h3>Post Detail</h3>
                    </CCol>
                    <CCol lg="3">
                    {user.id==detail.author ? (
                        <>
                <button className="btn btn-primary" style={{marginRight:20}} onClick={()=>updateClick(detail.id)}>Edit</button>
                <button className="btn btn-danger" onClick={()=>deleteclick(detail.id)}>Delete</button>
                   </> ) 
                    : ("")}
                    </CCol>
                </CRow>
                    </div>
                <CCard>
                    <CCardHeader style={{textAlign:"center"}}>
                        {detail.header}
                    </CCardHeader>
                    <CCardBody>
                        {detail.body}
                        <br/>
                        <img src={detail.image} width={"100%"} height={400}/>
                    </CCardBody>
                    <CCardFooter style={{textAlign:"center"}}>
                        posted by {User(detail.author)}&nbsp;&nbsp; at {date(detail.created_at)}
                    </CCardFooter>
                </CCard>
            </CCol> 
            <CCol lg="3"></CCol>
        </CRow>
        </>
    )
}

export default Detail;