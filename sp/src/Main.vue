<template>
    <view>
        <web-view
            ref="myWebView"
            :source="require('./pagewithtone.html')"
            :style="{ marginTop: 20}"
            :origin-white-list="['*']"
            :on-message="onWebViewMessage"
        />
    </view>
</template>

<script>
import NoteSelector from "./NoteSelector.vue"
export default {
  name: 'Main',
  components: {NoteSelector},
  created(){
      this.init()
  },
  mounted() {
      console.log("mounted");
      this.webView = this.$refs.myWebView;
  },
  methods: {
      init() {
          console.log("created");
      },
      initTone(msgData) {
          console.log(msgData);
          msgData = {
              name: "playTone",
              args: ["C#4"]
          }
          this.webView.postMessage(JSON.stringify(msgData));
          return "C#4";
      },
      onWebViewMessage(event) {
           // post back reply as soon as possible to enable sending the next message
           this.webView.postMessage(event.nativeEvent.data);
 
           let msgData;
           try {
               msgData = JSON.parse(event.nativeEvent.data);
           }
           catch(err) {
               console.warn(err);
               return;
           }
 
           // invoke target function
           const response = this[msgData.targetFunc].apply(this, [msgData]);
           // trigger success callback
           msgData.isSuccessful = true;
           msgData.args = [response];
           console.log(msgData)
           this.webView.postMessage(JSON.stringify(msgData))
      }
  }
}
</script> 
