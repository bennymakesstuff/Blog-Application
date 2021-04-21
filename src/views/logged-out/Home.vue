<template>
  <div class="feed">
    <div class="" v-if="!anyArticles&&!firstLoad">
      <h2>No articles have been written yet. :-(</h2>
    </div>


        <div class="placehodler-articles" v-if="!anyArticles&&firstLoad">
          <div v-for="number in 2" :class="['article-placeholder',theme]">
            <div class="tags">
              <div class="tag placeholder-content"></div>
              <div class="tag placeholder-content"></div>
            </div>
            <div class="title placeholder-content"></div>
            <div class="creators">
              <div class="creator placeholder-content">
                <div class="user-image"></div>
                <div class="user-name"></div>
              </div>
              <div class="creator placeholder-content">
                <div class="user-image"></div>
                <div class="user-name"></div>
              </div>
            </div>
            <div class="content placeholder-content"></div>
          </div>
        </div>


<!--
    <div class="" v-if="anyArticles">
      <div v-for="(article, index) in articles2" :class="['article', theme]" :key="articles._id">
        <div class="tags">
          <div v-for="(tag, tagIndex) in article.tags" class="tag" @click="showArticlesByTag(tag._id)">{{tag.title}}</div>
        </div>
        <div class="title">{{article.title}}</div>
        <div class="creators">
          <div v-for="(author, creatorIndex) in article.authors" class="creator" @click="showArticlesByAuthor(author._id)">
            <div class="user-image"></div>
            <div class="user-name">{{author.username}}</div>
          </div>
        </div>
        <div class="content" v-html="article.content"></div>
      </div>
    </div>
-->

    <div class="" v-if="anyArticles">
      <div v-for="(article, index) in articles" :class="['article', theme]" :key="articles._id">
        <div v-if="article.img!=null&&article.displayImage!=false" class="hero-image"></div>
        <div class="tags">
          <div v-for="(tag, tagIndex) in article.tags" class="tag" @click="showArticlesByTag(tag._id)">{{tag.title}}</div>
        </div>
        <!--<a :href="internalLink" class="title">{{article.title}}</a>-->
        <!--<a :href="internalLink" class="title"><div class="title" @click="goToArticle">{{article.title}}</div></a>-->
        <router-link :to="internalLink(article.link)"><div class="title">{{article.title}}</div></router-link>
        <div class="creators">
          <div v-for="(author, creatorIndex) in article.authors" class="creator" @click="showArticlesByAuthor(author._id)">
            <div class="user-image"></div>
            <div class="user-name">{{author.username}}</div>
          </div>
        </div>
        <div class="content" v-html="article.content"></div>
      </div>
    </div>

  </div>
</template>

<script>


export default {
  name: 'home',
  data: function(){
    return {
      articles: [],
      articles2: [{
        title: 'Some Article'
      }],
      firstLoad: true,
      deliverResponse: null
    }
  },
  mounted(){
    this.getVersion();
    this.getArticles();
  },
  computed: {
    anyArticles: function(){
      return (this.articles.length>0) ? true:false;
    },
    theme: function(){
      return this.$store.getters.theme;
    }
  },
  methods: {
    internalLink: function(data){
      return 'article/'+data;
    },
    goToArticle: function(data){

    },
    toHTML: function(data){
      let el = document.createElement('div');
      el.innerHTML = data;
      //let parser = new DOMParser();
      //let html = parser.parseFromString(data, 'text/html');
      console.log(el);
      return el;
    },
    getVersion: function(){
      this.$API.get('version')
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showArticlesByTag: function(tagId){
      this.firstLoad = true;
      this.articles = [];
      this.$API.get('articles-by-tag/'+tagId)
        .then((response) => {
          console.log(response);
          if(response[0]==true){
            this.saveResults(response[1]);
          }
          else{
            this.articles = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showArticlesByAuthor: function(authorId){
      this.firstLoad = true;
      this.articles = [];
      this.$API.get('articles-by-author/'+authorId)
        .then((response) => {
          console.log(response);
          if(response[0]==true){
            this.saveResults(response[1]);
          }
          else{
            this.articles = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getArticles: function(){
      this.firstLoad = true;
      this.articles = [];
      this.$API.get('articles')
        .then((response) => {
          console.log(response);
          if(response[0]==true){
            this.saveResults(response[1]);
          }
          else{
            this.articles = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveResults: function(data){
      this.articles = data;
      this.firstLoad = false;
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/main.scss';

  h1 {font-size: 2rem;}
  h2 {font-size: 1.5rem;}

  @keyframes slide-up {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

  .placehodler-articles {width: 900px;}


  .feed {max-width: 900px;
        width: auto;
        min-height: 100vh;
        margin-left: auto;
        margin-right: auto;
        }

  .article.dark {border: 1px solid lighten($dark_main_background, 1%);
                background: darken($dark_main_background, 3%);
                box-shadow: 1px 1px 2px 3px darken($dark_main_background, 2%);
                > a {
                  > .title {color: lighten($dark_main_text, 10%);}
                }
                > .content {color: lighten($dark_main_text, 10%);}
                > .tags {
                  > .tag {box-shadow: 1px 1px 2px 3px darken($dark_main_background, 2%);}
                }
                > .creators {
                  > .creator {color: #dedede;}
                }
              }

  .article {border: 1px solid #ffffff;
            margin: 1rem;
            font-weight: 100;
            padding: 0.5rem;
            box-shadow: 0px 0px 2px 1px rgb(98, 103, 103, 9%);

            > .hero-image {width: 100%;
                          padding-bottom: 56.25%; // 16:9 Aspect Ratio
                          padding-bottom: 32.14%; // 28:9 Aspect Ratio
                          background-color: #b0b0b0;
                          }

            > .tags {padding: 0.5rem 0.5rem 0 0.5rem;
                    width: 100%;
                    position: relative;

                  > .tag {padding: 0.25rem 0.5rem;
                        font-size: 0.7rem;
                        width: auto;
                        background-color: #3d8f94;
                        color: #ffffff;
                        position: relative;
                        margin: 0 0.25rem;
                        line-height: 0.9rem;
                        height:  0.8rem;
                        display: inline-block;
                        box-shadow: 1px 1px 1px 1px lighten($dark_main_background, 90%);
                        border-radius: 0.15rem;
                        transition: background-color linear 150ms;
                        cursor: pointer;
                        }

                    > .tag:hover {background-color: #4dadb3;}
                    }

            > a {
              > .title {padding: 0.75rem;
                        font-size: 1.9rem;
                        font-weight: 500;
                        letter-spacing: 0.05rem;}
                    }

            > .creators {padding: 0rem 0.5rem 0 0.5rem;
                    width: 100%;
                    position: relative;

                  .creator {padding: 0.25rem 0.5rem;
                        font-size: 0.7rem;
                        width: auto;
                        background-color: transparent;
                        color: #1d2326;
                        position: relative;
                        margin: 0 0.25rem;
                        display: inline-block;
                        font-weight: 300;
                        letter-spacing: 0.075rem;
                        cursor: pointer;

                        .user-image {height: 1.5rem;
                              width: 1.5rem;
                              background-color: #333333;
                              margin-right: 0.35rem;
                              border-radius: 0.15rem;
                              display: inline-block;
                              vertical-align: middle;
                              pointer-events: none;}

                        .user-name {width: auto;
                                  display: inline-block;
                                  vertical-align: middle;
                                  pointer-events: none;
                                  }
                        }
                      }

            > .content {padding: 0.75rem;
                        color: #333333;
                        margin-top: 0.5rem;
                        margin-bottom: 0.5rem;
                        letter-spacing: 0.02rem;
                        color: darken($dark_main_text, 100%);
                        font-weight: 200;

              > .code-block {width: calc(100% - 3rem);
                            margin: 0.75rem 0rem;
                            padding: 1rem 1.5rem;
                            color: #71ac6e;
                            font-size: 0.9rem;
                            line-height: 1.5rem;
                            background: darken($dark_main_background, 1.5%);
                            border: 1px solid darken($dark_main_background, 10%);}
            }
          }


  .notification-area {position: fixed;
                      bottom: 0;
                      right: 0;
                      padding: 0.25rem;
                      background-color: transparent;
                      height: auto;
                      width: 20rem;
                      transition: height 0.4s ease;


                      > .notification {margin: 0.5rem;
                                      background-color: #ffffff;
                                      border-radius: 0.25rem;
                                      box-shadow: 0px 1px 3px 3px rgba(#393939, 0.17);
                                      animation: slide-up 0.4s ease;
                                      transition: position 0.4s ease;

                            > .title {font-weight: bold;
                                      line-height: 0.8rem;
                                      font-size: 0.8rem;
                                      padding: 0.5rem 0.75rem 0.25rem 0.75rem;}

                            > .content {font-weight: 200;
                                        padding: 0rem 0.75rem 0.5rem 0.75rem;;
                                        line-height: 0.8rem;
                                        font-size: 0.8rem;}

                                      }
                    }



.content .placeholder-content {height: 10rem;}
.title .placeholder-content {height: 10rem;}

.article-placeholder {//border: 1px solid #ffffff;
          margin: 1rem;
          padding: 0.5rem;
          background-color: rgba(#000000, 0.1);

          > .tags {padding: 0.5rem 0.5rem 0 0.5rem;
                  width: 100%;
                  position: relative;
                  margin: 0.5rem 0.25rem 0.5rem;

                .tag {padding: 0.25rem 0.5rem;
                      font-size: 0.7rem;
                      min-width: 4rem;
                      min-height: 1rem;
                      //background-color: #3d8f94;
                      color: #ffffff;
                      position: relative;
                      margin: 0 0.25rem 0 0.25rem;
                      display: inline-block;
                      border: 1px solid rgba(#eeeeee, 0.1);
                      box-shadow: 1px 1px 2px 3px darken($dark_main_background, 2%);
                      border-radius: 0.15rem;}
                  }

          > .title {padding: 0.75rem;
                    min-height: 2.5rem;
                    font-size: 1.3rem;
                    font-weight: 500;
                    letter-spacing: 0.05rem;
                    margin: 0.5rem 1rem 0.5rem;
                    min-width: 10rem;
                    width: 35rem;
                    border: 1px solid rgba(#eeeeee, 0.1);}

          > .creators {padding: 0rem 0.5rem 0 0.5rem;
                  width: 100%;
                  position: relative;
                  margin: 0.5rem 0.25rem 0.5rem;

                .creator {padding: 0.25rem 0.25rem;
                      font-size: 0.7rem;
                      width: auto;
                      background-color: transparent;
                      color: #ffffff;
                      position: relative;
                      margin: 0 0.25rem;
                      display: inline-block;
                      border: 1px solid rgba(#eeeeee, 0.1);

                      .user-image {height: 1.5rem;
                            width: 1.5rem;
                            background-color: rgba(#a2a2a2, 0.15);
                            border: 1px solid rgba(#eeeeee, 0.15);
                            margin-right: 0.35rem;
                            border-radius: 0.15rem;
                            display: inline-block;
                            vertical-align: middle;}

                      .user-name {width: auto;
                                display: inline-block;
                                vertical-align: middle;
                                min-width: 5rem;
                                }
                      }
                    }

          > .content {padding: 0.75rem;
                      color: #333333;
                      margin-top: 0.5rem;
                      margin-bottom: 0.5rem;
                      min-height: 5rem;
                      border: 1px solid rgba(#eeeeee, 0.1);

            > .code-block {width: calc(100% - 3rem);
                          margin: 0.75rem 0rem;
                          padding: 1rem 1.5rem;
                          color: #71ac6e;
                          font-size: 0.9rem;
                          line-height: 1.5rem;
                          background: darken($dark_main_background, 1.5%);
                          border: 1px solid darken($dark_main_background, 10%);}
          }
        }


.placeholder-content {
  overflow: hidden;
  background: transparent;
  position: relative;
  padding: 0;

  //border: 1px solid lighten($dark_main_background, 1%);
  //background: darken($dark_main_background, 3%);
  //box-shadow: 1px 1px 2px 3px darken($dark_main_background, 2%);

  margin: 1rem;
  padding: 0.5rem;

  // Animation
  animation-duration: 1.4s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: placeholderAnimate;
  background: transparent; // Fallback
  background: linear-gradient(to right, rgba(#eeeeee, 0.01) 2%, rgba(#969696, 0.1) 18%, rgba(#eeeeee, 0.01) 33%);
  background-size: 1300px; // Animation Area

  &_item {
      position: absolute;
      background: #fff;
      z-index: 2;

      &:after,
      &:before {
          width: inherit;
          height: inherit;
          content: '';
          position: absolute;
      }

      &:nth-child(1) {
          top: 0;
          left: 0;
      }

      &:nth-child(2) {
          top: 20px;
          left: 0;
          width: 10%;
          height: 90px;
      }

      &:nth-child(3) {
          top: 0px;
          left: 0;
          width: 10%;
          height: 100%;
      }

      &:nth-child(4) {
          top: 20px;
          width: 20px;
          left: 170px;
          height: 90px;
      }

      &:nth-child(5) {
          top: 40px;
          left: 190px;
          height: 12px;
      }

      &:nth-child(6) {
          top: 75px;
          left: 190px;
          height: 12px;
      }

      &:nth-child(7) {
          top: 20px;
          right: 0;
          width: 23%;
          height: 20px;
      }

      &:nth-child(8) {
          top: 0;
          right: 0;
          width: 10%;
          height: 100%;
      }

      &:nth-child(9) {
          top: 110px;
          height: 17px;
          left: 0;
      }

      &:nth-child(10) {
          top: 149px;
          height: 12px;
          left: 0;
      }

      &:nth-child(11) {
          top: 183px;
          left: 0;
          height: 100%;
      }
  }
}


@keyframes placeholderAnimate {
  0%{ background-position: -650px 0; }
  100%{ background-position: 650px 0; }
}
</style>
