To add new social media login

1. create new endpoint (POST)
2. add the new social media type into socialhandles in user schema
   if it has an SDK 2. Fetch the details at the client side 3. Send it as body to the newly created path 4. check if the email already exist 5. if the email exist then add unique id ( got from that social media sdk ) into socialHandles
   else create the account with that email and add unique id ( got from that social media sdk ) into socialHandles
   else if its a api 2. Fetch the details email and unique id ( which social media provide) 3. check if email already exist 4. if the email exist then add unique id ( got from that social media sdk ) into socialHandles
   else create the account with that email and add unique id ( got from that social media sdk ) into socialHandles
