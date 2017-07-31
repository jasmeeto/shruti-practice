<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div v-for="note in notes">
      <a @click="makeSound(note.value)" tabindex="note.id">{{ note.text }}</a>
    </div >
  </div>
</template>

<script>
import Tone from 'tone'

export default {
  name: 'main',
  created () {
    this.init()
  },
  data () {
    return {
      msg: 'Welcome to Shruti',
      base_note: "C#4",
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
      const freq = Tone.Frequency(this.base_note).toFrequency();
      var playFreq = Tone.Frequency((freq / fraction.den) * fraction.num)
      this.synth.triggerAttackRelease(playFreq, "6n");
    }
  }
}
</script>

<style lang="scss">
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
  display: inline-block;
  margin: 0 10px;
}

$a-tags: 'a, a:active, a:hover, a:visited';
$a-hover: 'a:active, a:hover';
#{$a-tags} {
  color: hotpink;
  text-decoration: underline;
}
#{$a-hover} {
  color: deeppink
}
</style>
