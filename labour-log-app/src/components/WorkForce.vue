<template>
  <v-card app>
    <v-layout justify-space-between pa-3>
      <v-flex d-flex text-xs-center>
        <v-scroll-y-transition mode="out-in">
          <v-card class="pt-4 mx-auto" flat max-width="400">
            <v-card-text>
              <v-avatar size="88">
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Surprised&eyebrowType=UpDownNatural&mouthType=Default&skinColor=Light"
                  class="mb-4"
                />
              </v-avatar>
              <h3 class="headline mb-2">Leanne Graham</h3>
              <div class="blue--text mb-2">Sincere@april.biz</div>
              <div class="blue--text subheading font-weight-bold">{{amt | currency('zł')}}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-layout tag="v-card-text" text-xs-left wrap>
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Source:</v-flex>
              <v-flex>Romaguera-Crona</v-flex>
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Job Role:</v-flex>
              <v-flex>Plumber</v-flex>
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Phone:</v-flex>
              <v-flex>1-770-736-8031</v-flex>
            </v-layout>
          </v-card>
        </v-scroll-y-transition>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import currencyFilter from '../shared/currency-filter'

const avatars = [
  '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
  '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
  '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
  '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
  '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly'
]

const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

export default {
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
    }
  }
}
</script>

<style>
</style>
