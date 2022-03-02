<template>
    <div class="shorten">
      <div v-if="$store.state.user" class="flex w-full justify-between items-center">
        <a class="sm:ml-5 text-gray-400 flex items-center">
          <Icon class="mr-2" icon="carbon:user-filled" /> 
          {{store.state.user.email}}
        </a>
        <a @click.prevent="$store.dispatch('logout')" href="" class="sm:mr-5 text-[1.1em] text-gray-400 hover:text-pink-400"><Icon icon="mdi:logout" /></a>
      </div>
      <div v-else class="flex w-full justify-end items-center">
        <a href="/login" class="mr-3 flex space-x-2 items-center border rounded-xl px-4 py-1 hover:border-pink-500 text-gray-400 hover:text-pink-400"><Icon icon="bi:person-badge" /><a>Login</a></a>
        <a href="/register" class="sm:mr-5 flex space-x-2 items-center border rounded-xl px-4 py-1 hover:border-pink-500 text-gray-400 hover:text-pink-400"><Icon icon="clarity:key-solid" /><a>Registro</a></a>
      </div>
      <span>Cole o URL para encurtar o link</span>
      <div class="flex flex-col max-w-125 w-full">
        <form class="form" action="">
          <input class="urlInput" placeholder="Cole para encurtar" type="url" name="" id="" required>
          <input class="urlBtn urlBtnSize" type="submit" value="Encurtar">
        </form>
        <div class="mt-2 text-gray-600 max-h-150 overflow-auto">
          <a href="" class="hover:text-pink-500 font-bold"> <Icon icon="mdi:podium"/> Tendências</a>
          <table v-if="$store.state.user" class="w-full mt-5">
            <thead>
              <tr class="h-10">
                <th class="text-left flex items-center space-x-1"><Icon icon="akar-icons:link-chain" /><a>Meus Links</a> </th>
                <th >Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b h-10">
                <td>meulink.shorted/asd</td>
                <td class="text-center text-gray-500 space-x-3 ">
                  <a class="hover:text-pink-400" href=""><Icon icon="akar-icons:clipboard" /></a>
                  <a class="hover:text-red-500" href=""><Icon icon="bi:trash" /></a>
                </td>
              </tr>
              <tr class="border-b h-10">
                <td>meulink.shorted/asd</td>
                <td class="text-center text-gray-500 space-x-3 ">
                  <a class="hover:text-pink-400" href=""><Icon icon="akar-icons:clipboard" /></a>
                  <a class="hover:text-red-500" href=""><Icon icon="bi:trash" /></a>
                </td>
              </tr>
              <tr class="border-b h-10">
                <td>meulink.shorted/asd</td>
                <td class="text-center text-gray-500 space-x-3 ">
                  <a class="hover:text-pink-400" href=""><Icon icon="akar-icons:clipboard" /></a>
                  <a class="hover:text-red-500" href=""><Icon icon="bi:trash" /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<!-- -->

<script setup>
  import { Icon } from '@iconify/vue'
  
  import { onBeforeMount } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  onBeforeMount(() => {
    store.dispatch('fetchUser')
  })
</script>
