import React, { useEffect, useState } from 'react';
import {CCol, CRow} from '@coreui/react'
import { useNavigate } from 'react-router-dom';

function Home (){
    const navigate = useNavigate(); 
    const [Posts,setPosts] = useState([]);
    const [userlist,setuserlist] = useState([]);
    const se = localStorage.getItem('search');
    let u;
    let array = [];
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            navigate("/login")
        }
        if(se == ""){
            localStorage.removeItem('search')
        }
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

        fetch('http://localhost:8000/userlist/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(re => re.json())
        .then(r => setuserlist(r))
        .catch(error => alert(error))
        
    },[])

   
    const detailclick = (id) => {
        const postd =Posts.find((post)=>{
            return post.id == id;
        });
        localStorage.setItem('post',JSON.stringify(postd));
        navigate("/detail");
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

    if(se){
        let s=se.toLowerCase()
        array = Posts.filter((p)=>{
            console.log("se")
            let pro = p.header.toLowerCase()
            return pro.includes(s)
        })
    }
    
    const homeposts= (posts) => {
        if(posts.length <= 0){
            return <h2>No posts found</h2>
        }
        return posts.map((item)=>{
            return(
             <div key={item.id} className="card text-center" style={{backgroundColor:'lightblue'}} onClick={()=>detailclick(item.id)}>
             <div className="card-header">
                 {item.header}
             </div>
             <div className="card-body">
                 <p className="card-text">{item.body}</p>
                 <img src={`${item.image}`} style={{width:"80%",height:200}}/>
             </div>
             <div className="card-footer text-muted">
             <span>Created By {User(item.author)}</span>&nbsp;&nbsp;
             <span>at {date(item.created_at)}</span>
             </div>
             </div>
            )
        })
    }
   return(
      <>
      <div style={{backgroundColor:"lightgray"}}>
      <CRow>
        <CCol lg="3"></CCol>
        <CCol lg="6">
            { se ? homeposts(array) : homeposts(Posts)}
            
        </CCol>
        <CCol lg="3"></CCol>
      </CRow>
      </div>
      </>
     )
}

export default Home;