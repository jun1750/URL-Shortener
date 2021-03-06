 Vue.component("modal", {
   template: "#modal-template"
 });

var app = new Vue({
  el: "#app",

  data: {
    serviceURL: "https://cs3103.cs.unb.ca:26345",
    authenticated: false,
    urlData: null,
    userName: null,
    editModal: false,
    input: {
      username: "",
      password: "",
      newURL: ""
    },
    selectedUrl: {
      longUrl: "",
      shortUrl: "",
      urlId: ""
    }
  },

  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        axios
        .post(this.serviceURL+"/signin", {
            "username": this.input.username,
            "password": this.input.password
        })
        .then(response => {
            console.log(response.data);
            if (response.data.message == "Success - Signed In") {
              this.authenticated = true;
              this.userName = response.data.username;
            }
        })
        .catch(e => {
            alert("The username or password was incorrect, try again");
            this.input.password = "";
            console.log(e);
        });
      } else {
        alert("A username and password must be present");
      }
    },


    logout() {
      axios
      .delete(this.serviceURL+"/signin")
      .then(response => {
          location.reload();
      })
      .catch(e => {
        console.log(e);
      });
    },


    fetchUrls() {
      axios
      .get(this.serviceURL+"/user/"+this.userName+"/urls")
      .then(response => {
          this.urlData = response.data;
      })
      .catch(e => {
        alert("Unable to load the url data");
        console.log(e);
      });
    },


    redirectURL(url_id) {
      axios
      .get(this.serviceURL+"/"+url_id+"/info")
      .then(response => {
        console.log(response.data);
        this.selectedUrl.shortUrl = response.data.short_url;
        this.selectedUrl.longUrl = response.data.long_url;

        console.log(this.selectedUrl.shortUrl);
        window.open(
          this.selectedUrl.shortUrl,
          '_blank'
        );
      })
      .catch(e => {
        alert("Unable to redirect to the url");
        console.log(e);
      });
    },


    deleteURL(url_id) {
      console.debug(this.serviceURL+"/user/"+this.userName+"/urls/"+url_id);
      axios
      .delete(this.serviceURL+"/user/"+this.userName+"/urls/"+url_id)
      .then(response => {
      })
      .catch(e => {
        alert("Unable to delete the url data");
        console.log(e);
      });
    },    


    shortenUrl() {
      axios
      .post(this.serviceURL+"/shorten", {
          "longURL": this.input.newURL,
      })
      .catch(e => {
        alert("The username or password was incorrect, try again");
            console.log(e);
      });
    },


    showModal() {
      this.editModal = true;
    },


    hideModal() {
      this.editModal = false;
    }

  }
});
