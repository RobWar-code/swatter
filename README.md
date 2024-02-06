# Swatter - An Online Interactive Graphics Game

## Introduction

The game is for one player and consists of a graphic setting with a 
table with various fragile objects on it and an object to be used as 
swatter that is to be used by the player to strike down various bugs
as they fly or crawl across the table. The object is to strike the bugs
without smashing the fragile objects (points deducted), each successful
strike scores points.

## Layout

The layout consists of a window alcove with net curtains and ornaments
to the left and a set of shelving with ornaments to the right. The
window alcove should be not more than 390px wide, with the adjacent
shelving occupying the remaining 610px of the maximum size stage (1000px);

As the display is shrunk, the scale remains the same, but only those ornaments
visible on the left are displayed. The swatter is moved accordingly.

### Preliminary Visual Design Discursive

If the design is highly visual, then the time budget for the drafting
stage becomes that much longer. So the first choice is between visual
appeal and establishing the game-play value. In an ideal world both
the game play and the visuals are ideal, in practice, we must set
budgetary constraints and game-play is the most significant factor.

I have used DALL-E to obtain visualisations and to experiment to see
how much drafting can be automated, and have come to the conclusion
that there is generally not much time saving using DALL-E for draft
images, but there is substantial visualisation utility, which can be
used to improve quality. Time can be saved by using DALL-E to provide
draft template drawings.

### Layout Options

Since the game is to be played online on mobiles or laptops tablets
we can use the dimensions from 490 x 500px to 1200 x 500px for the
stage area.

The decision is then whether to provide a uniform game stage for
all resolutions and use the spare screen space for scores etc. Or
whether to enhance the game stage for larger displays.

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
of the two. The swatter would best be done vector style, so that the
background image is correctly presented as it moves.

The ornaments are presented in two forms, broken and complete. So they
could be designed as individual .svgs to be inserted appropriately.
To do individual .png edits would require a combinatorial number of
different scenes, so is impractical, other than for the static 
background. Unless we stick to a maximum of 4 ornaments.

This means that about 50 svg images must be created if we have
25 ornaments. 10 ornaments allows for variety and simpler scoring
as well as allowing larger scale, without compromising the game
play too much.

The other option is to have .png ornaments with transparent backgrounds
and this would suit using DALL-E better. These take about an hour
to prepare from DALL-E's presentatiations and have the advantage
of preserving detail.


### Ornaments

To fit well into the background image ornaments are about 50 x 70px
(say between 30 x 30 and 90 x 100) so the originals must be attractively
scalable to these dimensions. They should preferably be of the form
of victoriana, monochrome, if traced, or hand-drawn if coloured (pastels).

#### Ornament Production

1) Ask DALL-E to produce object images (say 15) on a white background.

2) Download the image to edit in GIMP.

3) Cut the individual ornaments out of DALL-E's original and paste into
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

Time per ornament is about 15 minutes.

## Schedule

The following schedule is based on a budget of 12 man weeks (72 days),
so the plan contents are juggled accordingly. This chart will be updated
during the course of the project.

Start Date: 29/01/2024

| Item                                   | Est. Time       | Actual Time
| -------------------------------------- | --------------- | ------------ |
| Preliminary Design and feasibility     | 5               |              |
| Design and Sketches                    | 14              |              |
| Integration of Sketches with code      | 10              |              |
| Game Play and Code                     | 20              |              |
| Margin of Error                        | 8