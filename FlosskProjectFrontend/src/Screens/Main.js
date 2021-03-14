import React, { useEffect, useRef, useState } from "react";
import { Form, Menu, Input } from "antd";
import { useHistory, Link } from "react-router-dom";

import { getLocationByCategory } from "../Services/locationService";
import { addSuggestion } from "../Services/suggestionService"
import { queryRequest } from "../Common/queryRequest";
import {
  Drawer,
  ButtonPrimary,
  Modal,
  MenuLogo,
  ButtonIcon,
  DropDown,
  Map,
  Routing
} from "../Components";
import {
  CloseIcon,
  marker,
  markerBakery,
  markerStore,
  markerHospital,
  markerFood,
  markerShelter,
  locationContact
} from "../Themes/Images";

import "../App.css";

const categoriesName = [
  {
    name: "Hospital",
    dbName: "hospital"
  },
  {
    name: "Place to eat",
    dbName: 'placetoeat'
  },
  {
    name: "Store",
    dbName: "store"
  },
  {
    name: "Bakery",
    dbName: "bakery"
  },
  {
    name: "Shelter",
    dbName: "shelter"
  },
  {
    name: "Other",
    dbName: "other"
  }
]

const Needs = ({ setCategory, dismissMenu, setMarkerIcon }) => {
  return (
    <div>
      <ButtonPrimary
        className={`buttonPrimary categoryButton`}
        size="large"
        type="default"
        shape="rectangle"
        title="A hospital"
        onPress={() => {
          setCategory('hospital')
          setMarkerIcon(markerHospital)
          dismissMenu()
        }}
      />
      <ButtonPrimary
        className={`buttonPrimary categoryButton`}
        size="large"
        type="default"
        shape="rectangle"
        title="A place to eat"
        onPress={() => {
          setCategory('place to eat')
          setMarkerIcon(markerFood)
          dismissMenu()
        }}
      />
      <ButtonPrimary
        className={`buttonPrimary categoryButton`}
        size="large"
        type="default"
        shape="rectangle"
        title="A store"
        onPress={() => {
          setCategory('store')
          setMarkerIcon(markerStore)
          dismissMenu()
        }}
      />
      <ButtonPrimary
        className={`buttonPrimary categoryButton`}
        size="large"
        type="default"
        shape="rectangle"
        title="A bakery"
        onPress={() => {
          setCategory('bakery')
          setMarkerIcon(markerBakery)
          dismissMenu()
        }}
      />
      <ButtonPrimary
        className={`buttonPrimary categoryButton`}
        size="large"
        type="default"
        shape="rectangle"
        title="A shelter"
        onPress={() => {
          setCategory('shelter')
          setMarkerIcon(markerShelter)
          dismissMenu()
        }}
      />
    </div>
  );
};

const About = () => {
  return <div className="aboutContainer">
    <span>
      The aim of this webpage is to be a support hand of the refugees from Middle East and North Africa, transiting through Balkans.
      Providing information about places of support, this webpage helps them to meet basic needs while they are transiting a country that does not guarentee them a dignitary stay in their struggle to find a new life.
      This is a project of Youth Group ATA, supported and founded by Civil Rights Defenders and FLOSS Kosovo.
    </span>

    <Link to="/about" >
      <ButtonPrimary
        className={`buttonPrimary`}
        size="large"
        type="default"
        shape="rectangle"
        title={<span>Continue reading</span>}
      />
    </Link>
  </div>;
};

