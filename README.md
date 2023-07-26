questionprotesthackernewpi
I have created 3 apis according to problem statement using node.js

Running code on port 3000:

![image](https://github.com/Shubham-Zope/questionprotesthackernewpi/assets/71915264/75e84402-cef6-4165-9bc0-065508d54dbd)



1. /top-stories:
   
   In the below screenshot of postman you can see that, top 10 stories have been fetched sorted based on score. Also I used node-cache module for caching the data for 15 mins.
   ![image](https://github.com/Shubham-Zope/questionprotesthackernewpi/assets/71915264/42781998-332c-4d75-a171-d98adb39ea81)

2. /past-stories:

    In the below screenshot of postman you can see that, top 10 stories have been fetched from cache which was put in top-stories. If these api is runned after 15 minutes of top-stories then again top 10 stories will be fetched and will be sorted based on code.
  ![image](https://github.com/Shubham-Zope/questionprotesthackernewpi/assets/71915264/bd0021ea-0a61-4b89-a882-4c35ca9492dd)

3. /comments:

   In the below screenshot of postman you can see that,top 10 max comments have been if there are of a story sorted on the number of child comments.

   ![image](https://github.com/Shubham-Zope/questionprotesthackernewpi/assets/71915264/0b8c96ed-1896-4ae4-9a1a-0e80686000ca)

Docker Build

![image](https://github.com/Shubham-Zope/questionprotesthackernewpi/assets/71915264/ba84e898-7fa3-48e0-95b4-f3a5f8038cfb)

Docker running on 3000
![image](https://github.com/Shubham-Zope/questionprotesthackernewpi/assets/71915264/3fa968ce-6b0e-406c-875c-b0c7fc9a05c3)



   
   
   
