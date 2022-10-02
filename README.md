# Graphics Package Development

Streamix Panel is a graphics overlay software for the ATEM Mini series of video mixers. Graphics are created using packages that can be imported to your project.

In the folder `examples/` you will find some example packages to get you started. You can code live in your editor but if you want to create your own package you should [create one from scratch](https://github.com/jhsware/streamix-package-templates) and copy the files in `src/` to your new project.

Development requirements:
- Node.js 16 or later
- Web browser (Safari recommended, but Chrome or Edge will work in most cases)

There are three types of packages. They are all coded in the same way but differ in configuration:
- **graphics overlay:** used for graphics placed over the camera feed
- **fullscreen graphics overlay:** used for video playback or fullscreen graphics
- **stinger:** used for stinger transitions

## How to Run the Examples in a Browser
1. Check out the example repos using Git or download a ZIP-file (press the green button named "Code v")

```sh
git clone git@github.com:jhsware/streamix-package-examples.git
```

2. Go to the root folder and run install 

```sh
cd streamix-package-examples
npm i
```

3. Start the development server for the grahics package you want to try out

```sh
cd examples/graphics-logo
npm run dev
```

If you are stuck on the previous graphics package due to caching, just change the port:

```sh
PORT=8080 npm run dev
```

You can now open a webpage at the address shown in the terminal. It is recomended to use Safari for preview because it uses the same rendering engine as the Streamix Panel app, but both Chrome and Edge will work if nothing else is available.

**NOTE:** Source maps are currently broken in these examples. Setting breakpoints in browser won't be useful.

## How to Build the Examples for Streamix Panel
You can build these examples and import them into Streamix Panel. Follow steps 1 & 2 in "How to Run the Examples in a Browser", then run the build command:

```sh
npm run build:all
```

You can find the importable packages in each examples `build/` folder.

## Example Packages
- **confetti-celibrate:** shoot some confetti at the push of a button
- **count-down:** add a fullscreen countdown timer with target time
- **fetch-json:** fetch and display a comment from an external API
- **graphics-logo:** show an image on screen
- **graphics-name-tag:** show a name tag with customisable text
- **stinger-poc:** perform a stinger transition to switch between scenes
- **video-player:** show fullscreen video content (from your project video folder)