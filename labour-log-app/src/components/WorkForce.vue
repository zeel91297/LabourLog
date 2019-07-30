<template>
  <div class="card">
    <div class="card__content">
      <div class="card__front">
        <v-card app>
          <v-layout justify-space-between pa-3>
            <v-flex d-flex text-xs-center>
              <v-scroll-y-transition mode="out-in">
                <v-card class="pt-4 mx-auto" flat max-width="400">
                  <!-- <v-btn
                    @click="editWorkForce"
                    fab
                    absolute
                    top
                    right
                    flat
                    icon
                    color="red"
                    style="margin-right:-48px"
                  >
                    <v-icon>delete_sweep</v-icon>
                  </v-btn>
                  <v-btn
                    @click="deleteWorkforce"
                    fab
                    absolute
                    top
                    right
                    flat
                    icon
                    color="green"
                    style="margin-right:-25px"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn> -->
                  <v-card-text>
                    <v-avatar size="88">
                      <!-- src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Surprised&eyebrowType=UpDownNatural&mouthType=Default&skinColor=Light" -->
                      <v-img src="http://localhost:3000/images/avataaars.png" class="mb-4" />
                    </v-avatar>
                    <h3 class="headline mb-2">{{workForceObj.workforce_name}}</h3>
                    <!-- <div class="blue--text mb-2">Sincere@april.biz</div> -->
                    <div class="blue--text subheading font-weight-bold">{{workForceObj.source_name}}</div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-layout tag="v-card-text" text-xs-left wrap>
                    <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Rate / Day:</v-flex>
                    <v-flex>{{workForceObj.workforce_rate | currency('zł')}}</v-flex>
                    <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Job Role:</v-flex>
                    <v-flex>{{workForceObj.role_name}}</v-flex>
                    <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Phone:</v-flex>
                    <v-flex>{{workForceObj.workforce_contact}}</v-flex>
                  </v-layout>
                </v-card>
              </v-scroll-y-transition>
            </v-flex>
          </v-layout>
        </v-card>
      </div>

      <div class="card__back">
        <WorkForceCalender></WorkForceCalender>
      </div>
    </div>
  </div>
</template>

<script>
import currencyFilter from '../shared/currency-filter'
import WorkForceCalender from '@/components/WorkForceCalender.vue'

/* const avatars = [
  "?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
  "?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
  "?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
  "?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
  "?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly"
]; */

const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

export default {
  components: {
    WorkForceCalender
  },
  props: {
    workForceObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      active: [],
      avatar: null,
      open: [],
      users: [],
      amt: 25
    }
  },
  filters: {
    currency: currencyFilter
  },
  computed: {
    items () {
      return [
        {
          name: 'Users',
          children: this.users
        }
      ]
    },
    selected () {
      if (!this.active.length) return undefined

      const id = this.active[0]

      return this.users.find(user => user.id === id)
    }
  },

  watch: {
    selected: 'randomAvatar'
  },

  methods: {
    async fetchUsers (item) {
      // Remove in 6 months and say
      // you've made optimizations! :)
      await pause(1500)

      return fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(json => item.children.push(...json))
        .catch(err => console.warn(err))
    },
    randomAvatar () {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
    },
    editWorkforce () {
      alert('edit')
    },
    deleteWorkforce () {
      alert('delete')
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Oswald:400,700");
:root {
  --level-one: translateZ(3rem);
  --level-two: translateZ(6rem);
  --level-three: translateZ(9rem);

  --fw-normal: 400;
  --fw-bold: 700;

  --clr: #b7c9e5;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

/* body {
  height: 100vh;
  display: grid;
  place-items: center;
  font-family: 'Oswald', sans-serif;
} */

.card {
  width: 400px;
}

.card__content {
  text-align: center;
  position: relative;
  padding: 15em 5em;
  transition: transform 1.7s;
  /* // background: pink; */
  transform-style: preserve-3d;
}

/* .card:hover .card__content {
  transform: rotateY(0.5turn);
} */

.card__front,
.card__back {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5em 3em;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  display: grid;
  align-content: center;
}

.card__front {
  /* background-color: var(--clr); */
  /* background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/308367/fair.jpg); */
  background-size: cover;
  background-blend-mode: overlay;
  /* color: #333; */
}

.card__front::before {
  content: "";
  position: absolute;
  --spacer: 1em;
  top: var(--spacer);
  bottom: var(--spacer);
  left: var(--spacer);
  right: var(--spacer);
  /* border: 3px solid currentColor; */
  transform: var(--level-one);
}

.card__title {
  font-size: 3.5rem;
  transform: var(--level-three);
  order: 2;
  text-transform: uppercase;
}

.card__subtitle {
  transform: var(--level-two);
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.75rem;
  font-weight: var(--fw-bold);
  opacity: 0.7;
}

.card__body {
  transform: var(--level-two);
  font-weight: var(fw-normal);
  font-size: 1.5rem;
  line-height: 1.6;
}

.card__back {
  transform: rotateY(0.5turn);
  color: var(--clr);
  /* background: #333; */
}
</style>
