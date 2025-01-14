# TeamA frontend

## Overview
This is the ReadMe instruction for the Team A Frontend. 

---

## Setup Instructions

#### Frontend setupt

1. Especially there is internal folder for the charitan project.
    ```bash
    cd charitan
2. Create a .env file and add the necessary environment variables.
    ```bash
    #Cloudinary
    REACT_APP_CLOUDINARY_CLOUD_NAME="dtyc0iz95"
    REACT_APP_CLOUDINARY_API_KEY="136267292197893"
    REACT_APP_CLOUDINARY_API_SECRET="LsSff9stcAI5HmZW2HlDAySZsE8"
    REACT_APP_CLOUDINARY_UPLOAD_PRESET="unsignedPreset"
    
    #Auth
    REACT_APP_API_BASE_URL=http://<ipv4>:5001
    REACT_APP_RSA_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu/tB9+zU3RxhdeiLXgZF\\npql7GpOLzDcbXneQubo5B02iuRIuO2m0bmCYzG2sdqu5bOOG4jieegDr6X75nC26\\nSb/wVwH5xP1/EJayL6va1se/Zh+aiYWhWRW82j6meLvxodZoIcV2TGhQoZEHBVQ/\\nTa4i1dJr/rtdoha2f8H/YUF+wToTMCaNcqDEbNYQnhj55fLZ0+y+a9o8MQHXP4VB\\nFcSqyKTKAO+r3vlnxyXezhZtP1jt9Mp5Lg60qHjEpxfnridchQSJUxSBMw87BOC3\\nhBcrQjEA12pRnkGQCO4tZXyrC0kaRS2edBLj+B4qnmO1u3rzEvMSsJY0jL13ftdS\\nTQIDAQAB\\n-----END PUBLIC KEY-----
    HOST=<ipv4>
    REACT_APP_TEAM_A_BACKEND_URL=http://localhost:4000```

3. Install packages and dependencies
   ```bash
   npm install
4. Start the web app 
   ```bash
   npm start
