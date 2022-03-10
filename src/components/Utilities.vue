<template>
    <div class="mt-2 text-gray-600 max-h-150 overflow-auto">
      <table v-if="props.state.database" class="w-full mt-5">
        <thead>
          <tr class="h-10">
            <th class="text-left flex items-center space-x-1"><Icon icon="akar-icons:link-chain" /><a>Meus Links</a> </th>
            <th >Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in props.state.database" :key="index" class="border-b h-10">
            <td><a  class="text-blue-600 hover:text-blue-400" v-bind:href="item[0]" target="_blank">{{item[0]}}</a></td>
            <td class="text-center text-gray-500 space-x-3 ">
              <a :title="item[1].favorited" class="cursor-pointer hover:text-red-500" @click="favorite(item[0])"><Icon :class="item[1].favorited ? 'text-red-600' : ''" icon="akar-icons:star" /></a>
              <a :title="item[1].link" class="hover:text-pink-400" href="#"><Icon icon="akar-icons:clipboard" /></a>
              <a class="hover:text-red-500" href="#" @click="deleteFromDB(item[0])"><Icon icon="bi:trash" /></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>
    import { Icon } from '@iconify/vue'
    import { defineProps } from 'vue'
    import { useStore } from 'vuex';

    const store = useStore()
    const props = defineProps({
        state: null
    })

    function deleteFromDB(index){
      store.dispatch('deleteFromDB', index)
    }

    function favorite(index){
      store.dispatch('favoriteLink', index)
    }
</script>