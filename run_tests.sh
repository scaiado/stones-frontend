#!/bin/bash

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  npm install
fi

# Run tests with coverage
npm run test:coverage

# Generate test report
if [ -d "coverage" ]; then
  echo "Test coverage report generated in coverage/lcov-report/index.html"
fi 