<template>
    <div class="shorten">
      <div class="flex w-full justify-end items-center">
        <router-link to="/" class="mr-5 text-gray-400 hover:text-pink-400">Voltar</router-link>
      </div>
      <span>TOP Links Mais Acessados</span>
      <div class="flex flex-col max-w-125 w-full pb-5 items-center justify-center">
        <div class="p-3 mt-3 text-gray-500 w-full">
            <table class="w-full">
                <thead>
                  <tr class="text-left">
                    <th class="">ID</th>
                    <th class="">Link </th>
                    <th class="text-center">Acessos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="" v-for="(item, index) in $store.state.response.sorted_links" :key="index">
                    <td class="">{{index+1}}</td>
                    <td class=""><a v-bind:href="`https://${item.id}`"  target="_blank" class="text-blue-600">{{item.id}}</a></td>
                    <td class="text-center">{{item.clicks}}</td>
                  </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
</template>

<script setup>
    import { onBeforeMount } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore()

    onBeforeMount(async () => {
        await store.dispatch("getAPI", 'groups/Bm33f6skfJJ/bitlinks/clicks')
    })
</script>