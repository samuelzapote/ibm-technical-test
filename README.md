## Getting Started

Setup node and npm with [nvm-windows](https://github.com/coreybutler/nvm-windows) for windows or [nvm](https://github.com/nvm-sh/nvm) for Linux / MacOS systems.

Install [Angular CLI](https://github.com/angular/angular-cli).

In order too install the project's dependencies you should `cd` into the project folder and run `npm install`.

Once installed run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

---

## About

This tool makes use of Github's public API to allow you to search for github users that match a provided search term. Start to enter a value in the search field, after 1.5 seconds the result provides you with the first 20 users found and is displayed on a table, at 10 users per page. The pagination tool at the bottom of the table allows you to advance to the next page of 10 users. Once you are on your last page, 20 more users will be loaded and added to your table for you to view.

## Usage

This tool is intended for educational purposes only.

### Table Data

The search result will provide you with the name, username, amount of repos, followers and the following count of every user found. If the field is not visible, then more than likely the user has not provided that data to github. This data is dynamically provided on the table, more users will be retrieved once you reach the last page if there are any available within a limit set by github.

### Extended Data

To view a more detailed profile click on a user's row. You should be redirected to a detailed view of the selected user. In addition to the already available data, this view will provide you with the user's avatar, registered location, company, blog and twitter handle. If you find a field empty then more than likely the user has not provided that data to github. 

### Playground

In addition to viewing a user's profile, you have the option of selecting the edit button at the top right corner of the card. You will be presented with a modal that will allow you to edit the user's profile information and store it locally in your session. If you wish to return to the table, just click on the left arrow at the top left of the card.
NOTICE: This will not, in any way, update the user's actual information on github. The users you have retrieved will all be removed from your local session once you reload the page.
As long you do not refresh the page, or process another search, all of the users will continue to stay on the table with the updated data that you have modified locally.


### Limitations

As of now, without authenticating to Github you are limited to 60 user requests per hour. This means that once you have searched 3 times, or have gone through 6 pages of the table, you will no longer be able to make any further requests within that hour. The provided view of data is all that has been implemented at the moment and you can not make any permanent changes to a user's profile that would be reflected on their actual github.


## Development

To learn more about how to continue developing this project, consider looking through the following documentation.
- [Angular Styleguide](https://angular.io/guide/styleguide)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Angular Material](https://material.angular.io/)
- [Github API](https://docs.github.com/en)
- [RxJS](https://rxjs-dev.firebaseapp.com/guide/overview)
