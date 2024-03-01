import { CCard, CCol, CRow } from "@coreui/react";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Form() {
    const [data,setdata] = useState({});
    const [user,setuser] = useState({});
    const [upload,setupload] = useState({})
    const [isupdate,setupdate] = useState(false);
    const [uploadimg,setuploadimg] = useState(false);
    const [upid,setupid] = useState(localStorage.getItem('updateid'));
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const change = (e)=> {
        let post = {...data}
        post[e.target.name] = e.target.value
        setdata(post);
    }

    const uploadimage = (e)=> {
        setupload({
            picturePreview : URL.createObjectURL(e.target.files[0]),
            pictureAsFile : e.target.files[0]
        })
        setuploadimg(true)
    }

    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
        if(upid){
            setupdate(true)
            fetch(`http://127.0.0.1:8000/api/blog/${upid}/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`
            }
        })
        .then(re => re.json())
        .then(r => setdata(r))
        .then(localStorage.removeItem('updateid'))
        .catch(error => console.log("err",error))
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
    },[])

    console.log(user)

    const postclick = () => {
        const formData = new FormData();
            formData.append("header",data.header);
            formData.append("body",data.body);
            formData.append("image",upload.pictureAsFile);
            formData.append("author",user.id);
            console.log(formData);
            fetch('http://localhost:8000/api/blog/',{
                method:'POST',
                headers:{
                    // 'Content-Type':'multipart/form-data',
                    'Authorization':`Token ${token}`
                },
                body:formData,
            })
            .then(navigate('/'))
            .catch(error => console.log(error))
    }

    const updateclick = () => {
        console.log(data,upid,token,uploadimg);
        const formData = new FormData();
            formData.append("header",data.header);
            formData.append("body",data.body);
            if(uploadimg){
                fetch(`http://localhost:8000/delete/${upid}/`,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Token ${token}`
                },
            })
            .then(formData.append("image",upload.pictureAsFile))
            .catch(error => console.log(error))
            }
            formData.append("author",data.author);
            fetch(`http://localhost:8000/api/blog/${upid}/`,{
                method:'PUT',
                headers:{
                    // 'Content-Type':'multipart/form-data',
                    'Authorization':`Token ${token}`
                },
                body: formData
            })
            .then(navigate('/'))
            .catch(error => console.log(error))
    }

    

    return(
        <>
        <CRow>
            <CCol lg="4"></CCol>
            <CCol lg="4">
                <CCard>
                    {isupdate ? (<h2 style={{textAlign:"center"}}>Post Update</h2>):(<h2 style={{textAlign:"center"}}>Post Create</h2>)}
                    <table>
                        <tr>
                            <td>Header</td>
                            <td><input class="form-control" name="header" type="text" value={data.header} onChange={(v)=>change(v)} /></td>
                        </tr><br/>
                        <tr>
                            <td>Body</td>
                            <td><input class="form-control" type="text" name="body"  value={data.body} onChange={(v)=>change(v)} /></td>
                        </tr><br/>
                        <tr>
                            <td>image</td>
                            <td>{isupdate ? (
                                <>
                            <img src={data.image} width={300} height={300} />
                            <input class="form-control" type="file" accept="image/*" name="image" onChange={(v)=>uploadimage(v)} />
                            </>
                            ):
                                (<input class="form-control" type="file" accept="image/*" name="image" onChange={(v)=>uploadimage(v)} />)} </td>
                        </tr><br/>
                        <tr>
                            <td colSpan={2}>
                            {isupdate ? (<button onClick={updateclick} class="btn btn-primary">Update</button>):
                            (<button onClick={postclick} class="btn btn-primary">Post</button>)}
                            </td>
                        </tr>
                    </table>
                </CCard>
            </CCol>
            <CCol lg="4"></CCol>
        </CRow>
        </>
    )
}

export default Form;