const Suggest = (
  {
    suggestion,
    setSuggestion,
    submitSuggestion,
    submitButton,
    setEditable,
    closeDrawer
  }) => {

  const categories = (
    <Menu>
      {categoriesName.map((item) => <Menu.Item
        onClick={() => setSuggestion((prev) => ({
          ...prev,
          category: item.name,
          categorydb: item.dbName
        }))}
        key={item.name}>{item.name}</Menu.Item>
      )}
    </Menu>
  );

  return (
    <Form
      name="basic"
      initialValues={{
        // remember: true,
      }}
      className="form"
    // onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    >
      <div>
        <DropDown
          overlay={categories}
          title={suggestion.category || "Select a category"}
        />
        <Input
          className="categoryInput"
          placeholder="Location name"
          value={suggestion.locationname}
          onChange={(e) => setSuggestion((prev) => ({
            ...prev,
            locationname: e.target.value,
          }))}
        />
        <div className="inlineInputs">
          <Input
            className="categoryInput1"
            placeholder="Latitude"
            value={suggestion.lat}
            onChange={(e) => setSuggestion((prev) => ({
              ...prev,
              lat: e.target.value,
            }))}
          />
          <Input
            className="categoryInput2"
            placeholder="Longitude"
            value={suggestion.long}
            onChange={(e) => setSuggestion((prev) => ({
              ...prev,
              long: e.target.value,
            }))}
          />
        </div>
        <div
          className="noteSuggestion"
          onClick={() => {
            setEditable(true)
            closeDrawer()
          }}
        >*Click here to activate the map so you can choose the correct location</div>
        <Input.TextArea
          rows={2}
          placeholder="Add a description"
          className="categoryInput"
          value={suggestion.description}
          onChange={(e) => setSuggestion((prev) => ({
            ...prev,
            description: e.target.value,
          }))}
        />
      </div>
      <ButtonPrimary
        className={`buttonPrimary`}
        size="large"
        type="default"
        disabled={submitButton}
        shape="rectangle"
        title={<span>Submit suggestion</span>}
        onPress={() => { submitSuggestion(suggestion) }}
      />
    </Form>
  );
};

const Empty = () => {
  return <></>;
};

