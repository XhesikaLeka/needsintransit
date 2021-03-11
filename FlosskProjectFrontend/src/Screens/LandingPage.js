import React from "react"
import { Col, Layout, Row } from 'antd';
import { Link } from "react-router-dom";
// import "antd/dist/antd.css";
import "../App.css";
import "../Firefly.css"

import {
  LogoName,
  Navigation,
  Traveling,
  MailIcon,
  FacebookIcon,
  PhoneIcon,
  BackHome,
} from "../Themes/Images"


function LandPage() {
  // const { Header, Footer, Content } = Layout;
  return (
    <div className="landPage-container">
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <Layout className="landPage-content">
        <Row justify='space-between'>
          <Link to="/">
           <BackHome className="back-header-icon" />
          </Link>
          <LogoName className="landPage-header-icon" />
        </Row>
        <Row className="landPageSection">
          <div className="landPageText">
            <span className="contentHeaders">Our mission</span>
            <b className="contentText">The goal of this webpage is to be a support hand of the refugees from middle east and north africa who are trying to settle for a new life. Providing information about friendly help and places of support, this webpage helps them to meet basic needs while they are transiting a country that does not guarentee them a dignitary stay in their struggle to find a new life for themselves. We stand by their side on having the human right to be treated good and respectfully.</b>
          </div>
          <div className="landPageSectionIcon">
            <Navigation className="landPage-content-icon" />
          </div>
        </Row>
        <Row className="landPageSection">
          <div className="landPageText">
            <span className="contentHeaders">Our website</span>
            <b className="contentText">A website that shows friendly and helping locations for the transit immigrants. This project was initiated in Albania but we aim to make this a regional tool so we gladly welcome organisations, individs or other groups that are interested in this topic, to communicate with us and cooperate. Also we are working to get as much as inclusive as it gets, if you have any suggestion for us, we will gladly expect your help through new locations. This is a project of Youth Group ATA, supported and founded by Civil Rights Defenders and FLOSS Kosovo.</b>
          </div>
          <div className="landPageSectionIcon">
            <Traveling className="landPage-content-icon" />
          </div>
        </Row>
        <Row justify="space-around" align="middle" className="landPageFooter">
          <Col flex={3}>
            {/* <div>*/}
            {/* <Row gutter={[8, 8]}>
                           <Col span={24}>
                                <span>Tell Us Everything</span>
                            </Col>
                        </Row> */}
            <Row>
              <Col span={24}>
                <span>Do you have any question regarding the project? Feel free to reach out.</span>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <span>Kamez, Albania</span>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <b className="ATA">ATA Center</b>
              </Col>
            </Row>
          </Col>
          <span className="landPageContactIcons">
          <Col align="middle" flex={1}>
            <a href="mailto:needsintransit@gmail.com"><MailIcon className="socialMediaIcons" alt="phone contact"></MailIcon></a>
          </Col>
          <Col align="middle" flex={1}>
            <a href="https://www.facebook.com/ATA-636337473080806/"><FacebookIcon className="socialMediaIcons" alt="phone contact"></FacebookIcon></a>
          </Col>
          <Col align="middle" flex={1}>
            <a href="tel:0686274228"><PhoneIcon  className="socialMediaIcons" alt="phone contact"></PhoneIcon></a>
          </Col>
          </span>
        </Row>
      </Layout>
    </div>

  );
}
export default LandPage;