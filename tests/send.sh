#!/bin/bash

curl -H "Content-Type: application/json" \
  -d '{"type": "wifi"}' \
  localhost:8080/data
