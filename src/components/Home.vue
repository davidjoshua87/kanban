<template lang="html">
  <div class="Home">
    <nav class="nav navbar is-black has-shadow" id="top">
      <hr />
      <div class="container">
        <div class="nav-left is-fixed-top">
          <a class="nav-item">
            #Kanban-Board
          </a>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <span class="nav-item">
            <a class="button is-light is-outlined" @click="add_modal = true">
              Add new todo
            </a>
          </span>
        </div>
      </div>
      <hr />
    </nav>

    <div class="section">
        <div class="boards">
          <div class="columns">

            <div class="column is-3 board">
              <div class="box is-pink">
                <div class="head">
                  <div class="name is-pink">Backlog</div>
                  <div class="count">{{backlog.length}}</div>
                </div>
                <div class="items"  v-for="todo in backlog" :key="todo.id">
                  <div class="box is-p">
                    <p class="title">{{todo.title}}</p>
                    <p class="small">Point: {{todo.point}}</p>
                    <p class="small">Assigned to: {{todo.assign}}</p>
                    <div class="block">
                      <button class="button is-info is-small is-right" @click="getDetail(todo, 'backlog')">Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="column is-3 board">
              <div class="box is-yellow">
                <div class="head">
                  <div class="name is-yellow">Upcoming</div>
                  <div class="count">{{upcoming.length}}</div>
                </div>
                <div class="items"  v-for="todo in upcoming" :key="todo.id">
                  <div class="box is-y">
                    <p class="title">{{todo.title}}</p>
                    <p class="small">Point: {{todo.point}}</p>
                    <p class="small">Assigned to: {{todo.assign}}</p>
                    <div class="block">
                      <button class="button is-info is-small is-right" @click="getDetail(todo, 'upcoming')">Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="column is-3 board">
              <div class="box is-purple">
                <div class="head">
                  <div class="name is-purple">In Progress</div>
                  <div class="count">{{inProgress.length}}</div>
                </div>
                <div class="items"  v-for="todo in inProgress" :key="todo.id">
                  <div class="box is-u">
                    <p class="title">{{todo.title}}</p>
                    <p class="small">Point: {{todo.point}}</p>
                    <p class="small">Assigned to: {{todo.assign}}</p>
                    <div class="block">
                      <button class="button is-info is-small is-right" @click="getDetail(todo, 'inprogress')">Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="column is-3 board">
              <div class="box is-green">
                <div class="head">
                  <div class="name is-green">Complete</div>
                  <div class="count">{{complete.length}}</div>
                </div>
                <div class="items" v-for="todo in complete" :key="todo.id">
                  <div class="box is-g">
                    <p class="title">{{todo.title}}</p>
                    <p class="small">Point: {{todo.point}}</p>
                    <p class="small">Assigned to: {{todo.assign}}</p>
                    <div class="block">
                      <button class="button is-info is-small is-right" @click="getDetail(todo, 'complete')">Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <b-modal
              :active.sync="details_modal"
              :width="380">
              <div class="card" v-show="details_modal">
                <header class="modal-card-head">
                  <p class="modal-card-title">{{selectedTodo.title}}</p>
                </header>
                <section class="modal-card-body">
                  <div class="content">
                    Todo Description:<br>{{selectedTodo.description}}
                  </div>
                  <div class="content">
                    Todo Point:<br>{{selectedTodo.point}}
                  </div>
                  <div class="content" v-if="selectedTodo.status === 1">
                    Todo Status:<br>Backlog
                  </div>
                  <div class="content" v-else-if="selectedTodo.status === 2">
                    Todo Status:<br>Upcoming
                  </div>
                  <div class="content" v-else-if="selectedTodo.status === 3">
                    Todo Status:<br>In Progress
                  </div>
                  <div class="content" v-else>
                    Todo Status:<br>Complete
                  </div>
                </section>
                <footer class="modal-card-foot">
                  <button class="button is-primary card-footer-item" v-show="prev.button" @click="prevStatus(selectedTodo)">{{prev.placeholder}}</button>
                  <button class="button is-danger card-footer-item" @click="confirm">Delete</button>
                  <button class="button is-success card-footer-item" v-show="next.button" @click="nextStatus(selectedTodo)">{{next.placeholder}}</button>
                </footer>
              </div>
            </b-modal>

          </div>
            <div class="foot"> <b> &copy; David Joshua.</b> </div>
        </div>
    </div>

    <b-modal
      :active.sync="add_modal"
      :width="380">
      <div class="modal-card" v-show="add_modal">
        <form @submit="addTodo">
          <header class="modal-card-head">
            <p class="modal-card-title">Add new todo</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Todo Title">
              <b-input v-model="newTodo.title" placeholder="Your todo title" required></b-input>
            </b-field>

            <b-field label="Todo Point">
              <b-input
                placeholder="Your todo point"
                v-model="newTodo.point"
                required>
              </b-input>
            </b-field>

            <b-field label="Todo Description">
              <b-input type="textarea"
                placeholder="Description type here.."
                v-model="newTodo.description"
                required>
              </b-input>
            </b-field>

            <b-field label="Todo Assign">
              <b-input
                placeholder="Assign to.."
                v-model="newTodo.assign"
                required>
              </b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success is-outlined">Submit</button>
          </footer>
        </form>
      </div>
    </b-modal>

    <sweet-modal icon="success" ref="alert_success">Success!<br>{{greet}}</sweet-modal>
    <sweet-modal icon="warning" ref="alert_warning">
      Are you sure?<br><br>
      <button class="button is-success" @click="deleteTodo(selectedTodo)">Yes</button>
      <button class="button is-danger" @click="close">No</button>
    </sweet-modal>

  </div>

