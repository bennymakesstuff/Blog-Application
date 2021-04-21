<template>
  <div>

    <div v-if="article==null" class="hero-image placeholder-content hero-placeholder"></div>
    <div class="article-wrapper">
      <div class="placehodler-articles" v-if="article==null&&firstLoad">
        <div :class="['article-placeholder',theme]">
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
    </div>

    <div v-if="article!=null&&article.img!=null&&article.displayImage!=false" class="hero-image"></div>
    <div class="article-wrapper">
      <div v-if="article!=null" :class="['article', theme]" :key="articles._id">
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

  </div>
</template>

<script>
export default {
  name: 'article',
  data: function(){
    return {
      firstLoad: true,
      article: null
    }
  },
  computed: {
    theme: function(){
      return this.$store.getters.theme;
    }
  },
  beforeMount(){
    this.article = null;
  },
  mounted(){
    this.getArticle(this.$route.articleId);
  },
  methods: {
    getArticle: function(){
      this.firstLoad = true;
      this.articles = [];
      let title = this.$route.params.articleId;
      this.$API.get('article-by-title/'+title)
        .then((response) => {
          console.log(response);
          if(response[0]==true){
            if(response[1].length>0){
              this.article = response[1][0];
            }
            this.firstLoad = false;
          }
          else{
            this.articles = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showArticlesByAuthor: function(){

    },
    showArticlesByTag: function(){

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.content {max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

.hero-image {width: 100vw !important;
            padding-bottom: 56.25%; // 16:9 Aspect Ratio
            padding-bottom: 32.14%; // 28:9 Aspect Ratio
            margin-bottom: 1rem;
            margin-top: calc(0rem - #{$header_height});
            background-color: #b0b0b0;
            }

.hero-placeholder {margin: 0 !important;
                                  padding-bottom: 56.25%; // 16:9 Aspect Ratio
                                  padding-bottom: 32.14% !important; // 28:9 Aspect Ratio
                                  margin-bottom: 1rem;
                                  margin-top: calc(0rem - #{$header_height}) !important;}

.article-wrapper {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.article.dark {background-color: transparent;
              border: none;
              box-shadow: none;
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
.article {margin: 1rem;
          font-weight: 100;
          padding: 0.5rem;
          background-color: transparent;

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
                      display: inline-block;
                      box-shadow: 1px 1px 1px 1px lighten($dark_main_background, 90%);
                      border-radius: 0.15rem;
                      transition: background-color linear 150ms;
                      cursor: pointer;
                      }

                  > .tag:hover {background-color: #4dadb3;}
                  }


          > .title {padding: 0.75rem;
                    font-size: 1.9rem;
                    font-weight: 500;
                    letter-spacing: 0.05rem;}

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

.placehodler-articles {height: 20rem;

  > .article-placeholder {background-color: transparent;
    div {border: none;
        box-shadow: none;}
    > .creators > .creator > .user-image {border: 1px solid transparent; background-color: transparent;}

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
