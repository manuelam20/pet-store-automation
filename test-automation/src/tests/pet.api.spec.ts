import { test, expect } from '@playwright/test';
import { apiClient } from '../utils/apiClient';
import fs from 'fs';
import path from 'path';


// The pet object to be posted
const pet = {
    id: 10,
    name: "doggie",
    category: {
      id: 1,
      name: "Dogs"
    },
    photoUrls: ["string"],
    tags: [
      {
        id: 0,
        name: "string"
      }
    ],
    status: "available"
  };

  test('Create, verify and delete Pet', async ({ }) => {
    const client = await apiClient();
    // Step 1: POST the pet object
    const postResponse = await client.post(`/api/v3/pet`, {
      data: pet
    });
  
    // Step 2: Check that the POST request was successful
    expect(postResponse.status()).toBe(200); // Expect a 200 status
  
    // Step 3: Get the pet by ID and verify the details
    const getResponse = await client.get(`/api/v3/pet/${pet.id}`);
  
    // Step 4: Validate the response data
    expect(getResponse.status()).toBe(200);
    const responseData = await getResponse.json();
  
    // Validate the pet data
    expect(responseData).toMatchObject(pet);

    const deleteResponse = await client.delete(`/api/v3/pet/${pet.id}`);
    expect(deleteResponse.status()).toBe(200); // Expect the pet to be deleted

    const verifyDeleteResponse = await client.get(`/api/v3/pet/${pet.id}`);
    expect(verifyDeleteResponse.status()).toBe(404);
  });

  test('Create Pet and Upload Image', async ({ }) => {
    const client = await apiClient();
    // Step 1: POST the pet object
    const postPetResponse = await client.post(`/api/v3/pet`, {
      data: pet
    });
  
    // Step 2: Check that the POST request was successful
    expect(postPetResponse.status()).toBe(200); 
    const petResponse = await postPetResponse.json();
    expect(petResponse).toMatchObject(pet); 

    // Step 3: Read the image file to upload
  const filePath = path.join(__dirname, '../images/petImage.jpg'); 
  if (!fs.existsSync(filePath)) {
    throw new Error('File not found: ' + filePath);
  }

  const fileContent = fs.readFileSync(filePath);

  // Step 4: Upload the image for the created pet
  const petId = petResponse.id;
  const uploadImageResponse = await client.post(`api/v3/pet/${petId}/uploadImage`, {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/octet-stream',
    },
    data: fileContent, 
  });

  // Step 5: Validate the image upload response
  expect(uploadImageResponse.status()).toBe(200); // Expect a 200 status
  const uploadImageResponseData = await uploadImageResponse.json();

  expect(uploadImageResponseData.photoUrls[1]).toMatch(/\.tmp$/); 
  });