</template>

<script>
import * as firebase from 'firebase'
import {
  SweetModal,
  SweetModalTab
} from 'sweet-modal-vue'

const app = firebase.initializeApp({
  // Initialize Firebase
  apiKey: 'AIzaSyCpgmL-qRq9KWZJ4RI7mthGA1qfg_GNk20',
  authDomain: 'kanban-57031.firebaseapp.com',
  databaseURL: 'https://kanban-57031.firebaseio.com',
  projectId: 'kanban-57031',
  storageBucket: 'kanban-57031.appspot.com',
  messagingSenderId: '158717100983'
})

const db = app.database()
const todosRef = db.ref('todos')

export default {
  name: 'home',
  firebase: {
    todos: todosRef
  },
  data () {
    return {
      newTodo: {
        assign: null,
        description: null,
        point: null,
        status: 1,
        title: null
      },
      details_modal: false,
      add_modal: false,
      greet: '',
      selectedTodo: {
        assign: null,
        description: null,
        point: null,
        status: null,
        title: null
      },
      prev: {
        button: true,
        placeholder: ''
      },
      next: {
        button: true,
        placeholder: ''
      }
    }
  },
  computed: {
    backlog () {
      return this.todos.filter((todo) => todo.status === 1)
    },
    upcoming () {
      return this.todos.filter((todo) => todo.status === 2)
    },
    inProgress () {
      return this.todos.filter((todo) => todo.status === 3)
    },
    complete () {
      return this.todos.filter((todo) => todo.status === 4)
    }
  },
  methods: {
    getDetail (todo, state) {
      console.log(todo['.key'])
      this.selectedTodo = todo
      if (state === 'backlog') {
        this.next.placeholder = 'Upcoming'
        this.prev.button = false
        this.next.button = true
        this.details_modal = true
      } else if (state === 'upcoming') {
        this.prev.placeholder = 'Backlog'
        this.next.placeholder = 'In Progress'
        this.prev.button = true
        this.next.button = true
        this.details_modal = true
      } else if (state === 'inprogress') {
        this.prev.placeholder = 'Upcoming'
        this.next.placeholder = 'Complete'
        this.prev.button = true
        this.next.button = true
        this.details_modal = true
      } else {
        this.prev.placeholder = 'In Progress'
        this.prev.button = true
        this.next.button = false
        this.details_modal = true
      }
    },

    prevStatus (todo) {
      let status = todo.status
      todosRef.child(todo['.key']).child('status').set(status - 1)
      this.details_modal = false
    },

    nextStatus (todo) {
      let status = todo.status
      todosRef.child(todo['.key']).child('status').set(status + 1)
      this.details_modal = false
    },

    addTodo () {
      this.add_modal = false
      todosRef.push(this.newTodo)
      this.greet = 'New todo has been successfully added'
      this.$refs.alert_success.open()
    },

    deleteTodo (todo) {
      todosRef.child(todo['.key']).remove()
      this.details_modal = false
      this.$refs.alert_warning.close()
      this.greet = 'Todo has been successfully deleted'
      this.$refs.alert_success.open()
      this.newTodo = {
        assign: null,
        description: null,
        point: null,
        status: 1,
        title: null
      }
    },

    confirm () {
      this.$refs.alert_warning.open()
    },

    close () {
      this.$refs.alert_warning.close()
    }
  },

  components: {
    SweetModal,
    SweetModalTab
  }
}
</script>

<style>
body {
  background-color: rgb(44, 49, 89);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#nav {
  padding: 0;

}

#top {
  padding: 10px;
  box-shadow: 0 5px #b9b207;
}

.head {
  background-color: black;
  border-radius: 5px;
}

.count {

}

a.nav-item {
  color: #b9b207;
  font-weight: bold;
  font-size: 1.9em;
}

.button.is-light.is-outlined {
  margin-top: 10px;
  margin-left: 600px;
  color: white;
  font-weight: bold;
  font-size: 1.0em;
}

.button.is-small {
  border-radius: 5px;
}

.button.is-danger {
  border-radius: 5px;
}

.button.is-info {
  font-weight: bold;
  border-radius: 5px;
}

.button.is-info:hover {
  color: #3273dc;
  background-color: #ffb800;
  box-shadow: 0 5px #666;
}

.button.is-primary {
  border-radius: 5px;
}

.is-info {
  color: white;
}

.block {
  margin-top: 1em;
}

.is-info:hover {
  color: #3273dc;
  background-color: white;
  border-color: #3273dc;
}

.boards {
  padding: 40px 0;
}

.boards .board .box .items {
  padding: 20px 0;
}

.box.is-p {
  border-radius: 8px;
  background-color: #ff3860;
  box-shadow: 0 5px #666;
}

.box.is-p:hover {
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 5px #666;
}

.box.is-y {
  border-radius: 8px;
  background-color: #FFC400;
  box-shadow: 0 5px #666;
}
.box.is-y:hover {
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 5px #666;
}

.box.is-u {
  border-radius: 8px;
  background-color: #896bda;
  box-shadow: 0 5px #666;
}

.box.is-u:hover {
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 5px #666;
}

.box.is-g {
  border-radius: 8px;
  background-color: #00d1b2;
  box-shadow: 0 5px #666;
}

.box.is-g:hover {
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 5px #666;
}

.box .head .is-pink {
  display: inline-block;
  font-size: 1.5em;
  font-weight: bold;
  color: #ff3860;
}

.box.is-pink {
  border-radius: 12px;
  border: 0.2em solid #ff3860;
  background-color: #F5F5F5;
  box-shadow: 0 5px #666;
}

.box.is-pink:hover {
  background-color: #fbc4c9;
  box-shadow: 0 5px #666;
  transform: translateZ(4px);
}

.box .head .is-yellow {
  display: inline-block;
  font-size: 1.5em;
  font-weight: bold;
  color: #FFC400;
}

.box.is-yellow {
  border-radius: 12px;
  border: 0.2em solid #FFC400;
  background-color: #F5F5F5;
  box-shadow: 0 5px #666;
}

.box.is-yellow:hover {
  background-color: #fffeac;
  box-shadow: 0 5px #666;
  transform: translateZ(4px);
}

.box .head .is-purple {
  display: inline-block;
  font-size: 1.5em;
  font-weight: bold;
  color: #896bda;
}

.box.is-purple {
  border-radius: 12px;
  border: 0.2em solid #896bda;
  background-color: #F5F5F5;
  box-shadow: 0 5px #666;
}

.box.is-purple:hover {
  background-color: #cbb2f9;
  box-shadow: 0 5px #666;
  transform: translateZ(4px);
}

.box .head .is-green {
  display: inline-block;
  font-size: 1.5em;
  font-weight: bold;
  color: #00d1b2;
}

.box.is-green {
  border-radius: 12px;
  border: 0.2em solid #00d1b2;
  background-color: #F5F5F5;
  box-shadow: 0 5px #666;
}

.box.is-green:hover {
  background-color: #a9f7bb;
  box-shadow: 0 5px #666;
  transform: translateZ(4px);
}

.box .head .count {
  display: inline-block;
  padding-left: 5px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  font-weight: bold;
}

.box .head .options {
  display: inline-block;
  float: right;
  padding-top: 7px;
  color: #CCCCCC;
}

.card {
  border-radius: 12px;
  width: auto;
}

.foot {
  color: white;
  margin: auto;
  padding-top: 20px;
  width: 10%;
  font-size: 14px;
}

.items .box .title {
  font-size: 1.6em;
}

.small {
  font-size: 1.0em;
  font-weight: 400;
  color: black;
}

.modal-card {
  border-radius: 12px;
  width: auto;
  height: 70%;
}
</style>
