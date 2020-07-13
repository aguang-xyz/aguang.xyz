# File Associations in Electron Applications.

[Electron](https://www.electronjs.org/) is widely used framework by which we
can build cross-platform apps with Javascript, HTML and css. In this article,
I want to introduce a simple way to implement file associations.

## Initialize a new Electron Application.

[Electron-builder](https://github.com/electron-userland/electron-builder) is a
complete solution to package and build a ready-for-distribution Electron app.
A recommended way to create a new Electron application is to clone the template
repository called [electron-webpack-quick-start](https://github.com/electron-userland/electron-webpack-quick-start).

```bash
git clone https://github.com/electron-userland/electron-webpack-quick-start.git
cd electron-webpack-quick-start
rm -rf .git
```

## File Association Configs.

Electron-builder configuration can be defined in the `package.json` file of
your project using the `build` key. And in the [common configuration](https://www.electron.build/configuration/configuration)
 section, we can find the definition of key `fileAssociations`.

> * `fileAssociations` Array<FileAssociation> | FileAssociation - The file associations.
>   * `ext` String | Array<String> - The extension (minus the leading period). e.g. `png`.
>   * `name` String - The name. e.g. `PNG`. Defaults to `ext`.
>   * `description` String - windows-only. The description.
>   * `mimeType` String - linux-only. The mime-type.
>   * `icon` String - The path to icon (`.icns` for MacOS and `.ico` for Windows), relative to build (build resources directory). Defaults to `${firstExt}.icns/${firstExt}.ico` (if several extensions specified, first is used) or to application icon.
> 		Not supported on Linux, file issue if need (default icon will be `x-office-document`).
> 
>   * `role` = `Editor` String - macOS-only The app’s role with respect to the type. The value can be Editor, Viewer, Shell, or None. Corresponds to CFBundleTypeRole.
>   * `isPackage` Boolean - macOS-only Whether the document is distributed as a bundle. If set to true, the bundle directory is treated as a file. Corresponds to LSTypeIsPackage.
>   * `protocols` Array<Protocol> | Protocol - The URL protocol schemes.
>   * `name` String - The name. e.g. IRC server URL.
>   * `schemes` Array<String> - The schemes. e.g. \["irc", "ircs"\].
>   * `role` = `Editor` “Editor” | “Viewer” | “Shell” | “None” - macOS-only The app’s role with respect to the type.

The above is an example to support file association of markdown files.
By this, electron-builder will automatically:

* Write related configs into [window registry](https://en.wikipedia.org/wiki/Windows_Registry) for Windows. 
* Generate related configs into `Info.plist` for macOS. 
* Generate field `MimeType` = `text/markdown` in your application.desktop for Linux.

```json
"build": {
    "fileAssociations": [{
        "ext": "md",
        "description": "Markdown File",
        "mimeType": "text/markdown",
        "name": "Markdown File",
        "role": "Editor"
    }]
},
```

## Handle File Opening.

There are different ways to trigger file opening via your application:

* On macOS, an `open-file` event will be triggered as mentioned [here](https://www.electronjs.org/docs/api/app#event-open-file-macos);
and to successfully handle this event, we should call `event.preventDefault()`.

* On Linux or Windows, a new process will be executed and we can get the file path via `process.argv`.

The code above shows how to handle file opening for all platforms.

```javascript
import { app } from "electron";

// Handle file opening for macOS.
app.on("open-file", (event, path) => {

	// Notify the framework, this event has been handled.
	event.preventDefault();

	handleOpen(path);
});

app.on("ready", () => {

	// TODO: Initialize your application.

	// Handle file opening for Windows and Linux.
	if (process.argv[1]) {

		// Since we may have extra parameters (e.g. app --sanbox), process.argv[1]
		// may not be an existed file path, we should catch potential exceptions
		// here.	
		try {
			handleOpen(process.argv[1]);
		}	catch (err) {
			console.warn(`Failed to open ${path}: ${err.message}`);
		}
	}
});
```

## References.

* [Electron: build cross-platform desktop apps with JavaScript, HTML, and CSS](https://www.electronjs.org/).
* [Electron-builder: a complete solution to package and build a ready for distribution Electron](https://github.com/electron-userland/electron-builder).
* [Electron-webpack-quick-start: a bare minimum project structure to get started developing Electron app.](https://github.com/electron-userland/electron-webpack-quick-start)
* [Windows Registry. In Wikipedia, The Free Encyclopedia.](https://en.wikipedia.org/wiki/Windows_Registry)

