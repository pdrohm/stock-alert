# Stock Alert App

The Stock Alert App is a React Native application designed to help users monitor and manage their stock investments. Users can add stocks to their watchlist, set price alerts, and receive real-time updates on stock prices.

## Features

- **Watchlist Management**: Add, edit, and remove stocks from your watchlist.
- **Price Alerts**: Set custom price alerts for stocks and get notified when the price crosses your set threshold.
- **Real-Time Data**: Fetch and display real-time stock data.
- **Search Functionality**: Search for stocks and dynamically update the watchlist based on search results.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/pdrohm/stock-alert.git
    cd stock-alert-app
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory (check the .env.example):

    ```env
    URL_API_TOKEN=your_api_token
    URL_AUTH0_DOMAIN=your_auth0_domain
    URL_AUTH0_CLIENT_ID=your_auth0_client_id
    URL_AUTH0_REDIRECT_URI=your_redirect_uri
    URL_AUTH0_LOGOUT_REDIRECT_URI=your_logout_redirect_uri
    ```

## Running the Application

### iOS

1. Install CocoaPods dependencies:

    ```bash
    cd ios
    pod install
    cd ..
    ```

2. Run the application:

    ```bash
    npx react-native run-ios
    ```

### Android

1. Start the Android emulator from Android Studio or connect an Android device.

2. Run the application:

    ```bash
    npx react-native run-android
    ```

## Usage

1. **Login**: Use the Auth0 login button to authenticate.
2. **Add Stocks**: Search and add stocks to your watchlist.
3. **Set Alerts**: Set price alerts for the stocks in your watchlist.
4. **Receive Notifications**: Get notified when the stock price crosses your set threshold.
5. **Logout**: Use the logout button to end your session.

## License

This project is licensed under the MIT License.
