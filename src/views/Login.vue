<template>
  <div class="accountbg">
    <div class="content-center">
      <div class="content-desc-center">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-8">
              <div class="card">
                <div class="card-body">
                  <h3 class="text-center mt-0 m-b-15">
                    <a href="#" class="logo logo-admin">
                      <img src="assets/images/logo-dark.png" height="30" alt="logo" />
                    </a>
                  </h3>

                  <h4 class="text-muted text-center font-18">
                    <b>Sign In</b>
                  </h4>
                  <div class="alert alert-warning alert-dismissible fade show" v-if="loading" role="alert">
                    <strong>Loading .....</strong>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div v-if="login_success" class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Login Success!!</strong>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div v-if="login_failed" class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Access Denied</strong>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="p-2">
                    <div class="form-group row">
                      <div class="col-12">
                        <input
                          v-model="email"
                          class="form-control"
                          type="email"
                          required
                          placeholder="Email"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-12">
                        <input
                          class="form-control"
                          type="password"
                          required
                          placeholder="Password"
                          v-model="password"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="col-12">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="customCheck1" />
                          <label class="custom-control-label" for="customCheck1">Remember me</label>
                        </div>
                      </div>
                    </div>

                    <div class="form-group text-center row m-t-20">
                      <div class="col-12">
                        <button
                          class="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                          v-on:click="login"
                        >Log In</button>
                      </div>
                    </div>

                    <div class="form-group m-t-10 mb-0 row">
                      <div class="col-sm-7 m-t-20">
                        <a href="pages-recoverpw.html" class="text-muted">
                          <i class="mdi mdi-lock"></i> Forgot your password?
                        </a>
                      </div>
                      <div class="col-sm-5 m-t-20">
                        <a href="pages-register.html" class="text-muted">
                          <i class="mdi mdi-account-circle"></i> Create an account
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end row -->
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.content-page {
  margin-left: 240px;
  overflow: hidden;
  min-height: 0px;
}
</style>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      login_failed: false,
      login_success: false,
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then((response) => {
            this.loading = false;
            this.login_success = true;
            this.$router.push("/");
        })
        .catch((err)=>{
          this.loading = false;
          this.login_failed = true;
        });
    },
  },
  mounted() {
  },
};
</script>