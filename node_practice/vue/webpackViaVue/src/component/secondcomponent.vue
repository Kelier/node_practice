<template>
  <div id="secondcomponent">
    <h1>i am a another page</h1>
    <a>written by {{author}}</a>
    <p>感谢<a href="https://github.com/showonme">showonme</a>大神的技术指导</p>

  </div>
</template>

<script>
  export default{
    data(){
      return {
        author:'alibaba',
        articles:[],
      }
    }
  }
</script>

<style></style>
