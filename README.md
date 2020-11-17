# Master-Mind-Solver-2.0
## General
### Overview
Master Mind solver for the standard version with 6 colors and 4 placements. The solver plays optimal<sup>*</sup> by continually finding the move that on average decreases the solution space the furthest.
### Optimal starting move
For optimal play, start the game with any move following a XXYY partern in colors. It has been proved superior to both XXYZ amd XYZW. <br/>
### Controls:
**Arrows keys** - Moves around the grid.<br/>
**Enter** - Runs the solver (Like the “Run” button it only works when a valid input has been made.)<br/>
**Numbers 0-6** - Inputs the different colors and clues. (If there is no black or white feedback, zero must be entered in the respective column)<br/>
**Backspace** - Removes filled placeholders.
## Performance
Average moves needed for solve: **4.428**
### 1000 simulations test:
<img src="https://github.com/hojmax/Master-Mind-Solver-2.0/blob/main/images/1000sim.png">
Moves needed | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
--- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Games | 1 | 15 | 79 | 396 | 479 | 29 | 1 | 0 | 0 | 0

***Note:** I assume it to be optimal, but i am more than happy to be corrected. 
