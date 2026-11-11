# Plant Grow Light Simulator

An interactive HTML, CSS, and JavaScript model of a plant grow light. It is designed as a small course project that turns observed appliance controls into a friendly visual simulation.

## Demo speed

The real light repeats its timer on a 24-hour schedule. Waiting a day would make the model difficult to test, so this demo uses a faster scale:

- 1 real second = 1 simulated hour
- 1 simulated day = 24 seconds
- 4H = 4 seconds on, then 20 seconds off
- 8H = 8 seconds on, then 16 seconds off
- 12H = 12 seconds on, then 12 seconds off

## Controls

- **ON / OFF** toggles the light manually. In this model, turning it off also cancels the active schedule.
- **50% / 100%** changes the visual strength of the light beam.
- **Start** cycles through `4H → 8H → 12H → 4H` and starts a new simulated daily cycle.
- **Cancel** removes the timer selection while keeping the light on.

## Observations and model simplifications

The modeled appliance was observed to have ON/OFF, 50%/100% brightness, Start, and Cancel controls. Its selected timer repeats every 24 hours: for example, an 8H setting turns the light off after eight hours and turns it back on at the same time the next day.

Some real-device behavior was not observed. To keep the model understandable, it makes these intentional simplifications:

- Changing the timer starts a fresh daily cycle.
- Turning the light off cancels the schedule.
- Brightness remains selected during the current page session.
- Refreshing the page returns the model to light off, 50% brightness, and no timer.

## Files

- `dist/index.html` — page structure and accessible controls, including a form with brightness radio inputs
- `dist/style.css` — responsive plant-room illustration and visual feedback
- `dist/script.js` — state variables, event handling, timer control flow, and page updates

## Run locally

Open `dist/index.html` in a browser, or serve the `dist` folder with a local static server. No installation or build step is required.

## JavaScript concepts used

- **State variables:** `isLightOn`, `brightness`, `timerHours`, and `cycleHour`
- **Event handling:** `addEventListener()` responds to button clicks and radio-button changes
- **Control flow:** `if`, `else if`, and `else` choose the next timer setting and decide whether the scheduled light is on
- **Visual feedback:** `updatePage()` changes text, indicator states, progress, and CSS classes after each interaction
