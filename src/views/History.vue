<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <div class="float-right page-breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active">History</li>
          </ol>
        </div>
        <h5 class="page-title">History</h5>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="card m-b-30">
          <div class="card-body">
            <h4 class="mt-0 header-title mb-4">History</h4>
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
                    <td>{{item.id}}</td>
                    <td>{{item.invoice}}</td>
                    <td>{{item.user_id}}</td>
                    <td>{{item.package_id}}</td>
                    <td>{{item.proof}}</td>
                    <td>
                      <button class="btn-success" v-if="item.status=='completed'">{{item.status}}</button>
                      <button class="btn-warning" v-else>{{item.status}}</button>
                    </td>
                    <td>
                      <button
                        @click="verify(item.id)"
                        type="button"
                        class="btn btn-primary waves-effect waves-light"
                      >Verify</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav aria-label="...">
              <ul class="pagination">
                <li v-if="current_page>1" v-on:click="back()" class="page-item">
                  <a class="page-link">Previous</a>
                </li>
                <li v-if="current_page>1" v-on:click="back()" class="page-item">
                  <a class="page-link">{{current_page-1}}</a>
                </li>
                <li class="page-item active">
                  <a class="page-link">
                    {{current_page}}
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li v-if="lastPage>current_page" v-on:click="next()" class="page-item">
                  <a class="page-link">{{current_page+1}}</a>
                </li>
                <li v-if="lastPage>current_page" v-on:click="next()" class="page-item">
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
            <div class="row w-100 px-5 pb-5">
              <h5 class="modal-title mt-0" id="myModalLabel">Detail Student ( {{detail.id}} )</h5>
              <div class="col-12">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div class="form-group row">
                      <label for="example-text-input" class="col-sm-2 col-form-label">Name</label>
                      <div class="col-sm-10">
                        <input
                          class="form-control"
                          type="text"
                          v-model="detail.name"
                          id="example-text-input"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="example-email-input" class="col-sm-2 col-form-label">Email</label>
                      <div class="col-sm-10">
                        <input
                          class="form-control"
                          type="email"
                          v-model="detail.email"
                          id="example-email-input"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="example-text-input" class="col-sm-2 col-form-label">Birth Day</label>
                      <div class="col-sm-10">
                        <input
                          class="form-control"
                          type="date"
                          v-model="detail.birth_date"
                          id="example-text-input"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="example-text-input" class="col-sm-2 col-form-label">contact</label>
                      <div class="col-sm-10">
                        <input
                          class="form-control"
                          type="text"
                          v-model="detail.contact"
                          id="example-text-input"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="example-text-input" class="col-sm-2 col-form-label">Birth Day</label>
                      <div class="col-sm-10">
                        <input
                          class="form-control"
                          type="date"
                          v-model="detail.birth_date"
                          id="example-text-input"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="example-text-input" class="col-sm-2 col-form-label">Address</label>
                      <div class="col-sm-10">
                        <textarea class="form-control" v-model="detail.address" id="text-area" />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="example-text-input" class="col-sm-2 col-form-label">Status</label>
                      <div class="col-sm-10">
                        <button v-if="detail.status=='verified'" class="btn-success">Verified</button>
                        <button v-if="detail.status=='unverified'" class="btn-warning">Unverified</button>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="example-text-input" class="col-sm-2 col-form-label">Balance</label>
                      <div class="col-sm-10">
                        <input
                          class="form-control"
                          type="number"
                          v-model="detail.balance"
                          id="example-text-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-around w-100">
                <button class="btn btn-lg btn-primary">Save</button>
                <button class="btn btn-lg btn-danger">close</button>
              </div>
            </div>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
    verify($id) {
      // $(".bd-example-modal-lg").modal("show");
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .post("/order/verify/" + $id, conf)
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