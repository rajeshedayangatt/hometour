
import screen from '../../assets/images/00_Entrance.webp'
import * as THREE from "three";

import door from '../../assets/images/Door Display.png';
import home from '../../assets/images/Home Dsplay.png';
import panorama from '../../assets/images/Panorama.png';

let inventoryManagement = {
  solutionModelData1: {
    infoSpot: "Electronic Shelf Labels",
    hotspotType: "product",
    hotspotRoom: "inventory",
    hotspotProduct: "esl",
    breadCrum: `RETAIL / INVENTORY MANAGEMENT / ELECTRONIC SHELF LABELS`,
    title: <span> Streamline Pricing with Electronic Shelf Labels</span>,
    primaryContent: `Electronic Shelf Labels (ESL) enable retailers to reduce pricing errors & save time by removing manual work, while allowing customers to see clear price information accompanied with product descriptions, specs, & reviews. With Silicon Labs’ wireless ESL solutions, pricing can be controlled remotely to align with competition, activate promotions, & synchronize online & offline prices.`,
    productHeadline: <span>Learn more about our ESL technology</span>,
    primaryImage: '',
    icon: '',
    crousalData: [
      {
        headline: "Use Case",
        content: [
          {
            title: "Electronic Shelf Label Technology Improves Retail Efficiency",
            cta: "EXPLORE",
            assestLink: "https://www.silabs.com/documents/public/miscellaneous/electronic-shelf-label-technology-improves-retail.pdf",
            isPdf: true
          }
        ]
      },
      {
        headline: "Benefits",
        content: [
          {
            title: "What Smart Retail Really Means",
            cta: "READ NOW",
            assestLink: "https://www.silabs.com/documents/public/white-papers/smart-retail-what-it-really-means.pdf",
            isPdf: true
          }
        ]
      },
      {
        headline: "How to Get Started",
        content: [
          {
            title: "Driving Electronic Paper Displays",
            cta: "READ NOW",
            assestLink: "https://www.silabs.com/documents/public/application-notes/an0063-efr32-epd.pdf",
            isPdf: true
          },
          {
            title: "ESL Block Diagram",
            cta: "VIEW NOW",
            assestLink: '',
            isImage: true
          }
        ]
      }
    ],
    productDetail: [
      {
        productStatement: "Enables up to 10 years of life on a single coin cell battery",
        breadCrum: `RETAIL / INVENTORY MANAGEMENT / ELECTRONIC SHELF LABELS`,
        title: `EFR32FG22 Series 2 Proprietary Wireless`,
        description: <span>Take advantage of market-leading RF sensitivity for 2.4 GHz wireless applications. The low-power FG22 provides up to 10 years of life on one coin cell battery & RFSENSE preserves the battery in a sleep mode.</span>,
        keyFeatures: <ul class="color-gray pl-20"><li>Up to 10 years on a coin cell battery</li><li> Energy-efficient radio with low active and sleep currents</li><li> RFSENSE with selective OOK mode</li><li> Secure Boot with Root of Trust and Secure Loader (RTSL) </li><li>RF wake-up</li></ul>,
        productPageLink: `https://www.silabs.com/wireless/proprietary/efr32fg22-series-2-2-4-ghz-socs`,
        productImageLink: '',
        additionalMaterialType: "VIDEO",
        additionalMaterialTitle: <span>Enable Ultra-Low Power IoT Devices with EFR32FG22</span>,
        cta: `WATCH NOW`,
        linkToAsset: `https://www.youtube.com/embed/WJ9sp6LHkHk`,
        linkToThumbnail: '',
        isVideo: true
      },
      {
        productStatement: "Highly integrated radio transceiver for sub-GHz wireless protocols",
        breadCrum: `RETAIL / INVENTORY MANAGEMENT / ELECTRONIC SHELF LABELS`,
        title: `EFR32FG14 Proprietary Wireless SoC`,
        description: <span>Avoid the crowded 2.4 GHz b& & enable long-range ESL devices with sub-GHz wireless communication. The FG14 is Ideal for proprietary protocols, wireless M-BUS, & low-power WAN applications.</span>,
        keyFeatures: <ul class="color-gray pl-20"><li>Integrated PA with up to 19 dBm (2.4 GHz) or 20 dBm (Sub-GHz) tx power</li><li> Integrated balun for 2.4 GHz</li><li> Robust peripheral set and up to 32 GPIO </li><li> Up to 256 kB of flash and 32 kB of RAM </li><li>RF wake-up</li></ul>,
        productPageLink: `https://www.silabs.com/wireless/proprietary/efr32fg14-series-1-sub-ghz-2-4-ghz-socs`,
        productImageLink: '',
        additionalMaterialType: "TECH TALK",
        additionalMaterialTitle: <span>Sub-GHz Proprietary and Connect Software Stack</span>,
        cta: `WATCH NOW`,
        linkToAsset: `https://www.youtube.com/embed/kHqx7RnuDTk`,
        linkToThumbnail: '',
        isVideo: true
      }, {
        productStatement: "Best-in-class ultra-low transmit & receive power ideal for ESL",
        breadCrum: `RETAIL / INVENTORY MANAGEMENT / ELECTRONIC SHELF LABELS`,
        title: <span>EFR32BG22 Series 2 Bluetooth<sup>®</sup> SoC</span>,
        description: <span>The BG22 has superior RF sensitivity for Bluetooth low Energy applications & delivers industry-leading energy efficiency that can extend coin cell battery life up to ten years.</span>,
        keyFeatures: <ul class="color-gray pl-20"><li>Up to 512 kB of flash and 32 kB of RAM</li><li> Energy-efficient radio core with low active and sleep currents </li><li> Bluetooth 5.2 Direction Finding </li><li> Integrated PA with up to 6 dBm (2.4 GHz)TX power</li></ul>,
        productPageLink: `https://www.silabs.com/wireless/bluetooth/efr32bg22-series-2-socs`,
        productImageLink: '',
        additionalMaterialType: "VIDEO",
        additionalMaterialTitle: <span>Developing with the EFR32BG22 Thunderboard</span>,
        cta: `WATCH NOW`,
        linkToAsset: `https://www.youtube.com/embed/itybLuMc8gw`,
        linkToThumbnail: '',
        isVideo: true
      },
    ]
  },

  solutionModelData2: {
    infoSpot: "Location Services",
    hotspotType: "product",
    hotspotRoom: "inventory",
    hotspotProduct: "location_services",
    breadCrum: `RETAIL / INVENTORY MANAGEMENT / LOCATION SERVICES`,
    title: <span> Streamline Services with   Location-Based Services </span>,
    primaryContent: `Location-based services (LBS) streamline retail inventory workflows. Retailers can replenish stocks rapidly & optimize on-shelf availability to always be ready to meet demand. LBS helps store associates duly fulfill online orders & prepare orders for customer pickup. By connecting with customers' smartphones, LBS enhances the retail wireless infrastructure beyond inventory management.`,
    productHeadline: <span>Learn more about our Location Services technology    </span>,
    primaryImage: '',
    icon: '',

    crousalData: [
      {
        headline: "Use Case",
        content: [
          {
            title: "Asset Tracking Demo",
            cta: "WATCH NOW",
            assestLink: "https://www.youtube.com/embed/MJqs459ce_k",
            isVideo: true
          }
        ]
      },
      {
        headline: "Design Considerations",
        content: [
          {
            title: "Bluetooth Direction Finding: AoA & AoD",
            cta: "LEARN MORE",
            assestLink: "https://www.silabs.com/whitepapers/bluetooth-angle-estimation-for-real-time-locationing",
            isLink: true
          }
        ]
      },
      {
        headline: "How to Get Started",
        content: [
          {
            title: "Bluetooth Angle Estimation for Real-Time Locationing",
            cta: "DISCOVER",
            assestLink: "https://www.silabs.com/wireless/bluetooth/bluetooth-5-1",
            isLink: true
          },
        ]
      }
    ],
    productDetail: [
      {
        productStatement: "Built with a full suite of security features",
        breadCrum: `RETAIL / INVENTORY MANAGEMENT / LOCATION SERVICES`,
        title: <span>EFR32BG22 Series 2 Bluetooth<sup>®</sup> SoC</span>,
        description: <span>The BG22 SoC enables cost-efficient indoor positioning for retail inventory location services with sub-meter accuracy based on Bluetooth 5.2 Direction Finding.</span>,
        keyFeatures: <ul class="color-gray pl-20"><li>Up to 512 kB of flash and 32 kB of RAM</li><li> Energy-efficient radio core with low active and sleep currents</li><li> Bluetooth 5.2 Direction Finding</li><li> Integrated PA with up to 6 dBm (2.4 GHz) </li> <li> TX power </li><li>Secure Boot with Root of Trust</li><li>Secure Debug</li><li>Secure Loader</li></ul>,
        productPageLink: `https://www.silabs.com/wireless/bluetooth/efr32bg22-series-2-socs`,
        productImageLink: '',
        additionalMaterialType: "VIDEO",
        additionalMaterialTitle: <span>Developing with the EFR32BG22 Thunderboard</span>,
        cta: `WATCH NOW`,
        linkToAsset: `https:///www.youtube.com/embed/itybLuMc8gw`,
        linkToThumbnail: '',
        isVideo: true
      },
      {
        productStatement: "Designed with small, ultra-low-power applications in mind",
        breadCrum: `RETAIL / INVENTORY MANAGEMENT / LOCATION SERVICES`,
        title: `EFR32BG22 Series 2 Modules`,
        description: <span>Ideally suited for battery-powered indoor location services, the pre-certified BG22 module provides sub-meter accuracy & advanced debugging tools to accelerate development time.</span>,
        keyFeatures: <ul class="color-gray pl-20"><li>Bluetooth 5.2</li><li> Bluetooth mesh Low Power Node</li><li>Built-in antenna </li><li> Up to 8 dBm TX power </li> <li> -98.9 dBm BLE RX sensitivity at 1 Mbps </li> </ul>,
        productPageLink: `https://www.silabs.com/wireless/bluetooth/efr32bg22-series-2-modules`,
        productImageLink: '',
        additionalMaterialType: "TECH TALK",
        additionalMaterialTitle: <span>Bluetooth Software Structure: Learn the APIs and State Machines</span>,
        cta: `WATCH NOW`,
        linkToAsset: `https:///www.youtube.com/embed/Y4KaolRLZZM`,
        linkToThumbnail: '',
        isVideo: true
      }
    ]
  },
  solutionModelData3: {
    infoSpot: "Loss Prevention",
    hotspotType: "product",
    hotspotRoom: "inventory",
    hotspotProduct: "loss_prevention",
    breadCrum: `RETAIL / INVENTORY MANAGEMENT / LOSS PREVENTION`,
    title: <span> Secure Products with  Loss Prevention Tags </span>,
    primaryContent: `Loss prevention tags provide retailers with a variety of ways to better manage inventory, from fending off shoplifters to enabling accurate indoor positioning to improving inventory management. Adding Bluetooth connectivity gives retailers new ways to communicate with customers, improving & automating the shopping experience & enabling valuable self-service concepts.`,
    productHeadline: <span>Learn more about our Loss Prevention technology</span>,
    carousalHeadline: "LOSS PREVENTION CONTENT",
    primaryImage: '',
    icon: '',
    crousalData: [
      {
        headline: "Use Case",
        content: [
          {
            title: "Zliide Brings Virtual Shopping Experience into Retail Stores",
            cta: "READ NOW",
            assestLink: "https://www.silabs.com/documents/public/miscellaneous/bluetooth-tags-enable-always-on-retail-experiences.pdf",
            isPdf: true
          }
        ]
      },
      {
        headline: "Benefits",
        content: [
          {
            title: "What's New in Smart Retail",
            cta: "READ NOW",
            assestLink: "https://pages.silabs.com/rs/634-SLU-379/images/SiLabs-NewInSmartRetail-Article.pdf",
            isPdf: true
          }
        ]
      },
      {
        headline: "How to Get Started",
        content: [
          {
            title: "Loss Prevention Block Diagram",
            cta: "VIEW NOW",
            assestLink: '',
            isImage: true
          },
        ]
      }
    ],
    productDetail: [
      {
        productStatement: "Robust security & up to 10 yrs of life on a single coin cell battery",
        breadCrum: `RETAIL / INVENTORY MANAGEMENT / LOSS PREVENTION`,
        title: <span>EFR32BG22 Series 2 Bluetooth<sup>®</sup> SoC</span>,
        description: <span>Enhance RFID & acousto-magnetic loss prevention tags with Bluetooth to enable tracking & customer engagement via smartphones.</span>,
        keyFeatures: <ul class="color-gray pl-20"><li>Up to 512 kB of flash and 32 kB of RAM</li><li> Energy-efficient radio core with low active and sleep currents</li><li> Bluetooth 5.2 Direction Finding</li><li> Integrated PA with up to 6 dBm (2.4 GHz) </li> <li> TX power </li></ul>,
        productPageLink: `https://www.silabs.com/wireless/bluetooth/efr32bg22-series-2-socs`,
        productImageLink: '',
        additionalMaterialType: "VIDEO",
        additionalMaterialTitle: <span>Developing with the EFR32BG22 Thunderboard</span>,
        cta: `WATCH NOW`,
        linkToAsset: `https://www.youtube.com/embed/itybLuMc8gw`,
        linkToThumbnail: '',
        isVideo: true
      },
      {
        productStatement: "Ultra-compact design ideally suited for loss prevention tags",
        breadCrum: `RETAIL / INVENTORY MANAGEMENT / LOSS PREVENTION`,
        title: `EFR32BG22 Series 2 Modules`,
        description: <span>Cut development time & costs with pre-certified BG22 modules. Increase the utility of asset tags with Bluetooth LE & activate a wireless customer engagement features.</span>,
        keyFeatures: <ul class="color-gray pl-20"><li>Bluetooth 5.2</li><li> Bluetooth mesh Low Power Node</li><li>Built-in antenna </li><li> Up to 8 dBm TX power </li> <li> -98.9 dBm BLE RX sensitivity at 1 Mbps </li> </ul>,
        productPageLink: `https://www.silabs.com/wireless/bluetooth/efr32bg22-series-2-modules`,
        productImageLink: '',
        additionalMaterialType: "TECH TALK",
        additionalMaterialTitle: <span>Bluetooth Software Structure: Learn the APIs and State Machines</span>,
        cta: `WATCH NOW`,
        linkToAsset: `https:///www.youtube.com/embed/Y4KaolRLZZM`,
        linkToThumbnail: '',
        isVideo: true
      }
    ]
  }
}


