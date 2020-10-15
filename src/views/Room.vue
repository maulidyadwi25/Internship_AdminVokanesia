<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <div class="float-right page-breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item active">Room</li>
          </ol>
        </div>
        <h5 class="page-title">Room</h5>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="card m-b-30">
          <div class="card-body">
            <h4 class="mt-0 header-title mb-4">Room</h4>
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Room_Key</th>
                    <th>User</th>
                    <th>Tutor</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in data" v-bind:key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.room_key}}</td>
                    <td>{{item.user_id}}</td>
                    <td>{{item.tutor_id}}</td>
                    <td><button class="btn-success" v-if="item.status==verified">{{item.status}}</button>
                        <button class="btn-danger" v-else>{{item.status}}</button></td>
                    <td>
                      <button type="button" class="btn btn-primary waves-effect waves-light">detail</button>
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
      current_page:1,
      lastPage:0,
      tes:0,
    };
  },
  methods: {
    fetchData() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios
        .get("admin/room?page="+this.current_page,conf)
        .then((response) => {
          this.data = response.data.data.data;
          this.lastPage = response.data.last_page;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    next(){
      if(this.current_page<this.lastPage){
        console.log("Sebelum " + this.current_page);
        this.current_page = this.current_page + 1;
        console.log("Sesudah " + this.current_page);
        this.fetchData();
        console.log("next");
      }
    },
    back(){
      if(this.current_page>1){
        this.current_page = this.current_page - 1;
        this.fetchData();
      }
    }
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.fetchData();
  },
};
</script>