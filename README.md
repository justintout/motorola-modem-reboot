# motorola-modem-reboot
> Programatically reboots Motrola modems 

Reboots a Motorola modem using the status page. Carried out in headless Chromium using [Playwright](https://playwright.dev). 

Ships with the default username and password.

## Installation

```
$ git clonegit@github.com:justinout/motorola-modem-reboot.git
$ cd motorola-modem-reboot
$ npm install
```

## Usage

```
$ reboot-modem
```

The program will timeout during login if the modem doesn't use the default username and password.
Edit `username` and `password` in [src/index.ts](./src/index.ts) (or, ideally, provide in a more secure way).  

The program expects the modem status page to be accessible at [http://192.168.100.1](http://192.168.100.1). 
If that is not the case, edit `host` in [src/index.ts](./src/index.ts).