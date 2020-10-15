<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <div class="float-right page-breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active">Order</li>
          </ol>
        </div>
        <h5 class="page-title">Order</h5>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="card m-b-30">
          <div class="card-body">
            <h4 class="mt-0 header-title mb-4">Order</h4>
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Invoice</th>
                    <th>User ID</th>
                    <th>Package ID</th>
                    <th>Proof</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in data" v-bind:key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.invoice }}</td>
                    <td>{{ item.user.name }}</td>
                    <td>{{ item.package.name }}</td>
                    <td>{{ item.proof }}</td>
                    <td>
                      <button
                        class="btn-success"
                        v-if="item.status == 'completed'"
                      >
                        {{ item.status }}
                      </button>
                      <button class="btn-warning" v-else>
                        {{ item.status }}
                      </button>
                    </td>
                    <td>
                      <button
                        @click="show  (item.invoice,item.id)"
                        type="button"
                        class="btn btn-primary waves-effect waves-light"
                      >
                        Verify
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav aria-label="...">
              <ul class="pagination">
                <li
                  v-if="current_page > 1"
                  v-on:click="back()"
                  class="page-item"
                >
                  <a class="page-link">Previous</a>
                </li>
                <li
                  v-if="current_page > 1"
                  v-on:click="back()"
                  class="page-item"
                >
                  <a class="page-link">{{ current_page - 1 }}</a>
                </li>
                <li class="page-item active">
                  <a class="page-link">
                    {{ current_page }}
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li
                  v-if="lastPage > current_page"
                  v-on:click="next()"
                  class="page-item"
                >
                  <a class="page-link">{{ current_page + 1 }}</a>
                </li>
                <li
                  v-if="lastPage > current_page"
                  v-on:click="next()"
                  class="page-item"
                >
                  <a class="page-link">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <div class="row w-100 px-5 pb-5 pt-5">
              <div class="col-12">
                <div class="m-b-30">
                  <div>
                    <h5 class="modal-title mt-0" id="myModalLabel">
                      Verifikasi
                    </h5>

                    <p>Yakin memverifikasi order "{{invoice}}" ini?</p>
                    <div class="d-flex justify-content-around w-100">
                      <button class="btn btn-lg btn-primary" @click="verify()">Verify</button>
                      <button class="btn btn-lg btn-danger">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
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
      data: [],
      detail: [],
      current_page: 1,
      lastPage: 0,
      tes: 0,
      invoice: "",
      verify_id: 0,
    };
  },
  methods: {
    fetchData() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("/order?page=" + this.current_page, conf)
        .then((response) => {
          this.data = response.data.data.data;
          this.lastPage = response.data.last_page;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    next() {
      if (this.current_page < this.lastPage) {
        console.log("Sebelum " + this.current_page);
        this.current_page = this.current_page + 1;
        console.log("Sesudah " + this.current_page);
        this.fetchData();
        console.log("next");
      }
    },
    back() {
      if (this.current_page > 1) {
        this.current_page = this.current_page - 1;
        this.fetchData();
      }
    },
    show($invoice,$id){
      $(".bd-example-modal-lg").modal("show");
      this.invoice = $invoice;
      this.verify_id = $id;
    },
    verify() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .post("/order/verify/" + this.verify_id, conf)
        .then((response) => {
          this.fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    save($id) {
      $(".bd-example-modal-lg").modal("show");
      this.axios
        .get("/get_student/" + $id)
        .then((response) => {
          this.detail = response.data;
          console.log(this.detail);
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