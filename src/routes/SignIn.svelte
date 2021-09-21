<script lang="ts">
  import AccountForm from '@/components/AccountForm.svelte';

  let email: string;
  let password: string;

  $: disablesSubmitButton = !(email && password);
</script>

<main>
  <AccountForm>
    <h2 slot="formTitle">Sign in</h2>
    <input
      type="text"
      name="email"
      id="email"
      slot="email"
      placeholder=" "
      bind:value={email}
    />
    <input
      type="password"
      name="password"
      id="password"
      slot="password"
      placeholder=" "
      bind:value={password}
    />
    <button slot="submitButton" disabled={disablesSubmitButton}>Sign in</button>
  </AccountForm>
</main>

<style lang="scss">
  main {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    padding: 20px;
  }
</style>
