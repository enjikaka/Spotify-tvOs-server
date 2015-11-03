## Installation

Clone this repo and run `npm install`

## Running the server

Execute `npm run server`

## Connecting to the server from tvOS app

```swift
import UIKit
import TVMLKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, TVApplicationControllerDelegate {

    var window: UIWindow?

    var appController: TVApplicationController?
    static let TVBaseURL = "http://localhost:9001/"
    static let TVBootURL = "\(AppDelegate.TVBaseURL)js/application.js"


    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        window = UIWindow(frame: UIScreen.mainScreen().bounds)

        let appControllerContext = TVApplicationControllerContext()

        guard let javaScriptURL = NSURL(string: AppDelegate.TVBootURL) else {
            fatalError("Unable to create NSURL")
        }

        appControllerContext.javaScriptApplicationURL = javaScriptURL
        appControllerContext.launchOptions["BASEURL"] = AppDelegate.TVBaseURL

        appController = TVApplicationController(context: appControllerContext, window: window, delegate: self)
        return true

```
