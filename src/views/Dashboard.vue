<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <div class="float-right page-breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Drixo</a>
            </li>
            <li class="breadcrumb-item active">Dashboard</li>
          </ol>
        </div>
        <h5 class="page-title">Dashboard</h5>
      </div>
    </div>
    <!-- end row -->

    <div class="row">
      <div class="col-xl-3 col-md-6">
        <div class="card mini-stat m-b-30">
          <div class="p-3 bg-primary text-white">
            <div class="mini-stat-icon">
              <i class="mdi mdi-cube-outline float-right mb-0"></i>
            </div>
            <h6 class="text-uppercase mb-0">Active Room</h6>
          </div>
          <div class="card-body">
            <div class="border-bottom pb-4">
              <h1 style="text-align: center">35</h1>
            </div>
            <div class="mt-4 text-muted">
              <div class="float-right">
                <p class="m-0">Last : 1325</p>
              </div>
              <h5 class="m-0">
                1456
                <i class="mdi mdi-arrow-up text-success ml-2"></i>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
        <div class="card mini-stat m-b-30">
          <div class="p-3 bg-primary text-white">
            <div class="mini-stat-icon">
              <i class="mdi mdi-account-network float-right mb-0"></i>
            </div>
            <h6 class="text-uppercase mb-0">Request Tutor</h6>
          </div>
          <div class="card-body">
            <div class="border-bottom pb-4">
              <h1 style="text-align: center">{{ total }}</h1>
            </div>
            <div class="mt-4 text-muted">
              <div class="float-right">
                <p class="m-0">{{ total }} tutor not verify yet</p>
              </div>
              <h5 class="m-0">
                3567
                <i class="mdi mdi-arrow-up text-success ml-2"></i>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
        <div class="card mini-stat m-b-30">
          <div class="p-3 bg-primary text-white">
            <div class="mini-stat-icon">
              <i class="mdi mdi-alert float-right mb-0"></i>
            </div>
            <h6 class="text-uppercase mb-0">Report Today</h6>
          </div>
          <div class="card-body">
            <div class="border-bottom pb-4">
              <h1 style="text-align: center">45</h1>
            </div>
            <div class="mt-4 text-muted">
              <div class="float-right">
                <p class="m-0">Last : 15.8</p>
              </div>
              <h5 class="m-0">
                14.5
                <i class="mdi mdi-arrow-down text-danger ml-2"></i>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6">
        <div class="card mini-stat m-b-30">
          <div class="p-3 bg-primary text-white">
            <div class="mini-stat-icon">
              <i class="mdi mdi-cart-outline float-right mb-0"></i>
            </div>
            <h6 class="text-uppercase mb-0">Transaction Today</h6>
          </div>
          <div class="card-body">
            <div class="border-bottom pb-4">
              <h1 style="text-align: center">30</h1>
            </div>
            <div class="mt-4 text-muted">
              <div class="float-right">
                <p class="m-0">Last : 14256</p>
              </div>
              <h5 class="m-0">
                15234
                <i class="mdi mdi-arrow-up text-success ml-2"></i>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="card m-b-30">
          <div class="card-body">
            <h4 class="mt-0 header-title mb-4">Recent Tutor Request</h4>
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Subject</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in data" v-bind:key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.contact }}</td>
                    <td v-if="item.tutor_subject.length > 0">
                      <span
                        v-for="item2 in item.tutor_subject"
                        v-bind:key="item2.id"
                      >
                        {{ item2.name }}
                      </span>
                    </td>
                    <td v-else>
                      <button class="btn-warning">
                        No Subject Selected Yet
                      </button>
                    </td>
                    <td>{{ item.address }}</td>
                    <td v-if="item.detail">
                      <button
                        v-if="item.detail.status == 'unverified'"
                        class="btn-warning"
                      >
                        {{ item.detail.status }}
                      </button>
                      <button
                        v-if="item.detail.status == 'verified'"
                        class="btn-success"
                      >
                        {{ item.detail.status }}
                      </button>
                    </td>
                    <td v-else>
                      <button class="btn-danger">No Detail</button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary waves-effect waves-light"
                      >
                        detail
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      
    </div>
  </div>
</template>
<style>
.card {
  border-radius: 0.5rem;
}
</style>
<script>
export default {
  data() {
    return {
      key: "",
      total: 0,
      data: [],
    };
  },
  methods: {
    fetchData() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("/admin/get_tutor/unverified", conf)
        .then((response) => {
          this.data = response.data.data;
          this.total = response.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.fetchData();
  },
};
</script>