function Main() {
  const history = useHistory()
  const [position, setPosition] = useState([41.335918192658454, 19.816288783695203]);
  const [locations, setLocations] = useState([]);
  const [editable, setEditable] = useState(false)
  const [submitButton, setsubmitButton] = useState(true)
  const [suggestion, setSuggestion] = useState({
    locationname: "",
    description: "",
    lat: "",
    long: "",
    category: "",
    contact: {
      phone_no: "",
      email: ""
    }
  })

  const [visible, setVisible] = useState(false);
  const markers = useRef([])
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    title: "",
    content: undefined,
    phone_no: undefined,
    lat: undefined,
    long: undefined,
  });
  const [locationModal, setLocationModal] = useState({
    visible: false,
    title: "",
    content: undefined,
    phone_no: undefined,
    lat: undefined,
    long: undefined,
  });
  const [category, setCategory] = useState(null);
  const [markerIcon, setMarkerIcon] = useState(marker);
  const [buttonPrimaryVisibility, setVisibility] = useState({
    showPrimaryButton1: true,
    showPrimaryButton2: true,
    showPrimaryButton3: true,
  });

  const getCurrentUserPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setPosition([position.coords.latitude, position.coords.longitude])
          setSuggestion({})
        },
        function (error) {
          console.error(
            "Error Code = " + error.code + " - " + error.message
          );
        }
      );
    }
    // if (navigator.permissions && navigator.permissions.query && navigator.geolocation) {
    //   navigator.permissions
    //     .query({ name: "geolocation" })
    //     .then(function (result) {
    //       if (result.state === "granted") {
    //         navigator.geolocation.getCurrentPosition(function (position) {
    //           setPosition([position.coords.latitude, position.coords.longitude])
    //           setSuggestion({})
    //         });
    //       } else if (result.state === "prompt") {
    //         navigator.geolocation.getCurrentPosition(function (position) {
    //           setPosition([position.coords.latitude, position.coords.longitude])
    //           setSuggestion({})
    //         },
    //         function (error) {
    //           console.error(
    //             "Error Code = " + error.code + " - " + error.message
    //           );
    //         });
    //       } else if (result.state === "denied") {
    //         //If denied then you have to show instructions to enable location
    //       }
    //       result.onchange = function () {
    //       };
    //     });
    // } 
    else {
      alert("Sorry, location not available!");
    }
  }

  useEffect(() => {
    getCurrentUserPosition()
  }, []);

  const fetchLocations = async () => {
    setLocations([])
    markers.current = []
    queryRequest(() => getLocationByCategory(category))
      .then((res) => {
        const data = res?.data
        data?.map((location) => markers.current.push(location))
        setLocations(markers.current)
      })
      .catch((er) => console.log(er))
  };

  useEffect(() => {
    if (category) {
      fetchLocations();
    }
  }, [category])

  useEffect(() => {
    if (suggestion.category && suggestion.long && suggestion.lat && suggestion.locationname) {
      setsubmitButton(false)
    } else {
      setsubmitButton(true)
    }
  }, [suggestion.locationname, suggestion.lat, suggestion.long, suggestion.category])

  const showButton = (name) => {
    switch (name) {
      case "showPrimaryButton1":
        setVisibility({
          showPrimaryButton2: false,
          showPrimaryButton3: false,
          showPrimaryButton1: true,
        });
        break;
      case "showPrimaryButton2":
        setVisibility({
          showPrimaryButton1: false,
          showPrimaryButton3: false,
          showPrimaryButton2: true,
        });
        break;
      case "showPrimaryButton3":
        setVisibility({
          showPrimaryButton1: false,
          showPrimaryButton2: false,
          showPrimaryButton3: true,
        });
        break;
      default:
        null;
    }
  };

  const showAllPrimaryButtons = () => {
    setVisibility({
      showPrimaryButton1: true,
      showPrimaryButton2: true,
      showPrimaryButton3: true,
    });
  };

  const submitSuggestion = (suggestion) => {
    const mySuggestion = {
      category: suggestion.categorydb,
      locationname: suggestion.locationname,
      lat: suggestion.lat,
      long: suggestion.long,
      contact: {
        phone_no: "",
        email: ""
      }
    };
    queryRequest(() => addSuggestion(mySuggestion))
      .then((res) => {
        setModalVisible({
          visible: false,
          title: "",
          content: undefined,
        });
        showAllPrimaryButtons()
        getCurrentUserPosition()
      })
      .catch((er) => console.log(er))
  };

  const closeDrawer = () => {
    setTimeout(() => {
      setVisible((prev) => !prev);
    }, 400);
    showAllPrimaryButtons();
    setModalVisible({
      visible: false,
      title: "",
      content: undefined,
      phone_no: undefined
    });
  }

  const openDrawerAndSuggest = () => {
    setVisible(true);
    showButton("showPrimaryButton2");
    setModalVisible({
      visible: true,
      title: "Suggest a place",
      content: Suggest,
    });
  }

  const ModalContent = modalVisible.content || Empty;

  return (
    <div className="main-container">
      <Map
        mapCenter={position}
        setPosition={setPosition}
        setSuggestion={setSuggestion}
        markers={locations}
        markerIcon={markerIcon}
        editable={editable}
        setEditable={setEditable}
        setLocationModal={setLocationModal}
        openDrawerAndSuggest={openDrawerAndSuggest}
      />
      <MenuLogo
        onPress={closeDrawer}
        visible={visible}
      />
      <Drawer visible={visible}>
        <div className="mainMenu">
          <ButtonPrimary
            className={`buttonPrimary buttonPrimary1_${buttonPrimaryVisibility.showPrimaryButton1}`}
            size="large"
            type="default"
            shape="rectangle"
            title={
              <span>
                <span>I need a </span> <span className="lightSpan">{category || 'bakery'}</span>{" "}
              </span>
            }
            onPress={() => {
              showButton("showPrimaryButton1");
              setModalVisible({
                visible: true,
                title: "What do you need?",
                content: Needs,
              });
            }}
          />
          <ButtonPrimary
            className={`buttonPrimary buttonPrimary2_${buttonPrimaryVisibility.showPrimaryButton2}`}
            size="large"
            type="default"
            shape="rectangle"
            title={<span>Suggest a place</span>}
            onPress={() => {
              showButton("showPrimaryButton2");
              setModalVisible({
                visible: true,
                title: "Suggest a place",
                content: Suggest,
              });
              setLocations([])
              setCategory('')
            }}
          />
          <ButtonPrimary
            className={`buttonPrimary buttonPrimary3_${buttonPrimaryVisibility.showPrimaryButton3}`}
            size="large"
            type="default"
            shape="rectangle"
            title={<span>About us</span>}
            onPress={() => {
              showButton("showPrimaryButton3");
              setModalVisible({
                visible: true,
                title: "About us",
                content: About,
              });
            }}
          />
        </div>
        <Modal 
          hideBackdrop
          opened={modalVisible.visible}
          handleClose={() => {
            setModalVisible((prev) => ({
              ...prev,
              visible: false,
            }))
            showAllPrimaryButtons();
          }}
        >
          <div className="modalHeader">
            <span className="modalHeaderTitle">{modalVisible.title}</span>
            <ButtonIcon
              className="closeButton"
              icon={<CloseIcon className="close-icon" />}
              size="middle"
              type="default"
              shape="circle"
              onPress={() => {
                setModalVisible((prev) => ({
                  ...prev,
                  visible: false,
                }))
                showAllPrimaryButtons();
              }}
            />
          </div>
            <div className="modalContent">
              <ModalContent
                suggestion={suggestion}
                setSuggestion={setSuggestion}
                setCategory={setCategory}
                setMarkerIcon={setMarkerIcon}
                submitSuggestion={submitSuggestion}
                dismissMenu={() => {
                  setModalVisible({ visible: false });
                  showAllPrimaryButtons()
                  setTimeout(() => {
                    setVisible(false);
                  }, 400);
                }}
                submitButton={submitButton}
                setEditable={setEditable}
                closeDrawer={closeDrawer}
              />
            </div>
        </Modal>
      </Drawer>

      <Modal
        opened={locationModal.visible}
        handleClose={() => setLocationModal((prev) => ({
          ...prev,
          visible: false,
        }))}>
        <div className="modalHeader">
          <span className="modalHeaderTitle">{locationModal.title}</span>
          <ButtonIcon
            className="closeButton"
            icon={<CloseIcon className="close-icon" />}
            size="middle"
            type="default"
            shape="circle"
            onPress={() => {
              setLocationModal((prev) => ({
                ...prev,
                visible: false,
              }));
            }}
          />
        </div>
   
          <div className="modalContent">
            <span className="modalContentText">
              {locationModal.content}
            </span>
          </div>
          <div className="contactLocation">
              {locationModal.phone_no && 
                <a href={`tel:${locationModal.phone_no}`} >
                 {/* <img src={locationContact} className="socialMediaIcons" alt="phone contact">
                  </img> */}
                   <ButtonPrimary
                className={`buttonPrimary contactButton`}
                size="large"
                type="default"
                shape="rectangle"
                title={<span>Contact</span>}
              />
                </a>}
            </div>
            <a href={
              `https://www.google.com/maps/dir/?api=1&origin=${position}&destination=${[locationModal.lat, locationModal.long]}&travelmode=walking`
              // `https://www.google.com/maps/dir/?api=1`
              // `https://maps.google.com?q=${locationModal.lat},${locationModal.long}`
            } 
              target="_blank"
            >
              <ButtonPrimary
                className={`buttonPrimary`}
                size="large"
                type="default"
                shape="rectangle"
                title={<span>Open in Google Maps</span>}
              />
            </a>
      </Modal>
    </div>
  );
}
export default Main;
