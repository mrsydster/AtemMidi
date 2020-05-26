const easymidi = require('easymidi');
const colors = require('colors');
const Obs = require('obs-websocket-js');

const terminal = require('./terminal');

var controller = 'MIDIIN2 (USB MIDI cable) 1';
var controllerOutput = 'MIDIOUT2 (USB MIDI cable) 2';

var inputs = easymidi.getInputs();
var outputs = easymidi.getOutputs();

const obs = new Obs();

obs.connect({ address: `127.0.0.1:4444`, password: `banana` })
    .then(() => {
        terminal.info('OBS:', 'connected');
    }).catch(err => {
        terminal.error(`OBS:`, err.error);
    });

terminal.info('Inputs found:', inputs);
terminal.info('Outputs found:', outputs);

terminal.status('Looking for proper input/output...');

for (i = 0, input = null; input = inputs[i++];) {
    if (~input.indexOf(controller)) {
        terminal.cheer(`Found matching input "${input}" at index ${i - 1}.`);
        global.input = new easymidi.Input(input);
        break;
    }
}

for (i = 0, output = null; output = outputs[i++];) {
    if (~output.indexOf(controllerOutput)) {
        terminal.cheer(`Found matching output "${output}" at index ${i - 1}.`);
        global.output = new easymidi.Output(output);
        break;
    }
}

if (!global.input) {
    terminal.error(`No controller matching "${controller}" was found. Quitting...`);
    process.exit();
}

// input.on('noteon', args => terminal.debug('noteon', args));
// input.on('poly aftertouch', args => terminal.debug('poly aftertouch', args));
// input.on('cc', args => terminal.debug('cc', args));
// input.on('program', args => terminal.debug('program', args));
// input.on('channel aftertouch', args => terminal.debug('channel aftertouch', args));
// input.on('pitch', args => terminal.debug('pitch', args));
// input.on('position', args => terminal.debug('position', args));
// input.on('mtc', args => terminal.debug('mtc', args));
// input.on('select', args => terminal.debug('select', args));
// input.on('sysex', args => terminal.debug('sysex', args));

// Knobs
input.on('program', (params) => {

    let input = `${params.number}`.substr(-1);

    switch (input) {

        case '0':
            obs.send('SetCurrentScene', { 'scene-name': `1.` })
                .catch(err => {
                    console.error(`OBS:`, err);
                });
            break;

        case '1':

            obs.send('SetCurrentScene', { 'scene-name': `2.` })
                .catch(err => {
                    console.error(`OBS:`, err);
                });
            break;

        case '2':

            obs.send('SetCurrentScene', { 'scene-name': `3.` })
                .catch(err => {
                    console.error(`OBS:`, err);
                });
            break;

        case '3':

            obs.send('SetCurrentScene', { 'scene-name': `4.` })
                .catch(err => {
                    console.error(`OBS:`, err);
                });
            break;

        case '4':

            obs.send('SetCurrentScene', { 'scene-name': `5.` })
                .catch(err => {
                    console.error(`OBS:`, err);
                });
            break;

        case '5':

            obs.send('SetCurrentScene', { 'scene-name': `6.` })
                .catch(err => {
                    console.error(`OBS:`, err);
                });
            break;

        case '6':

            obs.send('SetCurrentScene', { 'scene-name': `7.` })
                .catch(err => {
                    console.error(`OBS:`, err);
                });
            break;

        case '7':

            obs.send('SetCurrentScene', { 'scene-name': `8.` })
                .catch(err => {
                    console.error(`OBS:`, err);
                });
            break;

        case '8':

            obs.send('SetCurrentScene', { 'scene-name': `9.` })
                .catch(err => {
                    console.error(`OBS:`, err);
                });
            break;

        case '9':

            obs.send('SetCurrentScene', { 'scene-name': `10.` })
                .catch(err => {
                    console.error(`OBS:`, err);
                });
            break;

        default:
            console.log('program ', params);
    }
});