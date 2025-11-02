import React, { useMemo } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

// Import the hook to fetch all menu items
import { useGetMenusQuery } from '../api/menuApiSlice';

const MenuPage = () => {
  // Use the hook to fetch data
  const { data: menuItems, isLoading, isError, error } = useGetMenusQuery();

  // Group menu items by category (e.g., 'Appetizer', 'Main Course')
  const menuCategories = useMemo(() => {
    const categories = {};
    if (menuItems) {
      menuItems.forEach((item) => {
        if (!categories[item.category]) {
          categories[item.category] = [];
        }
        categories[item.category].push(item);
      });
    }
    return categories;
  }, [menuItems]);

  // --- 1. Loading State ---
  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" style={{ color: '#4E342E' }} />
        <p>Loading menu...</p>
      </Container>
    );
  }

  // --- 2. Error State ---
  if (isError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Error: {error?.data?.message || 'Could not fetch menu'}
        </Alert>
      </Container>
    );
  }

  // --- 3. Success State ---
  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-center">
          <h1 style={{ color: '#4E342E', fontWeight: 'bold' }}>Our Menu</h1>
          <h3 style={{ color: '#D4A373' }}>Taste the Tradition</h3>
        </Col>
      </Row>

      {/* Render each category */}
      {Object.keys(menuCategories).length > 0 ? (
        Object.entries(menuCategories).map(([category, items]) => (
          <div key={category} className="mt-5">
            <h2 style={{ color: '#4E342E', borderBottom: `2px solid #D4A373` }} className="pb-2">
              {category}
            </h2>
            <Row xs={1} md={2} lg={3} className="g-4 mt-2">
              {items.map((item) => (
                <Col key={item.id}>
                  <Card style={{ backgroundColor: '#FFF8E1', border: 'none', height: '100%' }}>
                    
                    {/* --- ADDED THIS IMAGE --- */}
                    {item.imageUrl && (
                      <Card.Img 
                        variant="top" 
                        src={item.imageUrl} 
                        style={{ height: '200px', objectFit: 'cover' }} 
                      />
                    )}
                    {/* --- END OF NEW BLOCK --- */}

                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between">
                        <span style={{ color: '#4E342E', fontWeight: '600' }}>{item.itemName}</span>
                        <span style={{ color: '#D4A373', fontWeight: 'bold' }}>Ksh {item.price}</span>
                      </Card.Title>
                      <Card.Text style={{ color: '#4E342E' }}>
                        {item.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))
      ) : (
        <Alert variant="info" className="mt-5">
          Our menu is currently being updated. Please check back soon!
        </Alert>
      )}
    </Container>
  );
};

export default MenuPage;