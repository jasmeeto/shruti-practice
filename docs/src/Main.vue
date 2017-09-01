<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <multiselect v-model="scale_selected"
                 :options="scale_options"
                 :multiple="false"
                 group-values="notes"
                 group-label="group"
                 track-by="value"
                 label="name"
                 :close-on-select="true"></multiselect>
    <div v-for="note in notes">
      <a class="unselectable" @click="makeSound(note.value)" @keyup.enter="makeSound(note.value)" :tabindex="note.id+1">{{ note.text }}</a>
    </div >
    <div> 
      <a class="unselectable" @click="stopPractice">Stop Practice</a>
    </div>
    <div> 
      <a class="unselectable" @click="startPractice(bpmSelected)">Start Practice</a>
    </div>
    <div> 
      <a class="unselectable" @click="startCyclePractice(cycleWidth, bpmSelected)">Start Cycle Practice</a>
      <multiselect v-model="cycleWidth" :options="cycleOptions" :multiple="false"></multiselect>
    </div>
    <div>
      <h2> {{arohTitle}} </h2>
      <multiselect v-model="arohSelected"
                   :options="notes"
                   :multiple="true"
                   track-by="id"
                   label="text"
                   ></multiselect>
    </div>
    <div>
      <h2> {{avrohTitle}} </h2>
      <multiselect v-model="avrohSelected"
                   :options="notes"
                   :multiple="true"
                   track-by="id"
                   label="text"
                   ></multiselect>
    </div>
    <div>
      <h2> {{bpmTitle}} </h2>
      <vue-slider ref="slider"
                  v-model="bpmSelected"
                  v-bind="sliderConfig"
                  @callback="updateBpm"
                  ></vue-slider>
    </div>
      
    </div>
    </div>
  </div>
</template>

<script>
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
      arohTitle: 'Aroh:',
      avrohTitle: 'Avroh:',
      bpmTitle: 'BPM:',
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
    },
    makeSound (fraction) {
      const freq = Tone.Frequency(this.scale_selected.value).toFrequency();
      var playFreq = Tone.Frequency((freq / fraction.den) * fraction.num)
      Tone.Transport.bpm.value = 120;
      this.synth.triggerAttackRelease(playFreq, "4n");
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
</script>

<style lang="scss">
$primary-color: hotpink;
$secondary-color: deeppink;
$tertiary-color: red;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
}

.unselectable {
   -moz-user-select: -moz-none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   -ms-user-select: none;
   user-select: none;
}

$a-tags: 'a, a:active, a:hover, a:visited';
$a-hover: 'a:active, a:hover';
#{$a-tags} {
  color: $primary-color;
  text-decoration: underline;
  padding: 7px;
  display:block;
}

#{$a-hover} {
  color: $secondary-color;
}

// MULTISELECT
.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 3rem;
  height: 2.1875rem;
  background: white;
  display: block;
}
.multiselect__spinner:before, .multiselect__spinner:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: 0.875rem 0 0 0.875rem;
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  border-color: $primary-color transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}
.multiselect__spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}
.multiselect__spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}

.multiselect__loading-transition {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}

.multiselect__loading-enter,
.multiselect__loading-leave {
  opacity: 0;
}

.multiselect,
.multiselect__input,
.multiselect__single {
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: lighter;
}

.multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  min-height: 2.5rem;
  text-align: left;
  color: #35495e;
}
.multiselect * {
  box-sizing: border-box;
}
.multiselect:focus {
  outline: none;
}
.multiselect--active {
  z-index: 50;
}
.multiselect--active .multiselect__current,
.multiselect--active .multiselect__input,
.multiselect--active .multiselect__tags {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.multiselect--active .multiselect__select {
  transform: rotateZ(180deg);
}

.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 1.25rem;
  line-height: 1.25rem;
  border: none;
  border-radius: 0.3125rem;
  background: white;
  padding: 1px 0 0 0.3125rem;
  width: auto;
  transition: border 0.1s ease;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
}
.multiselect__input:hover,
.multiselect__single:hover {
  border-color: #cfcfcf;
}
.multiselect__input:focus,
.multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}

