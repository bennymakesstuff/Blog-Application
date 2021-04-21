<template>
  <div class="full-width center-content">
    <div class="inner">
      <div class="error-code">
        404 Error
      </div>
      <div class="error-description">
        Page not found
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fourohfour'
}
</script>

<style lang="scss" scoped>
.full-width {width: 100%;}

.center-content {
  flex: none !important;

  > .inner {min-width: 900px;
            text-align: center;

      > div {display: block;}
          }
}

.error-code {font-size: 3rem;
            margin: 2rem;
            }

.error-description {font-size: 1.5rem;
                    margin: 0.5rem;}
</style>
