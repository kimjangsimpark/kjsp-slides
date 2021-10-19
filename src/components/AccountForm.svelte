<script lang="ts">
  export let isSignin: boolean;
  export let hadleFormSubmit: () => void;
</script>

<form on:submit|preventDefault={hadleFormSubmit}>
  <slot name="formTitle">
    <h2 class="form-title">Form title is <b>requried</b></h2>
  </slot>
  {#if !isSignin}
    <div class="input-box">
      <slot name="userName" />
      <label for="name">UserName</label>
    </div>
  {/if}
  <div class="input-box">
    <slot name="userEmail" />
    <label for="userEmail">Email</label>
  </div>
  <div class="input-box">
    <slot name="userPassword" />
    <label for="userPassword">Password</label>
  </div>
  {#if !isSignin}
    <div class="input-box">
      <slot name="userPhone" />
      <label for="userPhone">PhoneNumber</label>
    </div>
  {/if}
  <slot name="submitButton" />
</form>

<style lang="scss" scoped>
  form {
    width: 400px;
    padding: {
      left: 20px;
      top: 30px;
      right: 20px;
      bottom: 30px;
    }
    border: 1px solid $gray-line-3;
    border-radius: 2px;

    & :global([slot='formTitle']) {
      margin-bottom: 40px;
      font: {
        size: 18px;
        weight: 300;
      }

      & :global(b) {
        font-weight: 500;
      }
    }

    .input-box {
      position: relative;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      & :global(input) {
        width: 100%;
        padding: 14px 12px;
        border: 1px solid $gray-line-3;
        border-radius: 1px;

        &:focus {
          outline: 1px auto $primary-color;
        }

        &:not(:placeholder-shown) {
          padding: {
            top: 20px;
            bottom: 8px;
          }

          & + :global(label) {
            font-size: 11px;
            transform: translate(-3px, -9px);
          }
        }
      }

      label {
        position: absolute;
        top: 0;
        left: 0;
        padding: 14px;
        font: {
          size: 14px;
          weight: 300;
        }
        color: $gray-line-3;
        pointer-events: none;
        transition-property: font-size, transform;
        transition-duration: 0.1s;
        transition-timing-function: ease-in-out;
      }
    }

    & :global([slot='submitButton']) {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 1px;
      color: #ffffff;
      background-color: $primary-color;

      &:hover {
        background-color: $primary-color-3;
      }

      &:focus {
        outline: 1px auto $primary-color;
      }

      &:disabled {
        cursor: not-allowed;
        background-color: rgb(165, 165, 165);
      }
    }
  }
</style>
