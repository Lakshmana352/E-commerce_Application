**API's Used in this apllication are mentioned below:**
```
 1) Post   -- http://localhost:5050/api/role                    --> Create Role
 2) Get    -- http://localhost:5050/api/role                    --> Get Roles 
 3) Post   -- http://localhost:5050/api/status                  --> Create Status
 4) Get    -- http://localhost:5050/api/status                  --> Get Status 
 5) Post   -- http://localhost:5050/api/variant_type            --> Create Variant Type  
 6) Get    -- http://localhost:5050/api/varaint_type            --> Get Variant Types  
 7) Post   -- http://localhost:5050/api/product_type            --> Create Product Type  
 8) Get    -- http://localhost:5050/api/product_type            --> Get Product Types
 9) Post   -- http://localhost:5050/api/signin                  --> Log in to the user account. 
10) Post   -- http://localhost:5050/api/signup                  --> Create a user account.
11) Post   -- http://localhost:5050/api/seller/product          --> Add product to sell account. 
12) Put    -- http://localhost:5050/api/seller/product/:id      --> Update the Specific product of the specific seller account. 
13) Delete -- http://localhost:5050/api/seller/product/:id      --> Delete the Specific product of the specific seller account. 
14) Get    -- http://localhost:5050/api/seller/product          --> Get all products along with the variants of the specific seller. 
15) Post   -- http://localhost:5050/api/seller/variant          --> Add variant to specific product selling by the particular seller. 
16) Put    -- http://localhost:5050/api/seller/variant/:id/:vid --> Update the Specific variant of the specific seller product. 
17) Delete -- http://localhost:5050/api/seller/variant/:id/:vid --> Delete the Specific variant of the specific seller product. 
18) Get    -- http://localhost:5050/api/buyer                   --> Get all the products. 
19) Get    -- http://localhost:5050/api/buyer/:id               --> Get all the products of type `id` 
20) Get    -- http://localhost:5050/api/buyer/:id/variants      --> Get all the variants of the product with ID `i`
21) Get    -- http://localhost:5050/api/buyer/cart              --> Get the variants in the specific user cart. 
22) Post   -- http://localhost:5050/api/buyer/:id               --> Add the variant with the ID `id` to the specific User cart. 
23) Put    -- http://localhost:5050/api/buyer/:id               --> Place Order of the item from the cart of sepecific user.
24) Delete -- http://localhost:5050/api/buyer/:id               --> Remove Variant with ID `id` from the cart of specific user. 
```


**For running this application follow belo steps:**
You can download the all the files and make sure you have node_modules and .env file. </br>
In .env file you need to mention DB_NAME -- database name, DB_USER -- database user, DB_PW -- database password, DB_HOST -- database host motly localhost, SECRET_KEY -- for token creation, SALT -- for encryption purpose. SALT must be number.</br>

npm run dev -- for running nodemon server.js </br>
npm start -- for running node server.js </br>

**Tested the apis in the PostMan working fine**
