<template>
    <div class="shorten">
      <div class="flex w-full justify-between items-center">
        <a class="sm:ml-5 text-gray-400 flex items-center">
          <Icon class="mr-2" icon="carbon:user-filled" /> 
          meunome@email.com
        </a>
        <a href="" class="sm:mr-5 text-[1.1em] text-gray-400 hover:text-blue-500"><Icon icon="mdi:logout" /></a>
      </div>
      <span>Cole o URL para encurtar o link</span>
      <div class="flex flex-col max-w-125 w-full">
        <form class="form" action="">
          <input class="urlInput" placeholder="Cole para encurtar" type="url" name="" id="" required>
          <input class="urlBtn" type="submit" value="Encurtar">
        </form>
        <div class="mt-2 text-gray-600">
          <a href="" class="hover:text-blue-700">Top 100 Links mais acessados</a>
          <table class="w-full mt-5">
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
                  <a class="hover:text-blue-500" href=""><Icon icon="akar-icons:clipboard" /></a>
                  <a class="hover:text-red-500" href=""><Icon icon="bi:trash" /></a>
                </td>
              </tr>
              <tr class="border-b h-10">
                <td>meulink.shorted/asd</td>
                <td class="text-center text-gray-500 space-x-3 ">
                  <a class="hover:text-blue-500" href=""><Icon icon="akar-icons:clipboard" /></a>
                  <a class="hover:text-red-500" href=""><Icon icon="bi:trash" /></a>
                </td>
              </tr>
              <tr class="border-b h-10">
                <td>meulink.shorted/asd</td>
                <td class="text-center text-gray-500 space-x-3 ">
                  <a class="hover:text-blue-500" href=""><Icon icon="akar-icons:clipboard" /></a>
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
</script>
