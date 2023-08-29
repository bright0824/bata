<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { state } from "../../store/auth";
  import { get } from "../../api/users";
  import TotalAmountLineChart from "../../components/TotalAmountLineChart.svelte";
  import WalletDiversificationTable from "../../components/WalletDiversificationTable.svelte";
  import WalletDiversificationChart from "../../components/WalletDiversificationChart.svelte";
  import ActiveSafeNodeBarChart from "../../components/ActiveSafeNodeBarChart.svelte";
  import FarmingRateLineChart from "../../components/FarmingRateLineChart.svelte";
  import { redirect } from "@sveltejs/kit";
  import { ID } from "appwrite";
  import { sdk } from "../../appwrite";

  export let data;

  let diversifications = [];
  let totalAmount = 0;
  let loading = true;

  onMount(async () => {
    try {
      const auth = await state.user();

      diversifications = await get(auth.$id);

      const coins = diversifications[0];

      const data = {
        user_id: auth.$id,
        avatar: "",
        bitcoin: 0,
        ethereum: 0,
        tether: 0,
        usdc: 0,
        tron: 0,
        polygon: 0,
        level: 1,
        bank: "Popular",
        bank_number: "",
        bank_name: "",
        bank_type: "",
        name: auth.name,
        email: auth.email,
        friends: "",
        BTC_address: "",
        Tron_address: "",
        ETH_address: "",
        BEP20_address: "",
      };

      if (coins) {
        totalAmount =
          coins.bitcoin * data.btc +
          coins.ethereum * data.eth +
          coins.polygon * data.matic +
          coins.tether +
          coins.tron * data.trx +
          coins.usdc;
      } else {
        const createUser = sdk.databases.createDocument(
          "64c20b2a348578794032",
          "64c20b45925315c6f23c",
          ID.unique(),
          { ...data }
        );
      }

      loading = false;
    } catch (error) {
      goto("/auth/login");
      console.log(error);
    }
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Admin" />
</svelte:head>

<div class="mt-2">
  {#if loading}
    <div
      x-ref="loading"
      class="fixed inset-0 z-50 flex items-center justify-center text-2xl font-semibold text-white bg-primary-darker"
    >
      Loading.....
    </div>
  {:else}
    <div class="grid p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-3">
      <!-- PASTED DATA BEGIN -->

      <!-- Bar chart card 11111111 COPY FROM HERE -->
      <div class="col-span-2 bg-white rounded-md dark:bg-darker">
        <!-- Chart -->
        <div class="hidden">
          <canvas id="barChart" />
        </div>

        <div class="flex flex-wrap items-center">
          <div class="shadow-lg rounded-lg w-[100%]">
            <h1 class="mx-auto mt-[2%] text-center text-3xl font-extrabold">
              home
            </h1>
            <canvas class="p-2 w-[100%] h-[100%]" id="chartLine" />
          </div>

          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <!-- Required chart.js -->
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <!-- Chart line -->
        </div>
      </div>

      <!-- END COPY HERE!! Blank 111 -->

      <WalletDiversificationTable {diversifications} priceConversion={data} />
    </div>
    <WalletDiversificationChart />

    <div class="grid p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-3">
      <ActiveSafeNodeBarChart />
      <FarmingRateLineChart />
    </div>
  {/if}
</div>
