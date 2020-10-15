<template>
  <div id="app">
    <div id="preloader">
      <div id="status">
        <img src="assets/images/logosplash.png" class="splashvoka">
        <div class="spinner"></div>
      </div>
    </div>
    <router-view name="full" />
    <div id="wrapper">
      <router-view name="sidebar" />
      <div class="content-page">
        <div class="content">
          <router-view name="navbar" />
          <div class="page-content-wrapper ">
            <router-view />
          </div>
        </div>
        <footer class="footer">
          © 2018
          <b>Drixo</b>
          <span class="d-none d-sm-inline-block">
            - Crafted with
            <i class="mdi mdi-heart text-danger"></i> by Themesdesign.
          </span>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>