const panoViews = [
  {
    panoImage: door,
    name: "Door",
    initialRotation: [125, 0],
    links: [
      {
        name: "Home",
        hotspotRoom: "home",
        linkTo: 1,
        position: new THREE.Vector3(450, -200, -190),
        scale: new THREE.Vector3(3, 3, 1),
        rotation: new THREE.Vector3(0, 0, 0),
      },
      
    ],
  },
  {
    panoImage: home,
    name: "Home",
    initialRotation: [220, 0],
    infoSpots: [
      { position: new THREE.Vector3(300, -50, 300), solutionModelData: inventoryManagement.solutionModelData1},
      { position: new THREE.Vector3(-100, -28, -15), solutionModelData: inventoryManagement.solutionModelData2},
      { position: new THREE.Vector3(80, 55, -300), solutionModelData: inventoryManagement.solutionModelData3 },
    ],
    links: [
      {
        name: "Panorama",
        hotspotRoom: "panoram",
        linkTo: 2,
        position: new THREE.Vector3(-200, -90, -1000),
        scale: new THREE.Vector3(3, 3, 1),
        rotation: new THREE.Vector3(0, 0, 0),
      },


      {
        name: "Door",
        hotspotRoom: "door",
        linkTo: 0,
        position: new THREE.Vector3(450, -200, -190),
        scale: new THREE.Vector3(3, 3, 1),
        rotation: new THREE.Vector3(0, 0, 0),
      },
      
    ],
  },
  {
    panoImage: panorama,
    name: "Panorama",
    initialFov: THREE.MathUtils.clamp(100, 10, 75),
    initialRotation: [110, 0],
    infoSpots: [
      { position: new THREE.Vector3(350, 180, 300), solutionModelData: inventoryManagement.solutionModelData3 },
    ],
    links: [
      {
        name: "Door",
        hotspotRoom: "door",
        linkTo: 0,
        position: new THREE.Vector3(-2200, -200, 220),
        scale: new THREE.Vector3(3, 3, 1),
        rotation: new THREE.Vector3(0, 0, 0),
      },
      
    ],
  },
  
];

export default panoViews;