.multiselect__single {
  padding-left: 0.375rem;
  margin-bottom: 0.5rem;
}

.multiselect__tags {
  min-height: 2.5rem;
  display: block;
  padding: 0.5rem 2.5rem 0 0.5rem;
  border-radius: 0.3125rem;
  border: 1px solid #e8e8e8;
  background: white;
}

.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 0.25rem 1.625rem 0.25rem 0.625rem;
  border-radius: 0.3125rem;
  margin-right: 0.625rem;
  color: white;
  line-height: 1;
  background: #41b883;
  margin-bottom: 0.5rem;
}

.multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 1.375rem;
  text-align: center;
  line-height: 1.375rem;
  transition: all 0.2s ease;
  border-radius: 0.3125rem;
}
.multiselect__tag-icon:after {
  content: "\00D7";
  color: $secondary-color;
  font-size: 0.875rem;
}
.multiselect__tag-icon:focus, .multiselect__tag-icon:hover {
  background: $primary-color;
}
.multiselect__tag-icon:focus:after, .multiselect__tag-icon:hover:after {
  color: white;
}

.multiselect__current {
  line-height: 1rem;
  min-height: 2.5rem;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 0.5rem 0.75rem 0;
  padding-right: 1.875rem;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 0.3125rem;
  border: 1px solid #e8e8e8;
  cursor: pointer;
}

.multiselect__select {
  line-height: 1rem;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 2.5rem;
  height: 2.375rem;
  right: 1px;
  top: 1px;
  padding: 0.25rem 0.5rem;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.multiselect__select:before {
  position: relative;
  right: 0;
  top: 65%;
  color: #999999;
  margin-top: 0.25rem;
  border-style: solid;
  border-width: 0.3125rem 0.3125rem 0 0.3125rem;
  border-color: #999999 transparent transparent transparent;
  content: "";
}

.multiselect__placeholder {
  color: #adadad;
  display: inline-block;
  margin-bottom: 0.625rem;
  padding-top: 0.125rem;
}
.multiselect--active .multiselect__placeholder {
  display: none;
}

.multiselect__content {
  position: absolute;
  list-style: none;
  display: block;
  background: white;
  width: 100%;
  max-height: 15rem;
  overflow: auto;
  padding: 0;
  margin: 0;
  border: 1px solid #e8e8e8;
  border-top: none;
  border-bottom-left-radius: 0.3125rem;
  border-bottom-right-radius: 0.3125rem;
  z-index: 50;
}
.multiselect__content::webkit-scrollbar {
  display: none;
}

.multiselect__option {
  display: block;
  padding: 0.75rem;
  min-height: 2.5rem;
  line-height: 1rem;
  font-weight: 300;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
}
.multiselect__option:after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 2.5rem;
  padding-right: 0.75rem;
  padding-left: 1.25rem;
}
.multiselect__option--highlight {
  background: $primary-color;
  outline: none;
  color: white;
}
.multiselect__option--highlight:after {
  content: attr(data-select);
  color: white;
}
.multiselect__option--selected {
  background: #f3f3f3;
  color: #35495e;
  font-weight: bold;
}
.multiselect__option--selected:after {
  content: attr(data-selected);
  font-weight: 300;
  color: silver;
}

.multiselect__option--selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: white;
  font-weight: lighter;
}
.multiselect__option--selected.multiselect__option--highlight:after {
  content: attr(data-deselect);
  color: white;
}

.multiselect--disabled {
  background: #ededed;
  pointer-events: none;
}
.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  background: #ededed;
  color: #a6a6a6;
}

.multiselect__option--disabled {
  background: #ededed;
  color: #a6a6a6;
  cursor: text;
  pointer-events: none;
}
.multiselect__option--disabled:visited {
  color: #a6a6a6;
}
.multiselect__option--disabled:hover, .multiselect__option--disabled:focus {
  background: #3dad7b;
}

.multiselect-transition {
  transition: all 0.3s ease;
}

.multiselect-enter, .multiselect-leave {
  opacity: 0;
  max-height: 0 !important;
}
</style>
