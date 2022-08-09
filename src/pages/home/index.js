import React , {useState} from "react";
import PanoView from "../panoView";


function Home() {
   // const childRef = useRef();

    const [currentScene,setCurrentScene] = useState(0)
    const [isSideBarOpen,setIsSideBarOpen] = useState(false)

    const changeScene=(i)=>{
       // childRef.current.changeScene(i)
        setCurrentScene(i)
        setIsSideBarOpen(false)
    }

      
    return(
        
        <div>
            {/* <Welcome /> */}
            <PanoView    setCurrent = {setCurrentScene}/>
        </div>
    )

}


export default Home;