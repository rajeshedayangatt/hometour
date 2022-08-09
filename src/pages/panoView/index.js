import React, { useEffect , useState} from "react";
import * as THREE from "three";
import panoViews from "../constants/panoViews";
import loadCachedImage from "../../imageCache.js";
import {TweenMax,Power3} from 'gsap'
import CameraControls from 'camera-controls';
import {
    CSS2DRenderer,
    CSS2DObject,
  } from "three/examples/jsm/renderers/CSS2DRenderer.js";



import tagPNG from '../../assets/images/tag.svg'
import mapIconWhite from '../../assets/images/map-icon-white.svg'
import mapIconYellow from '../../assets/images/map-icon-yellow1.svg'
import mapCircle from '../../assets/images/map-icon-line-white.svg'

import SolutionModal from "../solutionModal";

import infoInnerWhite from '../../assets/images/hotspot-inner-white.svg'
import infoOuterWhite from '../../assets/images/hotspot-outer-white.svg'
import infoInnerYellow from '../../assets/images/hotspot-inner-yellow.svg'

import "./style.css";


let renderer,renderer2,camera,scene,scene2,container,cameraControls,clock;
const geometry = new THREE.SphereGeometry(500, 60, 40);
let infoPositions=[]
let nre;



function PanoView(props) {

    const [selectedView, setSelectedView] = useState(undefined);
    const [bigScreen, setBigScreen] = useState(true)
    const [infoSpotPositions,setInfoSpotPositions] = useState([])
    const [solutionModal, showSolutionModal] = useState(undefined);

    

    useEffect(() => {

        setSelectedView(panoViews[0])
        if(window.innerWidth<768){
            setBigScreen(false)
        }
        else{
            setBigScreen(true)
        }
        init();
        addPanoViewToScene(panoViews[0].panoImage)
        animate();
        let hotSpots = [];


        if (panoViews[0].links && panoViews[0].links.length > 0) {

            panoViews[0].links.forEach((link) => {
              let hotSpot = addLinkPoint(link);

              console.log(hotSpot)

              hotSpot.addEventListener("click", () =>{
                
                props.setCurrent(link.linkTo)
                setSelectedView(panoViews[link.linkTo])
                
                setTimeout(() => {
                  while (scene.children.length-1)
                  {
                      scene.remove(scene.children[0]);
                  }
                  cameraControls.reset(false)
                  if(link.linkTo===0){
                    cameraControls.rotate( !bigScreen ? (panoViews[link.linkTo].initialRotation[0]+25) * THREE.MathUtils.DEG2RAD : (panoViews[link.linkTo].initialRotation[0]) * THREE.MathUtils.DEG2RAD,0, false )
                  }
                  else{ 
                  cameraControls.rotate( panoViews[link.linkTo].initialRotation[0] * THREE.MathUtils.DEG2RAD,panoViews[link.linkTo].initialRotation[1] * THREE.MathUtils.DEG2RAD, false )
                }
                  hotSpots.push(hotSpot);
                }, 10);
               
              });
              
      
              
            });
        }

    }, [])



    useEffect(() => {

     if (selectedView === undefined) return;
     console.log(selectedView)

        let hotSpots = [];
       scene2.clear();
        addPanoViewToScene(selectedView.panoImage);

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
    
    },[selectedView])

    const init = () => {

		if (!document.getElementById("infoContainer")) return false;

        container = document.getElementById("infoContainer");
        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.zIndex = 2;
        renderer.domElement.style.flex = "1 1 auto";
        renderer.domElement.style.overflow = "hidden";


        container.appendChild(renderer.domElement);
        container.style.touchAction = "none";


        renderer2 = new CSS2DRenderer();
        renderer2.setSize(window.innerWidth, window.innerHeight);
        renderer2.domElement.style.position = "absolute";
        renderer2.domElement.style.top = 0;
        renderer2.domElement.style.zIndex = 4;
        container.appendChild(renderer2.domElement);

        camera = new THREE.PerspectiveCamera( 60,  window.innerWidth / window.innerHeight,  1, 10000);
        camera.position.z = 0.01;
        camera.fov = THREE.MathUtils.clamp(100, 10, 75)
        camera.updateProjectionMatrix();


        scene = new THREE.Scene();
        scene2 = new THREE.Scene();
        geometry.scale(-1, 1, 1);


        clock = new THREE.Clock();
        const EPS = 1e-5;

        CameraControls.install( { THREE: THREE } );
        cameraControls = new CameraControls( camera, renderer2.domElement );
        cameraControls.azimuthRotateSpeed = - 0.2; // negative value to invert rotation direction
        cameraControls.polarRotateSpeed   = - 0.2; // negative value to invert rotation direction
        cameraControls.truckSpeed = 1 / EPS * 3;
        cameraControls.mouseButtons.right = CameraControls.ACTION.NONE
        cameraControls.mouseButtons.wheel = CameraControls.ACTION.NONE


        window.addEventListener("resize", onWindowResize, false);


    }
    const addInfoPoint = (info) => {
        let infoSpot = document.createElement("div");
        let namePlate = document.createElement("div")
        let namePlateTag = document.createElement("img")
        let namePlateTag1 = document.createElement("div")
        namePlateTag1.className="name-plate-tag1"
        namePlateTag.src=tagPNG
        namePlateTag.className="name-plate-tag"
        namePlate.className="name-plate"
        let text = document.createElement("p")
        text.innerHTML = info.solutionModelData.infoSpot;
        infoSpot.setAttribute('data-hotspot-type', info.solutionModelData.hotspotType);
        infoSpot.setAttribute('data-hotspot-room', info.solutionModelData.hotspotRoom);
        infoSpot.setAttribute('data-hotspot-product', info.solutionModelData.hotspotProduct);
    
    
        text.style.paddingTop="0px"
        text.style.paddingBottom="0px"
        text.innerHTML=info.solutionModelData.infoSpot
    
        namePlateTag1.appendChild(text)
        namePlate.appendChild(namePlateTag1)
        namePlate.appendChild(namePlateTag)
        infoSpot.appendChild(namePlate)
        infoSpot.className = "info-spot-wrap hotspot";
    
        var animInner = document.createElement("img")
        animInner.className="infospot-inner-circle"
        animInner.src=infoInnerWhite
        infoSpot.appendChild(animInner)
    
        var animOuter = document.createElement("img")
        animOuter.className="infospot-outer-circle"
        animOuter.src = infoOuterWhite
        infoSpot.appendChild(animOuter)
    
        var animHoverInnerWhite = document.createElement("img")
        animHoverInnerWhite.className="infospot-hover-inner-circle-white"
        animHoverInnerWhite.src = infoInnerWhite
        animHoverInnerWhite.classList.add("hide")
        infoSpot.appendChild(animHoverInnerWhite)
    
        var animHoverInnerYellow = document.createElement("img")
        animHoverInnerYellow.className="infospot-hover-inner-circle-yellow"
        animHoverInnerYellow.src = infoInnerYellow
        animHoverInnerYellow.classList.add("hide")
        infoSpot.appendChild(animHoverInnerYellow)
    
        var animHoverOuter = document.createElement("img")
        animHoverOuter.className="infospot-hover-outer-circle"
        animHoverOuter.src = infoOuterWhite
        animHoverOuter.classList.add("hide")
        infoSpot.appendChild(animHoverOuter)
    
        if(!bigScreen){
          animInner.style.display="none"
          animOuter.style.display="none"
          animHoverInnerWhite.style.display="block"
          animHoverInnerYellow.style.display="block"
          animHoverOuter.style.display="block"
          TweenMax.to(
            namePlate,
            0.4,
            {
              opacity:1,
              x:10,
              display:"block",
              ease:Power3.easeIn()
            }
          )
        }
        else{
          animInner.style.display="block"
          animOuter.style.display="block"
          animHoverInnerWhite.style.display="none"
          animHoverInnerYellow.style.display="none"
          animHoverOuter.style.display="none"
          TweenMax.to(
            namePlate,
            0.4,
            {
              opacity:0,
              x:-10,
              display:"block",
              ease:Power3.easeIn()
            }
          )
        }
    
        infoSpot.onmouseenter = () => {
          animInner.style.display="none"
          animOuter.style.display="none"
          animHoverInnerWhite.style.display="block"
          animHoverInnerYellow.style.display="block"
          animHoverOuter.style.display="block"
          TweenMax.to(
            namePlate,
            0.4,
            {
              opacity:1,
              x:10,
              display:"block",
              ease:Power3.easeIn()
            }
          )
        };
    
        infoSpot.onmouseleave = () => {
          animInner.style.display="block"
          animOuter.style.display="block"
          animHoverInnerWhite.style.display="none"
          animHoverInnerYellow.style.display="none"
          animHoverOuter.style.display="none"
          TweenMax.to(
            namePlate,
            0.4,
            {
              opacity:0,
              x:-10,
              display:"block",
              ease:Power3.easeIn()
            }
          )
        };
        infoSpot.addEventListener("click", () => {
          let modal = (
            <SolutionModal
              show={true}
              closeCallback={closeSolutionModalCallback}
              breadCrum={info.solutionModelData.breadCrum}
              title={info.solutionModelData.title}
              primaryContent={info.solutionModelData.primaryContent}
              productHeadline={info.solutionModelData.productHeadline}
              primaryImage={info.solutionModelData.primaryImage}
              crousalData={info.solutionModelData.crousalData}
              productDetail={info.solutionModelData.productDetail}
              carousalHeadline={info.solutionModelData.carousalHeadline}
              icon={info.solutionModelData.icon}
            />
          );
          showSolutionModal(modal);
          let overlay = document.querySelector(".welcome-overlay")
                overlay.style.display="block"
                overlay.classList.add("modal-overlay")
            });
        let object = new CSS2DObject(infoSpot);
        object.position.copy(info.position);
    
        if (info.scale) object.scale.copy(info.scale);
    
        if (info.rotation) {
          object.rotation.x = info.rotation.x;
          object.rotation.y = info.rotation.y;
          object.rotation.z = info.rotation.z;
        }
    
        scene2.add(object);
        scene2.add(nre)
    
     
    
        return infoSpot;
      };

    const addLinkPoint = (link) => {
        let hotSpot = document.createElement("div");
        let namePlate = document.createElement("div")
        let namePlateTag = document.createElement("img")
        namePlateTag.src=tagPNG
        namePlateTag.className="name-plate-tag"
        namePlate.className="name-plate"
        let namePlateTag1 = document.createElement("div")
        namePlateTag1.className="name-plate-tag1"
        let text = document.createElement("p")
        text.style.paddingTop="0px"
        text.style.paddingBottom="0px"
        text.innerHTML = link.name
        namePlateTag1.appendChild(text)
        namePlate.appendChild(namePlateTag1)
        namePlate.appendChild(namePlateTag)
        hotSpot.appendChild(namePlate)
        hotSpot.className = "hot-spot-img hotspot";
        var anim = document.createElement("img")
        anim.className="vert-move-white"
        anim.src=mapIconWhite
        hotSpot.appendChild(anim)
    
        var animHover = document.createElement("img")
        animHover.className="vert-move-yellow hotspot"
        animHover.setAttribute('data-hotspot-type', 'location')
        animHover.setAttribute('data-hotspot-room', link.hotspotRoom)
        animHover.classList.add("hide")
        animHover.src=mapIconYellow
        hotSpot.appendChild(animHover)
    
        var animHoverCircle = document.createElement("img")
        animHoverCircle.className="map-circle"
        animHoverCircle.classList.add("hide")
        animHoverCircle.src=mapCircle
        hotSpot.appendChild(animHoverCircle)
    
        if(!bigScreen){
          anim.style.display="none"
          animHover.style.display="block"
          animHoverCircle.style.display="block"
          TweenMax.to(
            namePlate,
            0.4,
            {
              opacity:1,
              x:10,
              display:"block",
              ease:Power3.easeIn()
            }
          )
        }
        else{
          anim.style.display="block"
          animHover.style.display="none"
          animHoverCircle.style.display="none"
          TweenMax.to(
            namePlate,
            0.4,
            {
              opacity:0,
              x:-10,
              display:"none",
              ease:Power3.easeOut()
            }
          )
        }
    
        hotSpot.onmouseenter = async() => {
          anim.style.display="none"
          animHover.style.display="block"
          animHoverCircle.style.display="block"
          TweenMax.to(
            namePlate,
            0.4,
            {
              opacity:1,
              x:10,
              display:"block",
              ease:Power3.easeIn()
            }
          )
        };
        hotSpot.onmouseleave = async() => {
          anim.style.display="block"
          animHover.style.display="none"
          animHoverCircle.style.display="none"
          TweenMax.to(
            namePlate,
            0.4,
            {
              opacity:0,
              x:-10,
              display:"none",
              ease:Power3.easeOut()
            }
          )
         
        };
    
        let object = new CSS2DObject(hotSpot);
        object.position.copy(link.position);
    
        if (link.scale) object.scale.copy(link.scale);
    
        if (link.rotation) {
          object.rotation.x = link.rotation.x;
          object.rotation.y = link.rotation.y;
          object.rotation.z = link.rotation.z;
        }
        scene2.add(object);
        return hotSpot;
    };


    const onWindowResize = () => {

        if(window.innerWidth < 768){
          setBigScreen(false)
        }
        else{
          setBigScreen(true)
        }
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer2.setSize( window.innerWidth, window.innerHeight );

    }
    const addPanoViewToScene = (url) => {

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

    }

    const animate = () => {

        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        cameraControls.update( delta );
        camera.updateMatrix();
        camera.updateMatrixWorld();
        renderer.render(scene, camera);
        renderer2.render(scene2, camera);

    }

    const closeSolutionModalCallback = () => {
        showSolutionModal(undefined);
        let overlay = document.querySelector(".welcome-overlay")
                overlay.style.display="none"
                overlay.classList.remove("modal-overlay")
      };

    return(
        <div id="infoContainer">

        </div>
    )
}


export default PanoView;