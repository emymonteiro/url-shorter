<template>
    <div class="shorten">
      <div class="flex w-full justify-end items-center">
        <router-link to="/" class="mr-5 text-gray-400 hover:text-pink-400">Voltar</router-link>
      </div>
      <span>REGISTRO</span>
      <a v-if="err" class="text-red-700 pb-3 font-bold">{{err}}</a>
      <div class="flex flex-col max-w-125 w-full pb-5">
        <form class="form flex-col space-y-5" @submit.prevent="registerSubmit">
          <input class="urlInput rounded-lg" placeholder="Email" type="email" name="email" required>
          <input class="urlInput rounded-lg" placeholder="Senha" type="password" name="password" required>
          <input class="urlBtn rounded-lg w-[80%] max-w-100" type="submit" value="Registre-se">
        </form>
      </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';

    const err = ref();

    const store = useStore();
    async function registerSubmit(e){
        err.value = null
        const form = Object.fromEntries(new FormData(e.target));
        const res = await store.dispatch('register', form)
        err.value = res
    }
</script>