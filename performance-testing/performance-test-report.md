# Performance Test Report

## Test Information
- **Execution Environment**: Local
- **Test Scripts**: 
  - `tests/inventory_test.js`
  - `tests/postAndGetPet_test.js`
- **Test Duration**: 2 minutes
- **Total Iterations**: 
  - 918 for `inventory_test.js`
  - 2751 for `postAndGetPet_test.js`
- **Virtual Users**: 10 max, 1 min

---

## Test Results Overview

### Inventory Test (`inventory_test.js`)

#### Scenario:
- **Max Virtual Users (VUs)**: 10
- **Duration**: 2m0s (including graceful ramp-down of 30s and graceful stop of 30s)
- **Result**: Test executed successfully with 100% checks passed

#### Summary:
- **Total Checks**: 918 checks
- **Checks Passed**: 100% (918/918)
- **Data Received**: 358 kB (3.0 kB/s)
- **Data Sent**: 94 kB (779 B/s)
- **Request Duration**:
  - Average: 838.54 µs
  - Minimum: 388 µs
  - Maximum: 5.81 ms
- **Requests Per Second (RPS)**: 7.64 r/s

#### Key Metrics:
- **http_req_failed**: 0.00% (0 failures)
- **http_req_blocked**: avg=13.41 µs (min=3 µs, max=2.02 ms)
- **http_req_waiting**: avg=757.46 µs
- **http_req_sending**: avg=23.69 µs
- **http_req_receiving**: avg=57.37 µs

---

### Post and Get Test (`postAndGetPet_test.js`)

#### Scenario:
- **Max Virtual Users (VUs)**: 10
- **Duration**: 2m0s (including graceful ramp-down of 30s and graceful stop of 30s)
- **Result**: Test executed with 99.89% checks passed, with minor failures

#### Summary:
- **Total Checks**: 4585 checks
- **Checks Passed**: 99.89% (4580/4585)
- **Data Received**: 1.2 MB (9.6 kB/s)
- **Data Sent**: 434 kB (3.6 kB/s)
- **Request Duration**:
  - Average: 720.83 µs
  - Minimum: 231 µs
  - Maximum: 6.89 ms
- **Requests Per Second (RPS)**: 22.85 r/s

#### Key Metrics:
- **http_req_failed**: 0.14% (4 failures)
- **http_req_blocked**: avg=6.35 µs (min=1 µs, max=620 µs)
- **http_req_waiting**: avg=656.94 µs
- **http_req_sending**: avg=18.31 µs
- **http_req_receiving**: avg=45.57 µs

---

## Test Failures Analysis

### Failed Requests:
- For `postAndGetPet_test.js`, 4 requests failed (0.14% failure rate).
- **Most common issue**: status not 200 (99% success rate for status 200).

### Missing Pet Name:
- 99% success for response containing pet name, 1% failure.

---

## Observations

1. **Stability**: 
   - The tests were executed with very low failure rates overall.
   - No failures in `inventory_test.js` and a minimal failure rate of 0.14% in `postAndGetPet_test.js`.

2. **Performance**:
   - Request durations are fast, with average times under 1 millisecond for most requests.
   - The system is capable of handling high request rates with minimal degradation in performance, even at 10 virtual users.

3. **Failures**:
   - The failures in the `postAndGetPet_test.js` are likely due to issues with the pet name or incorrect response status, which may require further investigation on the server-side handling or endpoint response.

---

## Conclusion & Recommendations

### Stability:
- The system showed great stability under load with no significant failures.

### Performance:
- Performance is within acceptable limits, with request durations and throughput rates showing strong results.
- For postAndGetPet_test.js if the load increases to more than 10 users the failure rate increases and the system breaks down

### Further Investigation Needed:
- Investigate the failed requests in `postAndGetPet_test.js` where the status is not 200 and why it only supports 10 concurrent users.
- Ensure the response body is correctly structured with the expected pet name.

