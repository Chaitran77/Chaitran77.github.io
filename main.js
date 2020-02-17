document.onclick = function() {
   var audioCtx = new AudioContext();
   var analyser = audioCtx.createAnalyser();


   navigator.mediaDevices.getUserMedia({audio:true}).then(stream => {handlerFunction(stream)})


   function handlerFunction(stream) {
       rec = new MediaRecorder(stream);
       source = audioCtx.createMediaStreamSource(stream);

       source.connect(analyser);
       analyser.connect(audioCtx.destination);
       analyser.fftSize = 128;
   }

   var canvas = document.getElementById('canvas');
   var c = canvas.getContext('2d');

   canvas.width = innerWidth;
   canvas.height = innerHeight;

   c.lineWidth = 10;
   c.lineCap = "round";
   var padding = 5;

   let frequencyData = new Uint8Array(analyser.frequencyBinCount);

   function renderFrame() {
       analyser.getByteFrequencyData(frequencyData);
       c.fillStyle = "white";
       c.fillRect(0, 0, canvas.width, canvas.height);
       for (var i = 0; i < frequencyData.length; i++) {
var loudnessGradient = c.createLinearGradient(0, 0, 0, 500);
   /*loudnessGradient.addColorStop(0.5, "lime");
   loudnessGradient.addColorStop(0.75, "orange");
   loudnessGradient.addColorStop(1, "red");*/

      loudnessGradient.addColorStop(0.000, 'rgba(255, 0, 0, 1.000)');
      loudnessGradient.addColorStop(0.200, 'rgba(255, 165, 0, 1.000)');
      loudnessGradient.addColorStop(0.300, 'rgba(255, 165, 0, 1.000)');
      loudnessGradient.addColorStop(0.500, 'rgba(0, 255, 0, 1.000)');
      loudnessGradient.addColorStop(0.700, 'rgba(255, 165, 0, 1.000)');
      loudnessGradient.addColorStop(0.800, 'rgba(255, 165, 0, 1.000)');
      loudnessGradient.addColorStop(1.000, 'rgba(255, 0, 0, 1.000)');

   c.strokeStyle = loudnessGradient;
           c.beginPath();
           c.moveTo((i*padding) + (i*10) + 10, canvas.height/2-((frequencyData[i])/2));
           c.lineTo((i*padding) + (i*10) + 10, canvas.height/2+((frequencyData[i])/2));
           c.stroke();
       }
       /*P10.style.height = ((frequencyData[0] * 100) / 256) + "%";
       P20.style.height = ((frequencyData[1] * 100) / 256) + "%";
       P30.style.height = ((frequencyData[2] * 100) / 256) + "%";
       P40.style.height = ((frequencyData[3] * 100) / 256) + "%";
       P50.style.height = ((frequencyData[4] * 100) / 256) + "%";
       P60.style.height = ((frequencyData[5] * 100) / 256) + "%";
       P70.style.height = ((frequencyData[6] * 100) / 256) + "%";
       P80.style.height = ((frequencyData[7] * 100) / 256) + "%";
       P90.style.height = ((frequencyData[8] * 100) / 256) + "%";

       P11.style.height = ((frequencyData[9] * 100) / 256) + "%";
       P21.style.height = ((frequencyData[10] * 100) / 256) + "%";
       P31.style.height = ((frequencyData[11] * 100) / 256) + "%";
       P41.style.height = ((frequencyData[12] * 100) / 256) + "%";
       P51.style.height = ((frequencyData[13] * 100) / 256) + "%";
       P61.style.height = ((frequencyData[14] * 100) / 256) + "%";
       P71.style.height = ((frequencyData[15] * 100) / 256) + "%";*/
       requestAnimationFrame(renderFrame);
   }

   audio.pause();
   audio.play();
   renderFrame();
}
