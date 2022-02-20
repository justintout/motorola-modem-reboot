# motorola-modem-reboot
> Programatically reboots Motrola modems 

Reboots a Motorola modem using the status page. Carried out in headless Chromium using [Playwright](https://playwright.dev). 

## Installation

```
$ npm install -g @justintout/motorola-modem-reboot
```

## Usage

```
$ reboot-modem -h 
Usage: reboot-modem [-h] [-v]

Options:
        -h:     Print this help and exit
Varaibles:
        MODEM_REBOOT_HOST:       use this URL to reach the modem
        MODEM_REBOOT_USER:       use this username to log into the modem
        MODEM_REBOOT_PASSWORD:   use this password to log into the modem
```

The program defaults to the username `` and password ``.
Supply the `MODEM_REBOOT_USERNAME` and `MODEM_REBOOT_PASSWORD` enviornment variables to override.

By default, the program reaches the modem at [`http://192.168.100.1`](http://192.168.100.1). 
Supply the `MODEM_REBOOT_HOST` environmen variable to override.

## Developing 

```
$ git clone https://github.com/justintout/motorola-modem-reboot
$ cd motorola-modem-reboot
```

This package is straightforward and, for my purposes, is feature compelete.
Open an issue or submit a pull request with improvements.
