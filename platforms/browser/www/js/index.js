/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        document.getElementById('openBrowser').click();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();



document.getElementById("openBrowser").addEventListener("click", openBrowser);

document.addEventListener("offline", onOffline, false);

function onOffline() {
    // alert('onOffline');
    testShareSheet();
}

function openBrowser() {
   var url = 'https://dusthqdenevents.frb.io/';
   var target = '_self';
   var options = "location=no,toolbar=no"
   var ref = cordova.InAppBrowser.open(url, target, options);

   ref.addEventListener('loadstart', loadstartCallback);
   ref.addEventListener('loadstop', loadstopCallback);
   ref.addEventListener('loadloaderror', loaderrorCallback);
   ref.addEventListener('exit', exitCallback);

   function loadstartCallback(event) {
     window.plugins.spinnerDialog.show();
   }

   function loadstopCallback(event) {
      window.plugins.spinnerDialog.hide();
   }

   function loaderrorCallback(error) {
      testShareSheet();
   }

   function exitCallback() {
      console.log('Browser is closed...')
   }
}


var callback = function(buttonIndex) {
    setTimeout(function() {
      document.getElementById('openBrowser').click();
    });
  };
  function testShareSheet() {
    var options = {
      androidTheme : window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // material
      title: 'Network error! Please check your Internet connection',
      buttonLabels: ['Reload'],
      addCancelButtonWithLabel: 'Cancel',
      androidEnableCancelButton : true,
      winphoneEnableCancelButton : true,
      iosEnableCancelButton : true,
      destructiveButtonLast: true // you can choose where the destructive button is shown
    };
    window.plugins.actionsheet.show(options, callback);
  }
