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
    <div>
      <h2> {{randomTitle}} </h2>
      <a class="unselectable"
         @click="makeRandomSound"
         @keyup.enter="makeRandomSound">
         Make Random Sound
      </a>
      <a class="unselectable"
         @click="revealRandomSound"
         @keyup.enter="revealRandomSound">
         Reveal
      </a>
      <h3 v-if="actualVisible"
         class="unselectable"
         @click="makeSound(actualNote.value)"
         @keyup.enter="makeSound(actualNote.value)">
         {{actualNote.text}}
      </h3>
      <h3 v-else="actualVisible"
         class="unselectable"
         >
         &nbsp;
      </h3>
    </div>
    </div>
    </div>
  </div>
</template>

<script src="./Front.js"></script>

<style lang="scss" src="./Front.scss"></style>
