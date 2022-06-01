<img src="https://media.giphy.com/media/XfGxvPXC4SYUvw5iAh/giphy.gif">

# Tomato run!

A small game built with PixiJS. Check out the game [here](https://tomatorun.netlify.app/)!

# Installation

1. Download repository
2. Open in editor (visual studio code)
3. Run npm install in terminal
4. Open live server
5. Enjoy

# Changelog

-   [#1 - Set up boilerplate.](https://github.com/alicenyberg/game/pull/1)
-   [#2 - Animating monsters, function for gameloop.](https://github.com/alicenyberg/game/pull/2)
-   [#3 - Game over screen added.](https://github.com/alicenyberg/game/pull/3)
-   [#4 - Function for scoreboard.](https://github.com/alicenyberg/game/pull/4)
-   [#5 - Added new sprites.](https://github.com/alicenyberg/game/pull/5)
-   [#6 - Added walls.](https://github.com/alicenyberg/game/pull/7)
-   [#7 - Updated the walls function.](https://github.com/alicenyberg/game/pull/8)
-   [#8 - Dismantle classes.](https://github.com/alicenyberg/game/pull/9)
-   [#9 - Start screen added.](https://github.com/alicenyberg/game/pull/11)
-   [#10 - Start screen sprites added.](https://github.com/alicenyberg/game/pull/12)
-   [#11 - Function to make the tomato grow.](https://github.com/alicenyberg/game/pull/13)
-   [#12 - Small fixes like changing colors and text placement.](https://github.com/alicenyberg/game/pull/14)
-   [#13 - More small fixes like cleanup and new script-link.](https://github.com/alicenyberg/game/pull/16)


# Code Review

Code review written by Amanda Karlsson and Amanda Hultén.

1. `app.js:1` - import that is not in use. Could be removed. 

2. `general` - the container of the game might be a bit too big. If you have a smaller screen you might have to scroll to see the entire game. 

3. `app.js: 128` - when game over, instead of using reload which directs you to the start page, you could call for the game screen so the game restarts automatically in stead of having to press start each time you want to play again. 

4. `app.js: 25` - “ app.view.width / 2 “ is used multiple times in your code. This could be defined in a variable instead to simplify the code and make the code more dry. 

5. `index.html:32` - you could remove type=module since this is not a module. 

6.  `index.html:9` - remember to write the right type of your image. 

7.  `app.js:` - not necessary to put a “.” before your path-way, also good to look over the consistency of how you refer to your paths. Some are made with a dot and some are not, just to make sure it’s the same everywhere. 

8. `app.js` - this file is very long. It could me divided into several smaller files to make it easier to navigate. 

9. `tips` - in the future you could add so the bird and the work also moves in more directions to make the game harder while increasing in points. 

10. `praise` - super fun and pretty looking game! You’ve done a very good job!

# Testers

Tested by the following people:

1. Amanda Hultén
2. Amanda Karlsson
3. Agnes Skönvall
4. Johanna Jönsson

Tested by the following muggles (non-coders):

1. William Wallin   
2. Camilla Petrén
3. Cecilia Ivarsson
4. Tomas Nyberg
