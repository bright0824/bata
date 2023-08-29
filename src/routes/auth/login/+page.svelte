<script>
  import { goto } from "$app/navigation";
  import { state } from "../../../store/auth";

  const github = "../../../assets/img/github.svg";
  const google = "../../../assets/img/google.svg";

  let email = "";
  let password = "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await state.login(email, password);
      goto("/");
    } catch (error) {
      alert(error.message);
    }
  };

  async function handleGoogleLogin() {
    try {
      await state.googleAuth();
    } catch (error) {
      console.error("Google login error:", error);
    }
  }
</script>

<svelte:head>
  <title>Login</title>
  <meta name="description" content="Login" />
</svelte:head>

<div class="w-screen h-screen bg-[#152E4D]">
  <div class="flex content-center items-center justify-center h-full">
    <div class="w-full lg:w-4/12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
      >
        <!--img src="../../static/assets/img/avatar.jpg" alt="f" /-->
        <br /><br />
        <div class="rounded-t mb-0 px-6 py-6">
          <div class="text-center mb-3 text-white">
            <!--h1 class="text-white text-2xl font-extrabold">BATPLAY</h1><br><br><br><br-->
            <img class="pb-[30%]" src="../assets/img/logo.png" alt="f" />
            <h6 class="text-white text-xl font-bold">Sign in with</h6>
          </div>
          <div class="btn-wrapper text-center">
            <!--button
              on:click={handleGoogleLogin}
              class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
              type="button"
            >
              <img alt="..." class="w-5 mr-1" src="{github}" />
              Github
            </button-->
            <br /><button
              on:click={handleGoogleLogin}
              class="bg-white animate-bounce active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
              type="button"
            >
              <img alt="..." class="w-10 mr-1" src={google} />
              Google
            </button>
          </div>
          <!--hr class="mt-6 border-b-1 border-blueGray-300" /-->
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div class="text-blueGray-400 text-center mb-3 font-bold">
            <!--small>Or sign in with credentials</small-->
          </div>
          <form on:submit|preventDefault={handleSubmit}>
            <!--div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-email"
              >
                Email
              </label>
              <input
                id="grid-email"
                type="email"
                name="email"
                bind:value={email}
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Email"
              />
            </div>

            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-password"
              >
                Password
              </label>
              <input
                id="grid-password"
                type="password"
                name="password"
                bind:value={password}
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Password"
              />
            </div-->
            <!--div>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  id="customCheckLogin"
                  type="checkbox"
                  class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                />
                <span class="ml-2 text-sm font-semibold text-blueGray-600">
                  Remember me
                </span>
              </label>
            </div-->

            <!--div class="text-center mt-6">
              <button
                class="bg-primary text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="submit"
              >
                Sign In
              </button>
            </div-->
          </form>
        </div>
      </div>
      <div class="flex flex-wrap mt-6 relative">
        <!--div class="w-1/2">
          <a href="/" on:click={(e) => e.preventDefault()} class="text-blueGray-200">
            <small>Forgot password?</small>
          </a>
        </div>
        <div class="w-1/2 text-right">
          <a href="/auth/register" class="text-blueGray-200">
            <small>Create new account</small>
          </a>
        </div-->
      </div>
    </div>
  </div>
</div>
