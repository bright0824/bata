<script>
  import Sidebar from "../../components/Sidebar/Sidebar.svelte";
  import HeaderAdmin from "../../components/Headers/HeaderAdmin.svelte";
  import FooterAdmin from "../../components/Footers/FooterAdmin.svelte";
  import SettingsDrawer from "../../components/Drawers/SettingsDrawer.svelte";
  import SearchResultsDrawer from "../../components/Drawers/SearchResultsDrawer.svelte";
  import NotificationsDrawer from "../../components/Drawers/NotificationsDrawer.svelte";

  import { onMount } from "svelte";
  import { state } from "../../store/auth";
  import { get, getFileView } from "../../api/users";

  let user;
  let auth;
  let avatar = "";

  onMount(async () => {
    auth = await state.user();
    user = await get(auth.$id);
    const logImg = await getFileView(user[0].avatar);

    avatar = logImg.href;
  });
</script>

<div>
  <div
    class="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light"
  >
    <Sidebar />

    <div class="flex-1 h-full overflow-x-hidden overflow-y-auto">
      <HeaderAdmin profileAvatar={avatar} />
      <main>
        <slot />
      </main>
      <FooterAdmin />
      <SettingsDrawer />
      <SearchResultsDrawer />
      <NotificationsDrawer />
    </div>
  </div>
</div>
