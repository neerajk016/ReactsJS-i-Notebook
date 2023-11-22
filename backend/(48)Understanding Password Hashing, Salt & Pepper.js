// Suppose, you are a user and have stored some crucial notes in the iNotebook Database of the website. Now, if your 'userName' and 'Password' are stored within the database, then any hacker or a person with some malicious intention can hack your profile and can easily access your system. To overcome this issue, we never store the password in the database








// The client interacts with the backend and would submit the username and password detail to the backend for validation. Now, the backend will decide whether to grant access to the database or not. 



// Passwordhashing=>

// Hashing turns your password (or any other piece of data) into a short string of letters and/or numbers with the help of an encryption algorithm. Hash is a one-way function. Whenever the user enters the UserName and password, then in the backend the password is converted to hash to make it out of sight. This means that the backend will generate a random output string(hash) which will be matched with the existing hash in the database for validation. Now, if the Hash is exactly matched then the backend will grant access to the client otherwise not. As a result, if the hacker hacked the database then still the hacker will only get the 'UserName' and the 'Password Hash', not the actual password. Remember the Password Hash cannot be converted to the original password string. Ultimately, the hacker won’t be able to do anything with the 'UserName' and 'Password Hash'.




// Salt=>
// Now, what if a pro hacker already has a table (Rainbow table) having the hash of the most common password. Then, if the hacker gets the password Hash then he/she can look in the rainbow table to match the hash with the original password. For example, a client has a password ‘123456789’ and its hash is ‘1@1bd’ then if the hacker gets the hash, he/she can easily look in the rainbow table to find a matching password. Hence, the hacker can easily access the user database. To overcome this issue we would understand the concept of salt.

// Salts help us mitigate hash table attacks by forcing attackers to re-compute them using the salts for each user. This simply means that the backend would add some more characters(salt) to the password to generate a completely different password Hash. Remember, Salts are stored in the Database. We can add more security to the application by adding pepper. It can be considered as a second salt. That is another input to change the hash outcome completely. Yet, unlike salt, it's not stored in the database along with the hashes. This simply means that Hacker will not be able to match the password and Hash in the rainbow table. 