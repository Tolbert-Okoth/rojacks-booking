import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: '#FFF8E1', color: '#4E342E' }}>
      <Container className="py-3">
        <Row>
          <Col className="text-center">
            <p>Rojacks Restaurant &copy; {currentYear}</p>
            <p style={{ fontSize: '0.8rem' }}>Migori County, Sub Rongo</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;