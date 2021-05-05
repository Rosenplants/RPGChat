# RPGChat
Take part at: [ccrpg.herokuapp.com/](https://ccrpg.herokuapp.com/)

## Table of Contents
* [About](#about)
  * [Built With](#built-with)
* [Roadmap](#roadmap)
* [Recent Updates](#recent-updates)

## About
Built for the Grace Hopper stackathon, RPG Chat is a messaging website built with distanced roleplaying in mind. You can sign up for an account and create groups to invite your friends/fellow players to. Live chat your character's moves and words, roll dice, and send pre-built scenes with pictures and descriptions to set the mood.

### Built With
* Socket.IO
* Express
* React
* Redux
* PostgreSQL
* Sequelize

## Roadmap
* Improving the Sign Up / Log In / Invite a Player experience
  * Adding feedback to user when errors occur
  * Adding feedback to users when they've successfully invited players to their game
  * Finalizing and implementing a way for users to invite someone without an account to their game
  * Allowing a user to accept or reject an invitation rather than just being added
* Implementing private messaging and non-default group threads in games
* Allow users to build their own scenes for each group, or scenes that are available in all of their groups
* Include audio options in scenes
  * And easy ways to mute them for each user
* Build out the note taking feature
* Overhaul the styling for consistency and, well, looking good.

## Recent Updates
May 4th, 2021
* Fixed a couple messaging related bugs:
 * Messages no longer carry over into the welcome screen of the next game when switching between them
 * Leaving and entering other games no longer makes the user receive messages multiple times
* Added basic user feedback for when log ins and sign ups fail

May 3rd, 2021
* MVP finished and deployed for Stackathon presentation!!
