<template>
    <div class="mt-2 text-gray-600 max-h-150 overflow-auto">
      <table v-if="props.user" class="w-full mt-5">
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
</template>

<script setup>
    import { Icon } from '@iconify/vue'
    import { defineProps } from 'vue'
    const props = defineProps({
        user: null
    })
</script>