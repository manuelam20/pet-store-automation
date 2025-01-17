import http from 'k6/http';
import { check, sleep } from 'k6';

// Define the URL for the API endpoint
const url = `${__ENV.API_URL || 'http://localhost:8080'}/api/v3/store/inventory`;

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp up to 10 virtual users over 30 seconds
    { duration: '1m', target: 10 },  // Stay at 10 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp down to 0 users over 30 seconds
  ],
};

export default function () {
  // Send the GET request to the inventory API
  const response = http.get(url);

  // Validate if the status code is 200
  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  // Simulate user think time with a sleep of 1 second
  sleep(1);
}