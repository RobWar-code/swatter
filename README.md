# Swatter - An Online Interactive Graphics Game

## Introduction

The game is for one player and consists of a graphic setting with  
surfaces (in this case a window alcove with shelving) with various 
fragile objects on it and an object to be used as a swatter 
that is to be used by the player to strike down various bugs
as they fly around the stage. The object is to strike the bugs
without smashing the fragile objects (points deducted), each successful
strike scores points.

## Layout

The layout consists of a window alcove with curtains and ornaments on
the shelving within and in front of the alcove. The alcove image
is scalable to allow for mobiles etc. The scoring graphic appears
to the right of the stage on wide screens and below it on smaller.

### Preliminary Visual Design Discursive

If the design is highly visual, then the time budget for the drafting
stage becomes that much longer. So the first choice is between visual
appeal and establishing the game-play value. In an ideal world both
the game play and the visuals are ideal, in practice, we must set
budgetary constraints and game-play is the most significant factor.

I have used DALL-E to obtain visualisations and to experiment to see
how much drafting can be automated, athere is substantial visualisation utility, 
which can be used to improve quality. Much time can be saved by using DALL-E to 
provide draft template drawings.

### Layout Options

Since the game is to be played online on mobiles or laptops tablets
we can use a scalable image for the presentation.

The decision is then whether to provide a uniform game stage for
all resolutions and use the spare screen space for scores etc. Or
whether to enhance the game stage for larger displays. In this
case it was decided to scale the image.

The primary advantage of having a uniform game stage is commonality
of game play and equivalence of scores etc. across platforms. So
this option is chosen.

In keeping with the visualisation of the game stage, the score panel
should be artworked in related style. Appearing to the right of the
stage on larger devices and below on mobiles.


### Notes on Realism

For the sake of simplicity (and execution speeds) the game is 2 dimensional.
Although the visualisations of the incumbent creature could be adjusted
to "represent" a 3D location, to add a flavour of realism.

### Image Formats

The choice for the design is between raster and vector or a combination
of the two. In practice, raster images with transparent backgrounds are
the most appropriate, not least because DALL-E produces .png or .webp
images. 

The ornaments are presented in two forms, broken and complete. So they
could be designed as individual .png's to be inserted appropriately.

The choice is to have .png ornaments with transparent backgrounds
and this would suit using DALL-E better. These take about an hour
to prepare from DALL-E's presentatiations and have the advantage
of preserving detail.


### Ornaments

To fit well into the background image ornaments are about 80 x 100px
so the originals must be attractively scalable to these dimensions. 
They should preferably be of the form of victoriana, monochrome, 
if traced, or hand-drawn if coloured (pastels).

#### Ornament Production

1) Ask DALL-E to produce object images (say 15) on a white background.

2) Download the image to edit in GIMP.

3) Cut the individual graphic out of DALL-E's original and paste into
a file.

4) Trim the image to content and scale as required.

5) Copy the image

6) Open a new file of the same size and set the layer transparency to
transparent.

7) Paste in the ornament image, edit out any extraneous material

8) Anchor the pasted layer

9) Use the magic wand selection tool to select each white area required
to be transparent, then use the delete (not del) key to delete it. This
leaves the transparent background.

Time per graphic is about 15 minutes.

### Bugs

Three different bugs are provided, each with a flying and sitting posture.
These fly across the stage, beginning on the right and following more or less
random flight paths back and forth in front of the stage. They settle on
various surfaces, including the ornaments on the shelving, where striking
them results in the ornaments breaking. The landing zones are recorded in
the file public/static/graphics/prop-files.json. Once an ornament is broken
the landing zone is disabled.

One bug at a time appears in the stage zone. Five bugs are provided for each
game, with a time limit of of 2.5 minutes to strike them down. Bugs sit still
for a maximum of 1 second.

### Swatter

The graphic for this is ornate, but provides a paddle end for the player
to strike the bugs. It is directed by moving the cursor about the stage
area, and the strike action is activated by mouse click or touch-up.
Touch down on mobiles must be on the swatter. The positioning point on
the swatter is top center. The graphic has a tilted view to briefly show
the strike action.

### Sounds
Sounds are provided for the bug when it is flying, for a successful swat,
for an unsuccessful swat, for an ornament breaking and for a bug flying off 
stage. A sound toggle is provided.

### Score Sheet

The score sheet is a graphic with text, scalable.

The text provided uses the Kaushan local font, and contains the
following:

Current Game Score:
Bugs Remaining: 
Last Game Score:
Highest Game Score:

### Scoring Page

A tabular graphic in game score order, with game number and score.

## Bug Motion

### Flight Paths

The flight paths of the bugs cover in the whole stage area in a looping
or zig-zag motion, beginning on the right and the buzzing back and forth 
and around for the time period allocated. The motion steps are set to be made at
ticker intervals (1/60 sec).

The trajectory of the bug is biased in the horizontal, drifting toward
the vertical as it approaches the edges of the stage and having a small
random chance of change elsewhere. The changes in direction are
accelerations, so that curved trajectories can be produced.

When the direction of motion brings the bug to an edge, the velocity in that
vector is reversed.

Apart from this, as the bug flies, it's accelerations can be modified by
5% every 10 ticks with a bias for the same sign, with a maximum speed 
calculated from the width of the stage, and a minimum speed of 1/5 of this.


## Code Set-up

npx create-react-app
npm install react-router-dom
npm install pixi.js @pixi/react
npm install react-bootstrap
npm install webfontloader
    
## Release Procedures

At the vs-code terminal type npm run build

login to the heroku site

click Add application

Work through the inputs

Deploy the application

View it to test the deployment

Site: https://swatter-87473ffea70e.herokuapp.com/

## Schedule

The following schedule is based on a budget of 12 man weeks (72 days),
so the plan contents are juggled accordingly. This chart will be updated
during the course of the project.

Start Date: 29/01/2024

| Item                                   | Est. Time       | Actual Time
| -------------------------------------- | --------------- | ------------ |
| Preliminary Design and feasibility     | 5               | 7            |
| Design and Sketches                    | 14              | 11           |
| Score sheet                            | 3               | 2            |
| Integration of Sketches with code      | 10              | 6            |
| Game Play and Code                     | 20              | 23           |
| Systems Test                           | 2               | 2            |
| Fix Bugs								 | 8               | 4            |
| Margin of Error                        | 8               |              |
|                       TOTAL            | 70              | 56           |

Completion Date: 25/03/2024

## Systems Testing

See: [Systems Test](systems-test.md)
