import Tone from 'tone'
import Multiselect from 'vue-multiselect'
import vueSlider from 'vue-slider-component'
export default {
  name: 'main',
  created () {
    this.init()
  },
  components: {Multiselect, vueSlider},
  data () {
    var notes_choices = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B"
    ];
    var scale_choices = [];
    for (var j = 1; j < 8; j++) {
      var option = {
        "group": "" + j,
      };
      var currentScaleChoices = [];
      for (var i = 0; i < notes_choices.length; i++) {
          var note = notes_choices[i];
          currentScaleChoices.push({
            "name" : note,
            "value" : note + j
          });
      }
      option["notes"] = currentScaleChoices;
      scale_choices.push(option);
    }
    var cycleOptions = [];
    for (var i = 0; i < 22; i++) {
      cycleOptions.push(i+1);
    }
    return {
      msg: 'Welcome to Shruti',
      arohTitle: 'Aroh (Ascending):',
      avrohTitle: 'Avroh (Descending):',
      bpmTitle: 'BPM:',
      randomTitle: 'Random:',
      actualNote: 'Note Placeholder',
      actualVisible: true,
      bpmSelected: 60,
      sliderConfig: {
        min: 0,
        max: 500,
        interval: 20,
        piecewise: true,
        lazy: true
      },
      cycleWidth: 3,
      cycleOptions: cycleOptions,
      arohSelected: [
        {id: 0 , text: 'S',   value: {num: 1,   den: 1  }},
        {id: 3 , text: 'R1',  value: {num: 10 , den: 9  }},
        {id: 7 , text: 'G1',  value: {num: 5  , den: 4  }},
        {id: 9 , text: 'M1',  value: {num: 4  , den: 3  }},
        {id: 13, text: 'P',   value: {num: 3  , den: 2  }},
        {id: 16, text: 'D1',  value: {num: 5  , den: 3  }},
        {id: 20, text: 'N1',  value: {num: 15 , den: 8  }},
        {id: 22, text: 'S\'', value: {num: 2  , den: 1  }}
      ],
      avrohSelected: [
        {id: 22, text: 'S\'', value: {num: 2  , den: 1  }},
        {id: 20, text: 'N1',  value: {num: 15 , den: 8  }},
        {id: 16, text: 'D1',  value: {num: 5  , den: 3  }},
        {id: 13, text: 'P',   value: {num: 3  , den: 2  }},
        {id: 9 , text: 'M1',  value: {num: 4  , den: 3  }},
        {id: 7 , text: 'G1',  value: {num: 5  , den: 4  }},
        {id: 3 , text: 'R1',  value: {num: 10 , den: 9  }},
        {id: 0 , text: 'S',   value: {num: 1,   den: 1  }}
      ],
      scale_selected: {name:"C#", value: "C#4"},
      scale_options: scale_choices,
      notes: [
        {id: 0 , text: 'S',   value: {num: 1,   den: 1  }},
        {id: 1 , text: 'r1',  value: {num: 256, den: 243}},
        {id: 2 , text: 'r2',  value: {num: 16 , den: 15 }},
        {id: 3 , text: 'R1',  value: {num: 10 , den: 9  }},
        {id: 4 , text: 'R2',  value: {num: 9  , den: 8  }},
        {id: 5 , text: 'g1',  value: {num: 32 , den: 27 }},
        {id: 6 , text: 'g2',  value: {num: 6  , den: 5  }},
        {id: 7 , text: 'G1',  value: {num: 5  , den: 4  }},
        {id: 8 , text: 'G2',  value: {num: 81 , den: 64 }},
        {id: 9 , text: 'M1',  value: {num: 4  , den: 3  }},
        {id: 10, text: 'M2',  value: {num: 27 , den: 20 }},
        {id: 11, text: 'm1',  value: {num: 45 , den: 32 }},
        {id: 12, text: 'm2',  value: {num: 729, den: 512}},
        {id: 13, text: 'P',   value: {num: 3  , den: 2  }},
        {id: 14, text: 'd1',  value: {num: 128, den: 81 }},
        {id: 15, text: 'd2',  value: {num: 8  , den: 5  }},
        {id: 16, text: 'D1',  value: {num: 5  , den: 3  }},
        {id: 17, text: 'D2',  value: {num: 27 , den: 16 }},
        {id: 18, text: 'n1',  value: {num: 16 , den: 9  }},
        {id: 19, text: 'n2',  value: {num: 9  , den: 5  }},
        {id: 20, text: 'N1',  value: {num: 15 , den: 8  }},
        {id: 21, text: 'N2',  value: {num: 243, den: 128}},
        {id: 22, text: 'S\'', value: {num: 2  , den: 1  }}
      ]
    }
  },
  methods: {
    init () {
      console.log("Initializing...");
      this.synth = new Tone.Synth().toMaster();
      this.prevRandom = undefined;
    },
    makeSound (fraction) {
      const freq = Tone.Frequency(this.scale_selected.value).toFrequency();
      var playFreq = Tone.Frequency((freq / fraction.den) * fraction.num);
      Tone.Transport.bpm.value = this.bpmSelected;
      this.synth.triggerAttackRelease(playFreq, "4n");
    },
    makeRandomSound () {
      if (!this.actualVisible) {
        if (this.prevRandom !== undefined) {
          this.makeSound(this.prevRandom.value);
          return;
        } 
      }
      this.actualVisible = false;
      var allnotes = this.arohSelected.slice();
      allnotes.push.apply(allnotes,this.avrohSelected);
      var randomNote;
      for (;;) {
         randomNote = allnotes[Math.floor(Math.random()*allnotes.length)];
         if (this.prevRandom === undefined) {
            this.prevRandom = randomNote;
            break;
         }
         if (this.prevRandom.id == randomNote.id) {
            continue;
          }else{
            this.prevRandom = randomNote;
            break;
          }
      }
      this.makeSound(randomNote.value);
      this.actualNote = randomNote;
    },
    revealRandomSound() {
      this.actualVisible = true;
    },
    startPractice(bpm = 120) {
      if (this.loop !== undefined) {
        this.loop.stop();
      }
      Tone.Transport.stop();
      const freq = Tone.Frequency(this.scale_selected.value).toFrequency();

      let note;
      let i;

      var aroh = this.arohSelected.map(function(el){
          var playFreq = Tone.Frequency((freq / el.value.den) * el.value.num);
          return playFreq;
      });

      var sequence = aroh.slice();

      var avroh = this.avrohSelected.map(function(el){
          var playFreq = Tone.Frequency((freq / el.value.den) * el.value.num);
          return playFreq;
      });

      sequence.push.apply(sequence,avroh);

      console.log("starting");
      Tone.Transport.bpm.value = bpm;
      Tone.Transport.start();

      var _this = this;
      this.loop = new Tone.Sequence(function(time, note) {
          _this.synth.triggerAttackRelease(note, "4n");
      }, sequence, "4n").start(0);

    },
    stopPractice() {
      this.loop.stop();
      Tone.Transport.stop();
    },
    startCyclePractice(cycleWidth = 4, bpm = 120) {
      if (cycleWidth > this.arohSelected.size  ||
          cycleWidth > this.avrohSelected.size ) {
        return undefined;
      }

      if (this.loop !== undefined) {
        this.loop.stop();
      }

      Tone.Transport.stop();
      const freq = Tone.Frequency(this.scale_selected.value).toFrequency();

      let note;
      let i;
      var aroh = this.arohSelected.map(function(el){
          var playFreq = Tone.Frequency((freq / el.value.den) * el.value.num);
          return playFreq;
      });

      var sequence = [];

      for (let i = 0; i < aroh.length; i++) {
        if(i + cycleWidth > aroh.length){
          break;
        }

        for (let k = 0; k < cycleWidth + 1; k++) {
          for (let j = 0; j < cycleWidth; j++) {
            let index = i + ((j + k) % (cycleWidth));
            sequence.push(aroh[index]);
          }
        }

      }

      var avroh = this.avrohSelected.map(function(el){
          var playFreq = Tone.Frequency((freq / el.value.den) * el.value.num);
          return playFreq;
      });
      for (let i = 0; i < avroh.length; i++) {
          if(i + cycleWidth > avroh.length){
            break;
          }

          for (let k = 0; k < cycleWidth + 1; k++) {
            for (let j = 0; j < cycleWidth; j++) {
              let index = i + ((j + k) % (cycleWidth));
              sequence.push(avroh[index]);
            }
          }
      }
   
      Tone.Transport.bpm.value = bpm;
      Tone.Transport.start();

      var _this = this;
      this.loop = new Tone.Sequence(function(time, note) {
          _this.synth.triggerAttackRelease(note, "4n");
      }, sequence, "4n").start(0);
    },
    updateBpm(value) {
      if (value == 0) return;
      Tone.Transport.bpm.value = value;
    }
  }
}
