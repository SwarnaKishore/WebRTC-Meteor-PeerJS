if (Meteor.isClient) {  
  Template.hello.onCreated(function () {
      // Create a Peer instance
      window.peer = new Peer({
      key: 'vw9xr26goox8yqfr',  // get a free key at http://peerjs.com/peerserver
      debug: 3,
      config: {'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
        { url: 'stun:stun1.l.google.com:19302' },
      ]}
    });

    // Handle event: upon opening our connection to the PeerJS server
    peer.on('open', function () {
      $('#myPeerId').text(peer.id);
    });

    // Handle event: remote peer receives a call
    peer.on('call', function (incomingCall) {
      window.currentCall = incomingCall;
      incomingCall.answer(window.localStream);
      incomingCall.on('stream', function (remoteStream) {
        window.remoteStream = remoteStream;
        var video = document.getElementById("theirVideo")
        video.src = URL.createObjectURL(remoteStream);
      });
    });
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
