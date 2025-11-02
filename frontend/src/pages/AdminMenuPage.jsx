import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Table, 
  Spinner, 
  Alert, 
  Button, 
  Form, 
  Card 
} from 'react-bootstrap';
import axios from 'axios'; // <-- 1. IMPORT AXIOS
import { 
  useGetMenusQuery, 
  useDeleteMenuItemMutation 
} from '../api/menuApiSlice';
import { useGetRestaurantQuery } from '../api/restaurantApiSlice';
import { useSelector } from 'react-redux'; // <-- 2. Import useSelector for token
import { selectCurrentToken } from '../redux/authSlice'; // <-- 3. Import token selector

const AdminMenuPage = () => {
  // --- 1. State for the "Create" form ---
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Main Course');
  const [imageFile, setImageFile] = useState(null); // <-- 4. ADD FILE STATE
  
  // State for loading/error
  const [isCreating, setIsCreating] = useState(false);
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const [createError, setCreateError] = useState(null);


  // --- 2. Get Data ---
  const { data: menuItems, isLoading, isError, error, refetch } = useGetMenusQuery();
  const { data: restaurant, isLoading: isLoadingRestaurant } = useGetRestaurantQuery();
  const token = useSelector(selectCurrentToken); // <-- 5. Get auth token

  // --- 3. Mutations ---
  const [
    deleteMenuItem, 
    { isLoading: isDeleting }
  ] = useDeleteMenuItemMutation();

  // --- 4. Handlers ---
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!restaurant) {
      alert('Restaurant data not loaded.');
      return;
    }

    // --- 6. CREATE FORM DATA ---
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('restaurantId', restaurant.id);
    if (imageFile) {
      formData.append('image', imageFile); // 'image' must match route
    }
    // --- END OF FORM DATA ---

    setIsCreating(true);
    setCreateError(null);
    setIsCreateSuccess(false);

    try {
      // --- 7. USE AXIOS FOR MULTIPART/FORM-DATA ---
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Send auth token
        }
      };

      await axios.post('/api/menus', formData, config);
      
      setIsCreating(false);
      setIsCreateSuccess(true);
      refetch(); // Refetch the menu list

    } catch (err) {
      console.error('Failed to create item:', err);
      setCreateError(err.response?.data?.message || 'Failed to create item');
      setIsCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await deleteMenuItem(id).unwrap();
      } catch (err) {
        console.error('Failed to delete item:', err);
      }
    }
  };

  // Clear form after successful creation
  useEffect(() => {
    if (isCreateSuccess) {
      setItemName('');
      setDescription('');
      setPrice('');
      setCategory('Main Course');
      setImageFile(null);
    }
  }, [isCreateSuccess]);

  // --- 5. Render Logic ---
  const renderMenuTable = () => {
    // ... (This function is unchanged from before)
    if (isLoading || isLoadingRestaurant) {
      return (
        <Container className="text-center mt-5">
          <Spinner animation="border" style={{ color: '#4E342E' }} />
          <p>Loading menu...</p>
        </Container>
      );
    }
    if (isError) {
      return <Alert variant="danger">Error: {error?.data?.message || 'Could not fetch menu'}</Alert>;
    }
    return (
      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: '#4E342E', color: 'white' }}>
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Price (Ksh)</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems && menuItems.length > 0 ? (
            menuItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img 
                    src={item.imageUrl} 
                    alt={item.itemName} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </td>
                <td>{item.itemName}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? '...' : 'Delete'}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No menu items found. Add one above!</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <h1 style={{ color: '#4E342E' }}>Manage Menu</h1>
        </Col>
      </Row>
      
      {/* --- Create Item Form --- */}
      <Row className="mb-4">
        <Col md={8} lg={6}>
          <Card style={{ backgroundColor: '#FFF8E1' }}>
            <Card.Body>
              <Card.Title as="h4" style={{ color: '#4E342E' }}>Add New Menu Item</Card.Title>
              
              {/* --- 8. SHOW CREATE ERRORS --- */}
              {createError && <Alert variant="danger">{createError}</Alert>}
              
              <Form onSubmit={handleCreateSubmit}>
                <Row>
                  <Col md={8}>
                    {/* ... (Item Name input) ... */}
                    <Form.Group className="mb-2" controlId="itemName">
                      <Form.Label>Item Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., Pilau"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    {/* ... (Price input) ... */}
                    <Form.Group className="mb-2" controlId="price">
                      <Form.Label>Price (Ksh)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="e.g., 500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-2" controlId="category">
                  {/* ... (Category select) ... */}
                   <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Main Course">Main Course</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverage">Beverage</option>
                  </Form.Select>
                </Form.Group>
                
                {/* --- 9. ADD IMAGE FILE INPUT --- */}
                <Form.Group controlId="image" className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </Form.Group>
                {/* --- END OF NEW BLOCK --- */}

                <Form.Group className="mb-3" controlId="description">
                  {/* ... (Description input) ... */}
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="e.g., Spiced rice with beef"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                
                <Button 
                  type="submit"
                  disabled={isCreating || isLoadingRestaurant}
                  style={{ backgroundColor: '#D4A373', borderColor: '#D4A373', color: '#4E342E' }}
                >
                  {isCreating ? 'Adding...' : 'Add Item'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- Menu Item List --- */}
      <Row>
        <Col>
          <h4>Current Menu</h4>
          {renderMenuTable()}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminMenuPage;