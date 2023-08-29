<script>
  import { onMount } from "svelte";
  import { state } from "../../../store/auth";
  import { get, getFileView, getList, update } from "../../../api/users";
  import { create } from "../../../api/transactions";
  import { getBalance } from "../../../api/deposit";
  import WalletDiversificationTable from "../../../components/WalletDiversificationTable.svelte";

  export let data;

  let diversifications = [];
  let loading = true;
  let user;
  let users = [];
  let platform_user;
  let auth;
  let sender_avatar = "";
  let receiver_avatar = "../assets/img/avatar.jpg";

  let coin = "btc";
  let amount = 0;
  let receiver = {};

  let selectedChain = "btc";
  let selectedOption = "erc20";

  let max = 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (amount > max) {
      alert("please input correct amount!");
      return;
    }
    try {
      await create({
        type: "send",
        coin,
        amount,
        from: auth.$id,
        to: receiver?.user_id,
      });

      switch (coin) {
        case "btc":
          await changeReceiverAmouont("bitcoin");
          break;
        case "eth":
          await changeReceiverAmouont("ethereum");
          break;
        case "usdt":
          await changeReceiverAmouont("tether");
          break;
        case "usdc":
          await changeReceiverAmouont("usdc");
          break;
        case "trx":
          await changeReceiverAmouont("tron");
          break;
        default:
          receive = 0;
          break;
      }
      window.location.reload();

      alert("sent successfully!");
    } catch (error) {}
  };

  const changeReceiverAmouont = async (item) => {
    const receive_amount =
      Math.round((receiver[item] + 0.99 * amount) * 10000) / 10000;
    const send_amount =
      Math.round((user[0][item] - 0.99 * amount) * 10000) / 10000;
    const paltform_fee =
      Math.round((platform_user[0][item] + 0.01 * amount) * 10000) / 10000;
    await update(receiver.$id, { [item]: receive_amount });
    await update(user[0].$id, { [item]: send_amount });

    await update(platform_user[0].$id, {
      [item]: paltform_fee,
    });
    return;
  };

  const handleChangeCoin = (e) => {
    switch (e.target.value) {
      case "btc":
        max = user[0].bitcoin;
        break;
      case "eth":
        max = user[0].ethereum;
        break;
      case "usdt":
        max = user[0].tether;
        break;
      case "usdc":
        max = user[0].usdc;
        break;
      case "trx":
        max = user[0].tron;
        break;
      default:
        max = 0;
        break;
    }
  };

  const handleChangeReceier = async (e) => {
    const current_receiver = e.target.value;
    if (receiver.avatar) {
      const logImg = await getFileView(receiver.avatar);
      receiver_avatar = logImg.href;
    } else {
      receiver_avatar = "../assets/img/avatar.jpg";
    }
  };

  onMount(async () => {
    try {
      auth = await state.user();
      user = await get(auth.$id);
      platform_user = await get("64c7e2df5af3d8c823e9");

      users = await getList();
      const logImg = await getFileView(user[0].avatar);
      max = user[0].bitcoin;

      sender_avatar = logImg.href;

      loading = false;
      diversifications = user;
    } catch (error) {
      console.log("error=>", error);
    }
  });

  const fetchBalance = async () => {
    try {
      loading = true;
      const price = await getBalance();
      await update(user[0].$id, { bitcoin: price.priceBtc });
      await update(user[0].$id, { ethereum: price.priceEth });
      await update(user[0].$id, { tron: price.priceTrx });
      await update(user[0].$id, { usdc: price.priceUsdt });

      loading = false;
    } catch (error) {
      loading = false;
      console.log(error);
    }
  };

  onMount(fetchBalance);
</script>

<svelte:head>
  <title>Send</title>
  <meta name="description" content="send" />
</svelte:head>

