# Selling App
Selling app using React Native and Serverless Typescript NodeJS

## Stack
### Frontend
- React Native
- Typescript
- Redux
- Expo

### Backend
- NodeJS
- AWS: Lambda, API Gateway, DynamoDB
- Typescript
- Serverless Framework

## Admin APIs
- Create product: POST https://ttuqiqz600.execute-api.us-east-1.amazonaws.com/production/admin/products

Body expected:
```
{
    "name": "Roadster",
    "description": "Tesla Roadster",
    "imageUrl": "https://selling-app-assets.s3.amazonaws.com/roadster.jpg",
    "price": 10.00
}
```

- Get access counter: GET https://ttuqiqz600.execute-api.us-east-1.amazonaws.com/production/admin/get-count/{namespace}/{key}

Observations: 
- The service is using namespace **selling-app** and key **selling-app-count** for the second API parameters
- For both of them, header 'x-api-key' is required. Ask me if you want to test it :)

## Screenshots and Recordings
- iOS with Expo: https://github.com/pedrovivaldi/selling-app/tree/main/packages/frontend/screenshots/ios
- Web: https://github.com/pedrovivaldi/selling-app/tree/main/packages/frontend/screenshots/web

## Live Demos
- Web: http://selling-app.s3-website-us-east-1.amazonaws.com/
- iOS: Check https://expo.io/@pedro-vivaldi/projects or scan the QR Code below. Ask me for the invitation to test the demo :)

![Alt Text](https://selling-app-assets.s3.amazonaws.com/expo+qr.png)
