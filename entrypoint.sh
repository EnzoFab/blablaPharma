#!/bin/bash
echo "Try to build files..."
if npm run build ; then
  echo "Project files successfully built"
  npm run start
else
  echo "And error has occured"
fi
