require("dotenv").config();

const os = require("os");
const easymidi = require("easymidi");
const colors = require("colors");
const usbDetect = require("usb-detection");
const { Atem } = require('atem-connection');

const atem = new Atem({ externalLog: console.log });

const terminal = require("./terminal");

// variables
var controller = "USB MIDI cable:USB MIDI cable MIDI 2 24:1";
var atemConnected = false;

atem.connect('192.168.6.10');

// functions
function changeProgamInput(input) {
  atem.changeProgramInput(input).then((res) => {
    // console.log(res);
  });
}

function setMidi() {
  var inputs = easymidi.getInputs();
  var outputs = easymidi.getOutputs();

  terminal.info("Inputs found:", inputs);
  terminal.info("Outputs found:", outputs);

  terminal.status("Looking for proper input/output...");

  for (i = 0, input = null; (input = inputs[i++]); ) {
    if (~input.indexOf(controller)) {
      terminal.cheer(`Found matching input "${input}" at index ${i - 1}.`);
      global.input = new easymidi.Input(input);
      break;
    }
  }

  for (i = 0, output = null; (output = outputs[i++]); ) {
    if (~output.indexOf(controller)) {
      terminal.cheer(`Found matching output "${output}" at index ${i - 1}.`);
      global.output = new easymidi.Output(output);
      break;
    }
  }

  if (!global.input) {
    terminal.error(`No controller matching "${controller}" was found.`);
  } else {
    // // Debugging
    // input.on("noteon", (args) => terminal.debug("noteon", args));
    // input.on("poly aftertouch", (args) => terminal.debug("poly aftertouch", args));
    // input.on("cc", (args) => terminal.debug("cc", args));
    // input.on("program", (args) => terminal.debug("program", args));
    // input.on("channel aftertouch", (args) => terminal.debug("channel aftertouch", args));
    // input.on("pitch", (args) => terminal.debug("pitch", args));
    // input.on("position", (args) => terminal.debug("position", args));
    // input.on("mtc", (args) => terminal.debug("mtc", args));
    // input.on("select", (args) => terminal.debug("select", args));
    // input.on("sysex", (args) => terminal.debug("sysex", args));

    // Buttons
    input.on("program", (params) => {
      let input = `${params.number}`.substr(-1);

      switch (input) {
        case "0":
	  changeProgamInput(5);
          //console.log(1);
          break;

        case "1":
	  changeProgamInput(7);
          //console.log(2);
          break;

        case "2":
          changeProgamInput(8);
          //console.log(3);
          break;

        case "3":
	  changeProgamInput(4);
          //console.log(4);
          break;

        case "4":
	  changeProgamInput(6);
          //console.log(5);
          break;

        case "5":
          //console.log(6);
          break;

        case "6":
          //console.log(7);
          break;

        case "7":
          //console.log(8);
          break;

        case "8":
          //console.log(9);
          break;

        case "9":
          //console.log(10);
          break;

        default:
          console.log("program ", params);
      }
    });
  }
  terminal.debug("-------------------------------------");
}

// detect usb changes
usbDetect.startMonitoring();

usbDetect.on("add", function (device) {
  if (device.deviceName === "USB MIDI cable" || device.deviceName === "USB_MIDI_cable") {
    terminal.status(`"${device.deviceName}" was connected.`);
    setMidi();
  }
});

usbDetect.on("remove", function (device) {
  if (device.deviceName === "USB MIDI cable" || device.deviceName === "USB_MIDI_cable") {
    terminal.error(`"${device.deviceName}" was disconnected.`);
    if (global.input) {
      global.input.close();
    }
    if (global.output) {
      global.output.close();
    }
  }
});

// Set midi when starting the code
setMidi();

atem.on('connected', () => {
    atemConnected = true
    terminal.status('ATEM connected!');
});

atem.on("disconnected", () => {
  atemConnected = false;
  terminal.status('ATEM disconnected!')
});
