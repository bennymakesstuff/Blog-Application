<template>
  <div class="">
    <div class="" v-if="!anyArticles">
      <h2>No articles have been written yet. :-(</h2>
    </div>
    <div class="" v-if="anyArticles">
      <div v-for="(article, index) in articles" :class="['article', theme]" :key="articles._id">
        <div class="tags">
          <div v-for="(tag, tagIndex) in article.tags" class="tag">{{tag.title}}</div>
        </div>
        <div class="title">{{article.title}}</div>
        <div class="creators">
          <div v-for="(author, creatorIndex) in article.authors" class="creator">
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
      articles: []
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
    getArticles: function(){
      this.$API.get('articles')
        .then((response) => {
          console.log(response);
          if(response[0]==true){
            this.articles = response[1];
          }
          else{
            this.articles = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
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

  .article.dark {border: 1px solid lighten($dark_main_background, 1%);
                background: darken($dark_main_background, 3%);
                box-shadow: 1px 1px 2px 3px darken($dark_main_background, 2%);

                > .content {color: darken($dark_main_text, 10%);}
              }

  .article {border: 1px solid #ffffff;
            margin: 1rem;
            padding: 0.5rem;

            > .tags {padding: 0.5rem 0.5rem 0 0.5rem;
                    width: 100%;
                    position: relative;

                  .tag {padding: 0.25rem 0.5rem;
                        font-size: 0.7rem;
                        width: auto;
                        background-color: #3d8f94;
                        color: #ffffff;
                        position: relative;
                        margin: 0 0.25rem;
                        display: inline-block;
                        box-shadow: 1px 1px 2px 3px darken($dark_main_background, 2%);
                        border-radius: 0.15rem;}
                    }

            > .title {padding: 0.75rem;
                      font-size: 1.3rem;
                      font-weight: 500;
                      letter-spacing: 0.05rem;}

            > .creators {padding: 0rem 0.5rem 0 0.5rem;
                    width: 100%;
                    position: relative;

                  .creator {padding: 0.25rem 0.5rem;
                        font-size: 0.7rem;
                        width: auto;
                        background-color: transparent;
                        color: #ffffff;
                        position: relative;
                        margin: 0 0.25rem;
                        display: inline-block;

                        .user-image {height: 1.5rem;
                              width: 1.5rem;
                              background-color: #333333;
                              margin-right: 0.35rem;
                              border-radius: 0.15rem;
                              display: inline-block;
                              vertical-align: middle;}

                        .user-name {width: auto;
                                  display: inline-block;
                                  vertical-align: middle;
                                  }
                        }
                      }

            > .content {padding: 0.75rem;
                        color: #333333;
                        margin-top: 0.5rem;
                        margin-bottom: 0.5rem;

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
</style>
