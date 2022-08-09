import React, { useEffect , useState , useContext} from "react";
import loadCachedImage from "../../imageCache.js";
import panoViews from "../constants/panoViews";
import * as THREE from "three";
import {
    CSS2DRenderer,
    CSS2DObject,
  } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import CameraControls from 'camera-controls';
import {TweenMax,Power3,TimelineMax} from 'gsap'

import { PanoContext } from "../../contexts/PanoContextContainer";


let camera, scene, renderer;
let scene2, renderer2, controls, clock, cameraControls;
const geometry = new THREE.SphereGeometry(500, 60, 40);
let container;
let nre;
let moveCamera = ""
let infoPositions=[]
let temp;


function PanoView() {
    const [selectedView, setSelectedView] = useState(undefined);
    const [solutionModal, showSolutionModal] = useState(undefined);
    const {setShowLoader, selected } = useContext(PanoContext);
    const [bigScreen, setBigScreen] = useState(true)
    const [infoSpotPositions,setInfoSpotPositions] = useState([])
    const [leftNumber,setLeftNumber] = useState(0)
    const [rightNumber,setRightNumber] = useState(0)
    const [cookiePopup,setCookiePopup] = useState(false)



    useEffect(() => {
        if(window.innerWidth<768){
            setBigScreen(false)
        }
        else{
            setBigScreen(true)
        }
        let count = 0;
        init();
        animate();
        panoViews.forEach((view, index) => {
            loadCachedImage(
              view.panoImage,
              () => {
                if (index === selected) {
                    setSelectedView(panoViews[selected]);
                    cameraControls.reset(false)
                    cameraControls.rotate( window.innerWidth < 768 ? (panoViews[selected].initialRotation[0]+25) * THREE.MathUtils.DEG2RAD : (panoViews[selected].initialRotation[0]) * THREE.MathUtils.DEG2RAD,0, false )
                    // lat = panoViews[selected].initialLatLong.lat
                    // lon = panoViews[selected].initialLatLong.lon
                }
              },
              (event) => {
                if (event.loaded === event.total) {
                  count += 1;
                  if (count === panoViews.length) {
                    setShowLoader(false);
                    // if(!history.location.search.includes("aliId=") && !localStorage.getItem("form-submitted")){
                    //   setCookiePopup(true);
                    // } 
                  }
                }
              }
            );
        });
        
    },[])


    useEffect(() => {
        async() => {
            if (selectedView === undefined) return;
            let hotSpots = [];
            scene2.clear();
            await addPanoViewToScene(selectedView.panoImage);
            setTimeout(() => {
                if(selectedView.infoSpots){
                infoPositions=[]
                selectedView.infoSpots.map((v)=>{
                    infoPositions.push({
                        pos:v.position,
                        name:v.solutionModelData.infoSpot})
                    })
                setInfoSpotPositions(infoPositions)
                    selectedView.infoSpots.forEach(addInfoPoint);
                }
                else{
                    setInfoSpotPositions([])
                }
            }, 100);
        
            if (selectedView.links && selectedView.links.length > 0) {
              selectedView.links.forEach((link) => {
                let hotSpot = addLinkPoint(link);
                hotSpot.addEventListener("click", () =>{
                  props.setCurrent(link.linkTo)
                  setSelectedView(panoViews[link.linkTo])
                  
                  setTimeout(() => {
                    while (scene.children.length-1)
                    {
                        scene.remove(scene.children[0]);
                    }
                    cameraControls.reset(false)
                    if(link.linkTo==0){
                      cameraControls.rotate( !bigScreen ? (panoViews[link.linkTo].initialRotation[0]+25) * THREE.MathUtils.DEG2RAD : (panoViews[link.linkTo].initialRotation[0]) * THREE.MathUtils.DEG2RAD,0, false )
                    }
                    else{ 
                    cameraControls.rotate( panoViews[link.linkTo].initialRotation[0] * THREE.MathUtils.DEG2RAD,panoViews[link.linkTo].initialRotation[1] * THREE.MathUtils.DEG2RAD, false )
                  }
                    hotSpots.push(hotSpot);
                  }, 100);
                 
                });
                
        
                
              });
            }
            return () =>
              hotSpots.forEach((hotSpot) =>
                hotSpot.removeEventListener("click", setSelectedView(selectedView))
              );
        }
    }, [selectedView]);

    const addPanoViewToScene = (url) => {  
        // Trigger scene change
        // TweenMax.to(scene.children[0], 3, { opacity: 0 });
        // TweenMax.to(scene, 3, {fog:sceneFog});   
        loadCachedImage(url, (image) => {
            let texture = new THREE.Texture();
            texture.image = image;
            texture.needsUpdate = true;
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = texture
            const material = new THREE.MeshBasicMaterial({ map: texture,transparent: true,opacity:0});
            const mesh = new THREE.Mesh(geometry, material)
            scene.add(mesh)
            TweenMax.to(material, 1.5, { opacity: 1 });
        }); 
    
    };
    
    
    function init() {
        container = document.getElementById("infoContainer");
        camera = new THREE.PerspectiveCamera(
          60,
          window.innerWidth / window.innerHeight,
          1,
          10000
        );

        camera.position.z = 0.01;
        camera.fov = THREE.MathUtils.clamp(100, 10, 75)
        camera.updateProjectionMatrix();

            
        scene = new THREE.Scene();
        scene2 = new THREE.Scene();

            
        geometry.scale(-1, 1, 1);

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.zIndex = 2;
        renderer.domElement.style.flex = "1 1 auto";
        renderer.domElement.style.overflow = "hidden";

        container.addEventListener("pointerup", onPointerUp, false);
        container.addEventListener("pointerup", onPointerDown, false);
        container.appendChild(renderer.domElement);
        container.style.touchAction = "none";



        renderer2 = new CSS2DRenderer();
        renderer2.setSize(window.innerWidth, window.innerHeight);
        renderer2.domElement.style.position = "absolute";
        renderer2.domElement.style.top = 0;
        renderer2.domElement.style.zIndex = 4;
        container.appendChild(renderer2.domElement);


        var test = document.createElement("div")
        test.className = "test-div"
        test.innerHTML = `Bilal`
        nre = new CSS2DObject(test);
        clock = new THREE.Clock();
        const EPS = 1e-5;

        CameraControls.install( { THREE: THREE } );
        cameraControls = new CameraControls( camera, renderer2.domElement );
        cameraControls.azimuthRotateSpeed = - 0.2; // negative value to invert rotation direction
        cameraControls.polarRotateSpeed   = - 0.2; // negative value to invert rotation direction
        cameraControls.truckSpeed = 1 / EPS * 3;
        cameraControls.mouseButtons.right = CameraControls.ACTION.NONE
        cameraControls.mouseButtons.wheel = CameraControls.ACTION.NONE
        document.addEventListener("wheel", onDocumentMouseWheel, false);
        window.addEventListener("resize", onWindowResize, false);
    }
    function onWindowResize() {
        // camera.updateProjectionMatrix();
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer2.setSize(window.innerWidth, window.innerHeight);
        if(window.innerWidth < 768){
          setBigScreen(false)
        }
        else{
          setBigScreen(true)
        }
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer2.setSize( window.innerWidth, window.innerHeight );
        renderer.setSize( window.innerWidth, window.innerHeight );
    
    }



    function onPointerDown(event,allPositions) {
        if (event.isPrimary === false)
         return;
        document.addEventListener("pointerup", (e)=>onPointerUp(e,allPositions), false);
        // updateNavigation(allPositions)
    }


    function  onPointerUp(event,allPositions) {
        if (event.isPrimary === false) return;
        document.removeEventListener("pointerup", onPointerUp);
        moveCamera = ""
        // updateNavigation(allPositions)
    }


    function onDocumentMouseWheel(event) {
        let modal = document.querySelector(".special-modal-product.show");
        let attachmentModal = document.querySelector(".special-attachment-modal.show")
        let solutionModal = document.querySelector(".special-modal-solution")
        let mapModal = document.querySelector(".map-modal")
        let overlay = document.querySelector(".welcome-overlay")
    
        if (!!!modal && !!!attachmentModal && !!!solutionModal && mapModal.classList[1]=="fadeOut" && overlay.style.display=='none') {
          const fov = camera.fov + event.deltaY * 0.05;
          if (fov < 50) return;
          camera.fov = THREE.MathUtils.clamp(fov, 10, 75);
          camera.updateProjectionMatrix();
        }
    }

    const updateCameraLookAt = () => {
        if (moveCamera === "left") {
            cameraControls.rotate(  1 * THREE.MathUtils.DEG2RAD, 0, true )
        } 
        else if (moveCamera === "right") {
            cameraControls.rotate(  -1 * THREE.MathUtils.DEG2RAD, 0, true )
        } 
        else if (moveCamera === "top") {
            cameraControls.rotate( 0, 1 * THREE.MathUtils.DEG2RAD, true )
        } 
        else if (moveCamera === "down") {
            cameraControls.rotate( 0, -1 * THREE.MathUtils.DEG2RAD, true )
        }
    };
    const animate = () => {
        requestAnimationFrame(animate);
        updateCameraLookAt();
        updateNavigation(infoPositions);
        const delta = clock.getDelta();
        cameraControls.update( delta );
        camera.updateMatrix();
        camera.updateMatrixWorld();
        // object.position.set(new THREE.Vector3(-400, -100, 750))
        renderer.render(scene, camera);
        renderer2.render(scene2, camera);
    }

    const updateNavigation = (allPositions) =>{
        camera.updateMatrix();
        camera.updateMatrixWorld();
        var frustum = new THREE.Frustum();
        frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));  
        // Your 3d point to check
        var pos = []
        var left = 0
        var right = 0
        allPositions.map(v=>{
        if (!frustum.containsPoint(v.pos)) {
          temp = v.pos.clone();
          camera.worldToLocal( temp );
          if(temp.x<0){
            left=left+1
          }
          else{
            right=right+1
          }
        }
        setLeftNumber(left)
        setRightNumber(right)
        })
      }

    return(
        <div id="infoContainer">

        </div>
    )
}


export default PanoView;