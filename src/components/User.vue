<template>
    <div v-if="props.user" class="flex w-full justify-between items-center">
        <a class="sm:ml-5 text-gray-400 flex items-center">
          <Icon class="mr-2" icon="carbon:user-filled" /> 
          {{props.user.email}}
        </a>
        <a @click.prevent="$store.dispatch('logout')" href="" class="sm:mr-5 text-[1.1em] text-gray-400 hover:text-pink-400"><Icon icon="mdi:logout" /></a>
      </div>
      <div v-else class="flex w-full justify-end items-center">
        <a href="/login" class="mr-3 flex space-x-2 items-center border rounded-xl px-4 py-1 hover:border-pink-500 text-gray-400 hover:text-pink-400"><Icon icon="bi:person-badge" /><a>Login</a></a>
        <a href="/register" class="sm:mr-5 flex space-x-2 items-center border rounded-xl px-4 py-1 hover:border-pink-500 text-gray-400 hover:text-pink-400"><Icon icon="clarity:key-solid" /><a>Registro</a></a>
    </div>
</template>

<script setup>
    import { Icon } from '@iconify/vue'
    import { defineProps } from 'vue'
    const props = defineProps({
        user: null
    })
</script>