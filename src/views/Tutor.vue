<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <div class="float-right page-breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active">Tutor</li>
          </ol>
        </div>
        <h5 class="page-title">Tutor</h5>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="card m-b-30">
          <div class="card-body">
            <h4 class="mt-0 header-title mb-4">Tutor</h4>
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
                        >{{ item2.name }}</span
                      >
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
                        @click="show(item.id)"
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
            <div class="row w-100 px-5 pb-5">
              <h5 class="modal-title mt-0" id="myModalLabel">
                Detail Tutor ( {{ detail.id }} )
              </h5>
              <div class="col-12">
                <div class="card m-b-30">
                  <div class="card-body">
                    <div v-if="detail.photo == null" class="thumb empty" />
                    <div
                      v-else
                      class="thumb"
                      v-bind:style="{
                        backgroundImage:
                          'url(http://localhost:8001/temp/' +
                          detail.photo +
                          ')',
                      }"
                    />

                    <div class="form-group row">
                      <label
                        for="example-text-input"
                        class="col-sm-2 col-form-label"
                        >Name</label
                      >
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
                      <label
                        for="example-email-input"
                        class="col-sm-2 col-form-label"
                        >Email</label
                      >
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
                      <label
                        for="example-text-input"
                        class="col-sm-2 col-form-label"
                        >Birth Day</label
                      >
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
                      <label
                        for="example-text-input"
                        class="col-sm-2 col-form-label"
                        >contact</label
                      >
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
                      <label
                        for="example-text-input"
                        class="col-sm-2 col-form-label"
                        >Birth Day</label
                      >
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
                      <label
                        for="example-text-input"
                        class="col-sm-2 col-form-label"
                        >Address</label
                      >
                      <div class="col-sm-10">
                        <textarea
                          class="form-control"
                          v-model="detail.address"
                          id="text-area"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label
                        for="example-text-input"
                        class="col-sm-2 col-form-label"
                        >Status (Email)</label
                      >
                      <div class="col-sm-10">
                        <button
                          v-if="detail.status == 'verified'"
                          class="btn-success"
                        >
                          Verified
                        </button>
                        <button
                          v-if="detail.status == 'unverified'"
                          class="btn-warning"
                        >
                          Unverified
                        </button>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label
                        for="example-text-input"
                        class="col-sm-2 col-form-label"
                        >Status (Tutor)</label
                      >
                      <div class="col-sm-10" v-if="detail_tutor">
                        <button
                          v-if="detail_tutor.status == 'verified'"
                          class="btn-success"
                        >
                          Verified
                        </button>
                        <button
                          v-if="detail_tutor.status == 'unverified'"
                          class="btn-warning"
                        >
                          Unverified
                        </button>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label
                        for="example-text-input"
                        class="col-sm-2 col-form-label"
                        >Biography</label
                      >
                      <div class="col-sm-10" v-if="detail_tutor">
                        <textarea
                          class="form-control"
                          v-model="detail_tutor.biography"
                          id="text-area"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label
                        for="example-text-input"
                        class="col-sm-2 col-form-label"
                        >Balance</label
                      >
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
                <span v-if="detail_tutor.status == 'verified'"
                  ><button class="btn btn-lg btn-success">
                    Has been verified
                  </button></span
                >
                <span v-else
                  ><button
                    class="btn btn-lg btn-warning"
                    @click="showVerify()"
                  >
                    Please verify
                  </button></span
                >
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
    <div
      class="modal fade verify"
      id="modalVerify"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <p style="font-size: 18px; text-align: center">
              Apakah anda yakin untuk memverifikasi pada id {{ detail.id }}?
            </p>
            <div class="d-flex justify-content-around w-100">
              <button
                type="button"
                class="btn btn-lg btn-success"
                @click="moveVerify"
                data-dismiss="modal"
              >
                Verify
              </button>
              <button
                type="button"
                class="btn btn-lg btn-danger"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
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
// import { data } from "../../../poin_front/src/views/Petugas.vue";
export default {
  data() {
    return {
      status: "",
      edit: false,
      key: "",
      data: [],
      detail: [],
      detail_tutor: [],
      subject_tutor: [],
      current_page: 1,
      lastPage: 0,
      tes: 0,
    };
  },
  methods: {
    fetchData() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("/get_tutor/all?page=" + this.current_page)
        .then((response) => {
          this.data = response.data.data;
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
    show($id) {
      $(".bd-example-modal-lg").modal("show");
      this.detail = [];
      this.axios
        .get("/get_tutor/" + $id)
        .then((response) => {
          this.detail = response.data;
          this.detail_tutor = response.data.detail;
          console.log(this.detail);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showVerify($id) {
      $(".verify").modal("show");
      console.log(this.detail.id);
    },
    Edit: function (detail) {
      this.edit = true;
      this.id = this.detail.id;
      this.status = this.detail.status;
    },
    moveVerify: function () {
      console.log(this.detail.id);
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .put(
          "/admin/verify_tutor/" + this.detail.id,
          {
            status: this.status,
          },
          conf
        )
        .then((response) => {
          this.detail = response.data;
          this.fetchData();
          this.edit = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    back() {
      if (this.current_page > 1) {
        this.current_page = this.current_page - 1;
        this.fetchData();
      }
    },
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.fetchData();
  },
};
</script>