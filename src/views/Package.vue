<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <div class="float-right page-breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active">Package</li>
          </ol>
        </div>
        <h5 class="page-title">Package</h5>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="card m-b-30">
          <div class="card-body">
            <h4 class="mt-0 header-title mb-4">Package</h4>
            <button @click="show()" class="btn btn-success">Add Package</button>
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Balance</th>
                    <th>Price</th>
                    <th>Admin ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in data" v-bind:key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.balance}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.user_id}}</td>
                    <td>
                      <button
                        @click="show(item.id)"
                        type="button"
                        class="btn btn-primary waves-effect waves-light"
                      >Edit</button>
                      <button
                        @click="destroy(item.id)"
                        type="button"
                        class="btn btn-danger waves-effect waves-light"
                      >Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav>
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
              <h5 class="modal-title mt-0" id="myModalLabel">Add Package</h5>
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
                      <label for="example-email-input" class="col-sm-2 col-form-label">Balance</label>
                      <div class="col-sm-10">
                        <input
                          class="form-control"
                          type="number"
                          v-model="detail.balance"
                          id="example-email-input"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="example-text-input" class="col-sm-2 col-form-label">Price</label>
                      <div class="col-sm-10">
                        <input
                          class="form-control"
                          type="number"
                          v-model="detail.price"
                          id="example-text-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-around w-100">
                <button @click="save()" class="btn btn-lg btn-primary">Save</button>
                <button class="btn btn-lg btn-danger">close</button>
              </div>
            </div>
        </div>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
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
        .get("/package?page=" + this.current_page, conf)
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
    show($id) {
      $(".bd-example-modal-lg").modal("show");
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("/admin/package/" + $id, conf)
        .then((response) => {
          this.detail = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    destroy($id) {
      $(".bd-example-modal-lg").modal("show");
    },
    save() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      let form = new FormData();
        form.append("name", this.name);
        form.append("price", this.price);
        form.append("balance", this.balance);
       this.axios
        .post("admin/package/",form,conf)
        .then((response) => {
          console.log(response);
          this.fetchData();
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