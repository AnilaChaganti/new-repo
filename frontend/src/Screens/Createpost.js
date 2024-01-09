import React,{useState,useEffect} from 'react';
import '../css/Createpost.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Createpost() {
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("")
    const navigate = useNavigate()

    //Toast functions
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)    
    

    useEffect(()=>{
        if(url){
        // saving post to mongodb
        fetch("/createPost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                body,
                pic:url
            })
        }).then(res => res.json())
        .then(data => {if(data.error){
            notifyA(data.error)
        }else{
            notifyB("Successfully Posted!")
            navigate("/")
        }})
        .catch(err => console.log(err))
        }
    },[url])

    //posting image to cloudinary

    const postDetails = ()=>{
        console.log(body,image)
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset", "the-gram")
        data.append("cloud_name","dfdxrhgeg") //cloud name from cloudinary
        fetch("https://api.cloudinary.com/v1_1/dfdxrhgeg/image/upload",
        {
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data => setUrl(data.url))
        .catch(err => console.log(err))

    }

    const loadfile = (event)=>{
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src) // free memory    
        }
    };
    return(
        <div className="createPost">
                    {/* header */}
            <div className="post-header">
                <h4 style={{margin:"3px auto"}}>Create New Post</h4>
                <button id='post-btn' onClick={()=>{postDetails()}}>Share</button>
            </div>
            {/* image preview */}
            <div className="main-div">
                <img id='output' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAAkFBMVEX///8vKjH///1kYWXw7/Hx8fEpISqTkpQtJi/Lyszg3+EsJy4nHypJREk1MjgAAAAUEBh/fIEcFR8kHCXp6eomIytWVFdsaW1BPkQjGiYfGiIfFCP5+fnV1dUgHiQAAAapqKpycXNRTVKbm5vAvsAGAA7d2eBCQUKHhoqcmZ62tra3s7sZGB17e3s2NjdMTE0Mm1j/AAAE2klEQVR4nO2aDXOiPBCAifKdEyISwLwBQeFE2zv//797EwJ+9K4jzEjam9mn7bQDVp/ZZDebqGEAAAAAAAAAAAAAAAAAAAAAAPByFgvDiPOY310QlxZfaPSBxYKXySpZn+rcHK5IxW/E+d2m1KY42FcHr4/kNxJcxHuKkPhGmLIwDLOqFLG0ulv3gVwMaDf0A4yCjDRMSgpL0tBj2paeb90/avF1gjVGbP3TK9OAEGJjLCzpD5sG2bItc/7w0IXKKc04DEVl91dcn9b7DG3Y1nVdjGnU7MjROec+54PfV0zOiiFUD6/M/bx2qgQREqkRL5qG7qv2fF+I9GKuKF75xn114WZen9KMvhMmBxzbTPxeVc75p5qWeqPob7G9NI1bGgwGPC+ddOVGbGO7LsKYkQhnqSiXsVY/w9uJHOmryh83xYi/tctsQwijXfawKELJ+uAZH4rQXIgXOYSbsPzj+kNGxF4pLFERFWpeili23OCzCt7K2iGtqvzhyj1XSVNapqJciuQJEN6dZ47g7dk556Pz0/LzsjpGIu2JCOG8Q7ywYn8iQ3LEDkWsnXmIDS+9rCayLPtQnwpEypkXlXwfMXrlx6fcHoOL9/e6+1++Zoh4Mwu2TDYvrCgKthFsJRvFtvtRXzeYjVDR1UsjTijO4pkF1wVCyXISCNlJNw3zANOEzy6Ig9oyrfHEme0qwZqI0m7MLcjcwJu0qJoZ7QUdIfg290qy3naCE15CCNJOkC8Zxt7sghukBLl3cGpzkqBoao+q/ZlVEHeCcdXsmjDJJwj6oUhnS5Og0TZYrv7J89XuKnjeoag15h9iKWj4CIteD6GwHi/YkmGLMCdr1gl6EeoEm3a0oMgRVHhaBYVheBgtGK8wDuZvqntBc8WkIG78pzVxEPQCxJaz+w2CxpluMaLE4R9OEXqpR8GuUJcUNY4uQVEGz/swxAfzcavW29bpXe6YmS0jyFuKRDutSVBi+fHHOq30+ClirBX3+L2gmW4wHVE2Xyb4OPUWVz3DX+5Eidxda3gv6O9tetGw8bxF8Oo0qKrx9S6R3MGh6Hh+EJQ5Umk4ZBjm4P2pWv4rN3pby6EFUtAo7WZoL1hGaPO8aL5KUPn0Y1r/boI+Wv6SdKdcqkiSi+xdhKBsWNsI4TftgrKrOYldOS0OcvTqVdSHT60zBSq7IZZlJmE405Ajd4Jq7vkX0gntqthaExu56AYOcJj6ZubKCF4KnOg4nLkTlMiYKadimTIsh/ZeUeTK2ldzcF/YlfX5875Q0L0J8rU6dFFJQWWH89GwSP3MlbG70I2GdUS2/LcI5vsGoyfQ9BpBomEdeRA8r9gzvQfBdx05chPkjjzdnxBBFujwuwrmlzB4Hr9esMviRkOvZQwtP69/R8/lHgT34UmfIG8xfe72OMSXcP52fxDMDyHqS8poQb4nvj5Bp0HdcjtWUAwxPyamlnchlGAYRf91RM9oln0Ek+cb1NcIMhTkXuuMpozVnkTPAHfng0HNJ5y+8TjoN+6aBMXqwcgkxO5PCmp6H+zAEFa4IxFdV6Glj1H4R0KL7nDcHgnFZMQJzusw22kn1IJfWrqEG5Y5Ea123+yDJ3/n728ffsbXCY4S/bJP0vwTQw0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAwDflfxtFc2YLe+o7AAAAAElFTkSuQmCC"alt='' />
                <input type="file" accept='image/*' onChange={(event)=>{loadfile(event); setImage(event.target.files[0])
                }} />
            </div>
            {/* details */}
            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://images.unsplash.com/photo-1532442312344-38696bc5294d?dpr=2&h=294&w=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MTExNjE5MHx8ZW58MHx8fHx8" alt="" />
                    </div>
                    <h5>Jack</h5>
                </div>
                <textarea value={body} onChange={(e)=>{
                    setBody(e.target.value)
                }} type="text" placeholder="Write a caption..."></textarea>
            </div>
        </div>
    )
}