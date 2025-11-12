// Copyright (c) 2012 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview Provider-side JS API for ECHO.
 *
 * This javascript must be included on the provider page. A call to
 * echo.checkEligibility will trigger the ECHO flow on the Chrome OS client.
 *
 * The provider API supports two different implementations - one based on web
 * intents (for Chrome OS client R23 and earlier) and the other relying on
 * iframing an ECHO extension resource to talk to it.
 */
var echo = (function() {
/**
 * Name of the cookie that will be used for verifying the origin information
 * on the requesting domain. Its value must be set to the request nonce passed
 * as part of the checkEligibility() call.
 */
const ORIGIN_VERIFICATION_COOKIE = 'echo.ORIGIN_VERIFICATION_COOKIE';

/**
 * Intent service URL for the web intents implementation.
 */
const INTENT_EXTENSION_SERVICE = 'chrome-extension://dfgpjpjbeeflfdhdpabeeeheghdmeigc/main.html';

/**
 * The extension ID for the ECHO extension.
 */
const ECHO_EXTENSION_ID = 'kddnkjkcjddckihglkfcickdhbmaodcn';

/**
 * Returns the appropriate intent object creation method.
 *
 * This differs with the Chrome version.
 */
function getIntent() {
  return window.Intent || window.WebKitIntent;
};

/**
 * Returns the appropriate intent raising  method.
 *
 * This differs with the Chrome version.
 */
function getStartActivity() {
  return window.navigator.startActivity ||
      window.navigator.webkitStartActivity;
};

/**
 * Returns whether web intents support is detected.
 */
function isWebIntentsSupported() {
  return getIntent() && getStartActivity();
};

/**
 * Triggers the ECHO protocol flow on the client.
 *
 * successCallback indicates that we received a valid eligibility request and
 * will include the response as a parameter. failureCallback is called in
 * all failures cases - not eligibile, non chrome os device, or error. The
 * result code is included as a parameter to the callback.
 *
 * @param {object} requestParams Request parameters.
 * @param {string} requestParams.origin  Origin/Domain of the requester.
 * @param {string} requestParams.serviceId  Pre-assigned string identify the
 *     provider service.
 * @param {string} requestParams.serviceName  Pre-assigned friendly service
 *     name.
 * @param {string} requestParams.requestNonce  Random nonce string.
 * @param {function(*)} requestParams.successCallback Invoked on a positive
 *     response.
 * @param {function(*)} requestParams.failureCallback Invoked on a negative
 *     response.
 * @param {string} requestParams.opt_otc One-time Code to use instead of
 *     registration code.
 * @param {boolean} requestParams.opt_isGroupType Whether it is a group
 *     eligibility check.
 * @param {boolean} requestParams.opt_debugMode Whether client must run
 *     in debug mode.
 */
function checkEligibility(requestParams) {
  // We check this first as other errors can be returned by
  // calling the failure callback.
  if (!requestParams.failureCallback ||
      typeof requestParams.failureCallback != 'function') {
    throw 'Error: No failure callback specified.';
  }
  if (!requestParams.origin || typeof requestParams.origin != 'string' ||
      !requestParams.serviceId ||
      typeof requestParams.serviceId != 'string' ||
      !requestParams.serviceName ||
      typeof requestParams.serviceName != 'string' ||
      !requestParams.requestNonce ||
      typeof requestParams.requestNonce != 'string' ||
      !requestParams.successCallback ||
      typeof requestParams.successCallback != 'function') {
    console.error('Invalid arguments to checkEligibility.');
    requestParams.failureCallback('INVALID');
  }

  var requestData = {
    origin: requestParams.origin,
    serviceId: requestParams.serviceId,
    serviceName: requestParams.serviceName,
    requestNonce: requestParams.requestNonce,
    otcCode: requestParams.opt_otc,
    isGroupType: requestParams.opt_isGroupType,
    isDebugMode: requestParams.opt_debugMode
  };

  if (isWebIntentsSupported()) {
    checkEligibilityIntents(requestData, requestParams.successCallback,
                            requestParams.failureCallback);
  } else {
    var onMissingRuntimeExtension = function() {
      console.warn('Neither runtime implementation nor web intents support ' +
          'was detected.');
      requestParams.failureCallback();
    };
    checkEligibilityRuntime(requestData, requestParams.successCallback,
                            requestParams.failureCallback,
                            onMissingRuntimeExtension);
  }
};

/**
 * checkEligibility implementation based on web intents.
 *
 * @param {object} requestData Request parameters.
 * @param {function(*)} successCallback Invoked on a positive response.
 * @param {function(*)} failureCallback Invoked on a negative response.
 */
function checkEligibilityIntents(requestData, successCallback,
                                  failureCallback) {
  console.info('Using web intents based implementation');
  var WebIntent = getIntent();
  var startActivity = getStartActivity();

  if (!WebIntent || !startActivity) {
    console.warn('No web intent support detected.');
    failureCallback(null);
  }

  var intent = new WebIntent({action: 'https://crosecho.com/startEcho',
                              type: 'application/vnd.chromeos.echo',
                              data: requestData,
                              service: INTENT_EXTENSION_SERVICE});
  startActivity.call(window.navigator, intent,
                      successCallback,
                      failureCallback);
};

/**
 * checkEligibility implementation based on iframed extension resource.
 *
 * @param {object} requestData Request parameters.
 * @param {function(*)} successCallback Invoked on a positive response.
 * @param {function(*)} failureCallback Invoked on a negative response.
 * @param {function(*)} missingExtensionCallback Invoked if extension is
 *                                               unavailable.
 */
function checkEligibilityRuntime(requestData, successCallback,
                                failureCallback, missingExtensionCallback) {
  chrome.runtime.sendMessage(
    ECHO_EXTENSION_ID,
    {
      cmd: 'checkEligibility',
      data: requestData,
    },
    function(response) {
        if (response) {
          successCallback(response);
        } else {
          failureCallback(response);
        }
    },
);
};

return {
  checkEligibility: function(requestParams) {
    return checkEligibility(requestParams);
  },
  ORIGIN_VERIFICATION_COOKIE: ORIGIN_VERIFICATION_COOKIE
};

})();