<main>
  {#if loading}
    <div
      x-ref="loading"
      class="fixed inset-0 z-50 flex items-center justify-center text-2xl font-semibold text-white bg-primary-darker"
    >
      Loading.....
    </div>
  {:else}
    <div class="mt-2">
      <div
        class="grid grid-cols-1 p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-3"
      >
        <!-- send -->
        <!-- Bar chart card 11111111 COPY FROM HERE -->
        <div class="col-span-2 bg-white rounded-md dark:bg-darker">
          <!-- Chart -->
          <div class="hidden">
            <canvas id="barChart" />
          </div>

          <div class="flex flex-wrap items-center">
            <div class="shadow-lg rounded-lg w-[100%]">
              <h1 class="mx-auto mt-[2%] text-center text-3xl font-extrabold">
                send
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
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <!-- Chart line -->
          </div>
        </div>
        <!-- END COPY HERE!! Blank 111 -->
        <WalletDiversificationTable {diversifications} priceConversion={data} />
      </div>

      <!-- Two grid columns -->
      <div
        class="grid grid-cols-1 p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-3"
      >
        <!-- Active users chart 33333333 -->
        <div class="col-span-1 bg-white rounded-md dark:bg-darker relative">
          <!-- Card header -->
          <div class="p-4 border-b dark:border-primary">
            <h4 class="text-lg font-semibold text-gray-500 dark:text-light">
              Deposit Address
            </h4>
          </div>
          <!-- Chart -->
          <center>
            <select class="text-black mx-4 mt-6" bind:value={selectedChain}>
              <option selected value="btc">Bitcoin</option>
              <option value="eth">Ethereum</option>
              <option value="tether">Tether</option>
              <option value="trx">Tron</option>
            </select>
            <button
              style="background-color:gray;"
              class="font-extrabold rounded-2xl p-1 border-2 border-white"
              >L2?</button
            ><br />

            {#if selectedChain === "tether"}
              <div id="hiddenByButton" class="text-xs mt-2">
                <input
                  type="radio"
                  value="bep20"
                  bind:group={selectedOption}
                />BEP-20
                <input
                  type="radio"
                  value="erc20"
                  bind:group={selectedOption}
                />ERC-20
                <input
                  type="radio"
                  value="trc20"
                  bind:group={selectedOption}
                />TRC-20
              </div>
              <div id="warningMessage" class="text-xs text-orange-400">
                Only send Wrapped BTC on BEP-20<br />or risk deposit loss
              </div>
            {/if}
          </center>
          <img src="../assets/img/qr.png" class="p-8" alt="qr" />
          {#if selectedChain === "btc"}
            <p class="text-center">
              Deposit Address:<br />38XnPvu9PmonFU9WouPXUjYbW91wa5MerL
            </p>
            <img src="../assets/img/btc.png" class="w-[30%]" alt="btc" />
          {:else if selectedChain === "eth"}
            <p class="text-center">
              Deposit Address:<br />0x5C943aE9807E85B4Fa7298EcFEd84E48E3226FAB
            </p>
            <img src="../assets/img/eth.png" class="w-[30%]" alt="eth" />
          {:else if selectedChain === "tether"}
            {#if selectedOption === "trc20"}
              <p class="text-center">
                Deposit Address:<br />TJHp6FgptJ4xbVVHjhgdiPXPamMMGGUVJk
              </p>
            {:else}
              <p class="text-center">
                Deposit Address:<br />0x5C943aE9807E85B4Fa7298EcFEd84E48E3226FAB
              </p>
            {/if}
            <img src="../assets/img/usdt.png" class="w-[30%]" alt="usdt" />
          {:else if selectedChain === "trx"}
            <p class="text-center">
              Deposit Address:<br />TJHp6FgptJ4xbVVHjhgdiPXPamMMGGUVJk
            </p>
            <img src="../assets/img/trx.png" class="w-[30%]" alt="usdt" />
          {:else if selectedChain === "usdc"}
            <p class="text-center">
              Deposit Address:<br />0x5C943aE9807E85B4Fa7298EcFEd84E48E3226FAB
            </p>
            <img src="../assets/img/usdc.png" class="w-[30%]" alt="usdt" />
          {/if}
          <div class="relative p-4">
            <canvas id="activeUsersChart" />
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded absolute right-4 bottom-5"
            on:click={() => {
              fetchBalance();
            }}
          >
            Check Deposit
          </button>
        </div>

        <!-- Line chart card 444444444 -->
        <div class="col-span-2 bg-white rounded-md dark:bg-darker">
          <!-- Card header -->
          <div
            class="flex items-center justify-between p-4 border-b dark:border-primary"
          >
            <h4 class="text-lg font-semibold text-gray-500 dark:text-light">
              Extra Box
            </h4>
            <div class="flex items-center">
              <button class="relative focus:outline-none">
                <div
                  class="w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-darker"
                />
                <div
                  class="absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform scale-110 rounded-full shadow-sm"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>
