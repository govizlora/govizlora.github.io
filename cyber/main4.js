/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
    audio: false,
    video: {
        facingMode: "environment",
        // Use a big enough resolution to get the native resolution
        width: { ideal: 7680 },
        height: { ideal: 4320 }
    }
};

function handleCanPlay() {
    document.querySelector('video').play();
}
window.handleCanPlay = handleCanPlay;

function handleError(error) {
    if (error.name === 'ConstraintNotSatisfiedError') {
        const v = constraints.video;
        errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
    } else if (error.name === 'PermissionDeniedError') {
        errorMsg('Permissions have not been granted to use your camera and ' +
            'microphone, you need to allow the page access to your devices in ' +
            'order for the demo to work.');
    }
    errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
        console.error(error);
    }
}

async function init(e) {
    navigator.mediaDevices.getUserMedia(
        {
            audio: false,
            video: {
                facingMode: "environment",
                // Use a big enough resolution to get the native resolution
                width: { ideal: 7680 },
                height: { ideal: 4320 }
            }
        }
    ).then(mediaStream => {
        document.querySelector('video').srcObject = mediaStream;
        e.target.disabled = true;
    }).catch(handleError)
}

document.querySelector('#showVideo').addEventListener('click', e => init(e));