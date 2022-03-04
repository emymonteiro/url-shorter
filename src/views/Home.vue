<template>
    <div class="shorten">
      <User :user="$store.state.user" />
      <a href="/tier" class="hover:text-pink-500 text-gray-500 font-bold py-3 self-end mr-8"> <Icon class="text-pink-500" icon="mdi:podium"/> Trending Topics</a>
      <span>Cole o URL para encurtar o link</span>
      <div class="flex flex-col max-w-125 w-full pb-5">
        <!-- Formulario p/ encurtamento do link -->
        <form class="form" @submit.prevent="shorten">
          <input class="urlInput" placeholder="Cole para encurtar" type="url" name="link" required>
          <input class="urlBtn urlBtnSize" type="submit" value="Encurtar">
        </form>
        <!-- Table com a informação do resultado -->
        <div v-if="urlShorted.extended && urlShorted.cutted" class="shadow p-3 mt-3 bg-light-400 text-gray-500">
          <table class="w-full table-fixed">
            <thead>
              <tr>
                <th class="text-left">Padrão </th>
                <th class="text-left ml-5"><a class="ml-5">Encurtada</a> </th>
              </tr>
            </thead>
            <tbody >
              <tr class="">
                <td class="overflow-ellipsis whitespace-nowrap overflow-hidden"><a v-bind:href="urlShorted.extended" target="_blank" class="text-blue-600">{{urlShorted.extended}}</a></td>
                <td class=" overflow-ellipsis whitespace-nowrap overflow-hidden ">
                  <a v-bind:href="urlShorted.cutted" target="_blank" class="text-blue-600 ml-5 cursor-pointer">{{urlShorted.cutted}}</a>
                </td>
                <td class="text-right text-gray-500 space-x-3 ">
                  <a class="hover:text-pink-400 cursor-pointer" @click="copyClipboard"><Icon icon="akar-icons:copy" /></a>
                  <a v-if="$store.state.user" class="hover:text-pink-400 text-green-600 cursor-pointer" @click="fireStore"><Icon class="" icon="akar-icons:circle-plus" /></a>
                  <a class="hover:text-pink-500 text-red-600 cursor-pointer" @click="removeUrl"><Icon icon="akar-icons:circle-x" /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Utilities :state="$store.state" />
      </div>
    </div>
</template>

<script setup>
  //Icons
  import { Icon } from '@iconify/vue'
  //Components
  import Utilities from '../components/Utilities.vue';
  import User from '../components/User.vue';
  
  //vue and store
  import { onBeforeMount, reactive } from 'vue';
  import { useStore } from 'vuex';

  //api shortener
  import { BitlyClient } from 'bitly';

  //-----------------------------------------------------------------//
  const urlShorted = reactive({})
  const bitly = new BitlyClient('26cba2c97fa6945b02d89ab23831efb6d92bce3a', {});
  

  async function shorten(e){
    const { link } = Object.fromEntries(new FormData(e.target));
    let result;
    result = await bitly.shorten(link);

    await store.dispatch("getAPI", 'groups/Bm33f6skfJJ/bitlinks/clicks')
    console.log(store.state.response)

    urlShorted.extended = result.long_url
    urlShorted.cutted = result.link
  }
  /* import { db } from '../firebase'
  import  { doc, getDoc, setDoc } from 'firebase/firestore' */
    async function fireStore(){
      store.dispatch('updateDB', urlShorted)
  }

  //-----------------------------------------//
  async function copyClipboard(){
    try {
      await navigator.clipboard.writeText(urlShorted.cutted);
      alert('Copiado');
    } catch($e) {
      alert('Ocorreu um erro');
    }
  }

  function removeUrl(){
    urlShorted.extended = null
    urlShorted.cutted = null
  }

  const store = useStore();
  onBeforeMount(async () => {
    await store.dispatch('fetchUser')
  })
</script>
