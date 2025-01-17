#!/bin/bash
for file in tests/*.js
do
  API_URL=http://localhost:8080 k6 run "$file" --summary-export=summary.json
done
