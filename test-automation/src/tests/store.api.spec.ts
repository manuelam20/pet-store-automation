import { test, expect } from '@playwright/test';
import { apiClient } from '../utils/apiClient';

test('Check store inventory API response', async () => {
    const client = await apiClient();
    const response = await client.get('/api/v3/store/inventory');
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(Object.keys(responseBody)).toEqual(['approved', 'placed', 'delivered']);
});

test('Verify that quantity increase or decrease on Inventory after POST request to the orders', async ({ request }) => {
  const client = await apiClient();
    // Define the common parts of the POST request body
    const baseBody = {
      id: 10,
      petId: 198772,
      quantity: 7, // Quantity to add for each status
      shipDate: new Date().toISOString(), // Use the current time for the shipDate
      complete: true
    };

    const statuses = ['approved', 'placed', 'delivered'];

    // Fetch initial inventory before making POST requests
  const initialInventoryResponse = await client.get('/api/v3/store/inventory');
  expect(initialInventoryResponse.status()).toBe(200);

   // Parse the initial inventory
   let inventory = await initialInventoryResponse.json();

   // Iterate over statuses and perform POST + verification
   for (const status of statuses) {
     // Update the status for the current iteration
     const requestBody = { ...baseBody, status };
     
 
     // Send the POST request
     const postResponse = await request.post('/api/v3/store/order', {
       data: requestBody
     });
    expect(postResponse.status()).toBeGreaterThanOrEqual(200);
    expect(postResponse.status()).toBeLessThan(300);

    // Send a GET request to fetch the updated inventory
    const updatedInventoryResponse = await request.get('/api/v3/store/inventory');
    expect(updatedInventoryResponse.status()).toBe(200);

     // Parse the updated inventory
    const updatedInventory = await updatedInventoryResponse.json();

    // Calculate the expected new value for the current status
    const expectedValueForStatus = (inventory[status]) + baseBody.quantity;

    // Validate that the specific status increased by the quantity
    expect(updatedInventory[status]).toBe(expectedValueForStatus);

    // Update the inventory object to match the new values for the next iteration
    inventory = updatedInventory;
  }
  });

  test('Verify orders created with POST are retrievable and deletable via DELETE /store/order/{orderId}', async ({ request }) => {

    const generateDynamicId = () => Date.now() + Math.floor(Math.random() * 20); // Generate a unique ID
  // Define the common parts of the POST request body
  const baseBody = {
    petId: 198772,
    quantity: 7,
    shipDate: new Date().toISOString(),
    complete: true
  };

  // Define the statuses to send
  const statuses = ['approved', 'placed', 'delivered'];

  for (const status of statuses) {
    // Update the status for the current iteration
    const requestBody = { ...baseBody, id: generateDynamicId(), status };

    // Send the POST request to create an order
    const postResponse = await request.post('/api/v3/store/order', {
      data: requestBody
    });

    // Ensure the POST request was successful
    expect(postResponse.status()).toBeGreaterThanOrEqual(200);
    expect(postResponse.status()).toBeLessThan(300);

    // Parse the POST response
    const createdOrder = await postResponse.json();

    // Ensure the created order contains the expected status and other details
    expect(createdOrder.status).toBe(status);
    expect(createdOrder.quantity).toBe(baseBody.quantity);

    // Send a GET request to retrieve the order by ID
    const getResponse = await request.get(`/api/v3/store/order/${createdOrder.id}`);

    // Ensure the GET request was successful
    expect(getResponse.status()).toBe(200);

    // Parse the GET response
    const retrievedOrder = await getResponse.json();

    // Verify that the retrieved order matches the one created
    expect(retrievedOrder.id).toBe(createdOrder.id);
    expect(retrievedOrder.status).toBe(createdOrder.status);
    expect(retrievedOrder.quantity).toBe(createdOrder.quantity);
    expect(retrievedOrder.complete).toBe(createdOrder.complete);


   const deleteResponse = await request.delete(`api/v3/store/order/${createdOrder.id}`);

    // Ensure the DELETE request was successful
    expect(deleteResponse.status()).toBeGreaterThanOrEqual(200);
    expect(deleteResponse.status()).toBeLessThan(300);

    // Send another GET request to verify the order no longer exists
    const verifyDeleteResponse = await request.get(`/api/v3/store/order/${createdOrder.id}`);

    // Ensure the GET request returns a 404 or an appropriate status for non-existent resources
    expect(verifyDeleteResponse.status()).toBe(404);

    // Log the result (optional)
    console.log(`Verified and deleted order with ID: ${createdOrder.id} and status: ${createdOrder.status}`);
  }
});