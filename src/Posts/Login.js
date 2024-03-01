import { CCard, CCol, CImage, CRow } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './img/login.jpg'
import { useState } from 'react';

function Login() {
    const navigate = useNavigate(); 
    const [Userdata,setUserdata] = useState({
        username:"",
        password:""
    });
    
    const inputchange = (e)=> {
        let post = {...Userdata}
        post[e.target.name] = e.target.value
        setUserdata(post);
    }

    const loginClick = () => {
            fetch(`http://127.0.0.1:8000/auth/`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(Userdata)
            })
            .then(resp => resp.json())
            .then(res => {console.log(res.token)
            if(res.token){
                navigate('/')
                localStorage.setItem('token',res.token)
            }else{
                alert("Username or Password is wrong !")
            }})
            .catch(err=> alert(err))
        }

    const showPwd = () => {
        let pwd = document.getElementById("pwd");
        if(pwd.type == "password"){
            pwd.type = "text";
        }else{
            pwd.type = "password";
        }
    } 
    return(
    <>
    <CRow>
    <div style={{ backgroundImage:`url(${backgroundImage})`,backgroundSize:"cover" }}>
        <CCol lg="4">
            <CCard style={{marginTop:250,marginLeft:50,marginBottom:70}}>
                <CImage src={require('./img/blog-icon.jpg')} width={200} height={100} style={{marginLeft:"30%"}}/>
                    <table style={{marginTop:50}}>
                        <tr>
                            <td>Username : </td>
                            <td><input type='text' className='form-control' name='username' onChange={inputchange} style={{backgroundColor:"lightgray"}}/></td>
                        </tr><br/>
                        <tr>
                            <td>Password : </td>
                            <td><input type='password' className='form-control' id='pwd' name='password' onChange={inputchange} style={{backgroundColor:"lightgray"}}/></td>
                        </tr><br/>
                        <tr>
                            <td><input type='checkbox' onClick={showPwd} />  show password</td>
                        </tr>
                    </table>
                    <CRow>
                        <CCol lg="5"></CCol>
                        <CCol lg="3"><button className='btn btn-primary' onClick={loginClick} >Login</button></CCol>
                        <CCol lg="4"></CCol>
                    </CRow>
            </CCard>
        </CCol>
        <CCol lg="4"></CCol>
        <CCol lg="4"></CCol>
        </div>
    </CRow>
    </>
    )
}

export default Login;