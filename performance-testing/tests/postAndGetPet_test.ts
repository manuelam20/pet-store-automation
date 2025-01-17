import { check, sleep } from 'k6';
import http from 'k6/http';

// Dynamic URL for the API
const url = `${__ENV.API_URL || 'http://localhost:8080'}/api/v3/pet`;

// Sample pet object to be created
const petData = {
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
};

export const options = {
    stages: [
      { duration: '30s', target: 10 }, // Ramp up to 20 virtual users over 1 minute
      { duration: '1m', target: 10 },  // Stay at 20 users for 1 minute
      { duration: '30s', target: 0 },  // Ramp down to 0 users over 30 seconds
    ],
  };

export default function () {
  // Step 1: Create a new pet using POST
  const createPetResponse = http.post(url, petData);

  // Step 2: Check that the pet was created successfully
  check(createPetResponse, {
    'status is 200': (r) => r.status === 200,
    'response body contains pet name': (r) => r.body.includes('doggie'),
  });

  // Step 3: Retrieve the pet using GET
  const getPetResponse = http.get(`${url}/${petData.id}`);

  // Step 4: Check that the GET response is correct
  check(getPetResponse, {
    'status is 200': (r) => r.status === 200,
    'response body contains pet name': (r) => r.body.includes('doggie'),
  });

  // Step 5: Delete the pet using DELETE
  const deletePetResponse = http.del(`${url}/${petData.id}`);

  // Step 6: Check that the DELETE response is correct
  check(deletePetResponse, {
    'status is 200': (r) => r.status === 200
  });

  sleep(1); // Sleep for 1 second before the next iteration (simulate realistic load)
}
