#!/usr/bin/env bash

#host = http://127.0.0.1:3000/

#Used to test our backend
#Every CRUD operation is tested here.
#We use the data from UserExample.json as our test user


curl --write-out "%{http_code}\n" -X GET http://127.0.0.1:3000/users

curl --data '{"first_name": "Ryan","last_name": "Lynch","email": "rynplynch@gmail.com"}' \
--header "Content-Type: application/json" \
--request POST \
http://127.0.0.1:3000/users

echo "done"
#curl --write-out "%{http_code}\n" -X GET http://127.0.0.1:3000/api/v1/user/5 --output output.txt
#curl -d '{"id": 3}' -H "Content-Type: application/json" -X DELETE http://127.0.0.1:3000/api/v1/user
