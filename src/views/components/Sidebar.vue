<template>
  <div class="left side-menu">
    <button
      type="button"
      class="button-menu-mobile button-menu-mobile-topbar open-left waves-effect"
    >
      <i class="ion-close"></i>
    </button>

    <div class="left-side-logo d-block d-lg-none">
      <div class="text-center">
        <a href="index.html" class="logo">
          <img src="assets/images/logo-dark.png" height="20" alt="logo" />
        </a>
      </div>
    </div>

    <div class="sidebar-inner slimscrollleft">
      <div id="sidebar-menu">
        <ul>
          <li class="menu-title">Main</li>

          <li>
            <router-link to="/" class="waves-effect">
              <i class="dripicons-meter"></i>
              <span>
                Dashboard
                <span class="badge badge-success badge-pill float-right">3</span>
              </span>
            </router-link>
          </li>

          <li class="has_sub">
            <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" class="waves-effect">
              <i class="fa fa-user-o"></i>
              <span>User</span>
              <span class="menu-arrow float-right">
                <i class="mdi mdi-chevron-right"></i>
              </span>
            </a>
            <ul class="list-unstyled" id="collapseExample">
              <li>
                <router-link to="/tutor" class="waves-effect">
                  <i class="fa fa-graduation-cap"></i>
                  <span> Tutor</span>
                </router-link>
              </li>
              <li>
                <router-link to="/student" class="waves-effect">
                  <i class="fa fa-user-o"></i>
                  <span> Student</span>
                </router-link>
              </li>
            </ul>
          </li>
          <li>
            <router-link to="/room" class="waves-effect">
              <i class="dripicons-user-group"></i>
              <span>
                Room
              </span>
            </router-link>
          </li>
          <li>
            <router-link to="/order" class="waves-effect">
              <i class="dripicons-cart"></i>
              <span>
                Order
              </span>
            </router-link>
          </li>
          <li>
             <router-link to="/history" class="waves-effect">
              <i class="dripicons-wallet"></i>
              <span>
                History
              </span>
            </router-link>
          </li>
          <li>
            <router-link to="/package" class="waves-effect">
              <i class="dripicons-box"></i>
              <span>
                Package
              </span>
            </router-link>
          </li>


        </ul>
      </div>
      <div class="clearfix"></div>
    </div>
    <!-- end sidebarinner -->
  </div>
</template>