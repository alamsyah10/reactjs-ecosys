import React from "react";
import { Container, Row } from "reactstrap";
import "./Footer.css"; // Import the CSS file for styles

function Footer(props) {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <Row>
          <div className="credits ml-auto">
            <div className="copyright">
              &copy; {1900 + new Date().getYear()}, made with ☕️ by ラム
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
