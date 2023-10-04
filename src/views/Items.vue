<template>
  <div class="home">
    <h2>目安箱アプリ</h2>
    <p>
      業務効率改善のために、日常業務にある改善できそうなことをここにリストアップしましょう！
    </p>

    <v-form class="" @submit.prevent="submit()">
      <v-row align="center">
        <v-col>
          <v-textarea
            v-model="monku_content"
            label="アイテム追加"
            rows="1"
            auto-grow
            hint="アイテムは匿名で登録されます"
          />
        </v-col>
        <v-col cols="auto">
          <v-btn type="submit" color="primary">
            <v-icon left>mdi-send</v-icon>
            送信
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-toolbar flat>
      <span v-if="complaints.length > 0">
        <v-icon>mdi-text-box-multiple</v-icon> x {{ complaints.length }}
      </span>
      <v-spacer></v-spacer>

      <span class="mr-2"> <v-icon>mdi-sort</v-icon> </span>

      <v-btn-toggle v-model="sorting" mandatory>
        <v-btn icon>
          <v-icon>mdi-calendar</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <v-divider />

    <div class="loader_container" v-if="loading">
      <v-progress-circular indeterminate />
    </div>

    <div class="monku_wrapper" v-else>
      <transition-group name="flip-list" tag="div">
        <Item
          link
          v-for="complaint in sorted_complaints"
          :key="complaint._id"
          :item="complaint"
          @vote="vote($event)"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Item from "@/components/Item.vue"

export default {
  name: "Home",
  components: {
    Item,
  },
  data() {
    return {
      monku_content: "",
      complaints: [],
      sorting: undefined,
      ordering: 1,
      loading: false,
    }
  },
  mounted() {
    this.get_monku()
  },
  methods: {
    submit() {
      if (!confirm("文句を登録しますか？")) return
      this.axios
        .post(`/monku`, {
          content: this.monku_content,
        })
        .then(() => {
          this.monku_content = ""
          this.get_monku()
        })
        .catch((error) => console.log(error))
    },
    get_monku() {
      this.loading = true
      this.axios
        .get(`/monku`)
        .then((response) => {
          this.complaints.splice(0, this.complaints.length)
          response.data.forEach((complaint) => {
            this.complaints.push(complaint)
          })
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false))
    },
    vote(data) {
      const url = `/monku/${data.id}/vote`
      const body = {
        vote: data.vote,
      }
      this.axios
        .post(url, body)
        .then((response) => {
          let found_complaint = this.complaints.find(
            (complaint) => complaint._id === response.data.value._id
          )

          if (found_complaint) found_complaint.likes = response.data.value.likes
        })
        .catch((error) => console.log(error))
    },
  },
  computed: {
    sorted_complaints() {
      if (this.sorting === 0) {
        return this.complaints
          .slice()
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      } else {
        return this.complaints.slice().sort((a, b) => b.likes - a.likes)
      }
    },
  },
}
</script>

<style scoped>
.monku_wrapper {
  margin-top: 1em;
}

.flip-list-move {
  transition: transform 1s;
}

button {
  cursor: pointer;
  margin: 0 0.25em;
  outline: none;
  border: none;
  background: white;
  color: currentcolor;
}

button.active {
  color: #c00000;
}

.loader_container {
  text-align: center;
  font-size: 200%;
}

.toolbar {
  display: flex;
  align-items: center;
}
.toolbar button {
  font-size: 120%;
}
.spacer {
  flex-grow: 1;
}
</style>
