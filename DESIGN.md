# General Trivia App Design Doc

- [General Trivia App Design Doc](#general-trivia-app-design-doc)
  - [Purpose](#purpose)
  - [Scope](#scope)
  - [System Components](#system-components)
  - [User Interfaces](#user-interfaces)
  - [Detailed Design](#detailed-design)

## Purpose

This is a trivia/education app, for various subjects apart from language. Most likely it’ll be a simple flashcard thing; "Uluru is on which continent? Asia/North America/Africa/Oceania", "Which MLB player is AKA the Sultan of Swat?" We might include a hint system of some kind, especially if we make it multiple choice. Or we can do T/F questions, like "Randy Johnson played for the Seattle Mariners T/F?"

Users can select a category, or possibly multiple, and get quizzed on it. IDK if it’ll be a 10-question procedurally-generated quiz, or an endless trek. TBD. It might be nice to have deep URLs for some questions, or just the ability to copy the text to share.

Might also be nice to include some expanded information with the answer; "Uluru is a red sandstone monolith in Australia, sacred to the Aboriginal tribes in the area. For more, see <https://en.wikipedia.org/wiki/Uluru">, "George Herman 'Babe' Ruth played MLB from 1914 to 1935, and is arguably the greatest baseball player ever. For more, see <https://en.wikipedia.org/wiki/Babe_Ruth">.

Admins will be able to upload new questions and handle reports from users. This may need a separate panel, though, or just emails and manual DB fiddling initially.

## Scope

Relatively high-level, limited implementation details. We’ll need at least

- A database, or multiple, to store questions and categories, and track user accounts
  - User account tiers and roles; a premium ad-free tier, or a lite subscription to get (extra) free hints each day, or whatever. Most of this will be extended later, but I should set up the scaffold early.
- An API for picking questions to put to the users. This might be a full backend web service, or just some functions. TBD.
- An API for getting a report card for the user. Again, might be a full service or just some functions.
  - This will also require some way to track user answers, including wrong guesses.
- A UI for users to set categories, answer questions, to do all the stuff in the User Interfaces section.

It may expand to include

- Explicit in-app payments including for hints, free wrong answers, streak freezes, ad-free tiers, avatars, whatever.
  - Though, limiting the number of questions somebody can get wrong annoys me. "Oops, you got too many questions wrong, so you’re through learning for today." Ridiculous.
- Push notifications to maintain a streak
- An actual admin panel of some sort, as opposed to me working manually.
- Fitness tracking as a partial replacement for payments, just integration with existing phone fitness systems.
- A multiplayer system, for direct head-to-head quizzing.
- UI theme, if only light/dark/system.
- Questions divided into multiple difficulty levels
  - Names TBD; might call them school levels, like Elementary/High/College, or just numbered 1/2/3/etc. Might get opinionated, and say that some people can do the easy "Jeopardy" questions.
- Dynamic difficulty; raise the difficulty for some quizzers if they get enough right, lower it if they get too many wrong.
- Human-curated quizzes, to be shared? "I got 80% on this quiz about landmarks, how about you?"
- A league table for performance on quizzes-
  - Might cover number of questions or rightness, but probably best to work off a point system to reward both.
  - League table based on categories, "who did best on geography", and your points vs your friends on whatever category they like.
- Local storage to work offline, and syncing local storage to the server
- Pictures, including user avatars or illustrations in questions
- I really want to do audio questions, like "which band/artist sang this song? *play ‘Sweet Caroline’ "
- Some dynamic question assembly, if only picking wrong answers.

## System Components

To be updated, once I work out just what I need to do.

Frontend will be VueJS, ReactJS, or maybe Blazor if I use ASP.NET for the backend.

Backend is probably just some managed DB like Firebase/Supabase with a few functions for API services. Maybe ASP.NET Web API with Blazor on the frontend, for further resume-polish.

User DB: Document DB, tracks user accounts

- User ID: email. IDK how best to handle OAuth stuff, will have to learn that while I build it.
- Password, or other authentication. Including 2FA apart from SMS! May not get used by anyone but me, but I will include it!
- Chosen categories: Either simple list of category IDs, or map tracking difficulty per category.
- Account tier, hopefully not including payment information.
- Other settings: in-app username, enabled push notifications, avatar once I add it, theme, etc.
- Questions answered by the user: Long list of { question ID, timestamp, correct?, answer } Used for building the report card
- Friends? : Other user IDs this user knows. Used for league, support, whatever

Question DB: Document DB, stores long DB of questions.

- Question ID: Either simple autoincrement, or proper UUID.
- Category/ies: Again, list of category IDs. May just be one ID, but it’ll have to be a list for the sake of the code. It’ll need to be a list because a question can be in multiple categories. Even apart from subcategories, they can cross. "The first FIFA World Cup was hosted and won by what country in 1930" is both "Soccer" and "1930s History"
- Text: Should be HTML/Markdown from the jump, so we can handle images or whatever. OTOH, plain text is already valid Markdown/HTML
- Correct answer: Ditto
- Wrong answers: Ditto
- Answer text: Ditto. This is the extra stuff that comes up on answer, like "Uluru is a red sandstone monolith in Australia".

Category DB: Document DB, just maps category IDs to user-readable descriptions.

- Category ID: Again, either autoincrement or proper UUID
- Category name: User-friendly ID, "Geography" or "Sports" or "New York Yankees"
- Category description: Longer description, "The study of where things are".
- Question list: May include an index of questions that fit a given category; it’ll likely only change when new questions are uploaded, so this should be cheap.

File storage: Just a bucket, I expect.

Question API: The bulk of the system, since everything else should just be get/set stuff.

- GET /nextQuestion Returns question for user to answer. May take category as parameter, or may just use user state to get an appropriate question. May include correct/incorrect answers to check answers client-side, or just a set of 4 possible answers to handle that server-side.
- POST /answerQuestion Sends answer to the server, to get back right/wrong response and also record user’s answer for report card
- GET /reportCard Returns report card, in whatever format. Questions correct out of total answered, things you learned, etc. Again, may take category and timeframe as parameters.

## User Interfaces

User must be able to

- Create new account
- Log into existing account
- Edit account; name, avatar, subscription tier, password. Just copy some settings from Duolingo, I guess.
- Sign out of account
- Select category/ies to be quizzed on.
  - (Optional) Select difficulty level(s)
- See user report card, possibly for time frame (number of questions right past month/week/day/all time)
  - Maybe frame that as "Things you learned"; "you thought the Sultan of Swat was Alex Rodriguez, but you learned he was Babe Ruth".
- See and answer question, including getting hint
- Report issues with questions or the app; offensive question, incorrect answer, media not loading

Mobile-_early_ design; nail the behavior down on a browser, then wrangle it down to phone-size.

Accessibility will be a concern; even apart from pictures, we’ll have a job fitting 4 answers and some long questions on a phone screen, especially with large print. Might have to go with a tab/panel setup, like Murdle on phone. "Click here to see the question"/"Click here to see the answers"/"Here’s the correct answer and text".

Or the good old [details widget](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)

## Detailed Design

Again, TBD
