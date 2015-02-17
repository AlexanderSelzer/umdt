#!/bin/bash

curl -H "Content-Type: application/json" \
  -d '{"type": "wifi", "lat": "84.3", "lon": "16.2"}' \
  localhost:8080/data
