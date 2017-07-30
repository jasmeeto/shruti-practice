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
      notes: [
        {id: 0 , text: 'C',   value:'C4'},
        {id: 1 , text: 'C#',  value:'C#4'},
        {id: 2 , text: 'D',   value:'D4'},
        {id: 3 , text: 'D#',  value:'D#4'},
        {id: 4 , text: 'E',   value:'E4'},
        {id: 5 , text: 'F',   value:'F4'},
        {id: 6 , text: 'F#',  value:'F#4'},
        {id: 7 , text: 'G',   value:'G4'},
        {id: 8 , text: 'G#',  value:'G#4'},
        {id: 9 , text: 'A',   value:'A4'},
        {id: 10, text: 'A#',  value:'A#4'},
        {id: 11, text: 'B',   value:'B4'},
        {id: 12, text: 'C\'', value:'C5'},
        
      ]
    }
  },
  methods: {
    init () {
      console.log("Initializing");
      this.synth = new Tone.Synth().toMaster();
    },
    makeSound (note) {
      this.synth.triggerAttackRelease(note, "8n");
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
