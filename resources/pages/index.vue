<template>
  <section id="app-home">
		<div class="gradient"></div>
		<div class="container">
			<div class="text-wrap">
				<div class="text-inner">
					<el-row class="row">
						<el-col :span="12" :offset="6" class="slideOutUp">
							<h1>
                Simpler Scheduling
              </h1>
							<h2>
                Choose times and places together. Make planning easy.
              </h2>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div class="slant"></div>
	</section>
</template>

<script>
export default {
  layout: 'app',
  head () {
    return {
      title: 'Meeting Planner | A Next Gen Planner'
    }
  }
}
</script>

<style lang="stylus" scoped>
#app-home
  margin-top -80px
  background-color transparent
  background-size cover
  background-attachment fixed
  position relative
  width 100%
  background-color #52d3aa
  color #fff
  overflow hidden

 .gradient
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    z-index 2
    opacity .9
    -webkit-backface-visibility hidden
    background-color #52d3aa
    /* IE9, iOS 3.2+ */
    background-image url(data:image/svg+xmlbase64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxsaW5lYXJHcmFkaWVudCBpZD0idnNnZyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiMzZjk1ZWEiIHN0b3Atb3BhY2l0eT0iMSIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzUyZDNhYSIgc3RvcC1vcGFjaXR5PSIxIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjdnNnZykiIC8+PC9zdmc)
    background-image -webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0, #3f95ea), color-stop(1, #52d3aa))
    /* Android 2.3 */
    background-image -webkit-repeating-linear-gradient(top left, #3f95ea 0%, #52d3aa 100%)
    /* IE10+ */
    background-image repeating-linear-gradient(to bottom right, #3f95ea 0%, #52d3aa 100%)
    background-image -ms-repeating-linear-gradient(top left, #3f95ea 0%, #52d3aa 100%)

#app-home, #app-home .text-wrap
  height 900px

#app-home .text-wrap
  display table
  width 100%
  position relative
  z-index 4

#app-home .text-inner
  display table-cell
  vertical-align middle
  text-align center

  a
    color white
    border-bottom 1px dashed rgba(255, 255, 255, 0.5)
    -webkit-transition 0.5s
    -o-transition 0.5s
    transition 0.5s

    &:hover,
    &:active,
    &:focus
      text-decoration none
      color white
      border-bottom 1px dashed white

  h1
    font-size 50px
    color white
    margin 0 0 20px 0

  h2
    font-size 28px
    line-height 38px
    font-weight 300
    color rgba(255, 255, 255, 0.8)
    margin 0

#app-home
  .slant
      position absolute
      transform rotate(-1.7deg)
      -ms-transform rotate(-1.7deg)
      -webkit-transform rotate(-1.7deg)
      -o-transform rotate(-1.7deg)
      -moz-transform rotate(-1.7deg)
      background-color #fff
      content ""
      z-index 3
      display inline-block
      height 70px
      bottom 0
      margin-bottom -35px
      padding 0
      width 101%


@keyframes slideOutUp
  0%
    transform translateY(0)

  100%
    opacity 0
    transform translateY(-2000px)

.slideOutUp
  -webkit-animation-name slideOutUp
  animation-name slideOutUp
  animation-timing-function linear
</style>
